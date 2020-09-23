import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
// import $ from 'jquery';
import axios from 'axios';


class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phone: '',
			password: ''
		};

		this.update = this.update.bind(this);
		this.displayLogin = this.displayLogin.bind(this);
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	displayLogin(e) {
		e.preventDefault();
		const url = 'http://192.168.1.108:8080/api/v1/user/login/';
		const phone = this.state.phone;
		const password = this.state.password;
		let bodyFormData = new FormData();
		bodyFormData.set('phone', phone);
		bodyFormData.set('password', password);
		axios.post(url, bodyFormData)
			.then(result => {
				if (result.data.status === 2) {
					this.setState({redirect: true});
					alert("User is logged in successfully user token is "+result.data.token);
				}else {
					alert(result.data.non_field_errors);
				}
			})
			.catch(error => {
				console.log(error);
				console.log("Error from here",error);
			});

	}
	renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />
        }
    };

	render() {
		return (
			<div className="login">
				<div>
				<form onSubmit={this.displayLogin}>
					<h2>Login</h2>
					<div className="username">
						<input
							type="text"
							placeholder="Phone Number ..."
							value={this.state.email}
							onChange={this.update}
							name="phone"
							required
						/>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password..."
							value={this.state.password}
							onChange={this.update}
							name="password"
							required
						/>
					</div>

					<input type="submit" value="Login" />
				</form>

				<Link to="/register">Create an account</Link>
			</div>
			{this.renderRedirect()}
			</div>
		);
	}
}

export default Login;
