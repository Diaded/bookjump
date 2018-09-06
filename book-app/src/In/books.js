import React, {Component} from 'react';
import Tradecenter from './tradecenter.js';

class Books extends Component{
  constructor(props){
    super(props);
    this.state={
      addBook: false,
      books: [],
      title:"",
      author:"",
      obj: undefined
    }
    this.addBook=this.addBook.bind(this);
    this.changeInput=this.changeInput.bind(this);
    this.changeAuthor=this.changeAuthor.bind(this);
    this.submit= this.submit.bind(this);
    this.delete=this.delete.bind(this);
    this.trade=this.trade.bind(this);
    this.reset=this.reset.bind(this);
  }

componentWillMount(){
  fetch('/books')
              .then(res=> res.json())
              .then(data=> this.setState({books: data.books}));
}

reset(){
  this.setState({obj: undefined});
}

addBook(){
  if(this.state.addBook===false){
    this.setState({addBook: true});
  }else{
    this.setState({addBook:false});
  }
}

submit(e){
  e.preventDefault();
  fetch('/addBook',{
    method:'post',
    body:JSON.stringify({title: this.state.title, author: this.state.author}),
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res=> res.json())
    .then(data=> window.location.reload());
}

changeInput(e){
  this.setState({title: e.target.value});
}
changeAuthor(e){
  this.setState({author: e.target.value});
}

delete(e){
  fetch('/deleteBook', {
    method: 'delete',
    body: JSON.stringify({id: e.target.id}),
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res=> res.json())
    .then(data=> window.location.reload());
}

trade(e){
  fetch('/setTrade', {
    method:'post',
    body:JSON.stringify({id: e.target.id}),
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res=> res.json())
    .then(data=> this.setState({obj:data.obj}));
}

  render(){
    if(this.state.obj!==undefined){
      return(<div><Tradecenter obj={this.state.obj} reset={this.reset=this.reset.bind(this)} /></div>);
    }else{
    if(this.state.addBook===false){
      let arr=[];
      if(this.state.books.length>0){

        arr= this.state.books.map(book=>
        <div class="book">
          <div>
            <h5>Title: {book.title}</h5>
              <p class="font-weight-bold">author: {book.author}</p>
              <p class="mt-0">Owner: <span>{book.owner}</span></p>
           </div>
           {book.me===true?<button type="button" class="btn btn-outline-danger mb-5 del" id={book.id} onClick={this.delete}>x</button>:<button type="button" class="btn btn-outline-dark mb-5 del" id={book.id} onClick={this.trade}>Trade</button>}
          </div>);

      }
    return(
      <div>
        <h1>All Books</h1>
        <div class="addBook mb-5">
          <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={this.addBook}>Add Book</button>
          {arr}
        </div>
      </div>
    );
  }else{
    return(
    <div>
      <button class="btn btn-secondary btn-lg active mt-2" role="button" aria-pressed="true" onClick={this.addBook}>BACK</button>
      <form class="signupform mt-5" onSubmit={this.submit}>
          <h3>Add A Book</h3>
          <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title goes here..." value={this.state.title} onChange={this.changeInput}  />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Author</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Author goes here" value={this.state.author} onChange={this.changeAuthor} />
          </div>
          <button type="submit" class="btn btn-primary">ADD BOOK</button>
      </form>
    </div>
    );
  }
}
  }

}

export default Books
