import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import FontAwesome from "react-fontawesome";

const Header = styled.header`
  height: 100px;
  background-color: #ecf0f1;
  padding: 0 40px;
  margin-bottom: 30px;
`;

const HeaderIcon = styled.span`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
  color: white;
  background-color: #3498db;
  margin-right: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-out;
  position: relative;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const Number = styled.span`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #8e44ad;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 25px;
  top: -10px;
`;

const HeaderPresenter = () => (
  <Header>
    <Flex full justifyBetween alignCenter>
      <FlexItem>
        <h3>Antiredux</h3>
      </FlexItem>
      <FlexItem>
        <Flex>
          <HeaderIcon>
            <FontAwesome name="user" />
          </HeaderIcon>
          <HeaderIcon>
            <FontAwesome name="cog" />
          </HeaderIcon>
          <HeaderIcon>
            <FontAwesome name="bell" />
            <Number>10</Number>
          </HeaderIcon>
        </Flex>
      </FlexItem>
    </Flex>
  </Header>
);

export default HeaderPresenter;
