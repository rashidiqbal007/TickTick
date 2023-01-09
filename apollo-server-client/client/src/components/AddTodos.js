import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_TODO } from '../graphql/Mutation'
import { GET_TODOS } from '../graphql/Query'
import moment from 'moment'
// initialize state, import from mutation and onsubmit function , refetch query

const AddTodos = () => {
    const [todo, setTodo] = useState({
        title: '',
        detail: '',
        date: '',
    })
    const [addTodo] = useMutation(ADD_TODO)

    const onSubmit = e => {
        e.preventDefault();
        addTodo({
            variables: {
                title: todo.title,
                detail: todo.detail,
                date: todo.date,
            }, refetchQueries: [
                { query: GET_TODOS }
            ]
        })
    }
    return (
        <form onSubmit={onSubmit} >
            <div className="form-group">
            <pre>{JSON.stringify(todo, null, '\t')}</pre>
                <label>Title</label>
                
                <input type="text" className='form-control' placeholder='Enter title' 
                value={todo.title}
                onChange = {e=>setTodo({...todo, title:e.target.value})}
                />

            </div>
            <div className="form-group">
                <label>Detail</label>
                <input type="text" className="form-control" placeholder='Enter detail'
                value={todo.detail}
                onChange = {e=>setTodo({...todo, detail:e.target.value})}
                />
            </div>
            <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" placeholder='Enter date' 
                value={moment(todo.date).format("yyyy-MM-DD")}
                onChange = {e=>setTodo({...todo, date:e.target.value})}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default AddTodos