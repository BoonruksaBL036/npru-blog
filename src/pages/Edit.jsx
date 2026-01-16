import React, { useRef, useState, useEffect } from "react";
import Editor from "../components/Editor";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const Edit = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  
  const [loading, setLoading] = useState(true);
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPostDetail({
            title: response.data.title,
            summary: response.data.summary,
            content: response.data.content,
            file: null,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Fetch Post",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        }).then(() => {
          navigate("/");
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

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
      if (postDetail.file) {
        data.set("file", postDetail.file);
      }

      const response = await PostService.updatePost(id, data);
      if (response.status === 200) {
        Swal.fire({
          title: "Update Post",
          text: "Update post successfully",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Update Post",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-6">
          Edit Post
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
            ref={editorRef}
            value={postDetail.content}
            onChange={handleContentChange}
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Featured Image
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            Update Post
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;