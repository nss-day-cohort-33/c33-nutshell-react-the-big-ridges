import React, { Component } from "react"
// import { Link } from "react-router-dom"

import "./message.css"

export default class MessageCard extends Component {

    render() {
        return (
            <div key={this.props.message.id} className="card">
                <div className="card-body">
                    <div className="card-title" >
                        {
                       <h4>{this.props.message.user.name }: {this.props.message.message}</h4>
                        }
                    </div>
                    <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push(`/messages/${this.props.message.id}/edit`);
                            }}
                            >
                            Edit
                            </button>
                </div>
            </div>
        )
    }
}