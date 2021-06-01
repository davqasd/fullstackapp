import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import throttle from 'lodash.throttle';

import { fetchArticles } from '../../pages/requests';
import { setParams } from '../../pages/actions';

const TableSearch: FC = () => {
  const dispatch = useDispatch();

  const params = useSelector((state) => state.params);

  let resultParams;

  const throttlingFetch = React.useMemo(
    () =>
      throttle(async (resultParams) => {
        dispatch(fetchArticles(resultParams));
      }, 800)
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const value = event.target.value;
    resultParams = { ...params, ...{ q: value } };
    dispatch(setParams(resultParams));
    throttlingFetch(resultParams);
  };

  return (
    <>
      <FormControl
        id="search"
        placeholder="Enter name or body"
        onChange={handleChange}
      />
    </>
  );
};

export default TableSearch;
