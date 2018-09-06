import React, {Component} from 'react';

class Home1 extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <div class="jumbotron bg-info">
          <h1 class="font-weight-bold frontxt">Book Trade App</h1>
          <h5 class="font-italic frontxt1">Trade books, acquire books, increase knowledge!!</h5>
        </div>
        <img src="h-book-colors.svg" />
      </div>
    )
  }
}

export default Home1;
