import React, {Component} from 'react';

class Tradecenter extends Component{
  constructor(props){
    super(props);
    this.state={
      myBook: [],
      val: ""
    }
    this.back=this.back.bind(this);
    this.changeVal=this.changeVal.bind(this);
    this.Submit=this.Submit.bind(this);
  }

componentWillMount(){
    fetch('/tradeB')
                  .then(res=> res.json())
                  .then(data=> this.setState({myBook: data.myBooks, val: data.myBooks[0].title}));
  }

back(){
    this.props.reset();
  }

changeVal(e){
  this.setState({val: e.target.value});
}
Submit(){
  console.log({mine: this.state.val, notMine:this.props.obj.id});
  fetch('/tradeReq', {
    method:'post',
    body:JSON.stringify({mine: this.state.val, notMine: this.props.obj.id}),
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=> res.json())
    .then(data=> window.location.reload());
}

  render(){
    let arr=[];
    if(this.state.myBook.length>0){
      arr= this.state.myBook.map(book=><option value={book.title}>{book.title}</option>);
    }
    return(
      <div>
        <button type="button" class="btn btn-dark" onClick={this.back}>GO BACK</button>
        <div class="center">
          <h3>Trade Center</h3>
          <div class="card card2">
            <div class="card-body">
              <h5 class="card-title">Title: {this.props.obj.title}</h5>
              <h5 class="card-subtitle mb-2 text-muted">author: {this.props.obj.author}</h5>
              <p class="card-text">Owner: {this.props.obj.owner}</p>
            </div>
            <h5>Trade For:</h5>
            <select onChange={this.changeVal} value={this.state.val}>
              {arr}
            </select>
          </div>
          <button type="button" class="btn btn-dark mt-2" id={this.props.obj.id} onClick={this.Submit}>Send Trade Request</button>
        </div>
      </div>
    );
  }
}

export default Tradecenter;
