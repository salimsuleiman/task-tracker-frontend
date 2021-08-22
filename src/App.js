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

  const alertF = (error, text, sec=2000) => {
    setAlert(true)
    setShowError(error)
    seterrorText(text)
    setTimeout(() => {
      setAlert(false)
      setShowError(false)
      seterrorText('')
    }, sec)
  }

  
  useEffect(() => {
    const GetTasks = async () => { 
      try {
        const response = await axios.get(`${proxy}/tasks/`)
        setTasks(response.data)
      } catch (error) {
        alertF(true, 'Something went wrong task not available now Please try again later', 5000)
        setTasks([])
        

      }  
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
    try {
      setOnLoad(true)
      await axios.post(`${proxy}/tasks/create/`, task)
      setTasks([...tasks, task])
    } catch (error) {
      alertF(true, 'Something Went Wrong task not addded')
    } finally {
      setOnLoad(false)
    }
     
    }

  const setTaskReminder = async (id) => {
    let Ctask = tasks.find((task) => task.id === id)
    let n = tasks.map((task) => {
      return task.id === Ctask.id ? { ...Ctask, reminder: !task.reminder } : task
    })
    setTasks(n)
    try {
      await axios.put(`${proxy}/tasks/update/${id}/s`)
    } catch (error) {
      setTimeout(() => {
        setTasks(n.map((task) => {
          return task.id === Ctask.id ? {...Ctask, reminder: !task.reminder } : task
        }))
        alertF(true, 'Something Went Wrong process not completed')
      }, 3000)
    }
 
  }
  return (
    <>
        

        {alert? <AlertModal text={errorText} iserror={showerror} />: ''}
        <div className="container">
        <div className="App">
          <Header title='Task Tracker' setShowForm={setShowForm} showForm={showForm} />
          {showForm ? <AddTask AddTask={CreateTask} /> : ''}
          { 
          
          tasks !== null? tasks.length > 0 ?
          <Tasks onToggle={setTaskReminder} onDelete={DeleteTask} tasks={tasks} /> : 'No task':
            <div className="spinner">
              <img src={spinner} width="30" alt='Loading...' />
            </div>
          }
          {onload? <div className="spinner">
              <img src={spinner} width="30" alt='Loading...'/>
            </div>: ''}

        </div>
        </div>
   
    </>

  );
}





export default App;