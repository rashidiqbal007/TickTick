import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment'
import { useMutation } from '@apollo/client'
import { DELETE_TODO } from '../graphql/Mutation'
import { GET_TODOS } from '../graphql/Query'
import menuicon from "../../src/images/menu-icon.png"
import Dropdown from 'react-bootstrap/Dropdown';


const Todo = ({ id, title, detail, date }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [TimeCheck, setTimeCheck] = useState(false);
    const [deleteTodo] = useMutation(DELETE_TODO);
    const removeTodo = (id) => {
        deleteTodo({
            variables: {
                id: id
            }, refetchQueries: [
                { query: GET_TODOS }
            ]
        })
    }


    //Completion Time

    var showDate = new Date
    var hh = showDate.getHours();
    var mm = showDate.getMinutes();
    var ss = showDate.getSeconds();
    // var datetime = showDate.getTime() + '/' + showDate.getDate() + '/' + showDate.getMonth() + '/' + showDate.getFullYear()
    var completiontime = hh + ':' + mm + ':' + ss


    //CheckBox
    const handleChange = event => {
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
            setTimeCheck(true);
            console.log(completiontime)
        } else {
            console.log('⛔️ Checkbox is NOT checked');
            setTimeCheck(false);
        }
        // setIsSubscribed(current => !current);
    };

    return (
        <ul class="list-group">
            <li class="list-group-item">
                <input class="form-check-input me-1" onChange={handleChange} type="checkbox" value="" id="firstCheckbox" />
                <label class="form-check-label" for="firstCheckbox">{title}</label>


                {TimeCheck ? <span class="form-check-label time-style" >Completed at: {completiontime}</span> : <span></span>}

                <Dropdown className='button-menu'>
                    <Dropdown.Toggle className='button-menu' variant="success" id="dropdown-basic">
                        <span ><img src={menuicon} alt="menu-icon" style={{ height: "20px" }} /></span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => removeTodo(id)}>Delete <span  > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg></span></Dropdown.Item>
                        <Dropdown.Item >Created at: {date}</Dropdown.Item>
                        {TimeCheck ? <Dropdown.Item >Completion Time: {completiontime}</Dropdown.Item> : <span></span>}
                    </Dropdown.Menu>
                </Dropdown>
            </li>
            <hr />


        </ul >


    )
}

export default Todo