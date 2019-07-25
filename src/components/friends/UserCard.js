import React, { Component } from "react"
// import { Link } from "react-router-dom"

import "./friends.css"

export default class UserCard extends Component {


    render() {

        return (
            <div key={this.props.user.id} className="card">
                <div className="card-body">
                    <div className="card-title" >
                        {
                            <h2>{this.props.user.name}</h2>
                        }
                            </div>
                </div>
            </div>
        )
    }
}

