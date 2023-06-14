import { ArrowLeftOutlined } from '@shared/components/icons/ArrowLeftOutlined';
import Link from 'next/link';

interface BackLinkProps {
  href: string;
}

export function BackLink({ href }: BackLinkProps) {
  return (
    <Link
      className="mb-2 flex items-center space-x-1 text-sm text-gray-500 transition-all duration-500 hover:text-gray-900"
      href={href}
    >
      <ArrowLeftOutlined />
      <span>Back</span>
    </Link>
  );
}
