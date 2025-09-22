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
import { DMCANotice, InArticleAd, DisplayAd } from "@/components/AdSenseComponents";
import { Suspense } from "react";

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
  try {
    const { slug: rawSlug } = await params;
    const cleanSlug = decodeURIComponent(rawSlug || "").trim();

    const post = await getPostBySlug(cleanSlug);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      keywords: post.frontmatter.tags?.join(", "),
      authors: [{ name: post.frontmatter.author }],
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
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
      alternates: {
        canonical: `https://topad.site/blog/${cleanSlug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

// Enhanced function to process MDX content with images and ads
function processContentWithAdsAndImages(content: string): string {
  try {
    let processedContent = content;

    // Step 1: Fix image tags to use Next.js Image component properly
    processedContent = processedContent.replace(
      /<image\s+([^>]*?)\/?>|<img\s+([^>]*?)\/?>|<Image\s+([^>]*?)\/?>?/gi,
      (match, attrs1, attrs2, attrs3) => {
        const attrs = attrs1 || attrs2 || attrs3 || '';
        
        // Extract attributes
        const srcMatch = attrs.match(/src=['"]([^'"]*)['"]/i);
        const altMatch = attrs.match(/alt=['"]([^'"]*)['"]/i);
        const widthMatch = attrs.match(/(?:w|width)=['"]?(\d+)['"]?/i);
        const heightMatch = attrs.match(/(?:h|height)=['"]?(\d+)['"]?/i);
        
        const src = srcMatch ? srcMatch[1] : '/placeholder.svg';
        const alt = altMatch ? altMatch[1] : 'Blog image';
        const width = widthMatch ? widthMatch[1] : '800';
        const height = heightMatch ? heightMatch[1] : '600';

        return `
          <div class="my-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="${src}" 
              alt="${alt}" 
              width="${width}" 
              height="${height}"
              class="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        `;
      }
    );

    // Step 2: Split content into sections for ad insertion
    const sections = processedContent.split(/(<\/h[1-6]>|<\/p>)/gi);
    const result: string[] = [];
    let contentBlocks = 0;
    let adCount = 0;
    const maxAds = 5; // Limit number of ads per article

    for (let i = 0; i < sections.length; i++) {
      result.push(sections[i]);
      
      // Count meaningful content blocks (headings and paragraphs)
      if (sections[i].match(/<\/(?:h[1-6]|p)>/i)) {
        contentBlocks++;
        
        // Insert ads at strategic positions
        const shouldInsertAd = (
          adCount < maxAds && 
          contentBlocks >= 3 && // Start after 3rd content block
          contentBlocks % 4 === 0 // Every 4th content block
        );

        if (shouldInsertAd) {
          adCount++;
          result.push(`
            <div class="in-article-ad-wrapper my-12 py-6">
              <div class="text-center text-xs text-gray-500 mb-3 uppercase tracking-wider">
                Advertisement
              </div>
              <div class="in-article-ad-container flex justify-center">
                <div class="adsense-ad-placeholder w-full max-w-2xl">
                  <ins
                    class="adsbygoogle"
                    style="display: block; text-align: center; min-height: 250px;"
                    data-ad-layout="in-article"
                    data-ad-format="fluid"
                    data-ad-client="ca-pub-1241486495309147"
                    data-ad-slot="1716775182"
                    data-full-width-responsive="true"
                  ></ins>
                </div>
              </div>
              <div class="text-center text-xs text-gray-500 mt-3 uppercase tracking-wider">
                Advertisement
              </div>
            </div>
          `);
        }
      }
    }

    return result.join('');
  } catch (error) {
    console.error("Error processing content:", error);
    return content; // Return original content if processing fails
  }
}

// Component to initialize ads after content loads
function AdInitializer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
              try {
                
                const ads = document.querySelectorAll('.adsbygoogle');
                ads.forEach(function(ad, index) {
                  if (!ad.dataset.adsbygoogleStatus) {
                    setTimeout(function() {
                      try {
                        (adsbygoogle = window.adsbygoogle || []).push({});
                      } catch (e) {
                        console.log('Ad initialization error for ad', index, ':', e);
                      }
                    }, index * 500); 
                  }
                });
              } catch (e) {
                console.log('AdSense initialization error:', e);
              }
            }, 1000);
          });
        `
      }}
    />
  );
}

export default async function BlogPost({ params }: Props) {
  try {
    const { slug: rawSlug } = await params;
    const cleanSlug = decodeURIComponent(rawSlug || "").trim();

    // Only redirect if there's URL encoding
    if (cleanSlug !== rawSlug && rawSlug.includes('%')) {
      redirect(`/blog/${cleanSlug}`);
    }

    const post = await getPostBySlug(cleanSlug);

    if (!post) {
      notFound();
    }

    // Process content with images and ads
    const processedContent = processContentWithAdsAndImages(post.content);

    return (
      <>
        <BlogJsonLd post={post} />

        {/* Load AdSense script in head */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1241486495309147"
          crossOrigin="anonymous"
        />

        <article className="container mx-auto mt-6 px-4 py-20" itemScope itemType="https://schema.org/BlogPosting">
          <div className="max-w-4xl mx-auto">
            <DMCANotice />
            
            {/* Top Display Ad */}
            <div className="mb-8">
              <Suspense fallback={<div className="h-24 bg-gray-100/10 animate-pulse rounded"></div>}>
                <DisplayAd className="top-article-ad" />
              </Suspense>
            </div>

            <header className="mb-8">
              <h1 
                className="text-4xl md:text-5xl font-display tracking-tighter font-bold text-white/80 mb-4"
                itemProp="headline"
              >
                {post.frontmatter.title}
              </h1>
              
              <div className="flex items-center text-gray-200 mb-4">
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  By <span itemProp="name">{post.frontmatter.author}</span>
                </span>
                <span className="mx-2">•</span>
                <time 
                  dateTime={post.frontmatter.date} 
                  itemProp="datePublished"
                >
                  {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              {post.frontmatter.tags && (
                <div className="flex flex-wrap gap-2 mb-6" itemProp="keywords">
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
                    itemProp="image"
                    priority
                  />
                </div>
              )}
            </header>

            {/* Main Content with Integrated Ads and Images */}
            <div 
              className="prose text-white prose-lg max-w-none"
              itemProp="articleBody"
            >
              <div 
                className="processed-content"
                dangerouslySetInnerHTML={{ 
                  __html: processedContent
                }} 
              />
            </div>

            {/* Bottom Display Ad */}
            <div className="mt-12 mb-8">
              <Suspense fallback={<div className="h-32 bg-gray-100/10 animate-pulse rounded"></div>}>
                <DisplayAd className="bottom-article-ad" />
              </Suspense>
            </div>

            {/* Related Articles Section */}
            <section className="mt-16 border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Continue Reading</h2>
              <div className="text-gray-300">
                <p>Discover more advanced strategies and insights on our blog to maximize your advertising ROI.</p>
              </div>
            </section>
          </div>
        </article>

        {/* Initialize ads after content loads */}
        <AdInitializer />

        {/* Additional CSS for ad styling */}
        <style jsx>{`
          .in-article-ad-wrapper {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.02);
          }
          
          .processed-content img {
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          .adsbygoogle {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            min-height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @media (max-width: 768px) {
            .in-article-ad-container {
              padding: 0 1rem;
            }
          }
        `}</style>
      </>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    notFound();
  }
}