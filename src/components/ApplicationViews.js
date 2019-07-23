// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import APIManager from "../module/APIManager";
import EventsList from "./events/EventsList";
import EventsForm from "./events/EventsForm";
import EventsEditForm from "./events/EventsEditForm";
import MessageList from "./messages/MessageList";
import MessageEditForm from "./messages/MessageEditForm";
import Login from "./authentication/Login";
import Register from "./authentication/Register";

class ApplicationViews extends Component {
  state = {
    events: [],
    news: [],
    tasks: [],
    messages: [],
    users: [],
    friends: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAll("events")
      .then(events => (newState.events = events))
      .then(() => this.setState(newState));
  }

  addEvent = event =>
    APIManager.post(event, "events")
      .then(() => APIManager.getAll("events"))
      .then(events =>
        this.setState({
          events: events
        })
      );

  updateEvent = editedEventObject => {
    return APIManager.put(editedEventObject, "events")
      .then(() => APIManager.getAll("events"))
      .then(events => {
        this.setState({
          events: events
        });
      });
  };

  deleteEvent = id => {
    console.log("flag", id);
    return APIManager.delete("events", id)
      .then(() => APIManager.getAll("events"))
      .then(events => {
        this.props.history.push("/events");
        this.setState({ events: events });
      });
  };

  state = {
    messages: [],
    tasks: [],
    events: [],
    news: [],
    users: []
  };

  componentDidMount() {
    const newState = {};
    console.log(newState);

    APIManager.getAllExpand("messages", "user").then(
      messages => (newState.messages = messages)
    );
    APIManager.getAll("users")
      .then(users => (newState.users = users))
      .then(() => this.setState(newState));
  }

  addMessage = message =>
    APIManager.post(message, "messages")
      .then(() => APIManager.getAllExpand("messages", "user"))
      .then(messages => {
        this.setState({
          messages: messages
        });
      });

  updateMessage = editedMessageObject => {
    return APIManager.put(editedMessageObject, "messages")
      .then(() => APIManager.getAllExpand("messages", "user"))
      .then(messages => {
        this.setState({
          messages: messages
        });
      });
  };

  addUser = user => {
    return APIManager.post(user, "users")
      .then(() => APIManager.getAll("users"))
      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Login {...props} />;
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} addUser={this.addUser} />;
          }}
        />

        <Route
          exact
          path="/news"
          render={props => {
            return null;
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact
          path="/events"
          render={props => {
            return (
              <EventsList
                {...props}
                deleteEvent={this.deleteEvent}
                events={this.state.events}
              />
            );
          }}
        />
        <Route
          path="/events/new"
          render={props => {
            return (
              <EventsForm
                {...props}
                addEvent={this.addEvent}
                events={this.state.events}
              />
            );
          }}
        />

        <Route
          path="/events/:eventId(\d+)/edit"
          render={props => {
            return (
              <EventsEditForm
                {...props}
                events={this.state.events}
                updateEvent={this.updateEvent}
              />
            );
          }}
        />

        <Route
          exact
          path="/messages"
          render={props => {
            return (
              <MessageList
                {...props}
                messages={this.state.messages}
                addMessage={this.addMessage}
              />
            );
          }}
        />

        <Route
          path="/messages/:messageId(\d+)/edit"
          render={props => {
            return (
              <MessageEditForm
                {...props}
                messages={this.state.messages}
                updateMessage={this.updateMessage}
              />
            );
          }}
        />

        <Route
          path="/messages"
          render={props => {
            return null;
          }}
        />

        <Route
          path="/tasks"
          render={props => {
            return null;
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
