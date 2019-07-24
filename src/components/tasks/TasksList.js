import React, { Component } from "react";
import TasksCard from "./TasksCard";

export default class TasksList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="tasks">
          {this.props.tasks.map(task => (
            <TasksCard key={task.id} task={task} {...this.props} />
          ))}
        </section>
      </React.Fragment>
    );
  }
}
