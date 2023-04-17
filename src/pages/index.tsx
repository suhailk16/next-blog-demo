import { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import Header from '../components/Header'

export default function Home() {
  const [posts, setPosts] = useState([])

  // Client side data fetching...
  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((res) => {
        setPosts(res)
      })
  }, [])

  return (
    <div>
      <Header />
      <div className="py-4 px-4 grid grid-cols-12">
        {posts.map((post) => {
          return (
            <div className="col-span-4" key={post.id}>
              <BlogCard
                id={post.id}
                imageUrl={post.imageUrl}
                title={post.title.slice(0, 50)}
                shortDescription={post.content.slice(0, 100)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
