import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Counters from "./components/counters";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import Login from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  // state = {};
  // componentDidMount() {
  //   const user = auth.getCurrentUser();
  //   this.setState({ user });
  // }
  // state = {
  //   counters: [
  //     { id: 1, value: 5 },
  //     { id: 2, value: 0 },
  //     { id: 3, value: 0 },
  //     { id: 4, value: 0 },
  //   ],
  // };
  // handleIncrement = (counter) => {
  //   const counters = [...this.state.counters];
  //   const index = counters.indexOf(counter);
  //   counters[index] = { ...counters[index] };
  //   counters[index].value++;
  //   this.setState({ counters });
  // };
  // handleDecrement = (counter) => {
  //   const counters = [...this.state.counters];
  //   const index = counters.indexOf(counter);
  //   counters[index] = { ...counter };
  //   counters[index].value--;
  //   this.setState({ counters });
  // };
  // handleReset = () => {
  //   const counters = this.state.counters.map((counter) => {
  //     counter.value = 0;
  //     return counter;
  //   });
  //   this.setState({ counters });
  // };
  // handleDelete = (counterId) => {
  //   const counters = this.state.counters.filter((c) => c.id !== counterId);
  //   this.setState({ counters });
  // };
  render() {
    // const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        {/* <NavBar
          
          // totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        /> */}
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route render={(props) => <Movies {...props} />} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
        {/* <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main> */}
      </React.Fragment>
    );
  }
}

//     );
//   }
// }

export default App;
