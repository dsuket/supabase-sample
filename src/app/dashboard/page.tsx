'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  console.log('DashboardPage')
  console.log('user', user)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      console.log('setUser', user)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">ようこそ！</h2>
        <p className="text-gray-600">
          メールアドレス: {user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-3">クイックアクセス</h3>
          <ul className="space-y-2">
            <li>
              <a href="/profile" className="text-blue-600 hover:underline">
                プロフィールを編集
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                設定
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-3">最近のアクティビティ</h3>
          <p className="text-gray-600">アクティビティはまだありません</p>
        </div>
      </div>
    </div>
  )
}