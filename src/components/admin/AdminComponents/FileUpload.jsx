import React from 'react'
import axios from 'axios';
 
class FileUpload extends React.Component{
 
    constructor(){
        super();
        this.state = {
            selectedFile:'',
        }
 
        this.handleInputChange = this.handleInputChange.bind(this);
    }
 
    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }
    
    submit(){
        var loggedUser = JSON.parse(localStorage.getItem("data"));
        const data = new FormData() 
        data.append('Photo', this.state.selectedFile)
        console.warn(this.state.selectedFile);
        let url = "http://work.phpwebsites.in/fishing/api/uploadph";
 
        axios.post(url,{user_id:loggedUser.id ,Photo:data } , { headers: { Token: loggedUser.api_token } }, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.warn(data);
        })
 
    }
 
    render(){
        
        return(
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br /><br />
 
                            <h3 className="text-white">React File Upload Example - Tutsmake.com</h3>
                            <br />
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="text-white">Select File :</label>
                                    <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                                </div>
                            </div>
 
                            <div className="form-row">
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )  
    }
}
 
export default FileUpload;