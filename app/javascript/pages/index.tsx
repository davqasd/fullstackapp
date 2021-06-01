import React from 'react';
import Header from '../components/header';
import { Container, Jumbotron, FormControl } from 'react-bootstrap';
import { API } from 'utils/api';

const IndexPage: NextPageWithStore = () => {
  return (
    <>
      <Header/>
      <Container fluid>
        <Jumbotron>
        </Jumbotron>
      </Container>
    </>
  );
};

export default IndexPage;
