import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
// import $ from 'jquery';
import axios from 'axios';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			password: '',
			password1: '',
			redirect: false,
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

	ismatch(v) {
		var exp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"); 
		return exp.test(v);
	 }

	ismobilemathc(m){
		var exp = new RegExp("^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$"); 
		return exp.test(m);
	 }

	displayLogin(e) {
	e.preventDefault();
	if (this.ismobilemathc(this.state.phone)){
		if (this.state.password ===this.state.password1 && this.state.password1.length >= 8){

			if (this.ismatch(this.state.password)){
				const url = 'http://192.168.1.108:8080/api/v1/user/signup/';
				const phone = this.state.phone;
				const password = this.state.password;
				const password1 = this.state.password1;
				let bodyFormData = new FormData();
				bodyFormData.set('phone', phone);
				bodyFormData.set('password', password);
				bodyFormData.set('password1', password1);
				axios.post(url, bodyFormData)
					.then(result => {
						if (result.data.status === 2) {
							console.log("Success First");
							// console.log(result.data);
							this.setState({redirect: true});	
							alert("User Successfully registerd please Login");
						}else {
							console.log(result);
							console.log("Errors");
							alert(result.data.error.phone);
						}
					})
					.catch(error => {
						console.log(error);
						console.log("Exceptions ",error);
					});
					}else{
				alert("Please Enter Password containing at Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
			}
	}else{
				alert("Password Should match and containing at Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
			}
	}else{
		alert("please Enter valid mobile Number");
		}
	}

	renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };
	render() {
		return (
			<div className="register">
				<div>
				<form onSubmit={this.displayLogin}>
					<h2>Register</h2>


					<div className="email">
						<input
							type="text"
							placeholder="Enter your Phone Number"
							name="phone"
							value={this.state.phone}
							onChange={this.update}
							required
						/>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={this.update}
							required
						/>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="confirm password"
							name="password1"
							value={this.state.password1}
							onChange={this.update}
							required
						/>
					</div>

					<input type="submit" value="Register" />
				</form>

				<Link to="/">Login Here</Link>
				</div>
				{this.renderRedirect()}
			</div>
		);
	}
}

export default Register;
