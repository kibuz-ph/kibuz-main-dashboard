interface NavItem {
    icon: string
    text: string
    path: string
}

export interface NavItemsProps {
    item: NavItem
    collapsed: boolean
}