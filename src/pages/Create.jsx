import React, { useRef, useState } from "react";
import Editor from "../components/Editor";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleContentChange = (value) => {
    setPostDetail((prev) => ({
      ...prev,
      content: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      data.set("file", postDetail.file);
      console.log("DATA", postDetail);
      const response = await PostService.createPost(data);
      if (response.status === 200) {
        Swal.fire({
          title: "Create Post",
          text: "Create post successfully",
          icon: "success",
        }).then(() => {
          setPostDetail({
            title: "",
            summary: "",
            content: "",
            file: null,
          });
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Create Post",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-6">
          Create New Post
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={postDetail.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Summary */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Summary</label>
          <input
            type="text"
            name="summary"
            value={postDetail.summary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <Editor
            value={postDetail.content}
            name="content"
            onChange={handleContentChange}
            ref={editorRef}
          />
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={handleSubmit}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Create;
