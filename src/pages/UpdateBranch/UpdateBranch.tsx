import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { branchAPI } from "src/apis/branch.api"
import { path } from "src/constants/path"
import { TypeBranch } from "src/types/branches.type"
import { FormData } from "../CreateBranch/CreateBranch"
import { toast } from "react-toastify"

export default function UpdateBranch() {
  const { nameId } = useParams()

  const navigate = useNavigate()

  // const handleNavigate = () => {
  //   navigate(path.createBranch)
  // }

  const getBranchDetailQuery = useQuery({
    queryKey: ["branchDetail", nameId],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return branchAPI.detailBranch(nameId as string)
    },
    retry: 1, // số lần fetch lại khi thất bại
    placeholderData: keepPreviousData, // giữ data cũ
    staleTime: 5 * 60 * 1000 // dưới 5 phút không refetch api
  })
  const branchDetailData = getBranchDetailQuery.data?.data as TypeBranch

  const updateBranchMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: TypeBranch }) => {
      return branchAPI.updateBranch({ id, body }) // Gọi hàm updateBranch với đối tượng chứa id và body
    }
  })

  const { handleSubmit, register } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    const body = {
      name: data.name,
      trademark: data.trademark,
      description: data.description,
      url: data.url,
      province: data.province,
      ward: data.ward,
      location: data.location,
      best_comforts: data.best_comforts,
      images: branchDetailData.images // Giả sử bạn không muốn thay đổi hình ảnh
    }

    updateBranchMutation.mutate(
      { id: nameId as string, body },
      {
        onSuccess: () => {
          toast.success("Cập nhật chi nhánh thành công")
          navigate(path.listBranch)
          window.location.reload() // Cập nhật lại trang
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  })

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="py-4 px-6 relative">
      <div className="flex items-center gap-1">
        <button onClick={handleBack} className="text-sm flex items-center hover:text-gray-400 duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Trở lại
        </button>
        <h1 className="ml-1 text-base uppercase text-gray-600 font-semibold">Quản lý chi nhánh</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Cập nhật thông tin chi nhánh</span>
      </div>

      {!getBranchDetailQuery.isFetching && (
        <form onSubmit={onSubmit} className="mt-2 p-4 bg-white rounded shadow-md overflow-y-scroll h-[550px]">
          <h2 className="text-xl font-bold mb-4">Cập nhật thông tin</h2>

          <div>
            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mã chi nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-[200px] p-2 border border-gray-300 rounded text-sm"
                  {...register("id")}
                  defaultValue={branchDetailData.id}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên Chi Nhánh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={branchDetailData.name}
                  {...register("name")}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Thương Hiệu:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={branchDetailData.trademark}
                {...register("trademark")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mô tả:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={branchDetailData.description}
                {...register("description")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">URL:</label>
              <input
                type="text"
                required
                className="mt-1 block w-[300px] p-2 border border-gray-300 rounded text-sm"
                defaultValue={branchDetailData.url}
                {...register("url")}
              />
            </div>

            <div className="flex items-center gap-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tỉnh:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={branchDetailData.province}
                  {...register("province")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phường:</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                  defaultValue={branchDetailData.ward}
                  {...register("ward")}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Địa Chỉ:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={branchDetailData.location}
                {...register("location")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tiện Nghi:</label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded text-sm"
                defaultValue={branchDetailData.best_comforts}
                {...register("best_comforts")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Hình Ảnh:</label>
              <div className="flex items-center gap-2">
                {branchDetailData.images.map((img) => (
                  <div key={img}>
                    <img src={img} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                // onClick={handleClear}
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 duration-200 text-sm"
              >
                Xóa
              </button>
              <button
                type="submit"
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 duration-200 text-sm"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
