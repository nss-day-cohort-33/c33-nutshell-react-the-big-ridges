import React, { Component } from "react"
// import { Link } from "react-router-dom"

import "./message.css"


export default class FriendRequest extends Component {


      createNewFriend = evt => {
        evt.preventDefault()


        {
          const createFriend = {
            user_Id: parseInt(sessionStorage.getItem("userId")),
            userId: parseInt(this.props.match.params.userId)
          };

              this.props.addFriend(createFriend)
              .then(() => this.props.history.push("/friends"))
      }
    }



    render() {

        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title" >
                      {
                          <h1>Would you Like to become friends with {this.props.match.params.friendName}?</h1>
                      }
                      <button
              type="submit"
              onClick={this.createNewFriend}

              className="btn btn-primary"
            >
              Let's be Friends!
            </button>
                </div>
            </div>
            </div>
        )
    }
}

