/** @jsx React.DOM */
var React = require('react/addons'),
    map = require('./Map');

var EventTitleForm = React.createClass({displayName: "EventTitleForm",
    getInitialState: function(){
      return {title: ''};
    },
    onKey : function(e){
      this.setState({title: e.target.value });
      this.props.setTitle(e.target.value)
    },
    render : function(){
      return (
        React.createElement("textarea", {id: "Name", type: "text", placeholder: "Event Name", className: "eventPost", 
              onChange: this.onKey, value: this.state.titls, onKeyDown: this.handleKeyDown})
      )
    }
});

var EventLocationForm = React.createClass({displayName: "EventLocationForm",
    getInitialState: function(){
      return {location: ''};
    },
    onKey : function(e){
      this.setState({location: e.target.value });
      this.props.setLocation(e.target.value);
    },
    render : function(){
      return (
        React.createElement("div", null, 
          React.createElement("i", {id: "locationSelectorButton", className: "fa fa-globe fa-2x"}), 
          React.createElement("textarea", {id: "locDescript", type: "text", placeholder: "Event Location", className: "eventPost", 
                onChange: this.onKey, value: this.state.location, onKeyDown: this.handleKeyDown})
        )
      )
    }
});

var EventTimeForm = React.createClass({displayName: "EventTimeForm",
    getInitialState: function(){
      return {time: ''};
    },
    onKey : function(e){
      this.setState({time: e.target.value });
      this.props.setTime(e.target.value)
    },
    render : function(){
      return(
        React.createElement("div", null, 
          React.createElement("i", {id: "timeSelector", className: "fa fa-calendar-o fa-2x"}), 
          React.createElement("textarea", {id: "Time", type: "text", name: "event time", placeholder: "Event Time", className: "eventPost", 
                onChange: this.onKey, value: this.state.time, onKeyDown: this.handleKeyDown})
        )
      )
    }
});

var EventDescriptionForm = React.createClass({displayName: "EventDescriptionForm",
    getInitialState: function(){
      return {description: ''};
    },
    onKey : function(e){
      this.setState({description: e.target.value });
      this.props.setDescription(e.target.value);
    },
    render : function(){
      return (
        React.createElement("textarea", {id: "Description", type: "text", placeholder: "Event Description", className: "eventPost", 
              onChange: this.onKey, value: this.state.description})
      )
    }
});

var EventImageButton = React.createClass({displayName: "EventImageButton",
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
        React.createElement("div", {id: "Image", className: "eventPost"}, 
          React.createElement("input", {id: "imageUploadButton", type: "file", onChange: this.handleSubmit}, 
            React.createElement("i", {id: "imageUploadIcon", className: "fa fa-file-image-o fa-2x"})
          )
        )
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

var EventPostArea = React.createClass({displayName: "EventPostArea",
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
        React.createElement("div", {id: "eventPostArea"}, 
            React.createElement("i", {id: "closePosting", className: "fa fa-times fa-lg"}), 
            React.createElement(EventTitleForm, {setTitle: this.setTitle}), 
            React.createElement(EventLocationForm, {setLocation: this.setLocation, setLatLong: this.ssetLatLong}), 
            React.createElement(EventTimeForm, {setTime: this.setTime}), 
            React.createElement(EventDescriptionForm, {setDescription: this.setDescription}), 
            React.createElement(EventImageButton, {setImage: this.setImage}), 
            React.createElement("div", {id: "menu", className: "eventPost"}, 
              React.createElement("span", {id: "alert", className: "alert alert-danger", style: alertStyle}, this.state.alertmessage), 
              React.createElement("span", {id: "submitNewEvent", onClick: this.postEvent}, "submit ", 
                React.createElement("i", {className: "fa fa-check-square-o"})
              )
            )
        )
    )
  }
})

module.exports = EventPostArea;
