


import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";


interface Props {
  to: string,
  icon: IconType,
  label: string,
};

export function SidebarNavItem({ to, icon: Icon, label }: Props) {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                `flex items-center gap-2 px-4! py-2! rounded-md 
                hover:bg-(--chakra-colors-bg-inverted)/5
                ${
                    isActive
                    ? "bg-(--chakra-colors-bg-inverted)/5 text-(--chakra-colors-fg)!"
                    : "text-(--chakra-colors-fg-muted)!"
                }`
                }
            >
                <Icon size={19} />
                <span className="text-sm!">{label}</span>
            </NavLink>
        </li>
    );
}