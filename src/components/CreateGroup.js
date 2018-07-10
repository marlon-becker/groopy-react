import { Redirect } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import UserCard from './UserCard';
import UploadFile from './UploadFile';
import Avatar from './partials/Avatar'



// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div className="Groopy-suggestion">
    <div className="Groopy-suggestion__img">
      <Avatar image={suggestion.avatar} />
    </div>
    <div className="Groopy-user__title">
      {suggestion.name}
    </div>
  </div>
);

class CreateGroup extends Component {
  constructor() {
    super();
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      imageUrl: '',
      suggestions: [],
      users: [],
      selectedUsers: [],
      submitAllowed: false
    };
  }

  componentDidMount() {
    axios.get(this.props.apiUrl+'/users/connections', {
        headers: { 'Authorization': `Bearer ${this.props.token}` }
     }).then(response => {
       this.setState({
         users: response.data ? response.data : []
       });
       this.state = {
         value: '',
         suggestions: this.getSuggestions('')
       };
       }
     );
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }



  getSuggestions = (value) => {
  const escapedValue = this.escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');
  return this.state.users
  .filter(person => {
    return regex.test(getSuggestionValue(person))
    && !this.state.selectedUsers.find(function (obj) { return obj._id === person._id; });;
  });

}

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: this.state.users
    });
  };

  onSuggestionSelected = (value, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.state.selectedUsers.push(suggestion);
    this.setState({
      value: ''
    });
  }

  onSuggestionsUpdateRequested({ value }) {
     this.setState({
       suggestions: this.getSuggestions(value)
     });
  }


  setStatus = (allow) => {
    this.setState({
      submitAllowed: allow
    })
  }

  setImage = (number, url) => {
    this.setState({
      imageUrl: url
    })
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for friends...',
      value,
      onChange: this.onChange
    };

    if(this.props.token) {
      return (
        <Formik
        initialValues={{ }}
        onSubmit={(values, actions) => {
          const bodyFormData = new FormData();
          bodyFormData.set('name', values.createEvent_Title);
          bodyFormData.set('description', values.createEvent_Description);
          bodyFormData.set('type', values.createEvent_Type);
          bodyFormData.set('image', this.state.imageUrl);
          bodyFormData.set('users', this.state.selectedUsers.reduce((acc, user) => {
            acc.push(user._id);
            return acc;
          }, []).join(','));

          axios.post(this.props.apiUrl+'/groups', bodyFormData, {
              headers: { 'Authorization': `Bearer ${this.props.token}` }
           }).then(response => {
              this.props.history.push('/groups');
           });

        actions.setSubmitting(false);
        }}

        render={props => (
          <div className="Groopy-new-group Groopy-form">
            <h2>New event</h2>
            <hr></hr>
            <label>What type of event are you organizing?</label>
            <form onSubmit={props.handleSubmit}>
            <select
              name="createEvent_Type"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.createEvent_Type}
              className="form-control"
              required
              >
                <option value="">- Select a event type -</option>
                <option value="birthday">Birthday present</option>
                <option value="game">Fooball game</option>
                <option value="trip">Holiday</option>
            </select>

            <input
              type="text"
              id="inputTitle"
              className="form-control"
              placeholder="Add a title for the event"
              required
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.createEvent_Title}
              name="createEvent_Title"
            />

            <textarea
              type="description"
              id="inputDescription"
              className="form-control"
              placeholder="Add a nice short description"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.createEvent_Description}
              name="signIn_username"
            />

            <hr />
            <label>Upload a photo</label>
            <UploadFile handleSubmitStatus={this.setStatus}
            name="groupImage"
            {...this.props}
            handleSetImage={this.setImage}
            />
            <hr />
            <label>Event members</label>

            <Autosuggest
              shouldRenderSuggestions={() => true}
              suggestions={suggestions}
              onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              focusInputOnSuggestionClick={true}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />

            <div className="Event-friends">
              <div className="Groopy-list">
                {this.state.selectedUsers.length === 0 ? (<div className="alert alert-warning fade show" role="alert">No users added to the group yet  </div>)
                  : this.state.selectedUsers.map((user) => {
                  return (<UserCard key={user._id} user={user} />)
                })}
              </div>
            </div>

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <button className="btn btn-lg btn-secondary btn-block" type="submit">Create</button>
            </form>
          </div>
        )}
      />
      );
    } else { return (<Redirect to="/login" />) }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    apiUrl: state.config.apiUrl,
    isAuthenticated: state.user.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
