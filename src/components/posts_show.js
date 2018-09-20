import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {

    // this is called after component is rendered to dom
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    // delete a post with matching id
    onDeleteClick() {
        const { id } = this.props.match.params;
        // redirect back to root
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }


    render() {
        const { post } = this.props;
        // if we dont have the data yet..  'cant read property of undefined' check if property exists
        if (!post) {
            return <div>Loading..</div>;
        }

        return (
            <div>
                <Link to="/" className="btn btn-primary">Back to Index </Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>{post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// ownProps goes to postsshow component. here we grab 1 post
function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
