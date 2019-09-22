import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) {
    return null;
  }

  const teamIdx = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)]) : 0;
  const team = allTeams[teamIdx];
  let username = '';

  try {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    // eslint-disable-next-line prefer-destructuring
    username = user.username;
  } catch (err) {}

  return [
    <Teams
      key="team-sidebar"
      teams={allTeams.map(t => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase(),
      }))} 
    />,
    <Channels
      key="channels-sidebar"
      teamName={team.name}
      username={username}
      channels={team.channels}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
    />,
  ];
};

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        public
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar);
