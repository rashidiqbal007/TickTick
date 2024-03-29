import { gql } from "@apollo/client";
export const ADD_TODO = gql`
    mutation addTodo($title:String, $detail:String, $date:Date){
        addTodo(title:$title, detail:$detail, date:$date){
            id
            title
            detail
            date
           
        }
    }
`
// delete any todo
export const DELETE_TODO  = gql`
    mutation deleteTodo($id:ID){
        deleteTodo(id:$id)
    }
`