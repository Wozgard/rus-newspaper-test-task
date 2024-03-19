const fetchPosts = async (userId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  const json = await response.json();
  return json;
};

export default fetchPosts;
