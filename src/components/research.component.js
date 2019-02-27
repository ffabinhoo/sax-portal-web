import {Component} from 'react';
import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

export default class Research extends Component {
    constructor(props) {
        super(props);
        this.state = {researchers: []};
    }
    
    componentDidMount() {
        fetch('http://localhost:4000/researchers/')
        .then(response => response.json())
        .then(researchers => this.setState({researchers}))
        
        .catch(function(error){
            console.log(error);
        });
    }

    showModal (research){
        if (window.confirm("Do you really want to delete this research?")) { 
            axios.post('http://localhost:4000/researchers/delete/' + research._id)
        }
        
        let ii = this.state.researchers.indexOf(research);
        
        var filtered = this.state.researchers.filter(function(value, index, arr){return index !==ii });
        this.setState({
            researchers: filtered
        }) 
    }

    render() {
        return this.state.researchers.map(research => {
            return( 
                <tr key={research._id}>
                    <td>{research.name}</td>
                    <td>{research.description}</td>
                    <td>{formatDate(research.data)}</td>
                    <td  className={research.isEnabled ? 'isEnabled':'isDisabled'}>{JSON.stringify(research.isEnabled)}</td>
                    <td>
                        <Link to={"/edit/"+research._id}>Edit</Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" onClick={e => this.showModal(research)} >Delete</button>
                    </td>
                </tr>
            )
        })
    }
}