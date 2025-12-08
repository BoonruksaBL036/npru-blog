import React from "react";
import { Link } from "react-router";

const Post = ({ postDetail, index = 0 }) => {
  const { id, title, cover, author, createdAt, summary} = postDetail;
  const isEven = index % 2 == 0;
  return (
    <>
      <a
        href={`/postdetail/${id}`}
        className={`card card-side bg-base-100 shadow-sm overflow-hidden rounded-md max-md:grid max-md:grid-cols-1 ${ isEven ? "flex-row" : "flex-row-reverse"}`}
        key={id}
      >
        <div className="min-w-[400px] h-full object-cover">
          <img src={cover} alt="Movie" className="w-full h-full object-cover" />
        </div>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>
            {author} | {createdAt}
          </p>
          <p class="line-clamp-4">{summary}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </a>
    </>
  );
};

export default Post;
