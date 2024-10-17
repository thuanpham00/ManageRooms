import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { branchAPI } from "src/apis/branch.api"
import Pagination from "src/components/Pagination"
import { path } from "src/constants/path"
import { TypeBranch } from "src/types/branches.type"

export default function ManageBranch() {
  const [currentPage, setCurrentPage] = useState(1)

  const getBranchListQuery = useQuery({
    queryKey: ["branchList", currentPage],
    queryFn: () => {
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort()
      }, 10000)
      return branchAPI.getBranchs(controller.signal)
    },
    retry: 1, // số lần fetch lại khi thất bại
    placeholderData: keepPreviousData, // giữ data cũ
    staleTime: 5 * 60 * 1000 // dưới 5 phút không refetch api
  })

  const listBranch = (getBranchListQuery.data?.data as TypeBranch[]) || []

  const totalItem = 5
  const startIndex = (currentPage - 1) * totalItem
  const endIndex = startIndex + totalItem
  const currentList = listBranch.slice(startIndex, endIndex)

  const handleChangePage = (numberPage: number) => {
    setCurrentPage(numberPage)
  }

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(path.createBranch, {
      state: currentPage
    })
  }

  const handleDetailBranch = (id: string) => {
    navigate(`${path.listBranch}/detail/${id}`)
  }

  const handleUpdateBranch = (id: string) => {
    navigate(`${path.listBranch}/edit/${id}`)
  }

  return (
    <div className="py-4 px-6 relative">
      <div className="flex items-center gap-1">
        <h1 className="text-base uppercase text-gray-600 font-semibold">Quản lý chi nhánh</h1>
        <span className="text-sm text-[#6c757d]"> / </span>
        <span className="text-sm text-[#3a86ff]">Danh sách chi nhánh</span>
      </div>

      <div className="mt-4 p-4 bg-white">
        <div className="flex items-center justify-between">
          <form>
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Nhập tên chi nhánh hoặc mã chi nhánh"
                className="w-[300px] outline-none p-2 border-2 border-[#1982c4] border-r-0 rounded-tl-full rounded-bl-full text-sm"
              />
              <button className="bg-[#1982c4] rounded-tr-full rounded-br-full py-2 px-3 border-2 border-[#1982c4]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <button
            onClick={handleNavigate}
            className="text-sm flex items-center gap-2 border border-gray-400 py-2 px-3 rounded-full bg-[#4361ee] text-white hover:opacity-75 duration-200"
          >
            Thêm chi nhánh
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        <table className="mt-4 w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-[#e9ecef]">
              <th className="py-2 px-4 border-b text-sm">Mã chi nhánh</th>
              <th className="py-2 px-4 border-b text-sm">Tên chi nhánh</th>
              <th className="py-2 px-4 border-b text-sm">Thương hiệu</th>
              <th className="py-2 px-4 border-b text-sm">Tỉnh/thành phố</th>
              <th className="py-2 px-4 border-b text-sm">Phường/quận</th>
              <th className="py-2 px-4 border-b text-sm">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {!getBranchListQuery.isFetching &&
              currentList.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4 text-center text-sm">{item.id}</td>
                  <td className="py-2 px-4 text-center text-sm">{item.name}</td>
                  <td className="py-2 px-4 text-center text-sm">{item.trademark}</td>
                  <td className="py-2 px-4 text-center text-sm">{item.province}</td>
                  <td className="py-2 px-4 text-center text-sm">{item.ward}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex items-center justify-center gap-2 ">
                      <button onClick={() => handleUpdateBranch(item.id as string)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="green"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                      <button onClick={() => handleDetailBranch(item.id as string)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </button>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="red"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="my-4 flex justify-center">
          <Pagination
            totalOfPage={totalItem}
            totalAllPage={listBranch.length}
            currentPage={currentPage}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </div>
  )
}
