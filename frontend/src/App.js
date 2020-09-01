import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import CreateNote from "./components/CreateNote";
import CreateUser from "./components/CreateUser";
import NotesList from "./components/NotesList";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="container p-4">
          <Route path="/" exact component={NotesList} />
          <Route path="/edit/:id" component={CreateNote} />
          <Route path="/create" component={CreateNote} />
          <Route path="/user" component={CreateUser} />
        </div>
      </Router>
    </div>
  );
}

export default App;
