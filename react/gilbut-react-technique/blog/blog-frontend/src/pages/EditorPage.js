import React from 'react';
import EditorTemplate from 'components/editor/EditorTemplate';
import EditorHeader from 'components/editor/EditorHeader';

const EditorPage = () => {
  return (
    <EditorTemplate 
      header={<EditorHeader />}
      editor='에디터'
      preview='프리뷰'
    />
  );
};

export default EditorPage;
