import React, { Component } from 'react'
import './Upload.css'
import Dropzone from '../dropzone/Dropzone'
import Progress from '../progress/Progress'
import { API_ENDPOINT } from '../../config/constants'

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      uploadResponse: {},
      successfulUploaded: false
    }
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfulUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      )
    }
  }

  renderActions() {
    return (
      <button
        disabled={this.state.files.length < 0 || this.state.uploading}
        onClick={this.uploadFiles}
      >
        Upload
      </button>
    );
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
      this.setState({ successfulUploaded: true, uploading: false });
    } catch (err) {
      console.log('error: ', err);
      this.setState({ successfulUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      req.onload = ((res) => {
        this.setState({ uploadResponse: res.srcElement.response })
        this.props.history.push('/details', this.state);
      })

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", `${API_ENDPOINT}/upload`);
      req.send(formData);
    })
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfulUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    )
  }
}

export default Upload;
