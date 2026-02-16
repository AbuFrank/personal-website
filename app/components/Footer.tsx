'use client'

import { usePathname } from "next/navigation";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME


const Footer = () => {
  const pathname = usePathname();
  const isModified = pathname === '/space'
  return (
    <div className={`py-12 text-center ${isModified ? 'bg-black text-gray-400' : 'text-gray-600'}`}>
      <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
    </div>
  )
}

export default Footer