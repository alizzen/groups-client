import React from 'react';
import axios from 'axios';

const API_URL = require('../config').API_URL;

export default class Login extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			error: null
		}
	};

	componentDidMount(){
		if(this.props.loggedIn){
			this.props.history.push('/');
		}
	};

	submit = (e) => {
		e.preventDefault();
		axios
			.create({ withCredentials: true })
			.post(`${API_URL}/login`, {
				username: this.state.username,
				password: this.state.password
			})
    	.then(res => {
    		this.props.onLogin();
    	})
    	.catch(error => {
	      this.setState({ error: error.response.data['msg'] });
	    })
	};

	render(){
		return(
			<div className="container-2">
				<h2 id="title" className="page-title">login</h2>

				<form onSubmit={this.submit} id="login-form" className="form">

					<p>username</p>

					<input 
						value={this.state.username} 
						onChange={(e) => this.setState({ username: e.target.value })} 
						className="field" 
						name="username" />

					<p>password</p>

					<input 
						value={this.state.password} 
						onChange={(e) => this.setState({ password: e.target.value })} 
						className="field" 
						name="password" 
						type="password" />

					<input className="btn" id="submit-btn" type="submit" value="login" />

				</form>

				{this.state.error &&
					<p>{this.state.error}</p>
				}
				
			</div>
		);
	};
}