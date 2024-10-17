import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { roomAPI } from "src/apis/room.api"
import { TypeRoom } from "src/types/branches.type"

export default function DetailRoom() {
  const { nameId } = useParams()

  // const navigate = useNavigate()

  const getRoomDetailQuery = useQuery({
    queryKey: ["roomDetail", nameId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return roomAPI.detailRoom(nameId as string)
    },
    retry: 1, // số lần fetch lại khi thất bại
    placeholderData: keepPreviousData, // giữ data cũ
    staleTime: 5 * 60 * 1000 // dưới 5 phút không refetch api
  })
  const roomDetailData = getRoomDetailQuery.data?.data as TypeRoom

  return (
    <div className="py-4 px-6 relative">
      <div className="flex items-center gap-1">
        <h1 className="text-base uppercase text-gray-600 font-semibold">Quản lý phòng</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Chi tiết phòng</span>
      </div>

      {!getRoomDetailQuery.isFetching && (
        <form className="mt-2 p-4 bg-white rounded shadow-md overflow-y-scroll h-[550px]">
          <h2 className="text-xl font-bold mb-4">Thông tin chi tiết phòng</h2>

          <div>
            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mã phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[200px] p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.id}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mã chi nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[200px] p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.branch_id}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.name}
                  readOnly
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Giá mỗi đêm:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[200px] p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.price_per_night}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Giá mỗi tháng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[200px] p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.price_per_month}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mô tả:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={roomDetailData.description}
                readOnly
              />
            </div>

            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Loại giường:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.bed_type}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Danh sách tiện nghi:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.comforts}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Diện tích phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.acreage}
                  readOnly
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Số lần đặt phòng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[300px] p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.booking_turn}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Số lượng phòng còn lại:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[300px] p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.stock}
                  readOnly
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Thời gian có sẵn:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.available_from}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Thời gian không có sẵn:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.available_to}
                  readOnly
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Số người lớn tối đa:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.max_adults}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Số trẻ em tối đa:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.max_children}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Số trẻ sơ sinh tối đa:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={roomDetailData.max_babies}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Hình Ảnh:</label>
              <div className="flex items-center gap-2">
                {roomDetailData.images.map((img) => (
                  <div key={img}>
                    <img src={img} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
