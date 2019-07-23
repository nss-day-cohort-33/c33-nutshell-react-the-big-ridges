import React, { Component } from 'react';
import "./message.css"
// import { Link } from "react-router-dom";
import MessageCard from "./MessageCard"
import APIManager from "../../module/APIManager"


export default class MessageList extends Component {

    state = {
        userId: "",
        message: "",

    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }

    constructNewMessage = evt => {
        evt.preventDefault();
        {
          const message = {
            userId: parseInt(sessionStorage.getItem("userId")),
            message: this.state.newMessage,
            timestamp: Date.now()
          };

          this.props
            .addMessage(message)

        }
      };

    render () {
        return (

            <React.Fragment>
            <section className="messages">
            {
                this.props.messages
                .map(message => <MessageCard key={message.id} message={message} {...this.props}/>

                )
            }
            </section>
            <form>
            <input
              type="text"
              required
              className="message-control"
              onChange={this.handleFieldChange}
              id="newMessage"
              placeholder="Create Message"
            />
            <div className="messageButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={this.constructNewMessage}>
                        Create Message
                    </button>
                </div>
                </form>
            </React.Fragment>
        )
    }
}