import { withFormik } from 'formik';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Button, Form, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import gql from 'graphql-tag';

import { meQuery } from '../graphql/teams';
import MultiSelectUsers from './MultiSelectUsers';

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  currentUserId,
  values,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Direct Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <MultiSelectUsers
            value={values.members}
            teamId={teamId}
            handleChange={(e, { value }) => setFieldValue('members', value)}
            placeholder="select members to message"
            currentUserId={currentUserId}
          />
        </Form.Field>
        <Form.Group>
          <Button
            disabled={isSubmitting}
            fluid
            onClick={(e) => {
              resetForm();
              onClose(e);
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} fluid onClick={handleSubmit}>
            Start Messaging
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const getOrCreateChannelMutation = gql`
  mutation($teamId: Int!, $members: [Int!]!) {
    getOrCreateChannel(teamId: $teamId, members: $members) {
      id
      name
    }
  }
`;

export default compose(
  withRouter,
  graphql(getOrCreateChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ members: [] }),
    handleSubmit: async (
      { members },
      { props: { history, onClose, teamId, mutate }, resetForm },
    ) => {
      const response = await mutate({
        variables: { members, teamId },
        update: (store, { data: { getOrCreateChannel } }) => {
          const { id, name } = getOrCreateChannel;

          const data = store.readQuery({ query: meQuery });
          const teamIdx = findIndex(data.me.teams, ['id', teamId]);
          const notInChannelList = data.me.teams[teamIdx].channels.every(c => c.id !== id);
          if (notInChannelList) {
            data.me.teams[teamIdx].channels.push({
              __typename: 'Channel',
              id,
              name,
              dm: true,
            });
            store.writeQuery({ query: meQuery, data });
          }
          history.push(`/view-team/${teamId}/${id}`);
        },
      });
      console.log(response);
      onClose();
      resetForm();
    },
  }),
)(DirectMessageModal);
