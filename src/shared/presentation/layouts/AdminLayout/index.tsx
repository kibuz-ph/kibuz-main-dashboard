import { useState } from "react"
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="bg-gray-200 min-h-screen p-4">
            <div className="flex h-[calc(100vh-2rem)] gap-4">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="flex flex-col flex-1 bg-gray-100 rounded-3xl overflow-hidden">

                    {/* <Topbar /> */}

                    <main className="p-6 overflow-y-auto flex-1">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;