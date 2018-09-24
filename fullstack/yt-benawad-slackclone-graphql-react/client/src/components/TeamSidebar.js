import React from 'react';
import { Grid } from 'semantic-ui-react';

const TeamSidebar = ({
  teamName, username, channelNames, usersToDm,
}) => (
  <Grid style={{ backgroundColor: '#4e3a4c' }}>
    <Grid.Row>
      <h4>{teamName}</h4>
      <h4>{username}</h4>
    </Grid.Row>
    <Grid.Row>
      <h4>Channels</h4>
      {channelNames.map(cn => <h4>{cn}</h4>)}
    </Grid.Row>
    <Grid.Row>
      <h4>Direct Messages</h4>
      {usersToDm.map(person => <h4>{person}</h4>)}
    </Grid.Row>
  </Grid>
);

export default TeamSidebar;
