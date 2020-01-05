import React, { Component } from "react";
import './App.scss';



class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: null,
          name: '',
          password: '',
          user: {},
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }
    handleSubmit(event){
        event.preventDefault();
        fetch('http://127.0.0.1:8000/api/login_check',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                
            },
            body:JSON.stringify({
                username: this.state.name,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then((user) => {
            if(user.token !== undefined){
                fetch('http://127.0.0.1:8000/api/users/'+this.state.name,{
                    method: "GET",
                    headers:{
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                .then(res =>res.json())
                .then((data)=>{ 
                    localStorage.setItem('userToken', user.token);
                    localStorage.setItem('userId', data.user[0]['id']);
                    window.location.reload();
                })
            }else{
                console.log('ongeldige token')
            }
        });
    }
    handleNameChange(event){
        this.setState({name: event.target.value})
    }
    handlePassChange(event){
        this.setState({password: event.target.value})
    }
  render() {
    return (
        <div>
      <form onSubmit={this.handleSubmit}>
      <h1>Login</h1>

          <label>
          Name:
          <input type="text" placeholder="username" onChange={this.handleNameChange}></input>
          </label>
          <label>
              Password:
              <input type="password" placeholder="password" onChange={this.handlePassChange}></input>

          </label>
          <input type="submit" value="Submit" />

      </form>
      <p>{this.state.data}</p>
      </div>
    );
  }

}
export default Login;


