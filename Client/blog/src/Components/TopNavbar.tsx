import React, { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { StaticContext } from '../Contexts/StaticContext';
import { UserContext } from '../Contexts/UserContext';
import Search from './Search/Search';

function TopNavbar() {
  const {user} = useContext(UserContext);
  const {website} = useContext(StaticContext);

  const userPath = `${website}/?author=${user?.id}`;
  const loginPath = `${website}/login`;

  return (
      <Navbar style={{marginBottom:"2rem",borderBottom:"1px rgba(1,1,1,0.25) solid"}} expand="lg">
        <Container>
          <Navbar.Brand href="/">HawaiiDev Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Hem</Nav.Link>
              <Nav.Link href="/">Random blog</Nav.Link>
              <NavDropdown title="Top användare" id="basic-nav-dropdown">
                <NavDropdown.Item href={`${website}/?author=1642790786280:272676:user`}>Sebastian Ahlman</NavDropdown.Item>
              </NavDropdown>
              <Search/>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">

            {user === null ?
              <Navbar.Text>
                <a href={loginPath}>Login</a>
              </Navbar.Text>
              :   
              <Navbar.Text>
                Signed in as: <a href={userPath}>{user?.name}</a>
              </Navbar.Text> 
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default TopNavbar;
