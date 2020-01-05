import React, { Component } from "react";
import './App.css';



class EditForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: null,
          userId: localStorage.getItem('userId'),
          clients:null,
          taskId:null ,
          clientId:  null,
          break:  null,
          activities:  null,
          materials:  null,
          traveldistance:  null,
        };
       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }
      componentDidMount(){
        const token = localStorage.getItem('userToken');
        fetch('http://127.0.0.1:8000/api/clients',{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res =>res.json())
        .then((data)=>{ 
           let task = JSON.parse(localStorage.getItem('selectedTask'));
           this.setState({
               clients: data.clients,
               taskId: task.id,
               clientId: task.clientId,
               break: task.Break,
               activities: task.Activities,
               materials: task.Materials,
               traveldistance: task.Traveldistance,

            })

        })
        }
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value});
    }
    handleSubmit(event){
        const token = localStorage.getItem('userToken');
        fetch('http://127.0.0.1:8000/api/tasks/edit/'+this.state.taskId,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token

            },
            body:JSON.stringify({
                userId: this.state.userId,
                clientId: this.state.clientId,
                Break: this.state.break,
                materials: this.state.materials,
                traveldistance: this.state.traveldistance,
                activities: this.state.activities,
            })
        }).catch(error=>console.log(error));
        localStorage.removeItem('selectedTask');
    }
  render() {
    console.log(this.state)
    if(this.state.clients !== null){
    return (
        <div>
      <form>
          <label>
              Client:
             <select name="clientId" required onChange={this.handleChange} value={this.state.clientId} >
              <option>Selecteer klant</option>
              {
                  this.state.clients.map(function(item,i){
                  return <option key={i} value={item.id}>{item.Name}</option>
                  })
              }
          </select>
          </label>
         <label>Break:<input required name="break" type="number" value={this.state.break} onChange={this.handleChange}/></label>
          <label>Activities:<textarea required name="activities"  onChange={this.handleChange} value={this.state.activities}/></label>
          <label>Materials:<textarea required name="materials" onChange={this.handleChange}value={this.state.materials}/></label>
          <label>Traveldistance:<input required name="traveldistance" onChange={this.handleChange}value={this.state.traveldistance}/></label>          
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>

      </form>
      <p>{this.state.data}</p>
      </div>
    );
  }else{
    return 'kapot'
  }}

}
export default EditForm;


