import React, { FC } from 'react';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles, deleteArticle } from '../../pages/requests';
import TableHeader from '../table_header';

const ArticlesTable: FC = () => {
  const dispatch = useDispatch();
  const params = useSelector((state) => state.params);
  const data = useSelector((state) => state.articles);
  const raw_articles = useSelector((state) => state.raw_articles);

  React.useEffect(() => {
    dispatch(fetchArticles(params));
  }, []);

  const handleRemove = (event, id) => {
    event.preventDefault();
    if (!data.articles) {
      console.log('not realized');
    } else {
      deleteArticle(id);
    }
  };

  const generateArticleList = (articles) => {
    let rows = [];

    articles.forEach(({id, name, body, atype, story_id, created_at, updated_at}) => {
      rows.push(
        <tr key={ id }>
          <td>{ id }</td>
          <td>{ name }</td>
          <td>{ body }</td>
          <td>{ atype }</td>
          <td>{ story_id }</td>
          <td>{ created_at }</td>
          <td>{ updated_at }</td>
          <td><a href='#' onClick={(e) => handleRemove(e, id)}>delete</a></td>
        </tr>
      );
    });

    return rows;
  }

  let rows = [];
  if (data && data.grouped_articles) {
    data.grouped_articles.forEach(({articles, count_articles, count_articles_types, last_created_article, grouped_by}, index) => {
      rows.push(
        <tr key={`th${index}`}>
          <th colSpan='2'>Total: { count_articles }</th>
          <th colSpan='2'>Types: { count_articles_types }</th>
          <th colSpan='3'>Last created: { last_created_article }</th>
          <th/>
        </tr>
      );
      rows = [...rows, ...generateArticleList(articles)];
    });
  } else if (data && data.articles) {
    rows = [...rows, ...generateArticleList(data.articles)];
  }

  rows = [...generateArticleList(raw_articles), ...rows];

  return (
    <Table striped bordered hover>
      <TableHeader/>
      <tbody>
        { rows }
      </tbody>
    </Table>
  );
};

export default ArticlesTable;
