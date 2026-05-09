import { Suspense } from "react"
import { WrappedClient } from "./wrapped-client"

export const dynamic = "force-dynamic"

export default async function WrappedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Suspense fallback={<WrappedLoading />}>
        <WrappedClient />
      </Suspense>
    </div>
  )
}

function WrappedLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white text-lg">Analyzing your musical DNA...</p>
      </div>
    </div>
  )
}