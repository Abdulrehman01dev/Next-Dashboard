"use client"
import dynamic from 'next/dynamic';
import Link from 'next/link'; 

// Dynamic import of icons
const HomeIcon = dynamic(() => import('@heroicons/react/24/outline').then(mod => mod.HomeIcon), { ssr: false });
const DocumentDuplicateIcon = dynamic(() => import('@heroicons/react/24/outline').then(mod => mod.DocumentDuplicateIcon), { ssr: false });
const UserGroupIcon = dynamic(() => import('@heroicons/react/24/outline').then(mod => mod.UserGroupIcon), { ssr: false });

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
