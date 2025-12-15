// ============================================
// URL PARAMETER HANDLING & PERSONALIZATION
// ============================================

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Mapping for custom pronouns (normalize from non-diacritics to Vietnamese)
const pronounMap = {
    anh: "Anh",
    chi: "Chị",
    co: "Cô",
    di: "Dì",
    chu: "Chú",
    bac: "Bác",
    thim: "Thím",
    mo: "Mợ",
    cau: "Cậu",
    em: "Em",
    ban: "Bạn",
    chau: "Cháu",
    quykhach: "Quý khách"
};

// Mapping for FROM sender on envelope
const fromMap = {
    bo_chong: "Ông Trương Xuân Hanh",
    me_chong: "Bà Nguyễn Thị Bích Mai",
    chong: "Trương Minh Thắng",
    vo: "Lê Thị Sang",
    bo_vo: "Ông Lê Văn Luận",
    me_vo: "Bà Hoàng Thị Loan"
};

// Get invite type text based on relationship and pronoun
function getInviteTypeText(sender, pronoun) {
    const parentTypes = ['bo_chong', 'me_chong', 'bo_vo', 'me_vo'];
    const coupleTypes = ['chong', 'vo'];
    
    // Determine if guest is younger or older based on pronoun
    const youngerPronouns = ['Em'];
    const olderPronouns = ['Anh', 'Chị', 'Cô', 'Dì', 'Chú', 'Bác', 'Thím', 'Mợ', 'Cậu'];
    const peerPronouns = ['Bạn'];
    const grandchildPronouns = ['Cháu'];
    
    const isYounger = youngerPronouns.includes(pronoun);
    const isOlder = olderPronouns.includes(pronoun);
    const isPeer = peerPronouns.includes(pronoun);
    
    if (parentTypes.includes(sender)) {
        // Parents inviting
        return 'hai con chúng tôi';
    } else if (coupleTypes.includes(sender)) {
        // Couple inviting
        if (pronoun === 'Anh' || pronoun === 'Chị') {
            return 'chúng em';
        } else if (pronoun === 'Cô' || pronoun === 'Dì' || pronoun === 'Chú' || pronoun === 'Bác' || pronoun === 'Thím' || pronoun === 'Cậu' || pronoun === 'Mợ') {
            return 'chúng cháu';
        } else if (pronoun === 'Bạn') {
            return 'chúng mình';
        } else if (pronoun === 'Cháu') {
            return 'cô chú';
        } else if (isYounger) {
            return 'chúng tôi';
        } else {
            return 'chúng tôi';
        }
    } else {
        return 'chúng tôi';
    }
}

// Set personalized invitation content
function setPersonalizedInvitation() {
    // Get parameters from URL
    const guestName = decodeURIComponent(getUrlParameter('guest') || 'Quý khách');
    const pronounRaw = (getUrlParameter('pronoun') || '').toLowerCase();
    const sender = getUrlParameter('sender') || '';
    
    // Get pronoun from mapping (with diacritics)
    const pronoun = pronounMap[pronounRaw] || '';
    
    // Get invite type text with pronoun context
    const inviteTypeText = getInviteTypeText(sender, pronoun);
    
    // Get sender name from mapping
    const senderName = fromMap[sender] || 'Gia đình chúng tôi';
    
    // Set envelope content
    document.getElementById('fromSender').textContent = senderName;
    document.getElementById('envelopeCustomPronoun').textContent = pronoun ? pronoun + ' ' : '';
    document.getElementById('envelopeGuestName').textContent = guestName;
    
    // Set main invitation content
    document.getElementById('customPronoun').textContent = pronoun ? pronoun + ' ' : '';
    document.getElementById('guestName').textContent = guestName;
    document.getElementById('inviteType').textContent = inviteTypeText;
    
    // Set all other instances of invite type text throughout the page
    const inviteType2 = document.getElementById('inviteType2');
    const inviteType3 = document.getElementById('inviteType3');
    
    if (inviteType2) inviteType2.textContent = inviteTypeText;
    if (inviteType3) inviteType3.textContent = inviteTypeText.charAt(0).toUpperCase() + inviteTypeText.slice(1);
    
    // Hide gift section if sender is parent
    const parentTypes = ['bo_chong', 'me_chong', 'bo_vo', 'me_vo'];
    const giftSection = document.getElementById('gift');
    if (giftSection && parentTypes.includes(sender)) {
        giftSection.style.display = 'none';
    }
}

