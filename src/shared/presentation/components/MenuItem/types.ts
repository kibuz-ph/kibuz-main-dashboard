export interface Props {
    icon: string
    label: string
    collapsed: boolean
    active?: boolean
    to?: string,
    onClick?: () => void;
    isOpen?: boolean; // 👈 opcional (para flechita)
}