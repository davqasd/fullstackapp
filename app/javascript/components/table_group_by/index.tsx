import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import throttle from 'lodash.throttle';

import { fetchArticles } from '../../pages/requests';
import { setParams } from '../../pages/actions';

const TableGroupBy: FC = () => {
  const dispatch = useDispatch();

  const params = useSelector((state) => state.params);

  let resultParams;

  const groupByHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const value = event.target.value;
    resultParams = { ...params, ...{ grouped_by: value } };
    dispatch(setParams(resultParams));
    dispatch(fetchArticles(resultParams));
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Group by</Form.Label>
        <Form.Control as="select" onChange={groupByHandleChange}>
          <option defaultValue></option>
          <option>story_id</option>
          <option>body</option>
          <option>name</option>
          <option>atype</option>
        </Form.Control>
      </Form.Group>
    </>
  );
};

export default TableGroupBy;
