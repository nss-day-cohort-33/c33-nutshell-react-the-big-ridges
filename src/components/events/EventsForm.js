import React, { Component } from "react";
import "./events.css";


export default class EventsForm extends Component {
  // Set initial state
  state = {
    userId: "",
    eventTitle: "",
    date: "",
    time: "",
    location: "",
    id: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewEvent = evt => {
    evt.preventDefault();
      const event = {
        userId: parseInt(this.state.userId),
        title: this.state.eventTitle,
        date: this.state.date,
        time: this.state.time,
        location: this.state.location
      };

      // Create the event and redirect user to event list
      this.props
        .addEvent(event)
        .then(() => this.props.history.push("/events"));
  };

  render() {
    return (
      <React.Fragment>
        <form className="eventForm">
          <div className="form-group">
            <label htmlFor="eventName">Event title</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventTitle"
              placeholder="Event title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
              placeholder="Date"
            />
            </div>
            <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="time"
              placeholder="Time"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="location"
              placeholder="Location"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewEvent}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
