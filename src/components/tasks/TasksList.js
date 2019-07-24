import React, { Component } from "react";
import TasksCard from "./TasksCard";

export default class TasksList extends Component {
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
          {this.props.tasks.map(task => (
            <TasksCard key={task.id} task={task} {...this.props} />
          ))}
        </section>
      </React.Fragment>
    );
  }
}
