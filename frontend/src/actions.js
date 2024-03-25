// actions.js
export const POPULATE_POSTS = "POPULATE_POSTS";

export const populatePosts = (posts) => {
  return {
    type: POPULATE_POSTS,
    payload: posts,
  };
};
