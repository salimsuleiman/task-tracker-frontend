import {FaTimes} from 'react-icons/fa'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const days = ['Sunday', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']


export default function Task({task, onDelete, onToggle}) {
  let date = new Date(task.date)
  let formatedDate = `${months[date.getMonth()]} ${days[date.getDay()]} ${date.getFullYear()}`
  let formatedTime = `${date.getHours()}:${date.getMinutes() < 10? 0:''}${date.getMinutes()} ${date.getHours()>=12?'pm': 'am'}`

  return (
    <div key={task.id} className={`task ${task.reminder?'reminder':''}`} onDoubleClick={() => onToggle(task.id)}>
     {/* <div className="reminder"></div> */}
      <h3>
        {task.text}
        <FaTimes onClick={() => onDelete(task.id)} style={{color: 'red', cursor: 'pointer'}}/>
      </h3>
      <p>{formatedDate} <small>{formatedTime}</small></p>
    </div>
  )
}
