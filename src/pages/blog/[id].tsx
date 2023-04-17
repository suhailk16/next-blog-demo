import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/router'

const BlogDetailPage = () => {
  const [post, setPost] = useState(null)
  const router = useRouter()
  const { id } = router.query

  // Client side fetching...
  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setPost(res)
      })
  }, [id])

  if (post === null) {
    return <div>Loading....</div>
  }

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto mt-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <span className="text-indigo-600 font-semibold">
          {new Date(post.dateCreated).toDateString()}
        </span>

        <img className="mt-4" src={post.imageUrl} alt={post.title} />

        <p className="mt-4 text-gray-600 leading-7">{post.content}</p>
      </div>
    </div>
  )
}

export default BlogDetailPage
