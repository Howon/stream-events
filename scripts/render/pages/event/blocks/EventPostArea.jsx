/** @jsx React.DOM */
var React = require('react/addons'),
    map = require('./Map');

var EventTitleForm = React.createClass({
    getInitialState: function(){
      return {title: ''};
    },
    onKey : function(e){
      this.setState({title: e.target.value });
      this.props.setTitle(e.target.value)
    },
    render : function(){
      return (
        <textarea id="Name" type="text" placeholder="Event Name" className="eventPost"
              onChange = {this.onKey} value = {this.state.titls} onKeyDown={this.handleKeyDown}></textarea>
      )
    }
});

var EventLocationForm = React.createClass({
    getInitialState: function(){
      return {location: ''};
    },
    onKey : function(e){
      this.setState({location: e.target.value });
      this.props.setLocation(e.target.value);
    },
    render : function(){
      return (
        <div>
          <i id="locationSelectorButton" className="fa fa-globe fa-2x"></i>
          <textarea id="locDescript" type="text" placeholder="Event Location" className="eventPost"
                onChange = {this.onKey} value = {this.state.location} onKeyDown={this.handleKeyDown}></textarea>
        </div>
      )
    }
});

var EventTimeForm = React.createClass({
    getInitialState: function(){
      return {time: ''};
    },
    onKey : function(e){
      this.setState({time: e.target.value });
      this.props.setTime(e.target.value)
    },
    render : function(){
      return(
        <div>
          <i id="timeSelector" className="fa fa-calendar-o fa-2x"></i>
          <textarea id="Time" type="text" name="event time" placeholder="Event Time" className="eventPost"
                onChange = {this.onKey} value = {this.state.time} onKeyDown={this.handleKeyDown}></textarea>
        </div>
      )
    }
});

var EventDescriptionForm = React.createClass({
    getInitialState: function(){
      return {description: ''};
    },
    onKey : function(e){
      this.setState({description: e.target.value });
      this.props.setDescription(e.target.value);
    },
    render : function(){
      return (
        <textarea id="Description" type="text" placeholder="Event Description" className="eventPost"
              onChange = {this.onKey} value = {this.state.description}></textarea>
      )
    }
});

var EventImageButton = React.createClass({
  handleSubmit : function(e){
      var file = e.target.files[0];
      var reader = new FileReader();
      if('size' in file){
        if(file.size > 500000){
              alert('image too big! must be under 500kb');
          }else{
            this.props.setImage(file);
          }
      }
  },
  render : function(){
    return (
        <div id="Image" className="eventPost">
          <input id="imageUploadButton" type="file" onChange={this.handleSubmit}>
            <i id="imageUploadIcon" className="fa fa-file-image-o fa-2x"></i>
          </input>
        </div>
    )
  }
});

var alertStyle = {
  position: 'absolute',
  height: '100%',
  padding: '0',
  paddingLeft: '2px',
  display: 'none',
  width: '73.5%',
  margin: '0',
};

var EventPostArea = React.createClass({
  getInitialState : function(){
    return {
        title : "",
        time : '',
        location : "",
        latitude : "",
        longitude : "",
        description: "",
        image: {},
        alertMessage : ""
    }  
  },
  postEvent : function(){
    // if(/^\s*$/.test(this.state.title)){
    //     this.setState({
    //       alertMessage: "Please enter event name"
    //     });
    //     alertStyle.display = 'block';
    // }else if(/^\s*$/.test(this.state.location)){
    //   this.setState({
    //       alertMessage: "Please enter location of your event"
    //     });
    //   alertStyle.display = 'block';
    // }else if(/^\s*$/.test(this.state.time)){
    //   this.setState({
    //       alertMessage: "Please enter time of your event"
    //     });
    //   alertStyle.display = 'block';
    // }else if(/^\s*$/.test(this.state.description)){
    //   this.setState({
    //       alertMessage: "Please describe your event"
    //     });
    //   alertStyle.display = 'block';
    // }else{
      this.props.postEvent({
        title : this.state.title,
        location : this.state.location,
        time : this.state.time,
        description : this.state.description,
        latitude : this.state.lat,
        longitude : this.state.lon,
        image : this.state.image,
      });
      // alertStyle.display = 'none';
    // }
  },
  setTitle : function(title){
    this.setState({
      title : title
    });
  },
  setImage : function(image){
    this.setState({
      image : image
    });
  },
  setLatLong : function(lat, lon){
    this.setState({
      lat : lat,
      lon : lon
    });
  },
  setLocation : function(loc){
    this.setState({
      location : loc
    });
  },
  setTime : function(time){
    this.setState({
      time : time
    });
  },
  setDescription : function(desc){
    this.setState({
      description : desc
    });
  },
  render : function(){
    return (
        <div id="eventPostArea">
            <i id="closePosting" className="fa fa-times fa-lg"></i>
            <EventTitleForm setTitle = {this.setTitle}/>
            <EventLocationForm setLocation = {this.setLocation} setLatLong = {this.ssetLatLong}/>
            <EventTimeForm setTime = {this.setTime}/>
            <EventDescriptionForm setDescription = {this.setDescription}/>
            <EventImageButton setImage = {this.setImage}/>
            <div id="menu" className="eventPost">
              <span id="alert" className="alert alert-danger" style = {alertStyle}>{this.state.alertmessage}</span>
              <span id="submitNewEvent" onClick = {this.postEvent}>submit&nbsp;
                <i className="fa fa-check-square-o"></i>
              </span>
            </div>
        </div>
    )
  }
})

module.exports = EventPostArea;
