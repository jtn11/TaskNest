import Link from "next/link"
import { ElementType } from "react"

interface NavItemsProps {
    href: string,
    Icon: ElementType,
    label: string,
    isActive: boolean
}

export const NavItem = ({ href, Icon, label, isActive }: NavItemsProps) => {

    return (
        <Link href={href}>
            <div
                className={`flex h-8 px-2 gap-4 items-center rounded cursor-pointer ${isActive ? ' hover:bg-gray-100' : " "}`}
            >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium ${isActive ? 'text-blue-500' : 'text-gray-800'}`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}