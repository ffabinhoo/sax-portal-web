import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Research = props => (
    <tr>
        <td>{props.research.name}</td>
        <td>{props.research.description}</td>
        <td>{props.research.data}</td>
        <td>{props.research.isEnabled}</td>
        <td></td>
        <td>
            <Link to={"researchers/"+props.research._id}>Edit</Link>
        </td>
    </tr>
)

export default class ResearchList extends Component {

    constructor(props) {
        super(props);
        this.state = {researchers: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/researchers/')
        .then(response => {
            this.setState({researchers: response.data})
        })
        .catch(function(error){
            console.log(error);
        })
    }

    researcherList(){
        return this.state.researchers.map(function(currentResearch, i){
            return <Research research={currentResearch} key={i} />;
        });
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.researcherList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
