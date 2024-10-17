import SidebarMenu from "src/components/SidebarMenu"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <SidebarMenu />
        </div>
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
