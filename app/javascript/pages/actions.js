export function setParams(data) {
  return {
    type: 'SET_PARAMS',
    data
  };
};

export function setArticles(data) {
  return {
    type: 'SET_ARTICLES',
    data
  };
};

export function addArticle(data) {
  return {
    type: 'ADD_ARTICLE',
    data
  };
};

export function setDeleteArticle(id) {
  return {
    type: 'DELETE_ARTICLE',
    id
  };
};
