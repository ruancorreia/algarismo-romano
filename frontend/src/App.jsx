import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Ranking from "./components/Ranking";
import Admin from "./components/Admin";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/ranking" component={Ranking} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
};

export default App;
