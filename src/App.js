import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Login from './Login';
import Tasklist from './Tasklist';
import EditForm from './editForm';
import AddForm from './addForm';

function Logout(event){
  event.preventDefault();
  localStorage.removeItem('userToken');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('selectedTask');
  localStorage.removeItem('addTask');

  window.location.reload()
}
function Add(event){
  event.preventDefault();
  localStorage.removeItem('selectedTask');
  localStorage.setItem('addTask', true);
  window.location.reload();
}
function Home(event){
  event.preventDefault();
  localStorage.removeItem('selectedTask');
  localStorage.removeItem('addTask');
  window.location.reload();
}
function App() {
  const active = localStorage.getItem('userToken');
  const activeTask = localStorage.getItem('selectedTask');
  const activeAdd = localStorage.getItem('addTask');
  if(active){
    if(activeTask){
      return (
        <div className="App">
          <header className="App-header">
            <nav>
              <ul>
                <li><a href="#" onClick={Home}>Home</a></li>
                <li><a href="#" onClick={Add}>Add</a></li>
                <li><a href="#" onClick={Logout}>Logout</a></li>
              </ul>
            </nav>
          </header>
            <EditForm></EditForm>
        </div>
      );
    }
    else if(activeAdd){
      return (
        <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><a href="#" onClick={Home}>Home</a></li>
              <li><a href="#" onClick={Add}>Add</a></li>
              <li><a href="#" onClick={Logout}>Logout</a></li>
            </ul>
          </nav>
        </header>
            <AddForm></AddForm>
   
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><a href="#" onClick={Home}>Home</a></li>
              <li><a href="#" onClick={Add}>Add</a></li>
              <li><a href="#" onClick={Logout}>Logout</a></li>
            </ul>
          </nav>
        </header>
        <Tasklist></Tasklist>
      </div>
    );
  }else{
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <Login></Login>
    </div>
  );
  }
}

export default App;
