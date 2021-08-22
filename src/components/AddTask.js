import {useState} from 'react'


const AddTask = ({AddTask}) => {
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [reminder, setReminder] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text && date) {
      AddTask( {text: text,date: `${date} ${time}`,reminder: reminder})
      setText('')
      setDate('')
      setTime('')
      setReminder(false)
    } else {
      alert('Please all Fields')
    }
  }

  

  return (
    <form onSubmit={handleSubmit} className='add-form'>
      <div className="form-control">
        <label>Task</label>
        <input type="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Add Task" />
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} value={date} placeholder="Add Day" />
      </div>

      <div className="form-control">
        <label>Date & Time</label>
        <input type="time" onChange={(e) => setTime(e.target.value)} value={time} placeholder="Time" />
      </div>

      <div className="form-control  form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}  />
      </div>

    
      <button className="btn btn-block" type="submit">Save Task</button>
    </form>
  )
}

export default AddTask
