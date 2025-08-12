import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  post: {
    slug: string;
    frontmatter: {
      title: string;
      excerpt: string;
      date: string;
      author: string;
      image?: string;
      tags?: string[];
    };
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  console.log(post.frontmatter.image, "front");

  return (
    <article className="schema-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.frontmatter.image && (
        <div className="relative ">
          <Image
            src={
              post.frontmatter.image && post.frontmatter.image.startsWith("/")
                ? post.frontmatter.image
                : "/placeholder.svg"
            }
            alt={post.frontmatter.title}
            width={800}
            height={400}
            // fill
            className="object-cover "
          />
        </div>
      )}
      <div className="p-6">
        <div className="text-sm text-white/50 mb-2">
          {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h3 className="text-xl font-semibold text-white/80 mt-4 mb-2">
          <Link
            href={`/blog/${post.slug}?utm_source=blog_card&utm_medium=title&utm_campaign=blog_traffic`}
            className="hover:text-orange-500 transition-colors"
          >
            {post.frontmatter.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">{post.frontmatter.excerpt}</p>
        {post.frontmatter.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-white small-card px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${post.slug}?utm_source=blog_card&utm_medium=read_more&utm_campaign=blog_traffic`}
          className="text-orange-600 hover:text-black hover:text-opacity-35 font-medium"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
