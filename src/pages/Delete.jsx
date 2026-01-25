import React, { useEffect, useContext } from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../context/UserContext";

const Delete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const handleDelete = async () => {
      try {
        // ตรวจสอบความเป็นเจ้าของ
        const response = await PostService.getById(id);
        if (response.status === 200) {
          if (response.data.author._id !== userInfo?.id) {
            Swal.fire({
              title: "Access Denied",
              text: "You can only delete your own posts",
              icon: "error",
            }).then(() => {
              navigate("/");
            });
            return;
          }

          // แสดง confirmation dialog
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const deleteResponse = await PostService.deletePost(id);
                if (deleteResponse.status === 200) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your post has been deleted.",
                    icon: "success",
                  }).then(() => {
                    navigate("/");
                  });
                }
              } catch (error) {
                Swal.fire({
                  title: "Delete Post",
                  text: error?.response?.data?.message || error.message,
                  icon: "error",
                }).then(() => {
                  navigate("/");
                });
              }
            } else {
              navigate(-1);
            }
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
      }
    };

    handleDelete();
  }, [id, navigate, userInfo]);

  return null;
};

export default Delete;
