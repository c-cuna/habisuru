import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TrashIcon, CheckIcon, PlusIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid'

function ToDo() {
    const validationSchema = Yup.object().shape({
        action: Yup.string().required('Please enter a to-do task'),
    })
    const [errorMessage, setErrorMessage] = useState("")
    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, formState, reset } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = async data => {
        setErrorMessage("")
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
                    setErrorMessage("Internal Server Error")
                }
            })
            .catch(function (error) {
                console.error(error)
                setErrorMessage("Internal Server Error")
            })
    }

    const [todos, setToDos] = useState([])
    useEffect(() => {
        axios.get('/api/v1/todo/')
            .then(function (response) {
                console.log(response)
                setToDos(response.data.results)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const deleteItem = (id) => {
        axios.delete(`/api/v1/todo/${id}/`)
            .then(function (response) {
                console.log(response)
                const updatedData = todos.filter(item => item.id !== id)
                setToDos(updatedData)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const clearItems = () => {
        axios.delete(`/api/v1/todo/delete_all/`)
            .then(function (response) {
                console.log(response)
                setToDos([])
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const checkItem = id => {
        axios.patch(`/api/v1/todo/${id}/`, {
            is_done: true
        })
            .then(response => {
                const itemIndex = todos.findIndex(item => item.id === id)
                if (itemIndex !== -1) {
                    const updatedData = [...todos]
                    updatedData[itemIndex] = response.data
                    setToDos(updatedData)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    const unCheckItem = id => {
        axios.patch(`/api/v1/todo/${id}/`, {
            is_done: false
        })
            .then(response => {
                console.log(response.data)
                const itemIndex = todos.findIndex(item => item.id === id)

                if (itemIndex !== -1) {
                    const updatedData = [...todos]
                    updatedData[itemIndex] = response.data
                    setToDos(updatedData)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }


    return (
        <div className='w-full flex flex-col font-lato'>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
                <div className='relative text-gray-400 focus-within:text-gray-600'>
                    <div className='w-full'>
                        <Bars3BottomLeftIcon className='w-6 h-6 ml-2 mt-2 absolute' />
                        <button type="submit" className="absolute right-4 mt-2 p-1 bg-indigo-700 rounded-full ">
                            <PlusIcon className="h-5 w-5 text-white" />
                        </button>
                        <input type="text" placeholder='Add new task...' className="w-full pl-10 p-2 shadow-sm border-2 font-medium text-black focus:outline-none" {...register("action")} />
                    </div>
                </div>
                {errors.action  && (<span className="text-sm text-red-500 font-bold">{errorMessage ? {errorMessage} : "Error: Empty values are not accepted"}</span>)}
            </form>

            <div className="flex flex-col justify-between p-4 h-[500px] bg-white rounded-xl">
                {todos.length > 0 ?
                    <>
                        <div className='overflow-auto no-scrollbar'>
                            <ul>
                                {todos.map((todo, idx) => (
                                    <li className="w-full flex justify-between items-center my-2 py-2 px-4 border-b-2 border-slate-2 text-stone-700" key={idx}>
                                        <div className='flex  justify-center items-center'>
                                            {
                                                todo.is_done ?
                                                    <button className='mr-3 w-5 h-5 flex justify-center items-center font-bold text-xs text-zinc-500 hover:bg-gray-300 hover:text-white rounded-sm border-2 border-slate-400' onClick={() => unCheckItem(todo.id)} ><CheckIcon className=" h-3 w-3" /></button>
                                                    :
                                                    <button className='mr-3 w-5 h-5 font-bold text-xs text-zinc-500 hover:bg-gray-700 hover:text-white rounded-sm border-2 border-slate-400 ' onClick={() => checkItem(todo.id)} > </button>
                                            }

                                            <span className={`py-2 ` + (todo.is_done && ` line-through`)}>{todo.action}</span>
                                        </div>
                                        <button className='p-1 hover:bg-gray-700 hover:text-white text-zinc-500 rounded-lg font-bold'><TrashIcon className="h-4 w-4" onClick={() => deleteItem(todo.id)} /></button>
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