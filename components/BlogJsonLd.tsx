interface BlogJsonLdProps {
  post: {
    frontmatter: {
      title: string;
      excerpt: string;
      date: string;
      author: string;
      image?: string;
      tags?: string[];
    };
    slug: string;
  };
}

export default function BlogJsonLd({ post }: BlogJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image: post.frontmatter.image || "https://topad.site/og-image.jpg",
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Digital Marketing Agency",
      logo: {
        "@type": "ImageObject",
        url: "https://topad.site/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://topad.site/blog/${post.slug}`,
    },
    keywords: post.frontmatter.tags?.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
