import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../components/header';
import ArticlesTable from '../components/articles_table';
import TableSearch from '../components/table_search';
import TableGroupBy from '../components/table_group_by';

const IndexPage = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <div className="input-wrapper">
          <TableSearch/>
        </div>

        <div className="input-wrapper">
          <TableGroupBy/>
        </div>

        <div className="input-wrapper">
          <ArticlesTable/>
        </div>
      </Container>
    </>
  );
};

export default IndexPage;
