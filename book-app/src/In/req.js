import React, {Component} from 'react';

class Req extends Component{
  constructor(props){
    super(props);
    this.state={
      arr: []
    }
    this.accepTrade=this.accepTrade.bind(this);
    this.declineTrade=this.declineTrade.bind(this);
  }

  componentWillMount(){
    fetch('/getReq')
            .then(res=> res.json())
            .then(data=> this.setState({arr: data.arr}));
  }

  accepTrade(e){
    fetch('/accepTrade', {
      method:'post',
      body:JSON.stringify({id: e.target.id}),
      headers:{
        "Content-Type": "application/json"
        }
      }).then(res=> res.json())
        .then(data=> window.location.reload());
  }

  declineTrade(e){
      fetch('/declineTrade', {
        method:'delete',
        body: JSON.stringify({id: e.target.value}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res=> res.json())
        .then(data=> window.location.reload());
  }


  render(){
    let arr=[];
    console.log(this.state.arr);
    arr= this.state.arr.map(a=>
      <div class="request">
        <div class="card card3  mt-1" >
          <p>{a.mine.owner} wants to give: </p>
          <h3>Title: {a.mine.title}</h3>
          <h5>Author: {a.mine.author}</h5>
          <p>Owner: {a.mine.owner}</p>
        </div>
        <div class="card card3  mt-1">
          <p>{a.mine.owner} wanter to trade for: </p>
          <h3>Title: {a.notMine.title}</h3>
          <h5>Author: {a.notMine.author}</h5>
          <p>Owner: {a.notMine.owner}</p>
        </div>
        <button type="button" class="btn btn-outline-secondary ml-1 mt-1" id={a.id} onClick={this.accepTrade}>Accept Trade</button>
        <button type="button" class="btn btn-outline-danger ml-1 mt-1" value={a.id} onClick={this.declineTrade}>Decline Trade</button>
      </div>);
    return(
      <div class="tradereq">
        <h2 class="mb-2">Trade Request For Me</h2>
        <div class="allTrades">
          {arr}
        </div>
      </div>
    );
  }

}

export default Req;