// ============================================
// ENVELOPE ANIMATION
// ============================================
function openEnvelope() {
    const envelopeContainer = document.getElementById('envelope-container');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('backgroundMusic');
    
    // Start playing music when envelope is opened
    bgMusic.play().catch(err => {
        console.log('Autoplay prevented:', err);
        // Music will play when user interacts with the page
    });
    
    // Update music toggle button state
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.classList.add('playing');
    musicToggle.querySelector('.music-icon').textContent = '🔊';
    
     // After animation completes
    setTimeout(() => {
        // Hide envelope container completely
        envelopeContainer.style.display = 'none';
        
        // Show main content with fade-in
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 50);
    }, 500); // 1 second for zoom and fade

    // Apply zoom-in and fade-out to entire envelope container
    envelopeContainer.style.transition = 'all 1s ease-out';
    envelopeContainer.style.transform = 'scale(2)';
    envelopeContainer.style.opacity = '0';
    
   
}

// ============================================
// BACKGROUND MUSIC CONTROL
// ============================================
function toggleMusic() {
    const bgMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicIcon.textContent = '🔊';
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicIcon.textContent = '🔇';
    }
}

// Try to play music on any user interaction if autoplay was blocked
document.addEventListener('click', function initMusic() {
    const bgMusic = document.getElementById('backgroundMusic');
    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
    }
}, { once: true });

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections except hero
    document.querySelectorAll('section:not(.hero-section)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(section);
    });
}

// ============================================
// COPY BANK ACCOUNT NUMBER
// ============================================
function copyAccountNumber(accountNumber) {
    // Remove spaces for copying
    const cleanNumber = accountNumber.replace(/\s/g, '');
    
    // Copy to clipboard
    navigator.clipboard.writeText(cleanNumber).then(() => {
        // Find the button that was clicked and update its text
        event.target.textContent = '✅ Đã sao chép!';
        event.target.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            event.target.textContent = '📋 Sao chép STK';
            event.target.style.background = 'linear-gradient(135deg, var(--accent-green), var(--primary-color))';
        }, 2000);
    }).catch(err => {
        console.error('Error copying:', err);
        alert('Không thể sao chép. Vui lòng thử lại!');
    });
}

// ============================================
// GENERATE QR CODE FOR WEBSITE
// ============================================
function updateWebsiteQRCode() {
    const currentUrl = window.location.origin + window.location.pathname;
    const qrCodeImg = document.getElementById('website-qr');
    
    if (qrCodeImg) {
        qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}`;
        qrCodeImg.alt = 'QR Code Website';
    }
}

// ============================================
// COUNTDOWN TIMER (Optional)
// ============================================
function initCountdown() {
    // Set your wedding date here
    const weddingDate = new Date('2025-12-27 10:00:00').getTime();
    
    // You can add a countdown element to HTML and update it here
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            console.log('Wedding day has arrived! 🎉');
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// LAZY LOAD IMAGES
// ============================================
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================
async function shareWebsite() {
    const shareData = {
        title: 'Thiệp Cưới - Minh Thắng & Lê Sang',
        text: 'Trân trọng kính mời bạn đến dự đám cưới của chúng tôi',
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
            alert('Đã sao chép link thiệp cưới!');
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Error sharing:', err);
        }
    }
}

// ============================================
// PREVENT RIGHT CLICK ON IMAGES (Optional)
// ============================================
function protectImages() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Prevent drag
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });
    });
}

// ============================================
// ADD WEDDING DATE TO CALENDAR
// ============================================
function addToCalendar(eventType) {
    // Define event details based on type
    const events = {
        engagement: {
            title: 'Lễ Ăn Hỏi - Trương Minh Thắng & Lê Thị Sang',
            start: '20251227T090000',
            end: '20251227T120000',
            description: 'Lễ Ăn Hỏi\\nTức ngày 08 tháng 11 năm Ất Tỵ',
            location: 'Số nhà 19, đường số 1, thôn Hoằng Trì 2, xã Hoằng Thắng (cũ), nay là xã Hoằng Châu, Tỉnh Thanh Hoá'
        },
        wedding: {
            title: 'Lễ Đón Dâu & Tiệc Cưới - Trương Minh Thắng & Lê Thị Sang',
            start: '20251228T103000',
            end: '20251228T140000',
            description: 'Lễ Đón Dâu và Tiệc Cưới\\nTức ngày 09 tháng 11 năm Ất Tỵ',
            location: 'Thôn Ngũ Phúc, xã Tam Đa, huyện Phù Cừ, nay là xã Tống Trân, Tỉnh Hưng Yên'
        }
    };
    
    const event = events[eventType] || events.wedding;
    
    // Create ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-P1D
DESCRIPTION:Nhắc nhở: ${event.title}
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;
    
    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wedding-${eventType}-invitation.ics`;
    link.click();
    URL.revokeObjectURL(url);
}

