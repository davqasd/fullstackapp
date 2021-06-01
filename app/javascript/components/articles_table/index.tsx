import React, { FC } from 'react';
import { Table } from 'react-bootstrap'

const ArticlesTable: FC = ({ data }) => {
  let rows = [];
  if (data && data.grouped_articles) {
    data.grouped_articles.forEach(({articles, count_articles, count_articles_types, last_created_article, grouped_by}, index) => {
      rows.push(
        <tr key={`th${index}`}>
          <th colSpan='2'>Total: { count_articles }</th>
          <th colSpan='2'>Types: { count_articles_types }</th>
          <th colSpan='3'>Last created: { last_created_article }</th>
        </tr>
      );
      articles.forEach(({id, name, body, atype, story_id, created_at, updated_at}) => {
        rows.push(
          <tr key={id}>
            <td>{ id }</td>
            <td>{ name }</td>
            <td>{ body }</td>
            <td>{ atype }</td>
            <td>{ story_id }</td>
            <td>{ created_at }</td>
            <td>{ updated_at }</td>
          </tr>
        );
      });
    });
  } else if (data && data.articles) {
    data.articles.forEach(({id, name, body, atype, story_id, created_at, updated_at}) => {
      rows.push(
        <tr key={id}>
          <td>{ id }</td>
          <td>{ name }</td>
          <td>{ body }</td>
          <td>{ atype }</td>
          <td>{ story_id }</td>
          <td>{ created_at }</td>
          <td>{ updated_at }</td>
        </tr>
      );
    });
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>body</th>
          <th>atype</th>
          <th>story_id</th>
          <th>created_at</th>
          <th>updated_at</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </Table>
  );
};

export default ArticlesTable;
