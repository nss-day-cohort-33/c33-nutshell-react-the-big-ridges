import React, { Component } from "react";
import APIManager from "../../module/APIManager";
import "./News.css";

export default class NewsEditForm extends Component {
  state = {
    userId: "",
    title: "",
    url: "",
    synopsis: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingArticle = evt => {
    evt.preventDefault();

    if (this.state.title === "" || this.state.url === "" || this.state.synopsis === "" ) {
        window.alert("Please Fill Out All Sections");
    }
    if (!this.state.url.includes("https://") && !this.state.url.includes("http://")){
            window.alert("Please Add http:// or https:// to URL")
        }
    // if (!this.state.url.includes("http://" || "https://")){
    //         window.alert("Please Add http:// or https:// to URL")
    // }
    else {
        const editedArticle = {
            id: this.props.match.params.newsId,
            userId: parseInt(sessionStorage.getItem("userId")),
            title: this.state.title,
            url: this.state.url,
            synopsis: this.state.synopsis,
            timeStamp: Date.now()
        };

    this.props
      .updateArticle(editedArticle)
      .then(() => this.props.history.push("/news"));
    }
  };

  componentDidMount() {
    return APIManager.get("news", this.props.match.params.newsId).then(
      article => {
        this.setState({
          userId: article.userId,
          title: article.title,
          url: article.url,
          synopsis: article.synopsis
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <form className="newsEditForm">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="url"
              value={this.state.url}
            />
          </div>
          <div className="form-group">
            <label htmlFor="synopsis">Synopsis</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="synopsis"
              value={this.state.synopsis}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingArticle}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
