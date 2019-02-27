import React, {Component} from 'react';
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

function str2bool(value) {
    if (value && typeof value === Boolean) {
      if (value.toLowerCase() === true) return "true";
      if (value.toLowerCase() === false) return "false";
    }
    return value;
 }


export default class ResearchEdit extends Component {

    constructor(props) {
        super(props);
        this.onChangeResearchName = this.onChangeResearchName.bind(this);
        this.onChangeResearchDescription = this.onChangeResearchDescription.bind(this);
        this.onChangeResearchData = this.onChangeResearchData.bind(this);
        this.onChangeResearchEnabled = this.onChangeResearchEnabled.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            name:'',
            description: '',
            data: '',
            isEnabled: ''
        }
    }

    message = false;

    onChangeResearchName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeResearchDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeResearchData(e) {
        this.setState({
            data: e.target.value
        });
    }

    onChangeResearchEnabled(e) {
        this.setState({
            isEnabled: e.target.value
        });
    }

    handleClick(e){
        this.props.history.push('/');
    }

    onSubmit(e){
        e.preventDefault();
        
        const updateResearch = {
            name: this.state.name,
            description: this.state.description,
            data: this.state.data,
            isEnabled: this.state.isEnabled
        }

        axios.post('http://localhost:4000/researchers/update/' + this.props.match.params.id,updateResearch)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            description: '',
            data: '',
            isEnabled: ''
        });
        this.message = true;     
    }

    
    


    componentDidMount(){
        axios.get('http://localhost:4000/researchers/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    data: response.data.data,
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
                    Update With Success!!!
                    </div>
                 : ''
                }
                <h3>Update Research Form</h3>
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
                        <label>Description: </label>
                        <input type="text" multiple
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeResearchDescription}
                               />
                    </div>
                    <div className="form-group">
                        <label>Date of publish: </label>
                        <input type="date" multiple
                               className="form-control"
                               value={formatDate(this.state.data)}
                               data-date-format="DD-MM-YYYY"
                               onChange={this.onChangeResearchData}
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