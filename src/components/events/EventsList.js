import React, { Component } from "react";
// import { Link } from "react-router-dom";
import EventsCard from "./EventsCard"

export default class EventList extends Component {
    render() {
      return (
        <React.Fragment>
          <div className="createEventButton">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push("/events/new");
              }}
            >
              Create Event
            </button>
          </div>
          {this.props.events.map(event => (
            <EventsCard key={event.id} event={event} {...this.props} />
          ))}
        </React.Fragment>
      );
    }
  }
