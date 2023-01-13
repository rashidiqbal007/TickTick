import { useMutation } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import { ADD_TODO } from '../graphql/Mutation'
import { GET_TODOS } from '../graphql/Query'
import moment from 'moment'
import hamicon from "../../src/images/hamburgermenu.png"
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import downicon from "../../src/images/down-arrow.png"
import add from "../../src/images/add.png"
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

// initialize state, import from mutation and onsubmit function , refetch query

const AddTodos = () => {
    // for update/edit
    // const inputAreaRef = useRef()

    const [todo, setTodo] = useState({
        title: '',
        detail: '',
        date: '',

    })

    function fetchTime() {
        var showDate = new Date
        var hh = showDate.getHours();
        var mm = showDate.getMinutes();
        var ss = showDate.getSeconds();
        // var datetime = showDate.getTime() + '/' + showDate.getDate() + '/' + showDate.getMonth() + '/' + showDate.getFullYear()
        var datetime = hh + ':' + mm + ':' + ss
        // console.log(time)
        return datetime
    }


    const [addTodo] = useMutation(ADD_TODO)

    const onSubmit = e => {
        e.preventDefault();
        //  setTodo("")
        addTodo({
            variables: {
                title: todo.title,
                detail: todo.detail,
                date: fetchTime(),
            }, refetchQueries: [
                { query: GET_TODOS }
            ]
        })


    }


    return (
        <form onSubmit={onSubmit} >
            <div className="form-group">
            </div>
            {/* <pre>{JSON.stringify(todo, null, '\t')}</pre> */}
            {/* <label>Title</label> */}
            <InputGroup className="mb-3">
                <Form.Control aria-label="Amount (to the nearest dollar)" placeholder='To do Today' value={todo.title}
                    onChange={e => setTodo({ ...todo, title: e.target.value })} />
                <Dropdown className='button-menu'>
                    <Dropdown.Toggle className='addtodo_button-menu' style={{ height: "38px" }} variant="success" id="dropdown-basic">
                        <span ><img src={downicon} alt="dropdownicon" id='arraow-icon' /></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item ><button class="glow-on-hover" onClick={onSubmit}>ADD</button><span><img src={add} alt="add" /></span></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </InputGroup>






            {/* <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" placeholder='Enter date'
                    value={moment(todo.date).format("yyyy-MM-DD")}
                    onChange={e => setTodo({ ...todo, date: e.target.value })}
                />
            </div> */}


        </form>
    )
}

export default AddTodos