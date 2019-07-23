import React, { Component } from "react"
import APIManager from "../../module/APIManager"

export default class MessageEditForm extends Component {

    state = {
      message: "",
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingMessage = evt => {
      evt.preventDefault()


      {
        const editedMessage = {
          id: this.props.match.params.messageId,
          message: this.state.message,
          timeStamp: Date.now(),
          userId: parseInt(sessionStorage.getItem("user"))
        };

            this.props.updateMessage(editedMessage)
            .then(() => this.props.history.push("/messages"))
    }
  }

    componentDidMount() {
      APIManager.get("messages", this.props.match.params.messageId)
      .then(message => {
        this.setState({
         message: message.message
        });
      });
    }


    render() {
      return (
        <React.Fragment>
          <form className="messageForm">
            <div className="form-group">
              <label htmlFor="messageName">Message</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="message"
                value = {this.state.message}
              />
            </div>
            <button
              type="submit"
              onClick={this.updateExistingMessage}

              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}


