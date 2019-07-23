import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import MessageList from "./messages/MessageList"
import APIManager from "../module/APIManager"
import MessageEditForm from "./messages/MessageEditForm"

export default class ApplicationViews extends Component {

  state = {
    messages: [],
    tasks: [],
    events: [],
    news: [],
    user: []
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
   .then(() => APIManager.getAllExpand("messages", "users"))
   .then(messages => {
       this.setState({
           messages: messages
       })
   })

   updateMessage = (editedMessageObject) => {
    return APIManager.put("messages", editedMessageObject)
    .then(() => APIManager.getAllExpand("messages", "users"))
    .then(messages => {
      this.setState({
        messages: messages
      })
    });
  };




  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
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
