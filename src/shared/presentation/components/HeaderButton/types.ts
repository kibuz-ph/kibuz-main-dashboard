export interface Props {
    text: string,
    icon: string,
    className?: string,
    type?: "button" | "submit",
    onClick?: () => void,
    disabled?: boolean
}
