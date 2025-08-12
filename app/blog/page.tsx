import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Google Ads & Web Development Blog - Expert Tips & Strategies",
  description:
    "Stay updated with the latest Google Ads strategies, web development tips, Shopify optimization, and digital advertising insights from Top AD Runner experts.",
  openGraph: {
    title: "Google Ads & Web Development Blog - Expert Tips & Strategies",
    description:
      "Stay updated with the latest Google Ads strategies and web development insights.",
    url: "https://topad.site/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto mt-6 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white/80 mb-4">
            Google Ads & Development Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, proven strategies, and actionable tips to dominate
            Google Ads and build high-converting websites
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Coming Soon!
            </h2>
            <p className="text-gray-600">
              We're working on amazing content for you. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={post.slug}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
