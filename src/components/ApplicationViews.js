import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import MessageList from "./messages/MessageList"
import MessageEditForm from "./messages/MessageEditForm"
import APIManager from "../module/APIManager"
import Login from "./authentication/Login"
import Register from "./authentication/Register";

export default class ApplicationViews extends Component {

  state = {
    messages: [],
    tasks: [],
    events: [],
    news: [],
    users: []
  }

   componentDidMount() {
    const newState = {}
    console.log(newState)

    APIManager.getAllExpand("messages", "user")
    .then(messages => newState.messages = messages)
    APIManager.getAll("users")
    .then(users => newState.users = users)
    .then(() => this.setState(newState))

   }

   addMessage = message => APIManager.post(message, "messages")
   .then(() => APIManager.getAllExpand("messages", "user"))
   .then(messages => {
       this.setState({
           messages: messages
       })
   })

   updateMessage = (editedMessageObject) => {
    return APIManager.put(editedMessageObject, "messages")
    .then(() => APIManager.getAllExpand("messages", "user"))
    .then(messages => {
      this.setState({
        messages: messages
      })
    });
  };

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
          exact path="/messages" render={props => {
            return <MessageList {...props} messages={this.state.messages} addMessage={this.addMessage} />
          }}
        />

          <Route path="/messages/:messageId(\d+)/edit" render={props => {
                     return <MessageEditForm {...props} messages={this.state.messages} updateMessage={this.updateMessage}/>
                }} />

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
