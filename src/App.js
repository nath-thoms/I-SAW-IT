import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Products from './components/Products';

class App extends Component {

  state = {
    data: null
  }

  

  render() {

    return (
      <div className="App">
        {/* <header className="App-header">
          I Saw It First - Technical Test 
        </header> */}
        
        <div className="Products-Component">
          <Products/>
        </div>

      </div>
    );
  }
}

export default App;
