function deepCloneOfNestedObject(nestedObject) {
  return JSON.parse(JSON.stringify(nestedObject));
}

export function articlesReducer(state, action) {
  let attributes;

  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.data, raw_articles: [] };
    case 'SET_PARAMS':
      attributes = { ...state.params, ...action.data }
      return { ...state, params: attributes };
    case 'ADD_ARTICLE':
      return { ...state, raw_articles: [action.data, ...state.raw_articles] };
    case 'DELETE_ARTICLE':
      let articles;
      let raw_articles = state.raw_articles.filter(function(article) {
        return !article.id || article.id != action.id
      });
      if (state.articles.articles) {
        articles = state.articles.articles.filter(function(article) {
          return !article.id || article.id != action.id
        });
        articles = { articles: articles };
      } else {
        articles = state.articles;
      }

      return { ...state, raw_articles: raw_articles, articles: articles }
  }
  return state;
};
