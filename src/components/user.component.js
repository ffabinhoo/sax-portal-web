import {Component} from 'react';
import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }
    
    componentDidMount() {
        fetch('http://localhost:4000/users/')
        .then(response => response.json())
        .then(users => this.setState({users}))
        
        .catch(function(error){
            console.log(error);
        });
    }

    showModal (user){
        if (window.confirm("Do you really want to delete this user?")) { 
            axios.post('http://localhost:4000/users/delete/' + user._id)
        }
        
        let ii = this.state.users.indexOf(user);
        
        var filtered = this.state.users.filter(function(value, index, arr){return index !==ii });
        this.setState({
            users: filtered
        }) 
    }

    render() {
        return (
          <React.Fragment>
              <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Login</th>
                            <th>IsEnabled</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => {
                            return (
                                <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.login}</td>
                                
                                <td  className={user.isEnabled==="true" ? 'isEnabled':'isDisabled'}>{user.isEnabled}</td>
                                <td>
                                    <Link to={"/user/edit/"+user._id}>Edit</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="button" onClick={e => this.showModal(user)} >Delete</button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
          </React.Fragment>
        );
      }

    
}