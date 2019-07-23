import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login"
import APIManager from "../module/APIManager"
import Register from "./authentication/Register";

export default class ApplicationViews extends Component {

  state = {
  userId: [],
  message: [],
  tasks: [],
  events: [],
  news: [],
  users: []
}

  componentDidMount() {
    const newState = {
    }

    APIManager.getAll("users").then(users => newState.users = users)
    console.log(newState)
  }

  addUser = (user) => {
    return APIManager.post(user, "users")
    .then(() =>
      APIManager.getAll("users")
    )
    .then(users =>
      this.setState({
        users: users
      })
    )
  }


  render() {
    return (
      <React.Fragment>

          <Route
            exact path="/" render={props => {
              return <Login {...props} />
             // Remove null and return the component which will show news articles
            }}
          />

          <Route
            exact path="/register" render={ props => {
              return <Register  {...props}
                                addUser={this.addUser} />
            }} />

          <Route
            exact path="/news" render={props => {
              return null
             // Remove null and return the component which will show news articles
            }}
          />

          <Route
          exact path="/events" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
