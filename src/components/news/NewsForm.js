import React, { Component } from "react";
import "./News.css"

export default class NewsForm extends Component {
    state = {
        userId: "",
        articleTitle: "",
        url: "",
        synopsis: "",
        id: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

    constructNewArticle = evt => {
        evt.preventDefault();
        // if (this.state.articleTitle === "") {
        //   window.alert("Please enter title");
        // } else {
          const article = {
            userId: parseInt(sessionStorage.getItem("userId")),
            title: this.state.articleTitle,
            url: this.state.url,
            synopsis: this.state.synopsis,
            timeStamp: Date.now()
          }
        this.props
            .addArticle(article)
            .then(() => this.props.history.push("/news"));
        // }
    }


    render() {
        return (
        <React.Fragment>
            <form className="newsForm">
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
                onClick={this.constructNewArticle}
                className="btn btn-primary"
            >
                Submit
            </button>
            </form>
        </React.Fragment>
        );
    };
}