import React, { Component } from "react";

export default class TaskForm extends Component {
  state = {
    task: "",
    date: "",
    id: "",
    userId: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewTask = evt => {
    evt.preventDefault();

    let newTask = {
      task: this.state.task,
      date: this.state.date,
      complete: false,
      userId: Number(sessionStorage.getItem("userId"))
    };

    this.props.addTask(newTask).then(() => this.props.history.push("/tasks"));
  };
  render() {
    return (
      <React.Fragment>
        <form className="taskForm">
          <div className="form-group">
            <label htmlFor="task">Task name</label>
            <input
              autoFocus
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="task"
              placeholder="ex. Rake the Leaves"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
            />
          </div>

          <button
            type="submit"
            onClick={this.constructNewTask}
            className="btn btn-primary"
          >
            Submit
          </button>
          <button
            type="submit"
            onClick={() => this.props.history.push("/tasks")}
            className="btn btn-primary"
          >
            Cancel
          </button>
        </form>
      </React.Fragment>
    );
  }
}
