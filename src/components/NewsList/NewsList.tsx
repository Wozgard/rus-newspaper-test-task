import React, { useEffect, useRef } from "react";
import { NewsPost } from "components/NewsPost/NewsPost";
import PostType from "api_types/postType";
import "components/NewsList/NewsList.css";

interface NewsListProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  postsData: Array<PostType>;
}

export const NewsList = ({
  postsData,
  page,
  setPage,
  loading,
  setLoading,
}: NewsListProps) => {
  console.groupCollapsed("NewsList REnder");
  console.table(postsData);
  console.log(loading);
  console.log(page);
  console.groupEnd();

  const observer = useRef<IntersectionObserver | null>(null);
  const componentObresved = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && page < 5) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (componentObresved.current)
      observer.current?.observe(componentObresved.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [loading, page]);

  return (
    <main className="main">
      <div className="main__container _container">
        {postsData.map((post, i, arr) => {
          if (i === arr.length - 1) {
            return (
              <div key={post.id} ref={componentObresved}>
                <NewsPost {...post} />
              </div>
            );
          }
          return <NewsPost key={post.id} {...post} />;
        })}
        {page >= 5 &&
          page < 10 &&
          !loading && ( // кнопка будет видна только с 5-ой страницы и пока не загрузятся все посты (100), только если страница уже загрузилась, но при работе с другим API нужно менять значения
            <div className="main__box-button">
              <button
                className="main__load-more"
                onClick={() => setPage((prevPage) => prevPage + 1)}
              >
                Загрузить еще
              </button>
            </div>
          )}
      </div>
    </main>
  );
};
