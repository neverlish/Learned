import React, { Component } from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';

import marked from 'marked';

const cx = classNames.bind(styles);

class MarkdownRender extends Component {
  state = {
    html: ''
  }

  renderMarkdown = () => {
    const { markdown } = this.props;
    // 마크다운이 존재하지 않는다면 공백 처리
    if (!markdown) {
      this.setState({ html: '' });
      return;
    }
    this.setState({
      html: marked(markdown, {
        breaks: true, // 일반 엔터로 새 줄 입력
        sanitize: true // 마크다운 내부 html 무시
      })
    });
  }

  constructor(props) {
    super(props);
    const { markdown } = props;
    // 서버사이드 렌더링에서도 마크다운 처리가 되도록 constructor 쪽에서도 구현합니다.
    this.state = {
      html: markdown ? marked(props.markdown, { breaks: true, sanitize: true }) : ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // markdown 값이 변경되면 renderMarkdown을 호출합니다.
    if (prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown();
    }
  }

  render() {
    const { html } = this.state;

    // React에서 html을 렌더링하려면 객체를 만들어 내부에 __html__ 값을 설정해야 합니다.
    const markup = {
      __html: html
    };

    // 그리고 dangerouslySetInnerHTML 값에 해당 객체를 넣어 주면 됩니다.
    return (
      <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup} />
    );
  }
}

export default MarkdownRender;
