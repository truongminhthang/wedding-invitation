Tạo giúp tôi một website mời cưới với phong cách {phong cách}, tông màu {màu chủ đạo}, hiển thị tốt trên mobile, với các yêu cầu sau:

🌸 1. Hiệu ứng mở phong bì

Khi truy cập website, hiển thị một bì thư url('images/envelop)

mặt trước với thông tin:

From: (tự động dựa theo tham số type) (căn trái)

Trân trọng kính mời: 
{customPronoun} {guestName} (căn phải)

Quy tắc hiển thị: type, CustomPronoun, guestName thì quy tắc map được trình bày dưới phần javascript

Có thể tham khảo cách trình bày ở url('sample_images/envolop)


Có icon + animation hướng dẫn người dùng click vào phong bì.

Khi nhấn vào phong bì:

Phong bì sẽ ẩn đi bằng hiệu ứng fade-out.

Nội dung trang xuất hiện bằng fade-in + slide-up 

🌸 2. Cá nhân hoá lời mời qua tham số URL

Website cần đọc 3 tham số URL:

✔ guest → tên khách mời

Ví dụ: guest=Nguyen%20Van%20A
Nếu thiếu → "Quý khách"

✔ custom_pronoun → xưng hô, chuẩn hoá KHÔNG DẤU

URL chỉ truyền dạng không dấu: anh, chi, co, chu, bac, di, mo, cau, em, quykhach

JavaScript phải chuyển sang dạng có dấu theo bảng chuẩn hóa.

✔ type → xác định From + inviteTypeText

Quy tắc:

type	inviteTypeText
bo_chong, me_chong, bo_vo, me_vo	"hai con chúng tôi"
chong, vo	"chúng tôi"
default	"chúng tôi"
🌸 3. Template HTML cho lời mời
<h3>Trân trọng kính mời:</h3>
<h2><span id="customPronoun"></span> <span id="guestName"></span></h2>
<p>Tới dự đám cưới của <span id="inviteType"></span></p>

🌸 4. JavaScript phải được tạo sẵn và hoạt động như sau
✔ Chuẩn hoá custom_pronoun

(Chỉ truyền không dấu → JS chuyển sang có dấu)

✔ Tạo bảng mapping cho pronoun + mapping cho from
JS MẪU HOÀN CHỈNH (BẮT BUỘC PHẢI TẠO)
const url = new URL(window.location.href);

// Lấy tham số
const guest       = decodeURIComponent(url.searchParams.get("guest") || "Quý khách");
const pronounRaw  = (url.searchParams.get("custom_pronoun") || "").toLowerCase();
const type        = url.searchParams.get("type") || "chong";

// Mapping chuẩn hóa xưng hô
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
    quykhach: "Quý khách"
};

// Mapping phần FROM trên bì thư
const fromMap = {
    bo_chong: "Ông Trương Xuân Hanh",
    me_chong: "Bà Nguyễn Thị Bích Mai",
    chong: "Trương Minh Thắng",
    vo: "Lê Thị Sang",
    bo_vo: "Ông Lê Văn Luận",
    me_vo: "Bà Hoàng Thị Loan"
};

// Xử lý xưng hô custom_pronoun
const pronoun = pronounMap[pronounRaw] || "";

// Xử lý loại lời mời
let inviteTypeText = "chúng tôi";
if (["bo_chong", "me_chong", "bo_vo", "me_vo"].includes(type)) {
    inviteTypeText = "hai con chúng tôi";
}

// Xử lý FROM
const senderName = fromMap[type] || "Gia đình chúng tôi";

// Gán vào HTML
document.getElementById("guestName").innerText = guest;
document.getElementById("customPronoun").innerText = pronoun;
document.getElementById("inviteType").innerText = inviteTypeText;
document.getElementById("fromSender").innerText = senderName;

🌸 5. Các phần còn lại của website

Trang bìa (sử dụng trực tiếp từ ảnh url('images/hero_session.jpg))

Lời mở đầu

Câu chuyện tình yêu

Ảnh cưới

Timeline sự kiện (ăn hỏi – đón dâu – tiệc cưới)

Lịch xe buýt từ Hà Nội

Bản đồ Google Maps

Lời mời

Thông tin mừng cưới

RSVP

Google Form / Excel Online

Lời cảm ơn + QR

🌸 6. Thiết kế & kỹ thuật

Phong cách {hiện đại / tối giản / sang trọng / pastel / rustic}

Animation nhẹ

Tối ưu mobile

Form quản lý khách đổ về Google Sheets

QR code dẫn tới website