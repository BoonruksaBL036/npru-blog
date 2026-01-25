import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import Post from '../components/Post'
import PostService from '../services/post.service'
import Swal from 'sweetalert2'

const PostByAuthor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [authorName, setAuthorName] = useState('')

  useEffect(() => {
    const fetchPostsByAuthor = async () => {
      try {
        const response = await PostService.getByAuthorId(id)
        if (response.status === 200) {
          setPosts(response.data)
          if (response.data.length > 0) {
            setAuthorName(response.data[0].author.username)
          }
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.message || error.message,
          icon: 'error',
        }).then(() => {
          navigate('/')
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPostsByAuthor()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full text-center">
          <p className="text-2xl font-semibold text-gray-800 mb-2">ไม่พบโพสต์</p>
          <p className="text-gray-500 mb-6">ผู้เขียนนี้ยังไม่มีโพสต์ใดๆ</p>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary w-full"
          >
            กลับไปหน้าแรก
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-10 p-5'>
      <h2 className='text-3xl font-bold mb-8'>
        โพสต์ของ {authorName}
      </h2>
      {posts.map((post, index) => (
        <Post postDetail={post} index={index} key={post._id} />
      ))}
    </div>
  )
}

export default PostByAuthor