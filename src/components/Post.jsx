import React from "react";
import { Link } from "react-router";

const Post = ({ postDetail, index = 0 }) => {
  const { _id, title, cover, author, createdAt, summary } = postDetail;
  const isEven = index % 2 == 0;
  return (
    <>
      <a
        href={`/postdetail/${_id}`}
        className={`card card-side bg-base-100 shadow-sm overflow-hidden rounded-md max-md:grid max-md:grid-cols-1 ${
          isEven ? "flex-row" : "flex-row-reverse"
        }`}
        key={_id}
      >
        <div className="max-w-[400px] max-h-[285px]">
          <img src={cover} alt="Movie" className="w-full h-full object-cover" />
        </div>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>
            {author.username} | {createdAt}
          </p>
          <p className="line-clamp-4">{summary}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </a>
    </>
  );
};

export default Post;
