
import './App.css';
import { GET_TODOS } from "./graphql/Query.js"
import { useQuery } from '@apollo/client';
import AddTodos from './components/AddTodos';
import Todo from './components/Todo';
function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  console.log("DATA BELOW")
  console.log(data)
  return (
    <div className="container todo-box">
      <AddTodos />

      <div className="list-group">
        {/* map data */}
        {data?.getTodos.map(todo => (
          <Todo key={todo.id}
            title={todo.title}
            detail={todo.detail}
            date={todo.detail}
          />
        ))}


      </div>
    </div>
  );
}

export default App;
