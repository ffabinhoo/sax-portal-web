import {Component} from 'react';
import * as React from 'react';
import User from './user.component';
import { Button } from 'react-bootstrap';



export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e){
        this.props.history.push('/user/create');
    }

    render() {
        return (
            <div>
                <h3>User List</h3>
                    <User></User>
                    
            <React.Fragment>
                <Button variant="primary"  onClick={this.handleClick}>Create</Button>
            </React.Fragment>
            </div>
        )
    }
}
