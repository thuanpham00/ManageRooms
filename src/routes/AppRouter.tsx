import { path } from "src/constants/path"
import { lazy, Suspense } from "react"
import { useRoutes } from "react-router-dom"
import MainLayout from "src/layouts/MainLayout"
import MainLayout2 from "src/layouts/MainLayout2"
import DetailRoom from "src/pages/DetailRoom"
import UpdateRoom from "src/pages/UpdateRoom"
import ManageUser from "src/pages/ManageUser"
import UpdateUser from "src/pages/UpdateUser"
import DetailUser from "src/pages/DetailUser"

const ManageBranch = lazy(() => import("../pages/ManageBranch")) // - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
const CreateBranch = lazy(() => import("../pages/CreateBranch"))
const UpdateBranch = lazy(() => import("../pages/UpdateBranch")) // - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
const DetailBranch = lazy(() => import("../pages/DetailBranch"))

const ManageRoom = lazy(() => import("../pages/ManageRoom")) // - dùng kĩ thuật Lazy load - lướt tới đâu load tới đó
const CreateRoom = lazy(() => import("../pages/CreateRoom"))
export default function AppRouter() {
  const useRouterApp = useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <MainLayout2 />,
          children: [
            {
              path: path.home,
              index: true,
              element: (
                <Suspense>
                  <ManageBranch />
                </Suspense>
              )
            },
            {
              path: path.createBranch,
              index: true,
              element: (
                <Suspense>
                  <CreateBranch />
                </Suspense>
              )
            },
            {
              path: path.listBranch,
              element: (
                <Suspense>
                  <ManageBranch />
                </Suspense>
              )
            },
            {
              path: path.updateBranch,
              element: (
                <Suspense>
                  <UpdateBranch />
                </Suspense>
              )
            },
            {
              path: path.detailBranch,
              element: (
                <Suspense>
                  <DetailBranch />
                </Suspense>
              )
            },
            {
              path: path.listRoom,
              element: (
                <Suspense>
                  <ManageRoom />
                </Suspense>
              )
            },
            {
              path: path.createRoom,
              element: (
                <Suspense>
                  <CreateRoom />
                </Suspense>
              )
            },
            {
              path: path.updateRoom,
              element: (
                <Suspense>
                  <UpdateRoom />
                </Suspense>
              )
            },
            {
              path: path.detailRoom,
              element: (
                <Suspense>
                  <DetailRoom />
                </Suspense>
              )
            },

            {
              path: path.listUser,
              element: (
                <Suspense>
                  <ManageUser />
                </Suspense>
              )
            },
            {
              path: path.updateUser,
              element: (
                <Suspense>
                  <UpdateUser />
                </Suspense>
              )
            },
            {
              path: path.detailUser,
              element: (
                <Suspense>
                  <DetailUser />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return useRouterApp
}
