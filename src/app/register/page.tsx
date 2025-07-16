"use client"


import { useRouter } from "next/navigation"
import React, { useState } from "react"

function page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            if (response.ok) {
                alert("Account created successfully")
            } else {
                alert("Account creation failed")
            }
            router.push("/login")
        }
            
         catch (error) {
            alert("Account creation failed")
            console.log(error)
            
        }
        router.push("/login")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
            >
                <h2 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    Create Your Account
                </h2>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-900"
                        required
                        placeholder="you@example.com"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-gray-900"
                        required
                        placeholder="••••••••"
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-gray-900"
                        required
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
                >
                    Register
                </button>
                <div className="mt-6 text-center text-gray-500 text-sm">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </span>
                </div>
            </form>
        </div>
    )
}

export default page
