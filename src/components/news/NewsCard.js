import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./News.css"

export default class NewsCard extends Component {
    render() {
        return (
            <div key={this.props.article.id} className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h5>{this.props.article.title}</h5>
                        <Link className="nav-link" to={this.props.article.url}>Article Link</Link>
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
                        <a href="http://localhost:5002"
                            onClick={() => this.props.deleteArticle(this.props.article.id)}
                            className="card-link">Delete</a>
                    </div>
                </div>
            </div>
        )
    }
}