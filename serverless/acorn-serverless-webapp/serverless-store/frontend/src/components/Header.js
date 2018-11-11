import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Nav>
          <IndexLinkContainer to='/'>
            <NavItem>Home</NavItem>
          </IndexLinkContainer>
          <LinkContainer to='/shopping-cart'>
            <NavItem>Shopping Cart</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <LinkContainer to='/signup'>
            <NavItem>Signup</NavItem>
          </LinkContainer>
          <LinkContainer to='/login'>
            <NavItem>Login</NavItem>
          </LinkContainer>
          <NavItem>
            <span className='glyphicon glyphicon-bell'></span>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
