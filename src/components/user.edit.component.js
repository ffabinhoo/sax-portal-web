import React, {Component} from 'react';
import axios from 'axios';



function str2bool(value) {
    if (value && typeof value === Boolean) {
      if (value.toLowerCase() === true) return "true";
      if (value.toLowerCase() === false) return "false";
    }
    return value;
 }


export default class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.onChangeResearchName = this.onChangeResearchName.bind(this);
        this.onChangeUserLogin = this.onChangeUserLogin.bind(this);
        this.onChangeResearchEnabled = this.onChangeResearchEnabled.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            name:'',
            login: '',
            isEnabled: ''
        }
    }

    message = false;

    onChangeResearchName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeUserLogin(e) {
        this.setState({
            login: e.target.value
        });
    }
    

    onChangeResearchEnabled(e) {
        this.setState({
            isEnabled: e.target.value
        });
    }

    handleClick(e){
        this.props.history.push('/user/list');
    }

    onSubmit(e){
        e.preventDefault();
        
        const updateResearch = {
            name: this.state.name,
            login: this.state.login,
            isEnabled: this.state.isEnabled
        }

        axios.post('http://localhost:4000/users/update/' + this.props.match.params.id,updateResearch)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            login: '',
            isEnabled: ''
        });
        this.message = true;     
    }

    
    


    componentDidMount(){
        axios.get('http://localhost:4000/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    login: response.data.login,
                    isEnabled: str2bool(response.data.isEnabled)
                })
            })
            .catch(function(error){
                console.log(error)
            })
    }

    


    render() {
        return (
            <div>
                {this.message ? 
                    <div className="alert alert-success" role="alert">
                    User Update With Success!!!
                    </div>
                 : ''
                }
                <h3>User Update Research Form</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeResearchName}
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
                                    onChange={this.onChangeResearchEnabled} 
                                    checked={this.state.isEnabled==="true"}  />
                            Yes
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" 
                                    className="form-check-input" 
                                    name="isEnabled" 
                                    value="false" 
                                    onChange={this.onChangeResearchEnabled} 
                                    checked={this.state.isEnabled==="false"} />
                            No
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" />
                        <input type="button" value="Back" className="btn btn" onClick={this.handleClick} />
                    </div>
                </form>
            </div>
        )
    }
}