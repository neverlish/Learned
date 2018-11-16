import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from 'components/list/ListWrapper';
import PostList from 'components/list/PostList';

const ListPage = () => {
  return (
    <PageTemplate>
      <ListWrapper>
        <PostList />
      </ListWrapper>
    </PageTemplate>
  );
};

export default ListPage;
