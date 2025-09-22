// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { getPostBySlug, getAllPosts } from "@/lib/mdx";
// import BlogJsonLd from "@/components/BlogJsonLd";
// import Image from "next/image";
// import AnimatedSlogan from "@/components/AnimatedSlogan";
// interface Props {
//   params: { slug: string };
// }

// export async function generateStaticParams() {
//   const posts = await getAllPosts();
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = params;
//   const post = await getPostBySlug(slug);

//   if (!post) {
//     return {};
//   }

//   return {
//     title: post.frontmatter.title,
//     description: post.frontmatter.excerpt,
//     keywords: post.frontmatter.tags?.join(", "),
//     authors: [{ name: post.frontmatter.author }],
//     openGraph: {
//       title: post.frontmatter.title,
//       description: post.frontmatter.excerpt,
//       type: "article",
//       publishedTime: post.frontmatter.date,
//       authors: [post.frontmatter.author],
//       tags: post.frontmatter.tags,
//       url: `https://topad.site/blog/${slug}`,
//       images: [
//         {
//           url: post.frontmatter.image || "https://topad.site/og-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: post.frontmatter.title,
//         },
//       ],
//     },
//     // twitter: {
//     //   card: "summary_large_image",
//     //   title: post.frontmatter.title,
//     //   description: post.frontmatter.excerpt,
//     //   images: [post.frontmatter.image || "https://topad.site/og-image.jpg"],
//     // },
//   };
// }

// export default async function BlogPost({ params }: Props) {
//   const { slug } = params;
//   const post = await getPostBySlug(slug);

//   if (!post) {
//     notFound();
//   }

//   return (
//     <>
//       <BlogJsonLd post={post} />
//       <AnimatedSlogan text={post.frontmatter.title} />
//       <article className="container mx-auto mt-6 px-4 py-12">
//         <div className="max-w-4xl mx-auto">
//           <header className="mb-8">
//             <h1 className="text-4xl md:text-5xl font-bold text-white/80 mb-4">
//               {post.frontmatter.title}
//             </h1>
//             <div className="flex items-center text-gray-600 mb-4">
//               <span>By {post.frontmatter.author}</span>
//               <span className="mx-2">•</span>
//               <time dateTime={post.frontmatter.date}>
//                 {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </time>
//             </div>
//             {post.frontmatter.tags && (
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {post.frontmatter.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}
//             {post.frontmatter.image && (
//               <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
//                 <Image
//                   src={post.frontmatter.image || "/placeholder.svg"}
//                   alt={post.frontmatter.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             )}
//           </header>

//           <div className="prose text-white prose-lg max-w-none">
//             <div dangerouslySetInnerHTML={{ __html: post.content }} />
//           </div>
//         </div>
//       </article>
//     </>
//   );
// }
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import BlogJsonLd from "@/components/BlogJsonLd";
import Image from "next/image";
import { DMCANotice, InArticleAd } from "@/components/AdSenseComponents";

type Props = {
  params: { slug: string };
};
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const cleanSlug = decodeURIComponent(rawSlug || "").trim();

  const post = await getPostBySlug(cleanSlug);

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.tags?.join(", "),
    authors: [{ name: post.frontmatter.author }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      tags: post.frontmatter.tags,
      url: `https://topad.site/blog/${cleanSlug}`,
      images: [
        {
          url: post.frontmatter.image || "https://topad.site/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug: rawSlug } = await params;
  const cleanSlug = decodeURIComponent(rawSlug || "").trim();

  // Optional redirect for normalized slugs
  if (cleanSlug !== rawSlug) {
    redirect(`/blog/${cleanSlug}`);
  }

  const post = await getPostBySlug(cleanSlug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogJsonLd post={post} />

      <article className="container mx-auto mt-6 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <DMCANotice />
          
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display tracking-tighter font-bold text-white/80 mb-4">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center text-gray-200 mb-4">
              <span>By {post.frontmatter.author}</span>
              <span className="mx-2">•</span>
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {post.frontmatter.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.frontmatter.image && (
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
                <Image
                  src={post.frontmatter.image || "/placeholder.svg"}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </header>

          <div className="prose text-white schema-card p-6  max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(
                  /(<\/p>\s*<p>.*?<\/p>\s*<p>)/g, 
                  '$1<div class="in-article-ad-placeholder"></div>'
                )
              }} 
            />
            <InArticleAd />
          </div>
          
          <div className="mt-12">
            <InArticleAd />
          </div>
        </div>
      </article>
    </>
  );
}
