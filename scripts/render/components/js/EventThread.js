/** @jsx React.DOM */
var React = require('react/addons');

var Thread = React.createClass({displayName: "Thread",
    getInitialState: function(){
      return{
        upvote : this.props.upvote
      }
    },
    handleVoting: function(action){
        socket.emit('vote:thread', this.props.id, action);
        this.setState({
          upvote : this.state.upvote + action
        })
    },
    render: function(){
      return (
        React.createElement("li", {className: "thread_post"}, 
          React.createElement("div", {className: "votingArea"}, 
            React.createElement("i", {className: "fa fa-arrow-up", onClick: this.handleVoting.bind(null, 1)}), 
            React.createElement("i", {className: "fa fa-arrow-down", onClick: this.handleVoting.bind(null, -1)}), 
            React.createElement("p", {className: "thread_post_rating"}, this.state.upvote)
          ), 
          React.createElement("div", {className: "thread_post_content"}, this.props.content)
        )
      )
    }
})

var ThreadList = React.createClass({displayName: "ThreadList",
    render: function(){
      var renderThreadPost = function(thread, i){
        return React.createElement(Thread, {key: i, id: thread._id, upvote: thread.upvote, content: thread.content})
      }
      return (
        React.createElement("ul", {id: "threads", className: "threadArea"}, 
          this.props.thread.map(renderThreadPost)
        )
      )
    }
});

var ThreadInputForm = React.createClass({displayName: "ThreadInputForm",
    getInitialState: function(){
        return {
          thread_post: ''
        };
    },
    onKey : function(e){
        this.setState({ thread_post : e.target.value });
    },
    postThread : function(){
        this.props.postThread(this.state.thread_post);
        this.setState({
          thread_post: ''
        });
    },
    render : function(){
        return (
            React.createElement("div", null, 
              React.createElement("i", {id: "showThreadPost", className: "fa fa-pencil-square-o fa-lg"}), 
              React.createElement("i", {id: "cancel_thread_post", className: "fa fa-times"}), 
              React.createElement("textarea", {id: "threadInput", type: "text", placeholder: "Type to leave a comment", className: "threadArea", 
                onChange: this.onKey, value: this.state.thread_post}), 
              React.createElement("i", {id: "submit_thread", className: "fa fa-check-square-o", onClick: this.postThread})
            )
        )
    }
});

var EventThread = React.createClass({displayName: "EventThread",
    render : function(){
      return (
          React.createElement("div", {id: "threadArea"}, 
            React.createElement(ThreadList, {thread: this.props.thread}), 
            React.createElement(ThreadInputForm, {postThread: this.props.postThread})
          )
      )
    }
})

module.exports = EventThread;