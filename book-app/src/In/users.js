import React, {Component} from 'react';

class Users extends Component{
  constructor(props){
    super(props);
    this.state={
      users: []
    }
  }
  componentWillMount(){
    fetch('/user')
              .then(res=> res.json())
              .then(data=> this.setState({users: data.users}));
  }

  render(){
    console.log(this.state.users);
    let all=[];
    for(var i=0; i<this.state.users.length; i++){
      all.push(
<div class="card text-center userdiv">
  <div class="card-body">
    <h5 class="card-title text-primary">{this.state.users[i].username}</h5>
    <p class="card-text">location: {this.state.users[i].location.city}</p>
    <p class="bg-danger len font-italic font-weight-bold">{this.state.users[i].mybooks.length} Books</p>
  </div>
</div>);
    }
    return(
      <div class="user">
        <h1>Users</h1>
        <div>
          {all}
        </div>
      </div>
    );
  }


}

export default Users;
