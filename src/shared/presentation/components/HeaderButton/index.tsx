import { Button } from "@/components/ui/button";
import type { Props } from "./types";


export default function HeaderButton({ text, icon, className }: Props) {
    return (
        <Button type="submit" className={`rounded-md cursor-pointer bg-brand-primary text-white border border-transparent hover:bg-white hover:text-brand-primary hover:border-brand-primary ${className}`}>
            <i className={icon}></i>
            {text}
        </Button>
    )
}