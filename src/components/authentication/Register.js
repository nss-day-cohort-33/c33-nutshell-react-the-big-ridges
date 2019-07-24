import React, { Component } from "react"
import APIManager from "../../module/APIManager";

export default class Register extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    };

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegister = event => {
        event.preventDefault()
        APIManager.getAll("users").then(() => {
            let newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            };
            this.props.addUser(newUser)
            .then(() => APIManager.getAll("users").then(users => users.find(user => user.password === this.state.password))
            .then(foundUser =>
                sessionStorage.setItem("userId", foundUser.id))
                .then(() =>
                this.props.history.push("/news")))
        })
    }

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                <label htmlFor="inputName">
                    Name
                </label>
                <input onChange={this.handleFieldChange} type="name"
                       id="name"
                       placeholder="Name"
                       required="" autoFocus="" />
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
                    Register
                </button>
            </form>
        )
    }
}