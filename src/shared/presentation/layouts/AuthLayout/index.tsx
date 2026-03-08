import { Outlet } from "react-router-dom";
import './AuthLayout.scss';

const AuthLayout = () => {
    return (
        <div className="auth-layout-container flex justify-content-between align-items-center min-h-screen bg-white border">
            <div className="content-left w-3/6 bg-cover bg-center">
            </div>
            <div className="w-3/6 p-20 flex flex-col justify-center items-center">
                <div className="w-9/12 max-w-md mb-6">
                    <div className="w-24 text-left">
                        Logo
                    </div>
                </div>
                <div className="w-9/12 max-w-md flex">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;