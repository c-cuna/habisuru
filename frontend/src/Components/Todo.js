import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TrashIcon, CheckIcon, PlusIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid'

function ToDo() {
    const validationSchema = Yup.object().shape({
        action: Yup.string().required('Please enter a to-do task'),
    });
    const [errorMessage, setErrorMessage] = useState("");
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState, reset } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async data => {
        setErrorMessage("");
        axios.post('/api/v1/todo/', {
            action: data.action
        })
            .then(function (resp) {
                if (resp.status == 201) {
                    console.log(resp.data)
                    setToDos((prev) => [...prev, resp.data])
                    reset()
                }
                else if (resp.status === 500) {
                    setErrorMessage("Internal Server Error");
                }
            })
            .catch(function (error) {
                console.error(error);
                setErrorMessage("Internal Server Error");
            })
    }

    const [todos, setToDos] = useState([]);
    useEffect(() => {
        axios.get('/api/v1/todo/')
            .then(function (response) {
                console.log(response)
                setToDos(response.data.results)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const deleteItem = (id) => {
        axios.delete(`/api/v1/todo/${id}/`)
            .then(function (response) {
                console.log(response)
                const updatedData = todos.filter(item => item.id !== id);
                setToDos(updatedData);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const clearItems = () => {
        axios.delete(`/api/v1/todo/delete_all/`)
            .then(function (response) {
                console.log(response)
                setToDos([]);
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    const checkItem = (id, idx) => {
        axios.patch(`/api/v1/todo/${id}/`, {
            is_done: true
        })
            .then(response => {
                const itemIndex = todos.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    const updatedData = [...todos];
                    updatedData[itemIndex] = response.data;
                    setToDos(updatedData);
                }
            })
            .catch(error => {
                console.error(error)
            });
    }

    const unCheckItem = (id, idx) => {
        axios.patch(`/api/v1/todo/${id}/`, {
            is_done: false
        })
            .then(response => {
                console.log(response.data)
                const itemIndex = todos.findIndex(item => item.id === id);

                if (itemIndex !== -1) {
                    const updatedData = [...todos];
                    updatedData[itemIndex] = response.data;
                    setToDos(updatedData);
                }
            })
            .catch(error => {
                console.error(error)
            });
    }


    return (
        <div className='w-full flex flex-col font-lato'>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
                <div className='relative text-gray-400 focus-within:text-gray-600'>
                    <div className='w-full'>
                        <Bars3BottomLeftIcon className='w-6 h-6 absolute ml-2 mt-2' />
                        <button type="submit" className="p-1 rounded-full absolute bg-indigo-700 text-white right-4 mt-2">
                            <PlusIcon className="h-5 w-5 text-white " />
                        </button>
                        <input type="text" placeholder='Add new task...' className="w-full font-medium text-black pl-10 p-2 shadow-sm border-2 focus:outline-none" {...register("action")} />
                    </div>
                </div>
                {errors.action  && (<span className="text-sm font-bold text-red-500">{errorMessage ? {errorMessage} : "Error: Empty values are not accepted"}</span>)}
            </form>

            <div className="p-4 h-[500px]  flex flex-col justify-between bg-white rounded-xl">
                {todos.length > 0 ?
                    <>
                        <div className='overflow-auto no-scrollbar'>
                            <ul>
                                {todos.map((todo, idx) => (
                                    <li className="w-full flex border-b-2 border-slate-2 justify-between items-center my-2 py-2 px-4 text-stone-700 " key={idx}>
                                        <div className='flex items-center justify-center'>
                                            {
                                                todo.is_done ?
                                                    <button className='hover:bg-gray-300 text-zinc-500 hover:text-white rounded-sm border-2 border-slate-400 font-bold text-xs mr-3 w-5 h-5 flex justify-center items-center font-bold' onClick={() => unCheckItem(todo.id, idx)} ><CheckIcon className=" h-3 w-3" /></button>
                                                    :
                                                    <button className='hover:bg-gray-700 text-zinc-500 hover:text-white rounded-sm border-2 border-slate-400 font-bold text-xs mr-3  w-5 h-5' onClick={() => checkItem(todo.id, idx)} > </button>
                                            }

                                            <span className={`p-2` + (todo.is_done && `line-through`)}>{todo.action}</span>
                                        </div>
                                        <button className='hover:bg-gray-700  hover:text-white  text-zinc-500 rounded-lg p-1 font-bold'><TrashIcon className="h-4 w-4" onClick={() => deleteItem(todo.id)} /></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full text-right text-red-500 text-sm font-bold mt-2 cursor-pointer" onClick={() => clearItems()}>
                            Clear all
                        </div>
                    </>

                    :
                    <div className="w-full h-full flex justify-center items-center my-2 py-2 px-4" >
                        <div className='text-center'>
                            <p className='font-semibold '>Good job!</p>
                            <p>You have no more remaining tasks</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ToDo