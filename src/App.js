import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Login from "./components/auth/login/login";

import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/auth/signup/signup";
import Dashboard from "./components/user/dashboard/dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <main className="main">
          <Route path="/" exact render={() => <Login />} />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/dashboard" render={() => <Dashboard />} />
        </main>
      </Router>
    </Provider>
  );
}

export default App;
