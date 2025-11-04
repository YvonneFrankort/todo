import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import Row from '../components/Row';
import { useUser } from '../context/useUser' 

const url = "http://localhost:3001";

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const { user } = useUser() 

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        alert(error.response?.data?.message || error);
      });
  }, []);

  const addTask = () => {
    const headers = {headers: {Authorization: user.token}}
    const newTask = {description: task}

    axios.post(url + "/create", {task: newTask})
      .then(response => {
        setTasks([...tasks, response.data])
        setTask("")
      })
      .catch(error => {
        alert(error.response ?error.response.data.error.message : error)
      })
  };

  const deleteTask = (deleted) => {
    const headers = {headers: {Authorization: user.token}}
    console.log(headers)
    axios.delete(url + "/delete/" + deleted)
      .then(response => {
        setTasks(tasks.filter(item => item.id !== deleted))
      })
      .catch(error => {
        alert(error.response ? error.response.data.error.message : error)
      })
  };

  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input
          placeholder="Add new task"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTask();
            }
          }}
        />
      </form>
      <ul>
        {tasks.map(item => (
          <Row key={item.id} item={item} deleteTask={deleteTask} />
        ))}
      </ul>

    </div>
  );
}

export default App;
