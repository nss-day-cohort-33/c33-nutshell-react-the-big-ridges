import React, { Component } from "react";
import APIManager from "../../module/APIManager";

export default class EventsEditForm extends Component {
  // Set initial state
  state = {
    userId: "",
    eventTitle: "",
    date: "",
    time: "",
    location: ""
    // id: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingEvent = evt => {
    evt.preventDefault();
     {
      const editedEvent = {
        userId: parseInt(sessionStorage.getItem("userId")),
        title: this.state.eventTitle,
        date: this.state.date,
        time: this.state.time,
        location: this.state.location,
        id: this.props.match.params.eventId
      };

      this.props
        .updateEvent(editedEvent)
        .then(() => this.props.history.push("/events"));
    }
  };

  componentDidMount() {
    APIManager.get("events", this.props.match.params.eventId).then(event => {
      this.setState({
        userId: event.userId,
        eventTitle: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        eventId: event.id
      });
    });
  }

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
                  value={this.state.eventTitle}
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
                  value={this.state.date}
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
                  value={this.state.time}
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
                  value={this.state.location}
                />
              </div>
              <button
                type="submit"
                onClick={this.updateExistingEvent}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </React.Fragment>
        );
      }
    }
