import React, { Component } from "react";
import "./events.css";
// import APIManager from "../../module/APIManager";

export default class EventsCard extends Component {
  render() {
    return (
      <div key={this.props.event.id} className="card">
        <div className="card-body">
          <div class-name="card-title">
            <h5>{this.props.event.title}</h5>
            <h5>{this.props.event.date}</h5>
            <h5>{this.props.event.time}</h5>
            <h5>{this.props.event.location}</h5>

            <button
              type="button"
              className="btn-success"
              onClick={() => {
                this.props.history.push(
                  `/events/${this.props.event.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => this.props.deleteEvent(
                this.props.event.id)}
              className="card-link"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
