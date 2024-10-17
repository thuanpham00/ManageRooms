export const path = {
  home: "/",
  listBranch: "/branchs",
  createBranch: "/branchs/create",
  updateBranch: "/branchs/edit/:nameId",
  detailBranch: "/branchs/detail/:nameId",

  listRoom: "/rooms",
  createRoom: "/rooms/create",
  updateRoom: "/rooms/edit/:nameId",
  detailRoom: "/rooms/detail/:nameId",

  listUser: "/users",
  updateUser: "/users/edit/:nameId",
  detailUser: "/users/detail/:nameId"
} as const
