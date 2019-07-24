import React, { Component } from "react";
import Checkbox from "../../../node_modules/react/";

export default class EditTask extends Component {
  state = {
    task: this.props.task,
    date: this.props.date,
    complete: this.props.complete
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewTask = evt => {
    evt.preventDefault();

    let task = {
      task: this.state.task,
      date: this.state.date,
      complete: this.state.complete
    };

    this.props.putTask(task).then(() => this.props.history.push("/tasks"));
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
        </form>
      </React.Fragment>
    );
  }
}
