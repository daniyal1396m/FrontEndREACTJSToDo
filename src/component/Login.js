import React, {useState} from 'react'
import axios from "axios";
import {toast} from "react-toastify";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = () => {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        setIsValidEmail(emailRegex.test(email));
    };
    const storeUserLogin = async (email, password) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://127.0.0.1:8088/store/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const data = response.data;
            if (data.status == 200) {
                localStorage.setItem('jwtToken', data.jwt);
                localStorage.setItem('jwtUnicode', data.uniqueCode);
                window.location.href = '/dashboard';
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        }).catch(error => {
            toast.error("You Are Not Logged In")
        });
    }
    const handleSubmit = e => {
        e.preventDefault();
        storeUserLogin(email, password)
    }
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="formBasicEmail" className="block text-gray-700 text-sm font-bold mb-2">
                        Email address
                    </label>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onBlur={validateEmail}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <p className="text-red-500 mt-2">
                        {!isValidEmail && "Your email is not valid"}
                    </p>
                </div>

                <div className="mb-6">
                    <label htmlFor="formBasicPassword" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}