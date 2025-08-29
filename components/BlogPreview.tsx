import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import BlogCard from "./BlogCard";

export default async function BlogPreview() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);

  if (posts.length === 0) {
    return (
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white/80 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-white-50">
              Amazing content coming soon! We're preparing expert insights for
              you.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white/80 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-white">
            Stay updated with the latest Google Ads insights and strategies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8  mb-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog?utm_source=homepage&utm_medium=cta&utm_campaign=view_all_posts"
            className="bg-gradient-to-r from-orange-500 to-transparent text-white px-8 py-3 rounded-lg hover:bg-teal-1100 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
