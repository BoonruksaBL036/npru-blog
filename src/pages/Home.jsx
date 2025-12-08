import React, { useState } from 'react'
import Card from '../components/Card'

const Home = () => {

    const [blogs,setBlog]= useState([]);

    const blogList = [
      {
        id: 1,
        title: "Test1",
        summary:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga?",
      },

      {
        id: 2,
        title: "Test2",
        summary:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga?",
      },
      {
        id: 3,
        title: "Test3",
        summary:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga?",
      },
      {
        id: 4,
        title: "Test4",
        summary:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fuga?",
      },
    ];

    useState(() => {
        setBlog(blogList);
    }, [])
  return (
    <>
    {blogs.map((item) => (
        <div className='' key={item.id}>
            <Card id={item.id} title={item.title} summary={item.summary} content={item.content}/>
        </div>
    ))}
    </>
  )
}

export default Home