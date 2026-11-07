import { Button } from "@/components/ui/button";
import type { Props } from "./types";


export default function HeaderButton({ text, icon, className, type = "submit", onClick, disabled }: Props) {
    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-md cursor-pointer bg-brand-primary text-white border border-transparent hover:bg-white hover:text-brand-primary hover:border-brand-primary ${className}`}
        >
            <i className={icon}></i>
            {text}
        </Button>
    )
}