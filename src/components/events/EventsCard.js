import React, { Component } from "react";
import "./events.css";
// import APIManager from "../../module/APIManager";

export default class EventsCard extends Component {
  editButton = (
    <button
      type="button"
      className="btn-success"
      onClick={() => {
        this.props.history.push(`/events/${this.props.event.id}/edit`);
      }}
    >
      Edit
    </button>
  );

  deleteButton = (
    <button
      onClick={() => this.props.deleteEvent(this.props.event.id)}
      className="card-link"
    >
      Delete
    </button>
  );

  render() {
    return (
      <div key={this.props.event.id} className="card">
        <div className="card-body">
          <div class-name="card-title">
            <h5>Event Title: {this.props.event.title}</h5>
            <h5>Event Date: {this.props.event.date}</h5>
            <h5>Event Time: {this.props.event.time}</h5>
            <h5>Event Location: {this.props.event.location}</h5>
            <div>
              {parseInt(this.props.event.userId) ===
              parseInt(sessionStorage.getItem("userId"))
                ? this.editButton
                : null}
            </div>
            <div>
              {parseInt(this.props.event.userId) ===
              parseInt(sessionStorage.getItem("userId"))
                ? this.deleteButton
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
