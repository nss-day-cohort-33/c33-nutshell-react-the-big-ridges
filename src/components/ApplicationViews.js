import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import TasksManager from "../module/TasksManager";
import TasksList from "./tasks/TasksList";

export default class ApplicationViews extends Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    TasksManager.getAllTasks().then(allTasks => {
      this.setState({
        tasks: allTasks
      })
    })
  }
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return null;
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact
          path="/events"
          render={props => {
            return null;
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends"
          render={props => {
            return null;
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages"
          render={props => {
            return null;
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          exact
          path="/tasks"
          render={props => {
            return (
              <TasksList
                {...props}
                tasks={this.state.tasks}
                deleteTask={this.deleteTask}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
