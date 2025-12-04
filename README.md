# Wedding Invitation Website 💒

Website thiệp cưới điện tử được thiết kế đẹp mắt với phong cách floral vintage, hỗ trợ cá nhân hóa thiệp mời qua URL parameters.

## ✨ Tính năng

- 🎨 **Thiết kế đẹp**: Phong cách floral vintage với màu sắc trang nhã
- 📱 **Responsive**: Hiển thị tốt trên mọi thiết bị (desktop, tablet, mobile)
- 🎭 **Cá nhân hóa**: Tùy chỉnh lời mời cho từng khách mời qua URL
- 💌 **Phong bì ảo**: Hiệu ứng mở phong bì độc đáo
- 📍 **Tích hợp bản đồ**: Google Maps embed cho địa điểm sự kiện
- 💳 **Thông tin banking**: QR code cho mừng cưới
- 📅 **Timeline**: Câu chuyện tình yêu với timeline đẹp mắt
- 🖼️ **Gallery**: Hiển thị ảnh cưới với hiệu ứng hover
- 🚌 **Lịch xe**: Bảng thông tin xe đưa đón khách
- 📝 **RSVP**: Liên kết đến form xác nhận tham dự

## 🚀 Cách sử dụng

### Cài đặt

1. Clone repository này:
```bash
git clone https://github.com/yourusername/wedding-invitation.git
cd wedding-invitation
```

2. Mở file `index.html` trên trình duyệt hoặc deploy lên hosting.

### Cá nhân hóa thiệp mời

Sử dụng URL parameters để tạo thiệp mời cá nhân:

```
https://your-domain.com/?guest=Nguyen%20Van%20A&custom_pronoun=anh&type=chong
```

**Các tham số:**
- `guest`: Tên khách mời (URL encoded)
- `custom_pronoun`: Xưng hô (anh, chi, co, di, chu, bac, thim, mo, cau, em)
- `type`: Người gửi (bo_chong, me_chong, chong, vo, bo_vo, me_vo)

**Ví dụ:**
```
/?guest=Nguyen%20Thi%20B&custom_pronoun=chi&type=vo
/?guest=Le%20Van%20C&custom_pronoun=anh&type=bo_chong
```

## 📁 Cấu trúc thư mục

```
wedding/
├── index.html          # File HTML chính
├── styles.css          # CSS styling
├── script.js           # JavaScript logic
├── images/             # Thư mục chứa ảnh
│   ├── hero_session.jpg
│   └── envelope.png
├── sample_images/      # Ảnh mẫu tham khảo
└── README.md
```

## 🎨 Tùy chỉnh

### Màu sắc

Chỉnh sửa CSS variables trong `styles.css`:

```css
:root {
    --primary-color: #c9a86a;    /* Màu vàng gold */
    --accent-green: #7ca57c;     /* Màu xanh lá */
    --secondary-color: #e8f3e8;  /* Màu nền nhạt */
}
```

### Thông tin cá nhân

Cập nhật nội dung trong `index.html`:
- Tên cô dâu, chú rể
- Ngày giờ tổ chức
- Địa điểm
- Thông tin banking
- Timeline câu chuyện tình yêu

### Hình ảnh

Thay thế ảnh trong thư mục `images/`:
- `hero_session.jpg`: Ảnh background trang chủ (1920x1080px)
- `envelope.png`: Ảnh thiết kế phong bì
- Thêm ảnh vào gallery (khuyến nghị 800x1000px, tỷ lệ 4:5)

## 🌐 Deploy

Website có thể deploy lên:
- **GitHub Pages**: Free, dễ sử dụng
- **Netlify**: Hỗ trợ custom domain
- **Vercel**: Deploy tự động từ Git
- **Firebase Hosting**: Nhanh và ổn định

### Deploy lên GitHub Pages

1. Push code lên GitHub repository
2. Vào Settings → Pages
3. Chọn branch `main` và thư mục `/root`
4. Lưu lại, website sẽ có tại: `https://username.github.io/repository-name`

## 📱 Tương thích

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo pull request hoặc mở issue nếu bạn có ý tưởng cải thiện.

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 💝 Credits

Thiết kế và phát triển bởi GitHub Copilot
Fonts: Google Fonts (Cormorant Garamond, Crimson Text, Lora)

---

Made with ❤️ for your special day
