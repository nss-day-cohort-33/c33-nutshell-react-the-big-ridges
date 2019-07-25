import { Route } from "react-router-dom";
import React, { Component } from "react";
import MessageList from "./messages/MessageList"
import MessageEditForm from "./messages/MessageEditForm"
import APIManager from "../module/APIManager"
import Login from "./authentication/Login"
import Register from "./authentication/Register";
import FriendRequest from "./messages/FriendRequest"
import FriendsList from "./friends/FriendsList"
export default class ApplicationViews extends Component {

  state = {
    messages: [],
    tasks: [],
    events: [],
    news: [],
    users: [],
    friends: []
  }


   componentDidMount() {
    const newState = {}
    const id = parseInt(sessionStorage.getItem("userId"))
    console.log(id)


    APIManager.getAll("friends")
    .then(friends => newState.friends = friends)
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

  addFriend = (friend) => {
    if(parseInt(sessionStorage.getItem("userId") === friend.user_Id && friend.userId !== this.state.friends.userId) ) {
    return APIManager.post(friend, "friends")
    .then (() =>
    APIManager.getAll("friends")
    )
    .then ( friends =>
      this.setState({
        friends: friends
      })
      )
    }
    else {
      alert("you are already friends!")
     return APIManager.getAll("friends")
    .then ( friends =>
      this.setState({
        friends: friends
      })
      )
    }
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
            return <FriendsList {...props} users={this.state.users} friends={this.state.friends}/>

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
        <Route exact path="/messages/:userId(\d+)/:friendName/friendRequest" render={(props) => {
                    return <FriendRequest {...props} addFriend={this.addFriend}/>
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
