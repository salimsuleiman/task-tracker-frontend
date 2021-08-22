import Task from './Task'

export default function Tasks({tasks, onDelete, onToggle}) {

  return (
    <>
      {tasks.map((task) => {
        return <Task key={task.id} onToggle={onToggle} onDelete={onDelete} task={task}/>
      })}
    </>
  )
}

