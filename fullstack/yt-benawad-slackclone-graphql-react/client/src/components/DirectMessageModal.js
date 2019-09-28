import React from 'react';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import Downshift from 'downshift';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { getTeamMemberQuery } from '../graphql/teams';

const DirectMessageModal = ({
  history,
  open,
  onClose,
  teamId,
  data: { loading, getTeamMembers },
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          {!loading && (
            <Downshift
              onChange={(selectedUser) => {
                history.push(`/view-team/user/${teamId}/${selectedUser.id}`);
                onClose();
              }}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem,
                highlightedIndex,
              }) => (
                <div>
                  <Input {...getInputProps({ placeholder: 'Favorite color ?' })} fluid />
                  {isOpen ? (
                    <div style={{ border: '1px solid #ccc' }}>
                      {getTeamMembers
                        .filter(i =>
                          !inputValue ||
                          i.username.toLowerCase().includes(inputValue.toLowerCase()))
                        .map((item, index) => (
                          <div
                            {...getItemProps({ item })}
                            key={item.id}
                            style={{
                              backgroundColor: highlightedIndex === index ? 'gray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            }}
                          >
                            {item.username}
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              )}
            </Downshift>
          )}
        </Form.Field>
        <Button fluid onClick={onClose}>
          Cancel
        </Button>
      </Form>
    </Modal.Content>
  </Modal>
);

export default withRouter(graphql(getTeamMemberQuery)(DirectMessageModal));
