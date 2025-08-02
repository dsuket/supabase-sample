'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, User, LogOut } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
      })
      
      if (response.ok) {
        router.refresh()
        router.push('/auth/login')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="text-xl font-bold text-gray-800">
            ポータルサイト
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <Home size={20} />
              <span>ホーム</span>
            </Link>
            
            <Link
              href="/profile"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <User size={20} />
              <span>プロフィール</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <LogOut size={20} />
              <span>ログアウト</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}