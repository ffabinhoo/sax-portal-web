import React, {Component} from 'react';
import axios from 'axios';

export default class UserCreate extends Component {

    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserLogin = this.onChangeUserLogin.bind(this);
        this.onChangeUserEnabled = this.onChangeUserEnabled.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onChangeUserPasswordConfirm = this.onChangeUserPasswordConfirm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        

        this.state = {
            name: '',
            login: '',
            password: '',
            passwordConfirm: '',
            isEnabled: '',
        }
    }

    
    messageString = ' ';
    buttonDisable = false;
    typeMessage = ' ';

    onChangeUserName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeUserLogin(e) {
        this.setState({
            login: e.target.value
        });
    }

    onChangeUserPassword(e)  {
        this.setState({
            password: e.target.value
        });
    }

    onChangeUserPasswordConfirm (e){
        this.setState({
            passwordConfirm: e.target.value
        });
    }
    
    onChangeUserEnabled(e) {
        this.setState({
            isEnabled: e.target.value
        });
        this.buttonDisable = false;
    }
    onSubmit(e){
        e.preventDefault();
        
        const newUser = {
            name: this.state.name,
            login: this.state.login,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
            isEnabled: this.state.isEnabled
        }
        this.setState({
           
        });
        
        if (this.state.password ===this.state.passwordConfirm){
            axios.post('http://localhost:4000/users/add',newUser)
            .then(res => console.log(res.data));

            this.setState({
                isEnabled: ''
            });

            this.messageString = 'created with success';
            this.typeMessage = 'alert alert-success';
            this.buttonDisable = true;
        }else{
            this.messageString = 'password confirmation not valid';
            this.typeMessage = 'alert alert-danger';
            this.buttonDisable = false;
        }

    }

    handleClick(e){
        this.props.history.push('/user/list');
    }

    render() {
        return (
            
            <div style={{marginTop: 20}}>
            {this.messageString !== '' ? 
                    <div className={this.typeMessage} role="alert">
                        {this.messageString}
                    </div>
                 : ''
            }
                <h3>Form User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeUserName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Login: </label>
                        <input type="text" 
                               className="form-control"
                               value={this.state.login}
                               name="password"
                               onChange={this.onChangeUserLogin}
                               />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control"
                               value={this.state.password}
                               name="password"
                               onChange={this.onChangeUserPassword}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>Password confirm: </label>
                        <input type="password" 
                               className="form-control"
                               value={this.state.passwordConfirm}
                               name="passwordConfirm"
                               onChange={this.onChangeUserPasswordConfirm}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>Is Enabled:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <div className="form-check form-check-inline">
                            <input type="radio" 
                                    className="form-check-input" 
                                    name="isEnabled" 
                                    value="true" 
                                    onChange={this.onChangeUserEnabled} 
                                    checked={this.state.isEnabled==="true"}  />
                            Yes
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" 
                                    className="form-check-input" 
                                    name="isEnabled" value="false" 
                                    onChange={this.onChangeUserEnabled} 
                                    checked={this.state.isEnabled==="false"} />
                            No
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" disabled={this.buttonDisable} />
                        <input type="button" value="Back" className="btn btn" onClick={this.handleClick} />
                    </div>
                </form>
            </div>
            
        )
    }
}