import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import TaskList from "./tasks/TaskList";
import { withRouter } from "react-router";
import APIManager from "../module/APIManager";
import EventsList from "./events/EventsList";
import EventsForm from "./events/EventsForm";
import EventsEditForm from "./events/EventsEditForm";
import MessageList from "./messages/MessageList";
import MessageEditForm from "./messages/MessageEditForm";
import NewsList from "./news/NewsList";
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import FriendRequest from "./messages/FriendRequest"
import FriendsList from "./friends/FriendsList"
import TaskEditForm from "./tasks/TaskEditForm";
import TaskForm from "./tasks/TaskForm";


class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    events: [],
    news: [],
    friends: [],
    tasks: [],
    messages: [],
    users: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAll("friends")
    .then(friends => newState.friends = friends)
    APIManager.getAll("events")
      .then(events => (newState.events = events))
    APIManager.getAllExpand("messages", "user")
    .then( messages => (newState.messages = messages))
    APIManager.getAll("users")
      .then(users => (newState.users = users))
    APIManager.getAll("tasks")
    .then(tasks => (newState.tasks = tasks));
    APIManager.getAllMessages("news")
      .then(news => (newState.news = news))
      .then(() => this.setState(newState));
  }

  addMessage = message =>
    APIManager.post(message, "messages")
      .then(() => APIManager.getAllExpand("messages", "user"))
      .then(messages => {
        this.setState({
          messages: messages
        });
      });

  updateMessage = editedMessageObject => {
    return APIManager.put(editedMessageObject, "messages")
      .then(() => APIManager.getAllExpand("messages", "user"))
      .then(messages => {
        this.setState({
          messages: messages
        });
      });
  };

  addUser = user => {
    return APIManager.post(user, "users")
      .then(() => APIManager.getAll("users"))
      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  addEvent = event =>
    APIManager.post(event, "events")
      .then(() => APIManager.getAll("events"))
      .then(events =>
        this.setState({
          events: events
        })
      );

  updateEvent = editedEventObject => {
    return APIManager.put(editedEventObject, "events")
      .then(() => APIManager.getAll("events"))
      .then(events => {
        this.setState({
          events: events
        });
      });
  };

  deleteEvent = id => {
    console.log("flag", id);
    return APIManager.delete("events", id)
      .then(() => APIManager.getAll("events"))
      .then(events => {
        this.props.history.push("/events");
        this.setState({ events: events });
      });
  };

  addMessage = message =>
    APIManager.post(message, "messages")
      .then(() => APIManager.getAllExpand("messages", "user"))
      .then(messages => {
        this.setState({
          messages: messages
        });
      });

  updateMessage = editedMessageObject => {
    return APIManager.put(editedMessageObject, "messages")
      .then(() => APIManager.getAllExpand("messages", "user"))
      .then(messages => {
        this.setState({
          messages: messages
        });
      });
  };

  deleteArticle = id => {
    return APIManager.delete("news", id)
      .then(() => APIManager.getAll("news"))
      .then(news => {
        // this.props.history.push("/news")
        this.setState({
          news: news
        });
      });
  };

  addArticle = article => {
    return APIManager.post(article, "news")
      .then(() => APIManager.getAll("news"))
      .then(news =>
        this.setState({
          news: news
        })
      );
  };

  addFriend = (friend) => {
    const istrue = false
    console.log(this.state.friends.userId)
    if(parseInt(sessionStorage.getItem("userId")) === friend.user_Id && forEach) {
    return APIManager.post(friend, "friends")
    .then (() =>
    APIManager.getAll("friends")
    )
    .then ( friends =>
      this.setState({
        friends: friends
      })
      )
    }
    else {
      alert("you are already friends!")
     return APIManager.getAll("friends")
    .then ( friends =>
      this.setState({
        friends: friends
      })
      )
    }
  }

  updateArticle = (editedArticle) => {
    return APIManager.put(editedArticle, "news")
      .then(() => APIManager.getAll("news"))
      .then(news =>
        this.setState({
          news: news
        })
      );
  };

  deleteTask = id => {
    return APIManager.delete("tasks", id)
      .then(() => APIManager.getAll("tasks"))
      .then(tasks => {
        this.setState({
          tasks: tasks
        });
      });
  };

  addTask = task => {
    return APIManager.post(task, "tasks")
      .then(() => APIManager.getAll("tasks"))

      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  };

  updateTask = changedTask => {
    return APIManager.put(changedTask, "tasks")
      .then(() => APIManager.getAll("tasks"))

      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  };

  patchTask = patchedTask => {
    return APIManager.patch(patchedTask, "tasks")
      .then(() => APIManager.getAll("tasks"))

      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Login {...props} />;
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} addUser={this.addUser} />;
          }}
        />
        {/* Start news routes */}
        <Route
          exact
          path="/news"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <NewsList
                  {...props}
                  deleteArticle={this.deleteArticle}
                  news={this.state.news}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/news/new"
          render={props => {
            return <NewsForm {...props} addArticle={this.addArticle} />;
          }}
        />
        <Route
          exact
          path="/news/:newsId(\d+)/edit"
          render={props => {
            return (
              <NewsEditForm {...props} updateArticle={this.updateArticle} />
            );
          }}
        />
        {/* End news routes */}
        <Route
          exact
          path="/events"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EventsList
                  {...props}
                  deleteEvent={this.deleteEvent}
                  events={this.state.events}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route path="/friends" render={props => {
            return <FriendsList {...props} users={this.state.users} friends={this.state.friends} addFriend={this.addFriend}/>
        }} />

        <Route path="/events/new" render={props => {
            return (<EventsForm {...props} addEvent={this.addEvent} events={this.state.events} />
            );
          }}
        />

        <Route
          path="/events/:eventId(\d+)/edit" render={props => {
            return (
              <EventsEditForm
                {...props}
                events={this.state.events}
                updateEvent={this.updateEvent}
              />
            );
          }}
        />

        <Route path="/messages/:messageId(\d+)/edit" render={props => {
                     return <MessageEditForm {...props} messages={this.state.messages} updateMessage={this.updateMessage}/>
                }} />

        <Route exact path="/messages/:userId(\d+)/:friendName/friendRequest" render={(props) => {
                    return <FriendRequest {...props} addFriend={this.addFriend} />
                }} />

        <Route exact path="/tasks" render={props => {
            if (this.isAuthenticated()) {
              return (
                <TaskList
                  {...props}
                  tasks={this.state.tasks}
                  deleteTask={this.deleteTask}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/tasks/new"
          render={props => {
            return (
              <TaskForm
                {...props}
                tasks={this.state.tasks}
                addTask={this.addTask}
              />
            );
          }}
        />
        <Route
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return (
              <TaskEditForm
                {...props}
                tasks={this.state.tasks}
                updateTask={this.updateTask}
              />
            );
          }}
        />

        <Route
          exact
          path="/tasks"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact path="/tasks"
          exact
          path="/friends"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/messages"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <MessageList
                  {...props}
                  messages={this.state.messages}
                  addMessage={this.addMessage}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
