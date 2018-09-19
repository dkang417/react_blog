import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {

  

    // calls for 1 time when component shows up on page
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            );
        });
    }

    render() {
        // console.log(this.props.posts);
        return (
            <div>
                <h3>Posts</h3>
                <ul className="list-group">
                {this.renderPosts()}    
                   </ul> 
            </div>
        );
    }
}

// if we need anything from app level state we need to define this function
function mapStateToProps(state) {
    return { posts: state.posts };
}


export default connect(mapStateToProps, {fetchPosts}) (PostsIndex);
