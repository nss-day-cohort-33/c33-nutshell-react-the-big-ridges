import React, { Component } from "react";
// import { Link } from "react-router-dom"
// import { Redirect } from 'react-router'
import "./News.css";

export default class NewsCard extends Component {
  render() {
    return (
      <div key={this.props.article.id} className="card">
        <div className="card-body d-flex flex-wrap">
          <div className="card-title">
            <h5>{this.props.article.title}</h5>
            {/* <Link className="nav-link" to={this.props.article.url}>Article Link</Link> */}
            <a target="_blank" href={this.props.article.url}>
              Article Link
            </a>
            <p>{this.props.article.synopsis}</p>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(`/news/${this.props.article.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.deleteArticle(this.props.article.id);
                this.props.history.push("/news");
              }}
              className="card-link"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
