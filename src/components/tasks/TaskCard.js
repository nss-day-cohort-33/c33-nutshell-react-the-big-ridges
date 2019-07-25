import React, { Component } from "react";

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
  );

  render() {
    return (
      <div key={this.props.task.id} className="card">
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
