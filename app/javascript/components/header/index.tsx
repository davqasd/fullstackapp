import React, { FC } from 'react';
import { Navbar } from 'react-bootstrap'

const Header: FC = () => {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Fullstackapp</Navbar.Brand>
    </Navbar>
    </>
  );
};

export default Header;
