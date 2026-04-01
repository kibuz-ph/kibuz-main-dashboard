import { useState } from "react"
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useSyncActiveComplexFromUrl } from "@/shared/application/hooks/useSyncActiveComplexFromUrl";
import { useRequireActiveComplex } from "@/shared/application/hooks/useRequireActiveComplex";

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    useSyncActiveComplexFromUrl();
    useRequireActiveComplex();

    return (
        <div className="bg-app-background min-h-screen p-4">
            <div className="flex h-[calc(100vh-2rem)] gap-4">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="flex flex-col flex-1 rounded-3xl overflow-hidden gap-4">
                    <Topbar />
                    <main className="p-10 overflow-y-auto flex-1 bg-white rounded-3xl">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
