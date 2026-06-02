import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import type { NavItem, NavItemsProps } from "./types";
import MenuItem from "@/shared/presentation/components/MenuItem";

const hasActiveChild = (item: NavItem, pathname: string): boolean => {
    if (item.path && pathname.includes(item.path)) return true;

    if (item.children) {
        return item.children.some(child => hasActiveChild(child, pathname));
    }

    return false;
};

const NavItems = ({item, collapsed}: NavItemsProps) => {
    const location = useLocation();
    const contentRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);

    const isChildActive = hasActiveChild(item, location.pathname);

    // 🔥 AUTO OPEN
    useEffect(() => {
        setOpen(isChildActive);
    }, [isChildActive]);

    // 🔥 calcula altura real
    useEffect(() => {
        if (open && contentRef.current) {
            // Pequeño delay para asegurar que el contenido se renderice
            const timeoutId = setTimeout(() => {
                if (contentRef.current) {
                    setHeight(contentRef.current.scrollHeight);
                }
            }, 10);
            return () => clearTimeout(timeoutId);
        } else {
            setHeight(0);
        }
    }, [open]);

    // 👉 SI TIENE HIJOS (SUBMENÚ)
    if (item.children) {
        return (
        <nav className="flex-1 mt-4 px-2 space-y-1">
            <MenuItem
                icon={item.icon}
                label={item.text}
                collapsed={collapsed}
                onClick={() => setOpen(!open)}
                isOpen={open}
            />

            {/* 👇 CONTENEDOR ANIMADO REAL */}
            <div
                style={{
                    height: collapsed ? 0 : height,
                    opacity: collapsed ? 0 : 1,
                }}
                className="overflow-hidden transition-all duration-200 ease-out"
            >
                <div ref={contentRef} className="ml-4 relative pl-4 space-y-1 py-2">
                    {/* línea */}
                    <div className="absolute left-0 top-0 h-full border-l border-gray-300" />

                    {item.children.map((child, index) => (
                        <div key={index} className="relative">
                            {/* punto */}
                            <div className="absolute -left-[18px] top-[40%] w-[5px] h-[5px] rounded-full bg-gray-400 border border-white z-10" />

                            <NavItems item={child} collapsed={collapsed} />
                        </div>
                    ))}
                </div>
            </div>
        </nav>
        );
    }

    return (
        <nav className="flex-1 px-2 space-y-1">
            <MenuItem
                icon={item.icon}
                label={item.text}
                to={item.path}
                collapsed={collapsed}
            />
        </nav>
    );
};

export default NavItems;