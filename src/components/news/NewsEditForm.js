import React, { Component } from "react"
import APIManager from "../../module/APIManager"
import "./News.css"

export default class NewsEditForm extends Component {
    state = {
        userId: "",
        articleTitle: "",
        url: "",
        synopsis: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingArticle = evt => {
      evt.preventDefault()

      if (!this.state.newsId) {
        window.alert("Please fix this Sam");
      } else {
        const editedArticle = {
            id: this.props.match.params.newsId,
            title: this.state.articleTitle,
            url: this.state.url,
            synopsis: this.state.synopsis
        };

    this.props.updateArticle(editedArticle)
    .then(() => this.props.history.push("/news"))
    }
  }

    componentDidMount() {
      return APIManager.get("news", this.props.match.params.newsId)
      .then(article => {
        this.setState({
          title: article.articleTitle,
          url: article.url,
          synopsis: article.synopsis
        });
      });
    }


    render() {
      return (
        <React.Fragment>
          <form className="newsEditForm">
            <div className="form-group">
                    <label htmlFor="articleTitle">Title</label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="articleTitle"
                    placeholder="Article Title"
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
                        placeholder="URL"
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
                        placeholder="Synopsis"
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