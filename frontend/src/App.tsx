import { useEffect, useState } from 'react'
import './App.css'
import TrashBin from './assets/TrashBin'
import axios from 'axios'
function App() {
  const [tasks, setTasks] = useState([])
  const [taskToAdd, setTaskToAdd] = useState('')
  const [loading, setloading] = useState(0)
  const getTask = () => {
    setloading(1)
    axios.post("http://localhost:8080/get", "")
    .then((data) => setTasks(data.data))
    setloading(0)
  }

  useEffect(() => {
    getTask()
    
  }, [])

  const addTask = async () => {
    if (taskToAdd == '') {
      return
    }
    
    await axios.post("http://localhost:8080/add", {
      "name" : taskToAdd
    })
    .then(() => {
      console.log(`Add successfully`)
       getTask()
    })
    
    setTaskToAdd('')
  }

  const deleteTask = async (id : any) => {
 
    await axios.post("http://localhost:8080/delete", {
      id
    })
    .then(() => {
      console.log(`Delete successfully`)
      getTask()
    })
  }

  return (
    <div className='flex justify-center items-center bg-slate-800 h-screen'>
      <div className='flex flex-col p-5 py-4 bg-white gap-2'>
        <p className='text-2xl font-semibold font-pps'>Todo app</p>

        <div className='m-3  flex flex-row items-center justify-center'>
          <input 
          type="text"
          placeholder='Add your new task'
          className='placeholder:text-sm placeholder:font-pps pl-3 pr-10 py-2 outline-slate-300 outline outline-[0.1px]' 
          value={taskToAdd}
          onChange={e => setTaskToAdd(e.target.value)}
          />
          <button
          className='text-2xl font-pps p-1 text-white bg-lime-500  px-4 border border-lime-500'
          onClick={() => addTask()}
          >
            <div>
              +
            </div>
          </button>
          
        </div>

        <div className='mx-3'>
          {tasks.map((task : any, id : any) => (
            <div key={id}>
              <div className='text-sm font-mediumr border border-slate-300 mb-2 font-pps flex justify-between items-center pr-1 cursor-pointer'>
                <p className=' p-2 w-56  break-words'>
                {task.name}
                </p>
                <div className='px-2 py-2 bg-red-300 h-full '>
                  <TrashBin
                  onClick={() => {deleteTask(task._id)}}
                  ></TrashBin>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App
