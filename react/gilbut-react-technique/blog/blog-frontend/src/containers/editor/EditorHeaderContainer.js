import React, { Component } from 'react';
import EditorHeader from 'components/editor/EditorHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as editorActions from 'store/modules/editor';

class EditorHeaderContainer extends Component {
  componentDidMount() {
    const { EditorActions } = this.props;
    EditorActions.initialize();
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleSubmit = async () => {
    const { title, markdown, tags, EditorActions, history } = this.props;
    const post = {
      title,
      body: markdown,
      tags: tags === '' ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
    };
    try {
      await EditorActions.writePost(post);
      // 페이지를 이동시킵니다. 주의: postId는 위쪽에서 레퍼런스를 만들지 않고 이 자리에서 this.props.postId를 조회해야 합니다(현재 값을 불러오기 위함).
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { handleGoBack, handleSubmit } = this;

    return (
      <EditorHeader
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
      />
    );
  }
}

export default connect(
  (state) => ({
    title: state.editor.get('title'),
    markdown: state.editor.get('markdown'),
    tags: state.editor.get('tags'),
    postId: state.editor.get('postId'),
  }),
  (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));
