# 📚 Tài Liệu API - Product Store

## Base URL
```
http://localhost:5000/api/products
```

---

## 📋 Danh Sách Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products` | Lấy tất cả sản phẩm |
| POST | `/api/products` | Tạo sản phẩm mới |
| GET | `/api/products/:id` | Lấy một sản phẩm theo ID |
| PUT | `/api/products/:id` | Cập nhật sản phẩm theo ID |
| DELETE | `/api/products/:id` | Xóa sản phẩm theo ID |

---

## 1️⃣ Lấy Tất Cả Sản Phẩm

### Request
```http
GET /api/products
```

### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Lấy danh sách sản phẩm thành công",
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro Max",
      "price": 29990000,
      "image": "https://example.com/iphone15.jpg",
      "created_at": "2024-12-04T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Samsung Galaxy S24",
      "price": 22000000,
      "image": "https://example.com/samsung-s24.jpg",
      "created_at": "2024-12-04T10:35:00.000Z"
    }
  ],
  "count": 2
}
```

### Response Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Lỗi server khi lấy danh sách sản phẩm",
  "error": "Chi tiết lỗi"
}
```

---

## 2️⃣ Tạo Sản Phẩm Mới

### Request
```http
POST /api/products
Content-Type: application/json
```

### Request Body
```json
{
  "name": "iPhone 15 Pro Max",
  "price": 29990000,
  "image": "https://example.com/iphone15.jpg"
}
```

### Validation Rules
- `name`: **Bắt buộc** - Tên sản phẩm (string)
- `price`: **Bắt buộc** - Giá sản phẩm (number, phải > 0)
- `image`: **Bắt buộc** - URL hình ảnh (string)

### Response Success (201 Created)
```json
{
  "success": true,
  "message": "Tạo sản phẩm mới thành công",
  "data": {
    "id": 3,
    "name": "iPhone 15 Pro Max",
    "price": 29990000,
    "image": "https://example.com/iphone15.jpg",
    "created_at": "2024-12-04T10:40:00.000Z"
  }
}
```

### Response Error (400 Bad Request) - Thiếu Trường
```json
{
  "success": false,
  "message": "Vui lòng cung cấp đầy đủ thông tin: name, price, image"
}
```

### Response Error (400 Bad Request) - Giá Không Hợp Lệ
```json
{
  "success": false,
  "message": "Giá sản phẩm phải là số dương"
}
```

### Response Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Lỗi server khi tạo sản phẩm",
  "error": "Chi tiết lỗi"
}
```

---

## 3️⃣ Lấy Một Sản Phẩm Theo ID

### Request
```http
GET /api/products/:id
```

### URL Parameters
- `id`: ID của sản phẩm (integer)

### Example
```http
GET /api/products/1
```

### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Lấy thông tin sản phẩm thành công",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "price": 29990000,
    "image": "https://example.com/iphone15.jpg",
    "created_at": "2024-12-04T10:30:00.000Z"
  }
}
```

### Response Error (400 Bad Request) - ID Không Hợp Lệ
```json
{
  "success": false,
  "message": "ID sản phẩm không hợp lệ"
}
```

### Response Error (404 Not Found)
```json
{
  "success": false,
  "message": "Không tìm thấy sản phẩm"
}
```

### Response Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Lỗi server khi lấy thông tin sản phẩm",
  "error": "Chi tiết lỗi"
}
```

---

## 4️⃣ Cập Nhật Sản Phẩm

### Request
```http
PUT /api/products/:id
Content-Type: application/json
```

### URL Parameters
- `id`: ID của sản phẩm (integer)

### Request Body (Tất cả các trường đều optional, nhưng phải có ít nhất 1 trường)

#### Cập nhật tất cả các trường:
```json
{
  "name": "iPhone 15 Pro Max - Updated",
  "price": 28990000,
  "image": "https://example.com/iphone15-new.jpg"
}
```

#### Cập nhật chỉ tên:
```json
{
  "name": "Samsung Galaxy S24 Ultra"
}
```

#### Cập nhật chỉ giá:
```json
{
  "price": 21000000
}
```

#### Cập nhật chỉ hình ảnh:
```json
{
  "image": "https://example.com/new-image.jpg"
}
```

### Validation Rules
- Phải có **ít nhất 1 trường** để cập nhật
- `price` (nếu có): Phải là số dương

### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro Max - Updated",
    "price": 28990000,
    "image": "https://example.com/iphone15-new.jpg",
    "created_at": "2024-12-04T10:30:00.000Z"
  }
}
```

