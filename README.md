# 🎂 Happy Birthday Cinematic Experience

Một món quà sinh nhật công nghệ đầy bất ngờ và thú vị! Ứng dụng web 3D tương tác với hiệu ứng ánh sáng Neon, pháo hoa rực rỡ và thư viện ảnh phong cách TikTok.

🔗 **Demo:** [https://PhongSEVN.github.io/Happy-Birthday/](https://PhongSEVN.github.io/Happy-Birthday/)



## ⚙️ Hướng Dẫn Tuỳ Chỉnh (Customization)

Bạn có thể thay đổi nội dung để dành tặng cho người bạn muốn:

### 1. Thay đổi Tên & Lời Chúc
Mở file `src/utils/constants.js`:
```javascript
export const BIRTHDAY_USER = {
  NAME: "Tên Người Nhận", // Thay tên ở đây
};

export const GREETING = {
  TITLE_PREFIX: "Happy Birthday",
  TITLE_SUFFIX: "To You",
  SUBTITLE: "Chúc bạn tuổi mới rực rỡ! ✨",
};
```

### 2. Thay đổi Ảnh Kỷ Niệm
Mở file `src/components/Gallery.js` và thay thế các đường link ảnh trong mảng `IMAGES`:
```javascript
const IMAGES = [
  'link_anh_1.jpg',
  'link_anh_2.jpg',
  // ... thêm bao nhiêu ảnh tuỳ thích
];
```
*Mẹo: Nên dùng ảnh khổ dọc (Portrait) để hiển thị đẹp nhất trên điện thoại.*

### 3. Thay đổi Nhạc
Thay thế file `happy_birthday.mp3` trong thư mục `public/` bằng bài hát bạn thích (giữ nguyên tên file hoặc sửa code trong `MusicPlayer.js`).

## 🚀 Cài Đặt & Chạy Thử

1.  **Cài đặt thư viện**:
    ```bash
    npm install
    ```
2.  **Chạy thử (Local)**:
    ```bash
    npm start
    ```
    Truy cập `http://localhost:3000`.

## 🌐 Deploy lên GitHub Pages

Để chia sẻ cho mọi người cùng xem:

1.  Chạy lệnh deploy:
    ```bash
    npm run deploy
    ```
2.  Gửi link cho bạn bè! 🎉

---
*Made with ❤️ & GSAP*