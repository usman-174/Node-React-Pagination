import React from 'react'
import { useParams } from 'react-router-dom'

const SingleTodo = () => {
    const {id}=useParams()
  return (
    <div>Todo with Id : {id}</div>
  )
}

export default SingleTodo