// ============================================
// MUSIC PLAYER (Optional)
// ============================================
function initMusicPlayer() {
    // Add background music if you have an audio element
    const audio = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    
    if (!audio || !musicToggle) return;
    
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicToggle.innerHTML = '🔇';
            musicToggle.title = 'Bật nhạc';
        } else {
            audio.play();
            musicToggle.innerHTML = '🔊';
            musicToggle.title = 'Tắt nhạc';
        }
        isPlaying = !isPlaying;
    });
    
    // Auto-play on user interaction (modern browsers require this)
    document.body.addEventListener('click', function playOnce() {
        if (!isPlaying) {
            audio.play();
            musicToggle.innerHTML = '🔊';
            isPlaying = true;
        }
        document.body.removeEventListener('click', playOnce);
    }, { once: true });
}

// ============================================
// FORM VALIDATION FOR INLINE RSVP (Optional)
// ============================================
function initFormValidation() {
    const rsvpForm = document.getElementById('rsvp-form');
    if (!rsvpForm) return;
    
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value.trim();
        const attendance = document.getElementById('form-attendance').value;
        
        if (!name) {
            alert('Vui lòng nhập họ tên');
            return;
        }
        
        if (!attendance) {
            alert('Vui lòng chọn tham dự hay không');
            return;
        }
        
        // Submit form
        rsvpForm.submit();
    });
}

// ============================================
// EASTER EGG: CONFETTI ON COUPLE NAMES CLICK
// ============================================
function initEasterEgg() {
    const coupleNames = document.querySelector('.couple-names');
    if (!coupleNames) return;
    
    let clickCount = 0;
    coupleNames.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 3) {
            // Create simple confetti effect
            createConfetti();
            clickCount = 0;
        }
    });
}

function createConfetti() {
    const colors = ['#c9a86a', '#7ca57c', '#fff', '#e8f3e8'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.transition = 'all 3s ease-out';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.opacity = '0';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// ============================================
// CHECK IF USER HAS VISITED BEFORE
// ============================================
function checkFirstVisit() {
    const hasVisited = localStorage.getItem('wedding-visited');
    
    if (!hasVisited) {
        // First time visitor
        localStorage.setItem('wedding-visited', 'true');
        console.log('Welcome! First time visitor 🎉');
    } else {
        // Returning visitor
        console.log('Welcome back! 💕');
    }
}

// ============================================
// ANALYTICS: TRACK PAGE VIEWS (Optional)
// ============================================
function trackPageView() {
    // You can add Google Analytics or other tracking here
    console.log('Page viewed:', window.location.href);
    
    // Track which section is being viewed
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Viewing section:', entry.target.id);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// INITIALIZE ALL FUNCTIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c💐 Thiệp Cưới 💐', 'font-size: 24px; color: #c9a86a; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%c🌸 Minh Thắng & Lê Sang 🌸', 'font-size: 18px; color: #7ca57c;');
    console.log('%cChúc mừng hạnh phúc! 🎉', 'font-size: 16px; color: #8b8b8b;');
    
    // Core functionality
    setPersonalizedInvitation();
    updateWebsiteQRCode();
    
    // Enhancements
    initSmoothScrolling();
    initScrollAnimations();
    initLazyLoading();
    
    // Optional features
    // initCountdown();
    // initMusicPlayer();
    // initFormValidation();
    // initEasterEgg();
    
    // Tracking
    checkFirstVisit();
    // trackPageView();
    
    // Image protection (uncomment if needed)
    // protectImages();
});

// Make functions globally available
window.openEnvelope = openEnvelope;
window.copyAccountNumber = copyAccountNumber;
window.shareWebsite = shareWebsite;
window.addToCalendar = addToCalendar;

// ============================================
// GIFT SECTION TOGGLE
// ============================================
function toggleGiftInfo() {
    const bankInfo = document.getElementById('bankInfo');
    const toggleButton = event.currentTarget;
    const toggleText = toggleButton.querySelector('.toggle-text');
    
    bankInfo.classList.toggle('collapsed');
    toggleButton.classList.toggle('active');
    
    if (bankInfo.classList.contains('collapsed')) {
        toggleText.textContent = 'Xem thông tin tài khoản';
    } else {
        toggleText.textContent = 'Ẩn thông tin tài khoản';
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'S' to share
    if (e.key === 's' || e.key === 'S') {
        if (!e.target.matches('input, textarea')) {
            shareWebsite();
        }
    }
    
    // Press 'C' to add to calendar
    if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea')) {
            addToCalendar();
        }
    }
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    // You can send errors to a logging service here
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
});

// ============================================
// EXPORT FOR TESTING (Optional)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getInviteTypeText,
        setPersonalizedInvitation,
        copyAccountNumber
    };
}
