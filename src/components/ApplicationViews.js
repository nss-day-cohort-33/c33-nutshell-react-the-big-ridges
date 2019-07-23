import { Route } from "react-router-dom";
import React, { Component } from "react";
import NewsList from "./news/NewsList";
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm"
import Login from "./authentication/Login";
import APIManager from "../module/APIManager";
import Register from "./authentication/Register"

export default class ApplicationViews extends Component {

  state = {
  message: [],
  tasks: [],
  events: [],
  news: [],
  users: []
}

  componentDidMount() {
    const newState = {
    }
    APIManager.getAll("users").then(users => newState.users = users)
    APIManager.getAll("news").then(news => newState.news = news)
    console.log(newState)
  }

  addUser = (user) => {
    return APIManager.post(user, "users")
    .then(() =>
      APIManager.getAll("users")
    )
    .then(users =>
      this.setState({
        users: users
      })
    )
  }

  deleteArticle = (id) => {
    return APIManager.delete("news", id)
    .then((news) => {
        this.props.history.push("/news")
        this.setState({
        news: news
      })
    }
  )
}

  addArticle = (article) => {
    return APIManager.post(article, "news")
    .then(news =>
        this.setState({
        news: news
      })
    )
  }

  updateArticle = (editedArticle) => {
    return APIManager.put(editedArticle, "news")
    .then(news =>
    this.setState({
        news: news
    })
  )
}


  render() {
    return (
      <React.Fragment>

          <Route
            exact path="/" render={props => {
              return <Login {...props} />
             // Remove null and return the component which will show news articles
            }}
          />

          <Route
            exact path="/register" render={ props => {
              return <Register  {...props}
                                addUser={this.addUser} />
            }} />
{/* Start news routes */}
          <Route
            exact path="/news" render={ props => {
              return <NewsList  {...props}
                                deleteArticle={this.deleteArticle}
                                news={this.state.news} />
            }}
          />
          <Route
            path="/news/new" render={ props => {
                    return <NewsForm  {...props}
                                        addArticle={this.addArticle} />
            }} />
          <Route
            path="/news/:newsId(\d+)/edit" render={ props => {
                    return <NewsEditForm
                                    {...props}
                                    updateArticle={this.updateArticle} />
                }}/>
{/* End news routes */}
          <Route
          exact path="/events" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
