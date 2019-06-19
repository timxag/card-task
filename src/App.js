import React from 'react';
import Sortable from 'react-sortablejs';
import { Draggable, Droppable } from 'react-drag-and-drop'
import uniqueId from 'lodash/uniqueId';

const API = 'https://jsonplaceholder.typicode.com/photos?albumId=1';
var count = 20;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitElement = this.handleSubmitElement.bind(this);
    this.input_link = React.createRef();
    this.input_text = React.createRef();
    this.state = {
      hit: [
        
      ],
      datta : [],
    };
  }
  handleDeleteElement = id => {
    this.setState(prevState => ({
      hit: prevState.hit.filter(hit => hit.id != id),
    }));
  };
  handleSubmitElement(e) {
    e.preventDefault();
    count++;
    this.setState({
      hit: [...this.state.hit,this.state.datta[count]]
    })
  /*this.setState({
    hit: [...this.state.hit,this.datta
  })*/
  }
   componentWillMount() {
       fetch(API)
         .then(response => response.json())
         .then(data => this.setState({ datta: data }));
      
   }
  render() {
    const { hit } = this.state;
    
    return (
      <div className="flex">
        <form onSubmit={this.handleSubmitElement} >
          <label>
          <input type="text"  ref={this.input_link} placeholder="Input image link"/>
            <input type="text" ref={this.input_text} placeholder="Input text" />
          </label>
          <button type="submit" class="submit" >Add</button>
        </form>
        <br /><br />
        {hit.map(hit =>
          <div key={hit.id} className="flex-itm" >
             <img src={hit.url} width="100%" />
            <div key={hit.id} className="close" onClick={() => { this.handleDeleteElement(hit.id) }}>X</div>
            <div className="dop_info">{hit.title}</div>
          
          </div>
        )}
      </div>
    );
  }
 
}
//