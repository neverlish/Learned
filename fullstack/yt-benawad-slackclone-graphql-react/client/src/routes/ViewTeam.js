import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import TeamSidebar from '../components/TeamSidebar';
import TeamHeader from '../components/TeamHeader';
import MessageInput from '../components/MessageInput';

export default () => (
  <Container>
    <Grid>
      <Grid.Column width={5}>
        <TeamSidebar
          teamName="Bob Is Cool"
          username="Bob the first"
          channelNames={['General', 'Random']}
          usersToDm={['slackbot', 'Bob the first', 'Bob the second']}
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <TeamHeader />
        <MessageInput />
      </Grid.Column>
    </Grid>
  </Container>
);
