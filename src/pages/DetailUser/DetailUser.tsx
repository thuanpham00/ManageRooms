import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { userAPI } from "src/apis/user.api"
import { TypeUser } from "src/types/branches.type"

export default function DetailUser() {
  const { nameId } = useParams()

  // const navigate = useNavigate()

  const getUserDetailQuery = useQuery({
    queryKey: ["roomDetail", nameId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return userAPI.detailUser(nameId as string)
    },
    retry: 1, // số lần fetch lại khi thất bại
    placeholderData: keepPreviousData, // giữ data cũ
    staleTime: 5 * 60 * 1000 // dưới 5 phút không refetch api
  })
  const userDetailData = getUserDetailQuery.data?.data as TypeUser

  return (
    <div className="py-4 px-6 relative">
      <div className="flex items-center gap-1">
        <h1 className="text-base uppercase text-gray-600 font-semibold">Quản lý phòng</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Chi tiết phòng</span>
      </div>

      {!getUserDetailQuery.isFetching && (
        <form className="mt-2 p-4 bg-white rounded shadow-md overflow-y-scroll h-[550px]">
          <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>

          <div>
            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mã người dùng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[200px] p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={userDetailData.id}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên người dùng:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={userDetailData.fullname}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={userDetailData.phone}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={userDetailData.email}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Quốc tịch:</label>
              <input
                type="text"
                required
                className="mt-1 block w-[300px] p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={userDetailData.nationality}
                readOnly
              />
            </div>

            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Thời gian đặt phòng gần nhất:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={userDetailData.last_booking}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Số đêm đã đặt:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                  defaultValue={userDetailData.nights}
                  readOnly
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Số lần đặt phòng:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={userDetailData.books}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Vai trò:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm outline-none"
                defaultValue={userDetailData.roles}
                readOnly
              />
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
