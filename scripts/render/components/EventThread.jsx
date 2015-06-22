/** @jsx React.DOM */
var React = require('react/addons');

var Thread = React.createClass({
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
        <li className = 'thread_post'>
          <div className="votingArea"> 
            <i className = "fa fa-arrow-up" onClick={this.handleVoting.bind(null, 1)}></i>
            <i className = "fa fa-arrow-down" onClick={this.handleVoting.bind(null, -1)}></i>
            <p className="thread_post_rating">{this.state.upvote}</p>
          </div>
          <div className="thread_post_content">{this.props.content}</div>
        </li>
      )
    }
})

var ThreadList = React.createClass({
    render: function(){
      var renderThreadPost = function(thread, i){
        return <Thread key = {i} id = {thread._id} upvote = {thread.upvote} content = {thread.content}/>
      }
      return (
        <ul id="threads" className="threadArea">
          {this.props.thread.map(renderThreadPost)} 
        </ul>
      )
    }
});

var ThreadInputForm = React.createClass({
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
            <div>
              <i id="showThreadPost" className="fa fa-pencil-square-o fa-lg"></i>
              <i id="cancel_thread_post" className="fa fa-times"></i>
              <textarea id="threadInput" type="text" placeholder="Type to leave a comment" className="threadArea"
                onChange = {this.onKey} value = {this.state.thread_post}></textarea>
              <i id="submit_thread" className="fa fa-check-square-o" onClick = {this.postThread} ></i>
            </div>
        )
    }
});

var EventThread = React.createClass({
    render : function(){
      return (
          <div id="threadArea">
            <ThreadList thread = {this.props.thread}/>
            <ThreadInputForm postThread = {this.props.postThread}/>
          </div>
      )
    }
})

module.exports = EventThread;