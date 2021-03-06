import React, { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { StaticContext } from '../Contexts/StaticContext';
import { UserContext } from '../Contexts/UserContext';
import Search from './Search/Search';

function TopNavbar() {
  const {user} = useContext(UserContext);
  const {website, apiEndPoint} = useContext(StaticContext);

  const userPath = `${website}/?author=${user?.id}`;
  const loginPath = `${website}/login`;

  const RandomBlog = async() => {
    const res = await fetch(`${apiEndPoint}/blog/random`,{
      method:"GET",
    });

    if(res.status !== 200){return;}

    window.location.assign(`${website}/?id=${(await res.json())}`);
  }

  return (
      <Navbar style={{marginBottom:"2rem",borderBottom:"1px rgba(1,1,1,0.25) solid"}} expand="lg">
        <Container>
          <Navbar.Brand href="/">HawaiiDev Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Hem</Nav.Link>
              {/*<Nav.Link onClick={()=>RandomBlog()}>Random blog</Nav.Link>*/}
              <NavDropdown title="Top användare" id="basic-nav-dropdown">
                <NavDropdown.Item href={`${website}/?author=1642790786280:272676:user`}>Sebastian Ahlman</NavDropdown.Item>
              </NavDropdown>
              <Search/>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">

            {user === null ?
              <Navbar.Text>
                <a href={loginPath}>Logga in</a>
              </Navbar.Text>
              :   
              <Navbar.Text>
                Inloggad som: <a href={userPath}>{user?.name}</a>
              </Navbar.Text> 
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default TopNavbar;
