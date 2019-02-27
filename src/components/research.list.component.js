import {Component} from 'react';
import * as React from 'react';
import Research from './research.component';


export default class ResearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {researchers: []};
    }

    render() {
        return (
            <div>
                <h3>Research List</h3>
                    <Research></Research>
            </div>
        )
    }
}
