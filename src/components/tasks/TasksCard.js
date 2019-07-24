import React, { Component } from "react";

export default class TasksCard extends Component {
  render() {
    return (
      <div key={this.props.task.userId} className="card">
        <div className="card-body">
          <div className="card-title">
            <h5>{this.props.task.task}</h5>
            <h5>{this.props.task.date}</h5>
            <a
              href="#"
              onClick={() => this.props.deleteTask(this.props.task.userId)}
              className="card-link"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
}
