/** @jsx React.DOM */
var React = require('react/addons'),
    socket = require('socket.io-client')('http://localhost:3000');

var Message = React.createClass({displayName: "Message",
    render: function(){
      return(
        React.createElement("li", {className: "message"}, 
          this.props.text
        )
      )
    }
});

var MessageList = React.createClass({displayName: "MessageList",
  render: function(){
    var renderMessage = function(message, i){
      return React.createElement(Message, {key: i, text: message.message})
    }
    return (
      React.createElement("ul", {id: "messages", className: "chatArea"}, 
        this.props.messages.map(renderMessage)
      )
    );
  }
});

var MessageInputForm = React.createClass({displayName: "MessageInputForm",
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
        React.createElement("textarea", {id: "messageInput", type: "text", placeholder: "Type to chat", className: "chatArea", 
              onChange: this.onKey, value: this.state.message, onKeyDown: this.handleKeyDown})
      )
    }
});

var EventChat = React.createClass({displayName: "EventChat",
  render : function(){
    return (
        React.createElement("div", {id: "chatArea"}, 
          React.createElement(MessageList, {messages: this.props.messages}), 
          React.createElement(MessageInputForm, {postMessage: this.props.postMessage, user: this.props.user})
        )
    )
  }
});

module.exports = EventChat;

