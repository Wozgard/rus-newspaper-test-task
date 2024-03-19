import React from "react";
import "components/NewsPost/NewsPost.css";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const NewsPost = ({ id, title, body }: Post) => (
  <Link
    to={`/${id}`}
    className="post"
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <div className="post__container">
      <h3 className="post__title">{`${title}  ${id}`}</h3>
      <p className="post__body">{body}</p>
    </div>
  </Link>
);
