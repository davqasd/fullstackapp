import { API } from 'utils/api';

import { useDispatch } from "react-redux";
import { setArticles } from "./actions";

export const fetchArticles = (resultParams) => {
  return (dispatch) => {
    API.articles.articles(resultParams).then(res => {
      dispatch(setArticles(res.data));
    }).catch(err => {
      console.warn(err);
    });
  }
};

export const createRandomArticle = () => {
  API.articles.createRandomArticle().then(res => {
    // ok! get message via websockets!
  }).catch(err => {
    console.warn(err);
  });
};

export const deleteArticle = (id) => {
  API.articles.deleteArticle(id).then(res => {
    // ok! get message via websockets!
  }).catch(err => {
    console.warn(err);
  });
};
