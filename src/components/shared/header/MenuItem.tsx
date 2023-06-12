import Link from 'next/link';

interface MenuItemProps {
  label: string;
  href: string;
}

export function MenuItem({ label, href }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="font-medium text-gray-600 transition-all duration-500 hover:text-black"
    >
      {label}
    </Link>
  );
}
