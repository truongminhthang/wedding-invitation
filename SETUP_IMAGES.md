# 📸 Hướng Dẫn Setup Images

## 📁 Cấu trúc thư mục yêu cầu:

```
wedding/
├── images/
│   ├── hero_session.jpg      ← Ảnh trang bìa (REQUIRED)
│   ├── envelope.jpg           ← Ảnh nền phong bì (nếu muốn dùng ảnh thay vì CSS)
│   ├── photo1.jpg             ← Ảnh cưới 1
│   ├── photo2.jpg             ← Ảnh cưới 2
│   ├── photo3.jpg             ← Ảnh cưới 3
│   └── ...
├── sample_images/
│   └── envelope_sample.jpg    ← Ảnh mẫu tham khảo thiết kế phong bì
```

## 🎯 Các ảnh cần chuẩn bị:

### 1. **Hero Image (Trang bìa)**
- File: `images/hero_session.jpg`
- Kích thước khuyến nghị: 1920x1080px (Full HD)
- Format: JPG hoặc PNG
- Dung lượng: < 500KB (để tối ưu tốc độ)

### 2. **Envelope Background (Phong bì) - Optional**
- File: `images/envelope.jpg`
- Kích thước: 800x600px
- Nếu không có, website sẽ dùng CSS design (airmail style)

### 3. **Wedding Photos (Gallery)**
- Files: `images/photo1.jpg`, `photo2.jpg`, etc.
- Kích thước: 800x1000px (tỷ lệ 3:4)
- Số lượng: 6-12 ảnh

### 4. **QR Banking (Optional)**
- Files: `images/qr_groom.png`, `images/qr_bride.png`
- Kích thước: 400x400px
- Hoặc để website tự generate

## 🔧 Cách sử dụng:

### Nếu đã có ảnh `hero_session.jpg`:
1. Tạo thư mục `images/` trong thư mục `wedding/`
2. Copy file `hero_session.jpg` vào `images/`
3. CSS đã được cấu hình sẵn: `url('images/hero_session.jpg')`

### Để thêm ảnh phong bì:
Nếu muốn dùng ảnh thật thay vì CSS design:

**Trong styles.css, tìm `.envelope-front` và thêm:**
```css
.envelope-front {
    background-image: url('images/envelope.jpg');
    background-size: cover;
    background-position: center;
}
```

### Để thay ảnh gallery:
**Trong index.html, tìm `.photo-grid` và sửa:**
```html
<div class="photo-item">
    <img src="images/photo1.jpg" alt="Wedding Photo 1">
</div>
```

## ✅ Checklist setup:

- [ ] Tạo thư mục `images/`
- [ ] Copy `hero_session.jpg` vào `images/`
- [ ] Thêm 6-12 ảnh cưới vào `images/`
- [ ] (Optional) Thêm ảnh QR banking
- [ ] (Optional) Thêm ảnh nền phong bì
- [ ] Test trên browser

## 🚨 Lưu ý:

1. **Đường dẫn tương đối**: Dùng `images/filename.jpg` (không có `/` ở đầu)
2. **Tên file**: Không dùng dấu, khoảng trắng. Dùng `_` hoặc `-`
3. **Format**: JPG cho ảnh, PNG cho logo/icon có nền trong suốt
4. **Tối ưu**: Nén ảnh trước khi upload để website load nhanh

## 📱 Test:

Sau khi setup xong:
1. Mở `index.html` trên browser
2. Kiểm tra ảnh hero có hiển thị không
3. Mở Developer Tools (F12) > Console để xem lỗi (nếu có)
4. Nếu ảnh không hiển thị: Kiểm tra lại tên file và đường dẫn

## 🆘 Troubleshooting:

**Ảnh không hiển thị?**
- Kiểm tra tên file có đúng không (phân biệt hoa thường)
- Kiểm tra ảnh có trong thư mục `images/` không
- Xem Console log (F12) có báo lỗi 404 không

**Ảnh bị vỡ/méo?**
- Kiểm tra kích thước ảnh
- Thử dùng `background-size: cover` hoặc `contain`

---

Tạo bởi: GitHub Copilot 🤖
