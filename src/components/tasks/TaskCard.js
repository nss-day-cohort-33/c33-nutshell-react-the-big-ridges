import React, { Component } from "react";
import "./task.css"

export default class TaskCard extends Component {
  completedTask(id) {
    let fullTask = {
      id: id,
      complete: true,
      userId: parseInt(sessionStorage.getItem("userId"))
    };
    this.props.patchTask(fullTask);
  }

  taskFunctions = (
    <div>
      <div>
        <label>
          Complete:
          <input
            name="complete"
            type="checkbox"
            onClick={() => {
              // this.completedTask(task.id)
            }}
          />
        </label>
      </div>
      <button
        type="button"
        className="btn-success"
        onClick={() =>
          this.props.history.push(`/tasks/${this.props.task.id}/edit`)
        }
      >
        Edit
      </button>
      <button
        onClick={() => this.props.deleteTask(this.props.task.id)}
        className="btn-danger"
      >
        Delete
      </button>
    </div>
  );

  render() {
    return (
      <div key={this.props.task.id} className="card w-25 bg-light">
        <div className="card-body">
          <div className="card-title">
            <h5>{this.props.task.task}</h5>
            <h5>{this.props.task.date}</h5>
            <div className="userFunctions">{this.taskFunctions}</div>
          </div>
        </div>
      </div>
    );
  }
}
