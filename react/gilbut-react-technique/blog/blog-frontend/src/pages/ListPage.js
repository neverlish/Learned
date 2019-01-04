import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from 'components/list/ListWrapper';
import ListContainer from 'containers/list/ListContainer';
import * as listActions from 'store/modules/list';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';

const ListPage = ({ match }) => {
  const { page = 1, tag } = match.params;

  const title = (() => {
    let title = 'reactblog';
    if (tag) {
      title += ` #${tag}`;
    }
    if (page !== 1) {
      title += ` - ${page}`;
    }
    return title;
  })();

  return (
    <PageTemplate>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ListWrapper>
        <ListContainer
          page={parseInt(page, 10)}
          tag={tag}
        />
      </ListWrapper>
    </PageTemplate>
  );
};

ListPage.preload = (dispatch, params) => {
  const { page = 1, tag } = params;
  const ListActions = bindActionCreators(listActions, dispatch);
  return ListActions.getPostList({
    page, tag
  });
}

export default ListPage;
