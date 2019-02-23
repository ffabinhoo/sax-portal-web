import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ResearchList   from "./components/research.list.component";
import ResearchEdit   from "./components/research.edit.component";
import ResearchCreate from "./components/research.create.component";


class App extends Component {
  render() {
    return (

      <Router>
        <div className="container">
          
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/" alt="">Sax Institute</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Research <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/create">Create </Link>
              </li>
              
            </ul>
          </div>  
        </nav>

          <Route path="/" exact component={ResearchList} />
          <Route path="/edit/:id" component={ResearchEdit} />
          <Route path="/create" component={ResearchCreate} />
          
        </div>
      </Router>
    );
  }
}

export default App;
