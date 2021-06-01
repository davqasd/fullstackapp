function deepCloneOfNestedObject(nestedObject) {
  return JSON.parse(JSON.stringify(nestedObject));
}

export function articlesReducer(state, action) {
  let attributes;

  switch (action.type) {
    case "SET_ARTICLES":
      return { ...state, articles: action.data };
    case "SET_PARAMS":
      attributes = { ...state.params, ...action.data }
      return { ...state, params: attributes };
  }
  return state;
};
