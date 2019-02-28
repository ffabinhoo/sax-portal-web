import {Component} from 'react';
import * as React from 'react';
import {Link} from 'react-router-dom';


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {link: ''};
    }

    render() {
        return (
          <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/" alt="">Sax Institute</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Principal <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/research/create"> Research </Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/user/list"> User </Link>
                        </li>
                    </ul>
                </div>  
            </nav>
          </React.Fragment>
        )
    }
}