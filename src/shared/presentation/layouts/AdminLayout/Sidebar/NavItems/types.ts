export interface NavItem {
    icon: string
    text: string
    path?: string;
    children?: NavItem[];
}

export interface NavItemsProps {
    item: NavItem
    collapsed: boolean
}