### Response Error (400 Bad Request) - ID Không Hợp Lệ
```json
{
  "success": false,
  "message": "ID sản phẩm không hợp lệ"
}
```

### Response Error (400 Bad Request) - Không Có Trường Nào
```json
{
  "success": false,
  "message": "Vui lòng cung cấp ít nhất một trường để cập nhật"
}
```

### Response Error (400 Bad Request) - Giá Không Hợp Lệ
```json
{
  "success": false,
  "message": "Giá sản phẩm phải là số dương"
}
```

### Response Error (404 Not Found)
```json
{
  "success": false,
  "message": "Không tìm thấy sản phẩm để cập nhật"
}
```

### Response Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Lỗi server khi cập nhật sản phẩm",
  "error": "Chi tiết lỗi"
}
```

---

## 5️⃣ Xóa Sản Phẩm

### Request
```http
DELETE /api/products/:id
```

### URL Parameters
- `id`: ID của sản phẩm (integer)

### Example
```http
DELETE /api/products/1
```

### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Xóa sản phẩm thành công",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "price": 29990000,
    "image": "https://example.com/iphone15.jpg",
    "created_at": "2024-12-04T10:30:00.000Z"
  }
}
```

### Response Error (400 Bad Request) - ID Không Hợp Lệ
```json
{
  "success": false,
  "message": "ID sản phẩm không hợp lệ"
}
```

### Response Error (404 Not Found)
```json
{
  "success": false,
  "message": "Không tìm thấy sản phẩm để xóa"
}
```

### Response Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Lỗi server khi xóa sản phẩm",
  "error": "Chi tiết lỗi"
}
```

---

## 🧪 Test Cases cho Postman

### 1. Tạo Sản Phẩm Mới (POST)

#### ✅ Test Case Thành Công:
```json
{
  "name": "iPhone 15 Pro Max",
  "price": 29990000,
  "image": "https://example.com/iphone15.jpg"
}
```

```json
{
  "name": "Samsung Galaxy S24",
  "price": 22000000,
  "image": "https://example.com/samsung-s24.jpg"
}
```

```json
{
  "name": "MacBook Pro M3",
  "price": 52000000,
  "image": "https://example.com/macbook-pro.jpg"
}
```

#### ❌ Test Case Lỗi - Thiếu Trường:
```json
{
  "name": "iPad Pro",
  "price": 25000000
}
```

#### ❌ Test Case Lỗi - Giá Âm:
```json
{
  "name": "AirPods Pro",
  "price": -5000000,
  "image": "https://example.com/airpods.jpg"
}
```

#### ❌ Test Case Lỗi - Giá Không Phải Số:
```json
{
  "name": "Apple Watch",
  "price": "không phải số",
  "image": "https://example.com/watch.jpg"
}
```

### 2. Cập Nhật Sản Phẩm (PUT)

#### ✅ Cập Nhật Tất Cả Trường:
```json
{
  "name": "iPhone 15 Pro Max - Updated",
  "price": 28990000,
  "image": "https://example.com/iphone15-new.jpg"
}
```

#### ✅ Cập Nhật Một Trường:
```json
{
  "name": "Samsung Galaxy S24 Ultra"
}
```

```json
{
  "price": 21000000
}
```

```json
{
  "image": "https://example.com/new-image.jpg"
}
```

#### ❌ Test Case Lỗi - Body Rỗng:
```json
{}
```

---

## 📝 Lưu Ý

1. **Content-Type**: Luôn sử dụng `Content-Type: application/json` cho các request POST và PUT
2. **ID**: ID sản phẩm phải là số nguyên dương
3. **Price**: Giá sản phẩm phải là số dương (> 0)
4. **Response Format**: Tất cả response đều có format:
   ```json
   {
     "success": true/false,
     "message": "Thông báo",
     "data": {} // chỉ có khi success = true
   }
   ```

---

## 🔄 Workflow Đề Xuất Khi Test

1. **POST** `/api/products` - Tạo một số sản phẩm mẫu
2. **GET** `/api/products` - Lấy danh sách để xem ID
3. **GET** `/api/products/:id` - Lấy chi tiết một sản phẩm
4. **PUT** `/api/products/:id` - Cập nhật sản phẩm
5. **DELETE** `/api/products/:id` - Xóa sản phẩm

---

## 🛠️ Công Nghệ Sử Dụng

- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **ORM/Query**: node-postgres (pg)

---

## 📞 Liên Hệ

Nếu có vấn đề hoặc câu hỏi, vui lòng liên hệ team phát triển.

