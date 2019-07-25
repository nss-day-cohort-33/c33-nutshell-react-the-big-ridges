import React, { Component } from "react";
import APIManager from "../../module/APIManager";

export default class TaskEditForm extends Component {
  state = {
    userId: "",
    task: "",
    date: "",
    complete: false
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingtask = evt => {
    evt.preventDefault();

    const editedTask = {
      id: this.props.match.params.taskId,
      userId: parseInt(sessionStorage.getItem("userId")),
      task: this.state.task,
      date: this.state.date,
      complete: this.state.complete
    };

    this.props
      .updateTask(editedTask)
      .then(() => this.props.history.push("/tasks"));
  };

  componentDidMount() {
    return APIManager.get("tasks", this.props.match.params.taskId).then(
      task => {
        this.setState({
          userId: task.userId,
          task: task.task,
          date: task.date,
          complete: task.complete
        });
      }
    );
  }


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
              value={this.state.task}
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
              value={this.state.date}
            />
          </div>

          <button
            type="submit"
            onClick={this.updateExistingtask}
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
