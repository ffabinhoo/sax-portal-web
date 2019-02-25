import React, {Component} from 'react';

import axios from 'axios';

export default class ResearchCreate extends Component {

    constructor(props){
        super(props);

        this.onChangeResearchName = this.onChangeResearchName.bind(this);
        this.onChangeResearchDescription = this.onChangeResearchDescription.bind(this);
        this.onChangeResearchData = this.onChangeResearchData.bind(this);
        this.onChangeResearchEnabled = this.onChangeResearchEnabled.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);


        this.state = {
            name: '',
            description: '',
            data: '',
            isEnabled: false
        }
    }

    message = false;
    buttonDisable = false;

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
    onSubmit(e){
        e.preventDefault();
        
        const newResearch = {
            name: this.state.name,
            description: this.state.description,
            data: this.state.data,
            isEnabled: this.state.isEnabled
        }

        axios.post('http://localhost:4000/researchers/add',newResearch)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            description: '',
            data: '',
            isEnabled: false
        })
        this.message = true;
        this.buttonDisable = true;
    }

    

    handleClick(e){
        //e.preventDefault();
        this.props.history.push('/');
    }

   

    render() {
        console.log(this.state.isEnabled)
        return (
            
            <div style={{marginTop: 20}}>
            {this.message ? 
                    <div className="alert alert-success" role="alert">
                    Update With Success!!!
                    </div>
                 : ''
            }
                <h3>Form Research</h3>
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
                               value={this.state.data}
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
                                    checked={this.state.isEnabled===true}  />
                            Yes
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" 
                                    className="form-check-input" 
                                    name="isEnabled" value="false" 
                                    onChange={this.onChangeResearchEnabled} 
                                    checked={this.state.isEnabled===false} />
                            No
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" disabled={this.buttonDisable} />
                        <input type="button" value="Back" className="btn btn" onClick={this.handleClick} />
                    </div>
                </form>
            </div>
            
        )
    }
}