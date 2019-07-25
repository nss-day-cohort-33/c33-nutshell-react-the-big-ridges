import React, { Component } from "react";
import "./events.css";
// import APIManager from "../../module/APIManager";

export default class EventsCard extends Component {

  render() {
    return (
      <div key={this.props.event.id} className="card w-25">
        <div className="card-body bg-light">
          <p className="card-title">{this.props.event.title}</p>
          <p>Date: {this.props.event.date}</p>
          <p>Time: {this.props.event.time}</p>
          <p>Location: {this.props.event.location}</p>
          <button
            type="button"
            className="btn-success"
            onClick={() => {
              this.props.history.push(`/events/${this.props.event.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => this.props.deleteEvent(this.props.event.id)}
            className="btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

{
  /* <div>
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
            </div> */
}
