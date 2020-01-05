import React, { Component } from "react";
import './App.scss';

class Takslist extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }
  
      async componentDidMount(){
          const token = localStorage.getItem('userToken');
          const info = localStorage.getItem('userId');
          console.log(info);

        const response = await fetch('http://127.0.0.1:8000/api/tasks/'+ info,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        const json = await response.json();
        this.setState({data: json.tasks})
        console.log(this.state.data)
      
    }
  
  render() {

    const Delete = (id)=>{
        const token = localStorage.getItem('userToken');
        fetch('http://127.0.0.1:8000/api/tasks/delete/'+ id,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        console.log('delete')
    }
    const Edit = (id, event) => {
      localStorage.removeItem('addTask');
      const token = localStorage.getItem('userToken');
        fetch('http://127.0.0.1:8000/api/tasks/task/'+ id,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('selectedTask', JSON.stringify(data.task[0]))
          window.location.reload();
        });
    }
    // const getDate = (string) =>{
    //     fetch("https://showcase.linx.twenty57.net:8081/UnixTime/fromunixtimestamp?unixtimestamp=" +string, {
    //         // mode: 'no-cors',
    //         method: 'GET',
    //         headers: {
    //           Accept: 'application/json',
    //         },
    //         })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log( data.Datetime )
    //     });
    // }
    if(this.state.data !== null){

   
    return (    
        <div>
      <h1 id="taskTitle">TaskList</h1>
        {this.state.data.map(task => (
            <div id="taskContainer">
            <h2>Voor klant: {task.clientId}</h2>
            {/* <p> van: {getDate(task.Start.timestamp)}</p>
            <p> tot: {getDate(task.End.timestamp)}</p> */}
            <p> Activiteiten: {task.Activities}</p>
            <p> Materiaal: {task.Materials}</p>
            <p> Aaantal km: {task.Traveldistance}</p>
            <p> Gewerkte uren: {task.dateDiff}</p>
            <a href="#" onClick={() => Delete(task.id)} id="deleteButton">Delete</a>
            <a href="#" onClick={() => Edit(task.id)} id="editButton">Edit</a>
            </div>
        ))}
      </div>
    );
  }else{
    return (    
      <div>
    <h1>TaskList</h1>
      <p>Nog geen taken</p>
    </div>
  );
  }
  }

}
export default Takslist;


