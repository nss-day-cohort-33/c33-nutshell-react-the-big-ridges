import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./message.css";

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
            <div key={this.props.message.id} className="card w-100">
                <div className="card-body">
                    <div className="card-titlem" >
                        {
                              parseInt(this.props.message.userId) !== parseInt(sessionStorage.getItem("userId")) ?
                              <div>
                              <Link className="other-user-message" to={`/messages/${this.props.message.userId}/${this.props.message.user.name}/friendRequest`}><h4 className="friendNamemm">{this.props.message.user.name }:</h4></Link><h4 className="other-user-messagemm">{this.props.message.message}</h4>
                              </div>
                              :
                            <h4>{this.props.message.user.name }: {this.props.message.message}</h4>
                        }
                    </div>
                            <div>
                         {
                            parseInt(this.props.message.userId) === parseInt(sessionStorage.getItem("userId")) ?
                            this.editButtonInstance: null
                         }
                            </div>
                </div>
            </div>
        )
    }
}

