import React, { Component } from "react";
import PropTypes from 'prop-types';

import * as API from '../../shared/http';
import Content from './Content';
import Image from './Image';
import Link from './Link';
import PostActionSection from './PostActionSection';
import Comments from '../comment/Comments';
import DisplayMap from '../map/DisplayMap';
import UserHeader from "./UserHeader";
import Loader from '../Loader';

export class Post extends Component {
    static propTypes = {
        post: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            comments: [],
            showComments: false,
            user: this.props.user
        };
        this.loadPost = this.loadPost.bind(this);
    }

    componentDidMount() {
        this.loadPost(this.props.id);
    }

    loadPost(id) {
        API.fetchPost(id)
            .then(res => res.json())
            .then(post => {
                this.setState(() => ({ post }));
            });
    }

    render() {
        if (!this.state.post) {
            return <Loader />;
        }
        return (
            <div className='post'>
                <UserHeader date={this.state.post.date}
                    user={this.state.post.user} />
                <Content post={this.state.post} />
                <Image post={this.state.post} />
                <Link link={this.state.post.link} />
                {this.state.post.location && <DisplayMap displayOnly location={this.state.post.location} />}
                <PostActionSection showComments={this.state.showComments} />
                <Comments
                    comments={this.state.comments}
                    show={this.state.showComments}
                    post={this.state.post}
                    user={this.state.user}
                />
            </div>
        );
    }
}

export default Post;
