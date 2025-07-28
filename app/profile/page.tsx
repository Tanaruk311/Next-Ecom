"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useEffect } from "react"



const Page = () => {
  const { data: session, status } = useSession()


  useEffect(() => {
    console.log("Session data:", session)
  }, [session])

  if (status === "loading") return <div>Loading...</div>
  if (!session) return <div>Not signed in</div>

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="mb-2">Name: {session.user?.name}</p>
        <p className="mb-4">Email: {session.user?.email}</p>
        <p className="mb-4">Role: {session.user?.role}</p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>

    </div>
  )
}

export default Page
