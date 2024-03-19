import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NewsList } from "components/NewsList/NewsList";
import { NewsFullPage } from "components/NewsFullPage/NewsFullPage";
import fetchPosts from "api_getway/fetchPosts";
import PostType from "api_types/postType";
import "styles.css";

const App = () => {
  const [postsData, setPostData] = useState<Array<PostType>>([]);
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(NaN);

  console.groupCollapsed("Render");
  console.table(postsData);
  console.log(loading);
  console.log(page);
  console.groupEnd();

  /**
   * Функция для добавление параметра страницы в URL
   */
  const setQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page.toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParams}`
    );
  };

  useEffect(() => {
    if (Number.isNaN(page)) {
      const params = new URLSearchParams(window.location.search);
      const pageParam = parseInt(params.get("page") || "1", 10);
      setPage(pageParam);
      return;
    }

    if (firstRender) {
      setFirstRender(false);
      const newPostsPromises = [];

      for (let i = 0; i < page; i++) {
        newPostsPromises.push(fetchPosts(i + 1));
      }

      Promise.all(newPostsPromises).then((nextPosts: Array<PostType>) => {
        console.log(nextPosts);
        setPostData(nextPosts.flat());
        setLoading(false);
      });

      return;
    }

    const prevPosts = postsData;
    fetchPosts(page).then((newPosts: Array<PostType>) => {
      setPostData([...prevPosts, ...newPosts]);
      setQueryParams();
      setLoading(false);
    });
  }, [page]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <NewsList
              postsData={postsData}
              page={page}
              setPage={setPage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route path="/:id" element={<NewsFullPage postsData={postsData} />} />
      </Routes>
    </Router>
  );
};

export default App;
