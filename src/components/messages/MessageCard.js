import React, { Component } from "react"
// import { Link } from "react-router-dom"

import "./message.css"

export default class MessageCard extends Component {

        editButtonInstance = (
            <button
            type="button"
            className="btn btn-success"
            onClick={() => {
                this.props.history.push(`/messages/${this.props.message.id}/edit`);
            }}
            >
            Edit
            </button>
        )

    render() {

        return (
            <div key={this.props.message.id} className="card">
                <div className="card-body">
                    <div className="card-title" >
                        {
                       <h4>{this.props.message.user.name }: {this.props.message.message}</h4>
                        }
                    </div>
                            <div>
                         {
                            parseInt(this.props.message.userId) === parseInt(sessionStorage.getItem("user")) ?
                            this.editButtonInstance: null
                         }
                            </div>
                </div>
            </div>
        )
    }
}