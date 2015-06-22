/** @jsx React.DOM */
var React = require('react/addons');

var EventTitleForm = React.createClass({
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
        <textarea id="locDescript" type="text" placeholder="Event Location" className="eventPost"
              onChange = {this.onKey} value = {this.state.location} onKeyDown={this.handleKeyDown}></textarea>
      )
    }
});

var EventTimeForm = React.createClass({
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
        <textarea id="Time" type="text" name="event time" placeholder="Event Time" className="eventPost"
              onChange = {this.onKey} value = {this.state.time} onKeyDown={this.handleKeyDown}></textarea>
      )
    }
});

var EventDescriptionForm = React.createClass({
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
        <textarea id="Description" type="text" placeholder="Event Description" className="eventPost"
              onChange = {this.onKey} value = {this.state.description} onKeyDown={this.handleKeyDown}></textarea>
      )
    }
});

var EventImageButton = React.createClass({
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
        <div id="Image" className="eventPost" onChange={this.handleSubmit}>
          <input id="imageUploadButton" type="file">
            <i id="imageUploadIcon" className="fa fa-file-image-o fa-2x"></i>
          </input>
        </div>
    )
  }
});

var EventPostArea = React.createClass({
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
        <div id="eventPostArea">
          <div id="closePosting">
            <i className="fa fa-times fa-lg"></i>
          </div>
          <EventTitleForm />
            <i id="locationSelectorButton" className="fa fa-globe fa-2x"></i>
          <EventLocationForm />
            <i id="timeSelector" className="fa fa-calendar-o fa-2x"></i>
          <EventTimeForm />
          <EventDescriptionForm />
          <EventImageButton />
          <div id="menu" className="eventPost">
            <span id="alert" className="alert alert-danger">{this.state.alertmessage}</span>
            <span id="submitNewEvent">submit&nbsp;
              <i className="fa fa-check-square-o"></i>
            </span>
          </div>
        </div>
    )
  }
})

module.exports = EventPostArea;
