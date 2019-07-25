import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "./task.css"

export default class TaskCard extends Component {
  handleCheck = event => {
    event.preventDefault();
    this.props.task.complete = !this.props.task.complete;
    this.props.updateTask(this.props.task);
  };


  render() {
    return (
      <div key={this.props.task.id} className="card bg-light w-25">
        <div className="card-body">
          <div className="card-title">
            {this.props.task.complete ? (
                <h5><del>{this.props.task.task}</del></h5>
            ) : (
              <h5>{this.props.task.task}</h5>
            )}
            <h5>{this.props.task.date}</h5>
            <label>
              Complete:
              <input
                name="complete"
                type="checkbox"
                checked={this.props.task.complete}
                onClick={this.handleCheck}
              />
            </label>

            <button
              onClick={() =>
                this.props.history.push(`/tasks/${this.props.task.id}/edit`)
              }
              className="btn-success"
              type="button"
            >
              Edit
            </button>
            <button
            type="button"
              onClick={() => this.props.deleteTask(this.props.task.id)}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
