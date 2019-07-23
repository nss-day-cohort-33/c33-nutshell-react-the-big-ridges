// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import APIManager from "../module/APIManager";
import EventsList from "./events/EventsList";
import EventsForm from "./events/EventsForm";
import EventsEditForm from "./events/EventsEditForm";

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

  // deleteEvent = id => {
  //   return fetch(`http://localhost:5002/events/${id}`, {
  //     method: "DELETE"
  //   })
  //     .then(APIManager.getAll("events"))
  //     .then(events => {
  //       this.props.history.push("/events");
  //       this.setState({ events: events });
  //     });
  // };

  deleteEvent = id => {
    console.log("flag", id)
    return APIManager.delete("events", id)
      .then(() => APIManager.getAll("events"))
      .then(events => {
        this.props.history.push("/events");
        this.setState({ events: events });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return null;
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
          path="/friends"
          render={props => {
            return null;
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

export default withRouter(ApplicationViews)