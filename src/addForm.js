import React, { Component } from "react";
import './App.scss';



class AddForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
          clients: null,
          userId: localStorage.getItem('userId'),

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
           this.setState({clients: data.clients})
        })
        }
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]:value})
    }
    getDay(x){
        return new Date(x).toString().split(' ')[0];
    }
    dateDiff(dt1,dt2){
        const dt1Hours = new Date(dt1).getHours()*60;
        const dt1Minutes = new Date(dt1).getMinutes();
        const dt1total = dt1Hours + dt1Minutes;
        const dt2Hours = new Date(dt2).getHours()*60;
        const dt2Minutes = new Date(dt2).getMinutes();
        const dt2total = dt2Hours + dt2Minutes;
        return (dt2total - dt1total)/60
    }
    handleSubmit(event){  
        const token = localStorage.getItem('userToken');
        fetch('http://127.0.0.1:8000/api/tasks',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token

            },
            body:JSON.stringify({
                userId: this.state.userId,
                clientId: this.state.clientId,
                startdate: this.state.startdate,
                enddate: this.state.enddate,
                Break: this.state.break,
                materials: this.state.materials,
                traveldistance: this.state.traveldistance,
                activities: this.state.activities,
                datediff: this.dateDiff(this.state.startdate, this.state.enddate),
                currentday: this.getDay(this.state.startdate)
            })
        }).catch(error=>console.log(error));
        localStorage.removeItem('addTask');
        // window.location.reload();
    }
  
  render() {
      if(this.state.clients !== null){
    return (
        <div>
      <form onSubmit={this.handleSubmit}>
          <label>
              Client:
          <select name="clientId" required onChange={this.handleChange}>
              <option>Selecteer klant</option>
              {
                  this.state.clients.map(function(item,i){
                  return <option key={i} value={item.id}>{item.Name}</option>
                  })
              }
          </select>
          </label>
          <label>Start:<input required name="startdate" type="datetime-local" onChange={this.handleChange}/></label>
          <label>End:<input required name="enddate" type="datetime-local" onChange={this.handleChange}/></label>
          <label>Break:<input required name="break" type="number" onChange={this.handleChange}/></label>
          <label>Activities:<textarea required name="activities"  onChange={this.handleChange}/></label>
          <label>Materials:<textarea required name="materials" onChange={this.handleChange}/></label>
          <label>Traveldistance:<input required name="traveldistance" onChange={this.handleChange}/></label>          
          <input type="submit" value="Add" />

      </form>
      </div>
    );
  }else{
      return 'kapot'
  }
}
}
export default AddForm;


