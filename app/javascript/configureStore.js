import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { articlesReducer } from './reducers/articles_reducer'

const initialState = {
  articles: {},
  params: {
    q: null,
    grouped_by: null,
    size: 1000,
    sort_by: 'body'
  }
};

function rootReducer(state, action) {
  const reducers = [articlesReducer];

  for (let reducer of reducers) {
    let res = reducer(state, action);
    if (res) { return res; }
  }

  return state;
};

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
  );
  return store;
};
