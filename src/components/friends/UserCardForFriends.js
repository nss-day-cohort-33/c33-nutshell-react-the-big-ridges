import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./friends.css"

export default class UserCard extends Component {


    render() {

        return (
            <div key={this.props.user.id} className="card">
                <div className="card-body">
                    <div className="card-title" >
                        {
                            <div>
                                <Link className="other-user-message" to={`/messages/${this.props.user.id}/${this.props.user.name}/friendRequest`}><h4 className="friendName">{this.props.user.name }</h4></Link>
                            </div>
                        }
                            </div>
                </div>
            </div>
        )
    }
}

