
import './App.css';
import { GET_TODOS } from "./graphql/Query.js"
import { useQuery } from '@apollo/client';
import AddTodos from './components/AddTodos';
import Todo from './components/Todo';
import Profile from "../src/images/profile.jpg"
function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  console.log("DATA BELOW")
  console.log(data)
  return (


    <div className="main-container">
      <div className="mainchildone">
        <figure>
          <img src={Profile} alt="profileimg" className='profile' />
        </figure>
        <AddTodos />
      </div>
      <div className="container todo-box">
        <div className="list-group">
          {/* map data */}
          {data?.getTodos.map(todo => (
            <Todo key={todo.id}
              id={todo.id}
              title={todo.title}
              detail={todo.detail}
              date={todo.date}
            />
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;
