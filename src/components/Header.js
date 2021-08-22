
const Header = ({ title, setShowForm, showForm }) => {

  return (
    <header className="header">
      <h1>{title}</h1>
      <button style={{
        backgroundColor: showForm? 'red': 'green'
      }} onClick={() => setShowForm(!showForm)} className="btn">{showForm? 'Close': 'Add'}</button>
    </header>
  )

}


export default Header