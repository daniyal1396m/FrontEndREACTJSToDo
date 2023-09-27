import React from 'react'

export const ShoppingIndex = () => {
    return (
        <div className="container">
            <p className="mt-5 text-xl text-center text-indigo-700">Assignment Sarveno Crm Daniel Motahari</p>
            <div className="mt-3">
                <a className="bg-blue-500 text-white px-4 py-2 rounded-lg m-2" href="/dashboard">Dashboard</a>
                <a className="bg-green-500 text-white px-4 py-2 rounded-lg m-2" href="/login">Login</a>
                <a className="bg-indigo-500 text-white px-4 py-2 rounded-lg" href="/register">Register</a>
                <a className="bg-red-500 text-white px-4 py-2 rounded-lg m-2" href="/logout">Logout</a>
            </div>
        </div>

    )
}