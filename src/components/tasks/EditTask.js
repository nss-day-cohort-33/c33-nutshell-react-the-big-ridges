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

  editTask = evt => {
    evt.preventDefault();

    let changedTask = {
      task: this.state.task,
      date: this.state.date,
      complete: this.state.complete
    };

    this.props.putTask(changedTask).then(() => this.props.history.push("/tasks"));
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
            onClick={this.editTask}
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
