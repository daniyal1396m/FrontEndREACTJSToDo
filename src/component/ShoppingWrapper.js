import React, {useEffect, useState} from 'react';
import {ShoppingForm} from "./ShoppingForm";
import {v4 as uuidv4} from "uuid";
import {Shopping} from "./Shopping";
import {ShoppingFormEdit} from "./ShoppingFormEdit";
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

uuidv4();
export const ShoppingWrapper = () => {
    const [shoppings, setShoppings] = useState([]);
    const addShopping = value => {
        setShoppings([...shoppings, {
            id: value.id,
            title: value.title,
            completed: 0,
            isEditing: false
        }])
    }
    const toggleComplete = async (id) => {

        const formData = new FormData();
        formData.append('id', id);
        axios.post('http://127.0.0.1:8088/tasks/done', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setShoppings(shoppings.filter(shopping => shopping.id !== id));
            toast.success("Task Compeleted")
            setShoppings(shoppings.map(shopping => shopping.id === id ? {
                ...shopping,
                completed: !shopping.completed
            } : shopping))
            console.log(response.data);
        }).catch(error => {
            toast.error("Task Not Compeleted")
            console.error(error);
        });
    }
    const deleteShopping = async (id) => {
        const formData = new FormData();
        formData.append('id', id);
        axios.post('http://127.0.0.1:8088/tasks/delete', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setShoppings(shoppings.filter(shopping => shopping.id !== id));
            toast.success("Task Deleted")
            console.log(response.data);
        }).catch(error => {
            toast.error("Task Not Deleted")
            console.error(error);
        });
    }
    const editShopping = id => {
        setShoppings(shoppings.map(shopping => shopping.id === id ? {
            ...shopping,
            isEditing: !shopping.isEditing
        } : shopping))
    }
    const editTask = (value, id) => {
        setShoppings(shoppings.map(shopping => shopping.id === id ? {
            ...shopping,
            value,
            isEditing: !shopping.isEditing
        } : shopping))
    }
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8088/tasks');
            const data = response.data.data;
            const newTasks = data.map((value) => ({
                id: value.id,
                title: value.title,
                completed: value.isDone,
                isEditing: false,
            }));
            setShoppings([...shoppings, ...newTasks]);
        } catch (error) {
            toast.error("Task Not Found")
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);
    return (
        <div>
            <ShoppingForm addShopping={addShopping}/>
            {shoppings.map((value, index) => (
                value.isEditing ? (
                    <ShoppingFormEdit shopping={value} editShopping={editTask}/>
                ) : (
                    <Shopping task={value} key={index} toggleComplete={toggleComplete}
                              deleteShopping={deleteShopping}
                              editShopping={editShopping}/>
                )
            ))
            }

        </div>
    )
}