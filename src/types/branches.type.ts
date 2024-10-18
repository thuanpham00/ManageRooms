export type TypeBranch = {
  id?: string
  name: string
  trademark: string
  description: string[]
  url: string
  province: string
  ward: string
  best_comforts: string[]
  location: string
  images: string[]
}

export type TypeRoom = {
  id?: string // ID của phòng
  branch_id: string // ID của chi nhánh mà phòng thuộc về
  price_per_night: number // Giá mỗi đêm
  price_per_month: number // Giá mỗi tháng
  name: string // Tên phòng
  description: string[] // Mô tả phòng (mảng các chuỗi)
  comforts: string[] // Danh sách các tiện nghi (mảng các chuỗi)
  bed_type: string // Loại giường
  booking_turn: number // Số lần đặt phòng
  stock: number // Số lượng phòng còn lại
  acreage: number // Diện tích phòng (m2)
  available_from: string // Thời gian có sẵn (ISO 8601)
  available_to: string // Thời gian không còn sẵn (ISO 8601)
  max_adults: number // Số người lớn tối đa
  max_children: number // Số trẻ em tối đa
  max_babies: number // Số trẻ sơ sinh tối đa
  images: string[] // Danh sách đường dẫn hình ảnh (mảng các chuỗi)
}

export type TypeUser = {
  id?: string
  email: string
  phone: string
  fullname: string
  nationality: string
  last_booking: string
  nights: number
  books: number
  create_at: string
  update_at: string
  roles: string[]
}

export type TypeBooking = {
  id?: string
  adults: number
  children: number
  babies: number
  checkin: string
  checkout: string
  fullname_order: string
  email_order: string
  phone_order: string
  fullname_customer: string
  email_customer: string
  phone_customer: string
  type: string
  range: string
  room_id: string
  note: string
}

export enum BookingStatus {
  paid,
  pending,
  done,
  cancelled
}

export enum BookingRange {
  nights,
  months
}
