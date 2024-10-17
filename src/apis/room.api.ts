import { TypeRoom } from "src/types/branches.type"
import http from "src/utils/http"

export const roomAPI = {
  getRooms: (signal?: AbortSignal) => {
    return http.get<TypeRoom[]>("phong", { signal })
  },
  createRoom: (body: TypeRoom) => {
    return http.post<TypeRoom>("phong", body)
  },
  detailRoom: (id: string) => {
    return http.get<TypeRoom>(`phong/${id}`)
  },
  updateRoom: ({ id, body }: { id: string; body: TypeRoom }) => {
    return http.put<TypeRoom>(`phong/${id}`, body)
  }
}
