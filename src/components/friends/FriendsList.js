import React, { Component } from 'react';
import "./friends.css"
import UserCard from "./UserCard"




export default class FriendsList extends Component {


    render () {
        return (

            <React.Fragment>
                <div>
                    <h2>FRIENDS</h2>
                </div>
            <section className="friends-list">

            {

                this.props.friends
                .filter(friend => parseInt(friend.user_Id) === parseInt(sessionStorage.getItem("userId")) )
                .map(friend => {
                    return this.props.users
                    .filter(user => user.id === friend.userId)
                    .map(user => <UserCard key={user.id} user={user} {...this.props}/>)
                }


                )
            }
            </section>
            <section className="non-friends-list">

            <div>
                <h2>Other Users</h2>
            </div>


            </section>
            </React.Fragment>
        )
    }
}