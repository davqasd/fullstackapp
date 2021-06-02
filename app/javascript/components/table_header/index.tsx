import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticles } from '../../pages/requests';
import { setParams } from '../../pages/actions';

const TableHeader: FC = () => {
  const dispatch = useDispatch();

  const params = useSelector((state) => state.params);

  let resultParams;
  let attributes = ['id', 'name', 'body', 'atype', 'story_id', 'created_at', 'updated_at'];
  let headers = [];

  const handleSort = (sortParams) => {
    resultParams = { ...params, ...sortParams };
    dispatch(setParams(resultParams));
    dispatch(fetchArticles(resultParams));
  };

  attributes.forEach((field, index) => {
    headers.push(
      <th key={index}>
        <span>{field}</span>
        <button className="sort-button" onClick={(e) => handleSort({ sort_by: field, sort_order: 'asc' })}>↑</button>
        <button className="sort-button" onClick={(e) => handleSort({ sort_by: field, sort_order: 'desc' })}>↓</button>
      </th>
    );
  });

  return (
    <thead>
      <tr>
        {headers}
        <th/>
      </tr>
    </thead>
  );
};

export default TableHeader;
