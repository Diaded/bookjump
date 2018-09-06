import React, { Component } from 'react';
import Main from './In/main.js';
import Home1 from './auth/home1.js';
import Signin from './auth/signin.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      place:"",
      user:""
    }
    this.home=this.home.bind(this);
    this.setPlace= this.setPlace.bind(this);
  }

   componentWillMount(){
    fetch('/api')
              .then(res=> res.json())
              .then(data=> this.setState({user: data.user}));
  }

  setPlace(e){
    this.setState({place: e.target.id});

  }

  home(){
    this.setState({place: ""});
  }
  render() {
    if(this.state.user===""){
      return (

        <div className="App">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="navbar-brand mr-4">Book Trade App</div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <div class="nav-item nav-link navlink mr-2" onClick={this.home}>Home <span class="sr-only">(current)</span></div>
            <div class="nav-item nav-link navlink mr-2" id="signin" onClick={this.setPlace}>Sign In</div>
            <div class="nav-item nav-link navlink mr-2" id="signup" onClick={this.setPlace}>Sign Up</div>
          </div>
          </div>
          </nav>
          {this.state.place===""?<Home1/>:<Signin place={this.state.place} />}
        </div>

      );
  }else{
    return <Main user={this.state.user} />
  }
  }
}

export default App;
