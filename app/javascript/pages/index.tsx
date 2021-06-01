import React from 'react';
import Header from '../components/header';
import { Container, Jumbotron, FormControl, Form, Table } from 'react-bootstrap';
import ArticlesTable from '../components/articles_table';
import throttle from 'lodash.throttle';
import { API } from 'utils/api';

const IndexPage: NextPageWithStore = () => {
  let resultParams = {
    q: null,
    grouped_by: null,
    size: 1000,
    sort_by: 'body'
  }

  const [error, setError] = React.useState('');
  const [articles, setArticles] = React.useState({ data: {} });
  const [params, setParams] = React.useState(resultParams);

  const fetch = (resultParams) => {
    (async () => {
      try {
        const res = await API.articles.articles(resultParams);
        setArticles(res.data);
      } catch (e) {
        console.warn(e);
        setError('Error on request');
      }
    })();
  };

  const throttlingFetch = React.useMemo(
    () =>
      throttle(async (resultParams) => {
        fetch(resultParams);
      }, 800)
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const value = event.target.value;
    resultParams = params;
    resultParams.q = value;
    setParams(resultParams);
    throttlingFetch(resultParams);
  };

  const groupByHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const value = event.target.value;
    resultParams = params;
    resultParams.grouped_by = value;
    setParams(resultParams);
    fetch(resultParams);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Header />
      <Container fluid>
        <div className="input-wrapper">
          <FormControl
            id="search"
            placeholder="Enter name or body"
            onChange={handleChange}
          />
        </div>

        <div className="input-wrapper">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Group by</Form.Label>
            <Form.Control as="select" onChange={groupByHandleChange}>
              <option defaultValue></option>
              <option>story_id</option>
              <option>body</option>
              <option>name</option>
              <option>atype</option>
            </Form.Control>
          </Form.Group>
        </div>

        <div className="input-wrapper">
          <ArticlesTable data={articles} />
        </div>
      </Container>
    </>
  );
};

export default IndexPage;
