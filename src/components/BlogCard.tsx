import Link from 'next/link'

interface BlogCardProps {
  id: string
  title: string
  imageUrl: string
  shortDescription: string
}

const BlogCard = (props: BlogCardProps) => {
  const { id, title, imageUrl, shortDescription } = props

  return (
    <div className="max-w-lg">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <a href="#">
          <img className="rounded-t-lg" src={imageUrl} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
              {title} ...
            </h5>
          </a>
          <p className="font-normal text-gray-700 mb-3">
            {shortDescription}...
          </p>
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            href={`/blog/${id}`}
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
