import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          ポータルサイトへようこそ
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Next.jsとSupabaseで構築されたモダンなポータルサイト
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            ログイン
          </Link>
          <Link
            href="/auth/signup"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            新規登録
          </Link>
        </div>
      </div>
    </main>
  )
}