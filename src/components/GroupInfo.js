import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import ConnectionCard from './partials/ConnectionCard';
import moment from 'moment';
import axios from 'axios';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCcL9-b-jXIcyNsu0JQUQR4me9jBE0RNwk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: 41.380896, lng: 2.1228198 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: 41.380896, lng: 2.1228198 }} />
    )}
  </GoogleMap>
));

class GroupInfo extends Component {
  getFormattedDate = () => {
    const date = new Date(this.state.group.created_at);
    return moment(date).format("LLL");
  }

  constructor(props) {
    super(props);
    this.state = {
      group: {
          "_id" : "5b20c081b5f10f1ef6edc475",
          "status" : "new",
          "created_at" : "2018-06-14T06:00:08.430Z",
          "name" : "Lanisters vs Starks",
          "description" : "what about a football game?",
          "type" : "game",
          "avatar" : "https://s3.eu-west-3.amazonaws.com/groopy/kings_landing.jpg",
          "__v" : 0
      },
      connections: [
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc457",
            "email":"sansa@winterfell.com",
            "password":"$2b$10$cwXsjFsOJZ169JOTvqNMAuK4R7VrnWrblu/BA3jabmNg6Vfa4IW9a",
            "name":"Sansa Stark",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/sansa.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc459",
            "email":"catelyn@winterfell.com",
            "password":"$2b$10$TVHIWanc5iSJXUL8C0Lcwu/LZmEIcW5kQlBgX9AM3pgjozPaFUlca",
            "name":"Catelyn Stark",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/catelyn.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc45a",
            "email":"jon@bastards.com",
            "password":"$2b$10$/LZ.P6eJtE6hAYOlisW6Yunx8fMMn0wrXDRSA8E2fNtkk7S3B1Yoa",
            "name":"Jon Snow",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/jon.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc45b",
            "email":"arya@winterfell.com",
            "password":"$2b$10$pMtuxtgn8QaAuIf00wnzWOh8gv7yjyUz0kZEbny/VWH0ESzMfSKbu",
            "name":"Arya Stark",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/arya.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc45c",
            "email":"robb@winterfell.com",
            "password":"$2b$10$mf2D9ZL9vDUtfg2ZSgcIQuXcuSseJo/ghu9wnfFjlYT.SsRq8I7re",
            "name":"Robb Stark",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/robb.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc45d",
            "email":"theon@reek.com",
            "password":"$2b$10$NfvCkfM3TeOFt8rtneGPN.vSimbuITd5eAtaLDSaxWOXxfpvsYvly",
            "name":"Theon Greyjoy",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/theon.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc461",
            "email":"joffrey@lannister.com",
            "password":"$2b$10$zY9Dree/SkYibHcH98BajueYFjDmqRJyDNtTFkxSfFe4Bmcnm3cE6",
            "name":"Joffrey Baratheon",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/joffrey.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc462",
            "email":"jaime@lannister.com",
            "password":"$2b$10$esbtG0URXzh6doxHxxXvMuIxyaXgM0MWp2nVnLasX34aE9Wvf5uU6",
            "name":"Jaime Lannister",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/jaime.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc463",
            "email":"tyrion@lannister.com",
            "password":"$2b$10$hr.0msoS80AX8LLew77chOY6PsPu8fhGGXt1erPxCxc0xFuPCQ1na",
            "name":"Tyrion Lannister",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/tyrion.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc464",
            "email":"cersei@lannister.com",
            "password":"$2b$10$ZOkxuSztaZa5641pZc6Rkuz05dt7kpcySJEKpT4YNKL.VkF54JqoC",
            "name":"Cersei Lannister",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/cersei.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc465",
            "email":"bronn@mercenaries.com",
            "password":"$2b$10$7k/5H9jB/gDGvPb7ZCAN6OAO5fVejHQtjPNKvwzT9fUuJm8sFJSTG",
            "name":"Bronn",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/bronn.jpg",
            "__v":0
         },
         {
            "role":"subscriber",
            "status":"active",
            "created_at":"2018-06-13T06:58:08.433Z",
            "_id":"5b20c080b5f10f1ef6edc466",
            "email":"tywin@lannister.com",
            "password":"$2b$10$HdR7iNYOripRMOEB262F/e0HODra6bBZ2PpZyOnMlyou4.7aoZmpi",
            "name":"Tywin Lannister",
            "avatar":"https://s3.eu-west-3.amazonaws.com/groopy/tywin.jpg",
            "__v":0
         }
      ]

    }
  }

  render() {
    console.log(this.state.connections);
    const teama = this.state.connections.slice(0, this.state.connections.length / 2);
    const teamb = this.state.connections.slice(this.state.connections.length / 2);
    console.log(teama);
    console.log(teamb);
    return (
      <div className="Groopy-page">
      <div className="Group-tag Group-tag--sport">Sport event</div>
      <h2 className="Group-page-title">
        <div className="Group-page-title__title">{this.state.group.name}</div>
        <div className="Group-page-title__date">{this.getFormattedDate()}</div>
      </h2>
      <p>{this.state.group.description}</p>
      <hr />

      <h3>Location</h3>
      <MyMapComponent isMarkerShown />
      <br />
      <h2>Teams</h2>
        <div className="Group-teams">
          <div className="Group-team">
          <h3>Team A</h3>
            {teama.map((user) => {
              return <ConnectionCard user={user} />
            })}
          </div>
          <div className="Group-team">
          <h3>Team B</h3>
            {teamb.map((user) => {
              return <ConnectionCard user={user} />
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    apiUrl: state.config.apiUrl,
    connections: state.user.connections,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
