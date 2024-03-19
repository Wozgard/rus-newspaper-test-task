import React from "react";
import 'components/NewsFullPage/NewsFullPage.css';
import PostType from "api_types/postType";

interface NewsFullPageProps {
  postsData: Array<PostType>;
}


export const NewsFullPage = ({ postsData }: NewsFullPageProps) => {
  const spletedUrl = window.location.href.split('/');
  const id = spletedUrl[spletedUrl.length - 1];
  
  const post = postsData[Number(id) - 1];

  console.log(post);

  return(
  <div className="page">
    <div className="page__container">
      <h3 className="page__title">{post.title}</h3>
      <p className="page__body">{post.body}</p>
    </div>
  </div>
)};
