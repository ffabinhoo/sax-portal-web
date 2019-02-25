import {Component} from 'react';
import * as React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Research = props => (
    <tr>
        <td>{props.research.name}</td>
        <td>{props.research.description}</td>
        <td>
        {formatDate(props.research.data)}
        </td>
        <td  className={props.research.isEnabled ? 'isEnabled':'isDisabled'}>{JSON.stringify(props.research.isEnabled)}</td>
        <td>
            <Link to={"/edit/"+props.research._id}>Edit</Link>
            
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" >
                delete
            </button>
        </td>
    </tr>
)



function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

export default class ResearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {researchers: []}
        //this.goToEdit = this.goToEdit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/researchers/')
        .then(response => {
                this.setState({researchers: response.data});
        }) 
        .catch(function(error){
            console.log(error);
        });
    }

    showModal = () => {
        this.setState({ show: true });
    };
    

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
                            <th> </th>
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
