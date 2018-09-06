import React, {Component} from 'react';

class Signin extends Component{
  constructor(props){
    super(props);
    this.state={
      mess: ""
    }
    this.login=this.login.bind(this);
    this.signup=this.signup.bind(this);
  }
  login(e){
    e.preventDefault();
    fetch('/login', {
      method:'post',
      body: JSON.stringify({user: this.refs.loguser.value, password: this.refs.logpass.value}),
      headers:{
        "Content-Type": "application/json"
      }
    }).then(res=> res.json())
      .then(data=> data.mess==="welcome"?window.location.reload():this.setState({mess: data.mess}));
      this.refs.loguser.value="";
      this.refs.logpass.value="";
  }

  signup(e){
    e.preventDefault();
    fetch('/signUp', {
      method:'post',
      body: JSON.stringify({user: this.refs.signuser.value, password: this.refs.signPassword.value, conPassword: this.refs.signConPassword.value, location: this.refs.location.value.split(", ")}),
      headers:{
        "Content-Type": "application/json"
      }
    }).then(res=> res.json())
      .then(data=> data.mess==="Signed up"?window.location.reload(): this.setState({mess: data.mess}));
      this.refs.signuser.value="";
      this.refs.signPassword.value="";
      this.refs.signConPassword.value="";
      this.refs.location.value="";
  }

  render(){
    if(this.props.place==='signin'){
      return(
        <div class="signupform bg-info mt-5">
          <h2>Sign In</h2>
          <form onSubmit={this.login}>
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="text" ref="loguser" class="form-control" id="exampleInputEmail1"aria-describedby="emailHelp" placeholder="Enter username Here." />
              <small id="emailHelp" class="form-text text-muted">We willl never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" ref="logpass" class="form-control" id="exampleInputPassword1" placeholder="Enter Password Here." />
            </div>
            <h3 class="txt-danger">{this.state.mess}</h3>
            <button type="submit" class="btn btn-primary">Sign In</button>
          </form>
        </div>
      );
    }else{
      return(
        <div class="signupform bg-info mt-5">
          <h2>Sign Up</h2>
          <form onSubmit={this.signup}>
            <div class="form-group">
              <label htmlfor="exampleInputEmail1">Username:</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref="signuser" placeholder="Enter Username" pattern=".{3,}" required title="3 characters minimum" />
              <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password:</label>
              <input type="password" class="form-control" id="exampleInputPassword1" ref="signPassword" placeholder="Enter Password" pattern=".{3,}" required title="3 characters minimum" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Confirm Password:</label>
              <input type="password" class="form-control" id="exampleInputPassword1" ref="signConPassword" placeholder="Confirm Password" />
            </div>
            <div class="form-group">
              <label for="location">Your location: </label>
              <input type="text" class="form-control" id="location" ref="location" placeholder="City, State" pattern=".{3,}" required title="3 characters minimum" />
            </div>
            <h3 class="txt-danger">{this.state.mess}</h3>
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </form>
        </div>
      );
    }
  }

}
export default Signin;
