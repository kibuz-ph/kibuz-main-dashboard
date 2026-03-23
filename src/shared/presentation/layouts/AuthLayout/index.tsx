import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex items-center justify-center">
                            <img
                                src="/src/assets/logo-svg-original.svg"
                                alt="Image"
                                className="w-30 object-contain dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/src/assets/light-room-login.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
};

export default AuthLayout;