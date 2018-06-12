import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class UploadFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      imageURL: ''
    };
  }

  componentDidUpdate() {
    console.log('mount!');
    console.log('mount!', this.field.value);
    this.field.blur();
    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      this.field.dispatchEvent(evt);
    }
    else
      this.field.fireEvent("onchange");
    }

  onChange = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0], this.props.name);
    data.append('filename', 'poll1');
    this.setState({
      uploading: true
    });

    this.props.handleSubmitStatus(false);

    await fetch(`${this.props.apiUrl}/uploads/file`, {
      method: 'POST',
      headers: new Headers({
        'Authorization': `Bearer ${this.props.token}`,
      }),
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        setTimeout(() => {
          this.uploadInput.className = 'hidden';
          this.field.click();
          this.field.value = body.file;
          this.props.handleSetImage(this.props.pollElementNumber, body.file);
          this.props.handleSubmitStatus(true);
          this.setState({
            ...this.state,
            imageURL: body.file,
            uploading: false,
          });
        }, 2000)
      });
    });
  }

  render() {
    return (
      <div className="Groopy-form__file-upload">
        <input onChange={this.onChange} ref={(ref) => { this.uploadInput = ref; }} type="file" />
        {this.state.imageURL ? <img src={this.state.imageURL} /> : ('')}
        <input
          ref={(ref) => { this.field = ref; }}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          name={this.props.name}
          type="hidden"
          value={this.state.imageURL}
        />

      {this.state.uploading ? <div className="Groopy-form__loading"></div> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiUrl: state.config.apiUrl,
    token: state.user.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
