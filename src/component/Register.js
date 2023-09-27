import React, {useState} from 'react'
import axios from "axios";
import {toast} from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Register = ({storeRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const validateEmail = () => {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        setIsValidEmail(emailRegex.test(email));
    };
    const storeUserRegister = async (email, password, name) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://127.0.0.1:8088/store/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            window.location.href = '/login';
            toast.success("You Are Registered")
        }).catch(error => {
            toast.error("You Are Not Registered")
        });
    }
    const handleSubmit = e => {
        e.preventDefault();
        storeUserRegister(email, password, name).then(r => console.log(r))
    }
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        name="name"
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        name="email"
                        onBlur={validateEmail}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    {!isValidEmail && (
                        <p className="text-red-500 mt-2">Your email is not valid</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-6" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}