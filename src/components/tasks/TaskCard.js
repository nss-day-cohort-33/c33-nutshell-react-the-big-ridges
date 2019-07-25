import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default class TaskCard extends Component {
  handleCheck = event => {
    event.preventDefault();
    this.props.task.complete = !this.props.task.complete;
    this.props.updateTask(this.props.task);
  };
  

  render() {
    return (
      <div key={this.props.task.id} className="card">
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

            <a
              href="#"
              onClick={() =>
                this.props.history.push(`/tasks/${this.props.task.id}/edit`)
              }
              className="card-link"
            >
              Edit
            </a>
            <a
              href="#"
              onClick={() => this.props.deleteTask(this.props.task.id)}
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
