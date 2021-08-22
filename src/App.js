import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import {AlertModal} from './components/modal'
import axios from 'axios'
import  spinner  from './spinner.gif'

function App() {
  const proxy = 'https://task-tracker-api-2021.herokuapp.com'
  const [tasks, setTasks] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [alert, setAlert] = useState(false)
  const [showerror, setShowError] = useState(false)
  const [errorText, seterrorText] = useState('')
  const [onload, setOnLoad] = useState(false)

  const alertF = (error, text) => {
    setAlert(true)
    setShowError(error)
    seterrorText(text)
    setTimeout(() => {
      setAlert(false)
      setShowError(false)
      seterrorText('')
    }, 2000)
  }

  
  useEffect(() => {
    const GetTasks = async () => {
      const response = await axios.get(`${proxy}/tasks/`)
      setTasks(response.data)
    }
    GetTasks()
  }, [])

   const DeleteTask = async (id) => {
    let Ctask = tasks.find(t => t.id === id)
    setTasks(tasks.filter(task => task.id !== Ctask.id))
    try {
      await axios.delete(`${proxy}/tasks/delete/${id}/d`)
    } catch (error) {
      setTimeout(() => {
        alertF(true, 'Something Went Wrong process not completed')
        setTasks([...tasks.filter(task => task.id !== Ctask.id), Ctask])
      }, 2000)
    }
  }

   const CreateTask = async (task) => {
      setOnLoad(true)
      await axios.post(`${proxy}/tasks/create/`, task)
      setOnLoad(false)
      setTasks([...tasks, task])
    }

  const setTaskReminder = async (id) => {
    await axios.put(`${proxy}/tasks/update/${id}/`)
    setTasks(tasks.map((task) => {
      return task.id === id ? { ...task, reminder: !task.reminder } : task
    }))
  }
  return (
    <>
        

        {alert? <AlertModal text={errorText} iserror={showerror} />: ''}
        <div className="container">
        <div className="App">
          <Header title='Task Header' setShowForm={setShowForm} showForm={showForm} />
          {showForm ? <AddTask AddTask={CreateTask} /> : ''}
          { 
          
          tasks !== null? tasks.length > 0 ?
          <Tasks onToggle={setTaskReminder} onDelete={DeleteTask} tasks={tasks} /> : 'No task':
            <div className="spinner">
              <img src={spinner} width="30" />
            </div>
          }
          {onload? <div className="spinner">
              <img src={spinner} width="30" />
            </div>: ''}

        </div>
        </div>
   
    </>

  );
}





export default App;