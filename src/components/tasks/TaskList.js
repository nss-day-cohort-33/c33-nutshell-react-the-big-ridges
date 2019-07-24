import React, { Component } from "react";
import TaskCard from "./TaskCard";

export default class TaskList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="tasksButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/tasks/new");
            }}
          >
            Add Task
          </button>
        </div>
        <section className="tasks">
          {this.props.tasks
            .filter(
              task =>
                Number(task.userId) === Number(sessionStorage.getItem("userId"))
            )
            .map(task => (
              <TaskCard key={task.id} task={task} {...this.props} />
            ))}
        </section>
      </React.Fragment>
    );
  }
}
