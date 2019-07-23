import React, { Component } from "react"
import APIManager from "../../module/APIManager";


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()
        APIManager.getAll("users").then(users => {
            const singleUser = users.find(
                element =>
                element.email.toLowerCase() ===
                this.state.email.toLowerCase() &&
                element.password.toLowerCase() === this.state.password.toLowerCase()
            );
            if (singleUser) {
                sessionStorage.setItem("user", singleUser.id);
                this.props.history.push("/news");
            }
        }
    )}

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail">
                    Email address
                </label>
                <input onChange={this.handleFieldChange} type="email"
                       id="email"
                       placeholder="Email address"
                       required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                <button type="submit">
                    Sign in
                </button>
            </form>
        )
    }
}