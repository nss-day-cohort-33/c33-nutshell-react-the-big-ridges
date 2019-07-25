import React, { Component } from 'react';
import "./friends.css"
import UserCard from "./UserCard"
import UserCardforFriends from "./UserCardForFriends"





export default class FriendsList extends Component {




    render () {

        // const notFriends = this.props.friends
        // .filter(friend => parseInt(friend.user_Id) === parseInt(sessionStorage.getItem("userId")) )
        // // .map(friend => {
        // //     return this.props.users
        // //     .filter(user => user.id !== friend.userId)
        // // })

        // console.log("notfriends", notFriends)



        // const notFriendsUnique = [...new Set(notFriends.map(notFriend => notFriend.userId))]
        // console.log("notfriendsU", notFriendsUnique)


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
                <h2>All Users</h2>

                {
                    this.props.users
                    .map(user => <UserCardforFriends key={user.id} user={user} {...this.props}/>)
                }
            </div>


            </section>
            </React.Fragment>
        )
    }
}


// .map(user => <UserCard key={user.id} user={user} {...this.props}/>)
