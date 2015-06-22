/** @jsx React.DOM */
var React = require('react/addons');

var EventTitleForm = React.createClass({displayName: "EventTitleForm",
    getInitialState: function(){
      return {title: ''};
    },

    onKey : function(e){
      this.setState({title: e.target.value });
    },

    handleSubmit : function(e){
      e.preventDefault();
      this.setState({title: '' });
    },
    handleKeyDown: function(evt) {
          if (evt.keyCode == 13 ) {
              return this.handleSubmit(evt);
          }
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
    },

    handleSubmit : function(e){
      e.preventDefault();
      this.setState({location: '' });
    },
    handleKeyDown: function(evt) {
          if (evt.keyCode == 13 ) {
              return this.handleSubmit(evt);
          }
      },
    render : function(){
      return (
        React.createElement("textarea", {id: "locDescript", type: "text", placeholder: "Event Location", className: "eventPost", 
              onChange: this.onKey, value: this.state.location, onKeyDown: this.handleKeyDown})
      )
    }
});

var EventTimeForm = React.createClass({displayName: "EventTimeForm",
    getInitialState: function(){
      return {time: ''};
    },

    onKey : function(e){
      this.setState({time: e.target.value });
    },

    handleSubmit : function(e){
      e.preventDefault();
      this.setState({time: ''});
    },
    handleKeyDown: function(evt) {
          if (evt.keyCode == 13 ) {
              return this.handleSubmit(evt);
          }
      },
    render : function(){
      return(
        React.createElement("textarea", {id: "Time", type: "text", name: "event time", placeholder: "Event Time", className: "eventPost", 
              onChange: this.onKey, value: this.state.time, onKeyDown: this.handleKeyDown})
      )
    }
});

var EventDescriptionForm = React.createClass({displayName: "EventDescriptionForm",
    getInitialState: function(){
      return {description: ''};
    },

    onKey : function(e){
      this.setState({ description : e.target.value });
    },

    handleSubmit : function(e){
      e.preventDefault();
      this.setState({ description: '' });
    },
    handleKeyDown: function(evt) {
          if (evt.keyCode == 13 ) {
              return this.handleSubmit(evt);
          }
      },
    render : function(){
      return (
        React.createElement("textarea", {id: "Description", type: "text", placeholder: "Event Description", className: "eventPost", 
              onChange: this.onKey, value: this.state.description, onKeyDown: this.handleKeyDown})
      )
    }
});

var EventImageButton = React.createClass({displayName: "EventImageButton",
  handleSubmit : function(){
      var file = this.files[0];
      var reader = new FileReader();
        if('size' in file){
          if(file.size > 500000){
                alert('image too big! must be under 500kb');
            }else{
                socket.emit('user image',{
                  image : file
                });
            }
        }
  },
  render : function(){
    return (
        React.createElement("div", {id: "Image", className: "eventPost", onChange: this.handleSubmit}, 
          React.createElement("input", {id: "imageUploadButton", type: "file"}, 
            React.createElement("i", {id: "imageUploadIcon", className: "fa fa-file-image-o fa-2x"})
          )
        )
    )
  }
});

var EventPostArea = React.createClass({displayName: "EventPostArea",
  getInitialState : function(){
    return {
        title : "",
        picture : "",
        time : "",
        location : "",
        latitude : "",
        longitude : "",
        alertmessage : 'Nope'
    }  
  },
  render : function(){
    return (
        React.createElement("div", {id: "eventPostArea"}, 
          React.createElement("div", {id: "closePosting"}, 
            React.createElement("i", {className: "fa fa-times fa-lg"})
          ), 
          React.createElement(EventTitleForm, null), 
            React.createElement("i", {id: "locationSelectorButton", className: "fa fa-globe fa-2x"}), 
          React.createElement(EventLocationForm, null), 
            React.createElement("i", {id: "timeSelector", className: "fa fa-calendar-o fa-2x"}), 
          React.createElement(EventTimeForm, null), 
          React.createElement(EventDescriptionForm, null), 
          React.createElement(EventImageButton, null), 
          React.createElement("div", {id: "menu", className: "eventPost"}, 
            React.createElement("span", {id: "alert", className: "alert alert-danger"}, this.state.alertmessage), 
            React.createElement("span", {id: "submitNewEvent"}, "submit ", 
              React.createElement("i", {className: "fa fa-check-square-o"})
            )
          )
        )
    )
  }
})

module.exports = EventPostArea;
