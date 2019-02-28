import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ResearchList   from "./components/research.list.component";
import UserList   from "./components/user.list.component";
import ResearchEdit   from "./components/research.edit.component";
import UserEdit   from "./components/user.edit.component";
import ResearchCreate from "./components/research.create.component";
import UserCreate from "./components/user.create.component";
import NavBar         from "./components/navbar.component";


class App extends Component {
  render() {
    return (

      <Router>
        <div className="container">
          
          <NavBar></NavBar>

          <Route path="/" exact component={ResearchList} />
          <Route path="/research/edit/:id" component={ResearchEdit} />
          <Route path="/research/create" component={ResearchCreate} />
          <Route path="/user/list" component={UserList} />
          <Route path="/user/create" component={UserCreate} />
          <Route path="/user/edit/:id" component={UserEdit} />
          
        </div>
      </Router>
    );
  }
}

export default App;
