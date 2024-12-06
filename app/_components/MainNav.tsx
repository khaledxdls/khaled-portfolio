"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  mobile?: boolean;
  setIsOpen?: (value: boolean) => void;
}

function MainNav({ mobile, setIsOpen }: MainNavProps) {
  const pathname = usePathname();

  return (
    <ul
      className={`${
        mobile ? "flex flex-col items-center gap-8 text-2xl" : "flex gap-8"
      }`}
    >
      {[
        { href: "/", label: "Story" },
        { href: "/education", label: "Education" },
        { href: "/workflow", label: "Workflow" },
        { href: "/portfolio", label: "Portfolio" },
        { href: "/contact", label: "Contact" },
      ].map((item) => (
        <li key={item.href}>
          <Link
            onClick={() => mobile && setIsOpen?.(false)}
            className={`transition-all duration-300 ease-in-out py-3 px-5 border-2 border-transparent ${
              pathname === item.href
                ? "border-2 !border-neutral-800 rounded-full"
                : "hover:border-2 hover:border-neutral-800 hover:rounded-full"
            }`}
            href={item.href}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MainNav;
