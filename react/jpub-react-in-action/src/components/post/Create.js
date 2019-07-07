import React, { Component } from "react";
import PropTypes from 'prop-types';

class CreatePost extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    handlePostChange(e) {
        console.log('Handling an update to the post body!');
    }

    handleSubmit() {
        console.log('Handling submission!');
    }

    render() {
        return (
            <div className='create-post'>
                <button onClick={this.handleSubmit}>Post</button>
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
            </div>
        )
    }
}

export default CreatePost;
