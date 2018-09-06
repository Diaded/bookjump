import React, {Component} from 'react';
import Books from './books.js';
import Users from './users.js';
import Req from './req.js';
import Mybooks from './mybooks.js';

class Main extends Component{
   constructor(props){
     super(props);
     this.state={
       place: 'Book'
     }
     this.logout=this.logout.bind(this);
     this.changePage= this.changePage.bind(this);
   }

  changePage(e){
    this.setState({place: e.target.id});
  }

   logout(){
     fetch('/logout', {
       method:'delete',
       body: JSON.stringify({}),
       headers:{
         "Content-Type": "application/json"
       }
     }).then(res=> res.json())
      .then(data=> window.location.reload());
   }

  render(){
    const navbar=<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="navbar-brand">Book Exchange</div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <div class="nav-item nav-link navlink mr-2" id="Book" onClick={this.changePage}>Books</div>
      <div class="nav-item nav-link navlink mr-2" id="Requests" onClick={this.changePage}>Requests</div>
      <div class="nav-item nav-link navlink mr-2" id="My Books" onClick={this.changePage}>My Books</div>
      <div class="nav-item nav-link navlink mr-2" id="Users" onClick={this.changePage}>Users</div>
      <div class="nav-item nav-link navlink bg-danger" onClick={this.logout}>Log Out</div>
    </div>
  </div>
</nav>;
    if(this.state.place==='Book'){
      return(
        <div>
           {navbar}
           <Books />
        </div>
      );
    }else if(this.state.place==="Users"){
      return(
        <div>
          {navbar}
          <Users />
        </div>
      );
    }else if(this.state.place==="Requests"){
      return(
        <div>
          {navbar}
          <Req />
        </div>
      );
    }else{
      return(
        <div>
          {navbar}
          <Mybooks />
        </div>
      );
    }
}

}

 export default Main;
