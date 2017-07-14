import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Logo from 'components/Logo';

const NavigationBar = () => (
    <Navbar fixedTop fluid>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/"><Logo /></Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <LinkContainer to="/test">
                <NavItem>Test URL</NavItem>
            </LinkContainer>
        </Nav>
    </Navbar>
);

export default NavigationBar;
