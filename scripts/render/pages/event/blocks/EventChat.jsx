/** @jsx React.DOM */
var React = require('react/addons'),
    socket = require('socket.io-client')('http://localhost:3000');

var Message = React.createClass({
    render: function(){
      return(
        <li className = "message">
          {this.props.text}   
        </li>
      )
    }
});

var MessageList = React.createClass({
  render: function(){
    var renderMessage = function(message, i){
      return <Message key = {i} text={message.message} />
    }
    return (
      <ul id="messages" className="chatArea">
        {this.props.messages.map(renderMessage)} 
      </ul>
    );
  }
});

var MessageInputForm = React.createClass({
    getInitialState: function(){
      return {
        message: ''
      };
    },
    onKey : function(e){
      this.setState({ message : e.target.value });
    },
    handleSubmit : function(e){
      this.props.postMessage(this.state.message);
      this.setState({
        message: ''
      });
    },
    handleKeyDown: function(evt) {
        if (evt.keyCode == 13 ) {
            return this.handleSubmit(evt);
        }
    },
    render : function(){
      return (
        <textarea id="messageInput" type="text" placeholder="Type to chat" className="chatArea"
              onChange = {this.onKey} value = {this.state.message} onKeyDown={this.handleKeyDown}></textarea>
      )
    }
});

var EventChat = React.createClass({
  render : function(){
    return (
        <div id="chatArea">
          <MessageList messages = {this.props.messages}/>
          <MessageInputForm postMessage = {this.props.postMessage} user = {this.props.user}/>
        </div>
    )
  }
});

module.exports = EventChat;

