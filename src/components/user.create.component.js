import React, {Component} from 'react';
import axios from 'axios';

export default class UserCreate extends Component {

    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserLogin = this.onChangeUserLogin.bind(this);
        this.onChangeUserEnabled = this.onChangeUserEnabled.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);


        this.state = {
            name: '',
            login: '',
            isEnabled: ''
        }
    }

    message = false;
    buttonDisable = false;

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
    
    onChangeUserEnabled(e) {
        this.setState({
            isEnabled: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        
        const newUser = {
            name: this.state.name,
            login: this.state.login,
            isEnabled: this.state.isEnabled
        }

        axios.post('http://localhost:4000/users/add',newUser)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            login: '',
            isEnabled: ''
        })
        this.message = true;
        this.buttonDisable = true;
    }

    handleClick(e){
        this.props.history.push('/');
    }

    render() {
        console.log(this.state.isEnabled)
        return (
            
            <div style={{marginTop: 20}}>
            {this.message ? 
                    <div className="alert alert-success" role="alert">
                    Update With Success!!!
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
                        <input type="text" multiple
                               className="form-control"
                               value={this.state.login}
                               onChange={this.onChangeUserLogin}
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