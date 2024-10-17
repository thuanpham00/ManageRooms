import { TypeBranch } from "src/types/branches.type"
import http from "src/utils/http"

export const branchAPI = {
  getBranchs: (signal?: AbortSignal) => {
    return http.get<TypeBranch[]>("chi-nhanh", { signal })
  },
  createBranch: (body: TypeBranch) => {
    return http.post<TypeBranch>("chi-nhanh", body)
  },
  detailBranch: (id: string) => {
    return http.get<TypeBranch>(`chi-nhanh/${id}`)
  },
  updateBranch: ({ id, body }: { id: string; body: TypeBranch }) => {
    return http.put<TypeBranch>(`chi-nhanh/${id}`, body)
  }
}
