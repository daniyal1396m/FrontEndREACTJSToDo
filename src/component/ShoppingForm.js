import React, {useState} from 'react';
import axios from 'axios';
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShoppingForm = ({addShopping}) => {

    const [value, setValue] = useState('');
    const addShoppings = async (shopping) => {
        const token = localStorage.getItem('jwtToken');
        const unicode = localStorage.getItem('jwtUnicode');
        const formData = new FormData();
        formData.append('title', shopping);
        formData.append('unicode', unicode);
        formData.append('jwt', token);
        axios.post('http://127.0.0.1:8088/tasks/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const shoppingInfo = [
                {
                    title: shopping,
                    id: response.data,
                }
            ]
            addShopping(shoppingInfo[0])
            toast.success("Task Added")
        }).catch(error => {
            toast.error("Task Not Added")
        });
    }
    const handleSubmit = e => {
        e.preventDefault();
        addShoppings(value)
        setValue("")
    }
    return (
        <div className='m-3'>
            <ToastContainer/>

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <input type="text"
                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       required placeholder="Enter What Do You want  You Need"
                       onChange={(e) => setValue(e.target.value)}/>
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Submit
                </button>
            </form>
        </div>
    )
}