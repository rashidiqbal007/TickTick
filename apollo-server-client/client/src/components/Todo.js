import React from 'react'
import moment from 'moment'
const Todo = ({title,detail,date}) => {
  return (
    <a href="#" className="list-group-item list-group-item-action ">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{title}</h5>
      <small>{moment(date).format("YYYY MM DD")}</small>
    </div>
    <p className="mb-1">{detail}</p>
    <small>And some small print.</small>
  </a>
  )
}

export default Todo