import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

// CodeMirror를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

let CodeMirror = null;
const isBrowser = process.env.APP_ENV === 'browser';
if (isBrowser) {
  CodeMirror = require('codemirror');

  require('codemirror/mode/markdown/markdown');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/jsx/jsx');
  require('codemirror/mode/css/css');
  require('codemirror/mode/shell/shell');
}

const cx = classNames.bind(styles);

class EditorPane extends Component {
  editor = null; // 에디터 ref
  codeMirror = null; // CodeMirror 인스턴스
  cursor = null; // 에디터의 텍스트 cursor 위치

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true, // 왼쪽에 라인 넘버 띄우기
      lineWrapping: true // 내용이 너무 길면 다음 줄에 작성
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  }

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = (e) => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput({ name, value });
  }

  handleChangeMarkdown = (doc) => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor(); // 텍스트 cursor 위치 저장
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // markdown이 변경되면 에디터 값도 변경합니다. 이 과정에서 텍스트 커서의 위치가 초기화되기 때문에, 저장한 커서의 위치가 있으면 해당 위치로 설정합니다.
    if (prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if (!codeMirror) return; // 인스턴스를 아직 만들지 않았을 때
      codeMirror.setValue(this.props.markdown);
      if (!cursor) return; // 커서가 없을 때
      codeMirror.setCursor(cursor);
    }
  }

  render() {
    const { handleChange } = this;
    const { tags, title } = this.props;
    return (
      <div className={cx('editor-pane')}>
        <input
          className={cx('title')}
          placeholder='제목을 입력하세요' 
          name='title'
          value={title}
          onChange={handleChange}
        />
        <div className={cx('code-editor')} ref={ref => this.editor = ref}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input
            name='tags'
            placeholder='태그를 입력하세요 (쉼표로 구분)'
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    )
  }
};

export default EditorPane;
