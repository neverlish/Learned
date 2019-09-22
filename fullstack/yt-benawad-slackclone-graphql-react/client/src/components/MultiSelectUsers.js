import React from 'react';
import { graphql } from 'react-apollo';
import { Dropdown } from 'semantic-ui-react';
import { getTeamMemberQuery } from '../graphql/teams';

const MultiSelectUsers = ({
  data: {
    loading,
    getTeamMembers,
  },
  value,
  handleChange,
  placeholder,
}) => (
  loading ? null : (
    <Dropdown
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      fluid
      multiple
      search
      selection
      options={getTeamMembers.map(tm => ({ key: tm.id, value: tm.id, text: tm.username }))}
    />
  )
);

export default graphql(getTeamMemberQuery, {
  options: ({ teamId }) => ({ variables: { teamId } }),
})(MultiSelectUsers);
