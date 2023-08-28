import React from "react";
import { Button, Container, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../Redux/Action/UserAction";
function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Recording App</Navbar.Brand>
            </LinkContainer>

            {user ? (
              <NavDropdown
                title={
                  <span style={{ color: "white" }}>{`Hi, ${user.name}`}</span>
                }
                id="profile-dropdown"
              >
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={<span style={{ color: "white" }}>Account</span>}
                id="profile-dropdown"
              >
                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              </NavDropdown>
            )}
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
