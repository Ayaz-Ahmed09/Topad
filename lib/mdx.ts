import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content", "blog");

export interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    author: string;
    tags?: string[];
    image?: string;
  };
  content: string;
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true });
      return [];
    }

    const files = fs.readdirSync(contentDirectory);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    if (mdxFiles.length === 0) {
      return [];
    }

    const posts: Post[] = [];

    for (const file of mdxFiles) {
      try {
        const slug = file.replace(".mdx", "");
        const filePath = path.join(contentDirectory, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        
        // Parse frontmatter with better error handling
        const { data: frontmatter, content } = matter(fileContent);

        // Skip files with invalid frontmatter
        if (!frontmatter.title || !frontmatter.date || !frontmatter.excerpt || !frontmatter.author) {
          continue;
        }

        posts.push({
          slug,
          frontmatter: frontmatter as Post["frontmatter"],
          content,
        });
      } catch (error) {
        console.error(`Error parsing file ${file}:`, error);
        continue;
      }
    }

    return posts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    if (!slug || typeof slug !== 'string') {
      console.error("Invalid slug provided:", slug);
      return null;
    }

    const filePath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    
    // Parse frontmatter with error handling
    const { data: frontmatter, content } = matter(fileContent);

    // Validate required frontmatter fields
    if (!frontmatter.title || !frontmatter.date || !frontmatter.excerpt || !frontmatter.author) {
      console.error(`Missing required frontmatter fields in ${slug}.mdx`);
      return null;
    }

    return {
      slug,
      frontmatter: frontmatter as Post["frontmatter"],
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}