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
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Data</th>
                            <th>IsEnabled</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Research></Research>
                    </tbody>
                </table>
            </div>
        )
    }
}
