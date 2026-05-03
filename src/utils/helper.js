const searchPosts = (posts = [], search) => {
  if (!search) return posts;
  return posts.filter((p) => p.options.title.toLowerCase().includes(search));
};

const filterPosts = (posts = [], cat) => {
  if (!cat) return posts;
  return posts.filter((p) => p.category === cat);
};

const setQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return {
    ...currentQuery,
    ...newQuery,
  };
};
export { searchPosts, filterPosts, setQueryObject };
