'use client'

import React from 'react'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">
        Welcome to the Home Page! This is Schedula App
      </h1>

      <Link href="/login">
        <button className="px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition">
          Login / Signup
        </button>
      </Link>
    </main>
  )
}
