import React, {Component} from 'react';

class Mybooks extends Component{
  constructor(props){
    super(props);
    this.state={
      books:[]
    }
    this.delete=this.delete.bind(this);
  }

  componentWillMount(){
    console.log('calling my books');
    fetch('/myBooks')
                .then(res=> res.json())
                .then(data=> this.setState({books:data.books}));

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

  render(){
    let arr=[];
    if(this.state.books.length>0){

      arr= this.state.books.map(book=>
      <div class="book">
        <div>
          <h5>Title: {book.title}</h5>
            <p class="font-weight-bold">author: {book.author}</p>
            <p class="mt-0">Owner: <span>{book.owner}</span></p>
         </div>
         <button type="button" class="btn btn-outline-danger mb-5 del" id={book.id} onClick={this.delete}>x</button>
        </div>);
      }
      return(
        <div>
          <h1>My Books</h1>
          <div class="addBook mb-5">
            {arr}
          </div>
        </div>
      );



  }

}

export default Mybooks;
