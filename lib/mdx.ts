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

// Enhanced sample posts with more variety
const samplePosts = [
  {
    slug: "google-ads-optimization-guide",
    frontmatter: {
      title: "Complete Google Ads Optimization Guide 2024",
      date: "2024-01-15",
      excerpt:
        "Master Google Ads with our comprehensive optimization guide. Learn proven strategies to increase ROI and drive qualified traffic.",
      author: "Top AD Runner Team",
      tags: [
        "Google Ads",
        "PPC",
        "Optimization",
        "ROI",
        "Google Ads Strategy",
        "AdWords",
        "Search Ads",
        "Digital Marketing",
      ],
      image: "/google-ad-guide-2024.jpeg",
    },
    content: `
    <h1>Complete Google Ads Optimization Guide 2024</h1>

    <p>
      Google Ads optimization remains one of the most effective digital marketing strategies to increase website traffic, boost conversions, and maximize return on investment (ROI). Whether you are a small business or a large enterprise, mastering Google Ads (formerly Google AdWords) can dramatically impact your online advertising success. In this detailed 2024 guide, Top AD Runner shares proven Google Ads campaign strategies, including advanced PPC optimization techniques, keyword targeting, ad copy best practices, and budget management tips designed to help you stay ahead of your competitors and increase your advertising ROI.
    </p>

    <h2>1. Keyword Research and Selection</h2>

    <p>
      Keyword research is the foundation of any successful Google Ads campaign. Choosing the right keywords ensures your ads appear to users actively searching for your products or services. Focus on <strong>high-intent keywords</strong> — these are search queries that signal a clear desire to buy or take action. Use Google Keyword Planner, SEMrush, or Ahrefs to identify valuable keywords with a good balance of search volume and competition. Targeting long-tail keywords, such as “best PPC management service 2024” or “affordable Google Ads agency near me,” can reduce costs and improve conversion rates by reaching more qualified prospects.
    </p>

    <p>
      Don’t forget to use negative keywords to prevent your ads from showing on irrelevant searches, reducing wasted spend. Continuously update your keyword list based on performance data and new trends in your niche.
    </p>

    <h2>2. Ad Copy Optimization</h2>

    <p>
      Your ad copy is what convinces users to click. Writing compelling, concise ads with clear <strong>calls-to-action (CTAs)</strong> significantly increases click-through rates (CTR) and conversions. Highlight unique selling points, such as “free consultation,” “24/7 customer support,” or “money-back guarantee,” to differentiate your ads from competitors.
    </p>

    <p>
      A/B test multiple headlines and descriptions to determine which messaging resonates best with your audience. Incorporate <strong>power words</strong> like “exclusive,” “proven,” “limited time,” and “boost” to create urgency and drive engagement.
    </p>

    <h2>3. Landing Page Alignment</h2>

    <p>
      Optimizing your landing page is just as important as your ads. Ensure the landing page aligns perfectly with the ad’s message and keywords, providing a seamless user experience from click to conversion. Use fast-loading, mobile-friendly pages with clear CTAs that match your ad’s offer.
    </p>

    <p>
      Including trust signals such as customer testimonials, security badges, and easy contact options can help reduce bounce rates and improve conversion rates. Remember, a well-optimized landing page enhances your Quality Score on Google Ads, which lowers your cost per click (CPC) and improves ad rank.
    </p>

    <div style="text-align:center; margin: 2rem 0;">
      <img
        src="/google-ads-optimization-tips.jpeg"
        alt="Google Ads Optimization Tips and Strategies 2024"
        width="800"
        height="400"
        style="border-radius: 8px;"
      />
    </div>

    <h2>4. Bid Strategy Optimization</h2>

    <p>
      Selecting the right bid strategy is critical to achieving your campaign goals. Google Ads offers multiple bidding options including Manual CPC, Enhanced CPC, Target CPA, Target ROAS, and Maximize Conversions. For beginners, <strong>Manual CPC</strong> allows you to set bids yourself and gain control. Advanced advertisers benefit from automated bidding strategies like <strong>Target CPA (Cost Per Acquisition)</strong> or <strong>Target ROAS (Return on Ad Spend)</strong> that optimize bids in real-time using Google’s AI.
    </p>

    <p>
      Monitor your campaigns regularly to adjust bids based on performance metrics and budget constraints. Combine bid strategies with dayparting (time-based bid adjustments) and geo-targeting for more precise control and improved ROI.
    </p>

    <h2>5. Continuous Testing and Refinement</h2>

    <p>
      Google Ads optimization is an ongoing process. Continuous A/B testing of ad elements — headlines, descriptions, images, and CTAs — helps you identify winning combinations. Experiment with ad extensions such as sitelinks, callouts, and structured snippets to increase ad real estate and improve CTR.
    </p>

    <p>
      Review keyword performance reports to pause underperforming keywords and increase bids on high-converting ones. Use Google Analytics and conversion tracking to measure campaign success accurately. Implementing regular optimization cycles ensures your ads stay relevant and cost-efficient in the ever-changing digital landscape.
    </p>

    <h2>6. Leveraging Advanced Features</h2>

    <p>
      Take advantage of advanced Google Ads features such as <strong>Responsive Search Ads</strong>, which automatically test different headlines and descriptions to find the best performing ads. Use <strong>audience targeting</strong> options like remarketing lists, in-market audiences, and customer match to refine your reach.
    </p>

    <p>
      Incorporate <strong>conversion tracking</strong> using Google Tag Manager or the Google Ads pixel to gain deeper insights into user behavior and ROI. Setting up call tracking or offline conversion imports can further enhance your ability to measure campaign impact.
    </p>

    <h2>7. Budget and Campaign Structure</h2>

    <p>
      Proper campaign structure allows for better budget allocation and easier performance analysis. Segment campaigns by product categories, target locations, or audience types. Allocate more budget to high-performing campaigns and reduce spend on underperforming ones.
    </p>

    <p>
      Start with a modest daily budget and gradually increase it as you identify successful campaigns. Utilize shared budgets for related campaigns to maximize efficiency.
    </p>

    <h2>8. Mobile Optimization</h2>

    <p>
      Mobile traffic accounts for a majority of Google searches. Optimize your campaigns and landing pages for mobile devices by using mobile-preferred ads and ensuring fast page load times. Use call-only campaigns to target users likely to call your business directly.
    </p>

    <h2>9. Local Campaigns and Extensions</h2>

    <p>
      For businesses with physical locations, local campaigns and location extensions can drive store visits and calls. Integrate your Google My Business profile to improve local ad relevancy and visibility.
    </p>

    <h2>10. Measuring Success and Scaling</h2>

    <p>
      Use Google Ads dashboards and third-party tools to track KPIs like CTR, CPC, conversion rate, and ROAS. Identify trends and adjust campaigns accordingly. As performance improves, scale your campaigns by expanding keywords, increasing budget, or entering new markets.
    </p>

    <p><strong>Ready to optimize your Google Ads campaigns?</strong> Contact Top AD Runner for expert help and proven strategies that deliver measurable results and maximize your advertising ROI in 2024 and beyond.</p>
  `,
  },

  {
    slug: "web-development-trends-2024",
    frontmatter: {
      title: "Top Web Development Trends for 2024",
      date: "2024-01-10",
      excerpt:
        "Discover the latest web development trends that are shaping the digital landscape in 2024. Stay ahead with cutting-edge technologies.",
      author: "Top AD Runner Team",
      tags: ["Web Development", "Trends", "Technology", "2024"],
      image: "/web.webp?height=400&width=800",
    },
    content: `
      <h1>Top Web Development Trends for 2024</h1>
      
      <p>The web development landscape continues to evolve rapidly. Here are the key trends shaping 2024 that every business should know about.</p>
      
      <h2>1. AI-Powered Development</h2>
      <p>Artificial Intelligence is revolutionizing how we build websites, from automated code generation to intelligent user experiences.</p>
      
      <h2>2. Progressive Web Apps (PWAs)</h2>
      <p>PWAs offer app-like experiences through web browsers, providing offline functionality and improved performance.</p>
      
      <h2>3. Voice User Interfaces</h2>
      <p>Voice search optimization and voice-controlled interfaces are becoming essential for modern websites.</p>
      
      <h2>4. Advanced CSS Features</h2>
      <p>New CSS capabilities like container queries and advanced grid layouts enable more sophisticated designs.</p>
      
      <h2>5. Enhanced Security Measures</h2>
      <p>With increasing cyber threats, implementing robust security measures from the ground up is more critical than ever.</p>
      
      <p><strong>Need a modern website?</strong> Top AD Runner builds cutting-edge websites that leverage the latest technologies for optimal performance.</p>
    `,
  },
  {
    slug: "shopify-conversion-optimization",
    frontmatter: {
      title: "Shopify Conversion Optimization: Boost Your Sales",
      date: "2024-01-05",
      excerpt:
        "Learn proven Shopify optimization techniques to increase conversion rates and maximize revenue from your e-commerce store.",
      author: "Top AD Runner Team",
      tags: ["Shopify", "E-commerce", "Conversion", "Sales"],
      image: "/blog.jpeg?height=400&width=800",
    },
    content: `
      <h1>Shopify Conversion Optimization: Boost Your Sales</h1>
      
      <p>Optimizing your Shopify store for conversions is essential for maximizing revenue. Here are proven strategies that work.</p>
      
      <h2>1. Optimize Product Pages</h2>
      <p>High-quality images, detailed descriptions, and customer reviews significantly impact purchase decisions.</p>
      
      <h2>2. Streamline Checkout Process</h2>
      <p>Reduce cart abandonment by simplifying the checkout process and offering multiple payment options.</p>
      
      <h2>3. Mobile Optimization</h2>
      <p>With most e-commerce traffic coming from mobile devices, mobile optimization is crucial for conversions.</p>
      
      <h2>4. Social Proof Integration</h2>
      <p>Customer reviews, testimonials, and trust badges build confidence and encourage purchases.</p>
      
      <h2>5. Abandoned Cart Recovery</h2>
      <p>Implement automated email sequences to recover abandoned carts and increase overall conversion rates.</p>
      
      <p><strong>Want to optimize your Shopify store?</strong> Top AD Runner specializes in Shopify development and conversion optimization.</p>
    `,
  },
  {
    slug: "landing-page-design-best-practices",
    frontmatter: {
      title: "Landing Page Design: 10 Best Practices That Convert",
      date: "2024-01-20",
      excerpt:
        "Creating high-converting landing pages with proven design principles and optimization techniques used by top marketers.",
      author: "Top AD Runner Team",
      tags: ["Landing Pages", "Design", "Conversion", "UX"],
      image: "/landing-pages.jpeg",
    },
    content: `
    <h1>Landing Page Design: 10 Best Practices That Convert</h1>

    <p>Creating a high-converting landing page is one of the most important strategies for any business aiming to increase leads, sales, or signups online. A well-designed landing page not only attracts visitors but also guides them smoothly toward taking the desired action. In today’s competitive digital landscape, mastering landing page design and conversion rate optimization can give your business a significant edge. This comprehensive guide covers the 10 essential best practices that every marketer and designer should implement to create landing pages that truly convert.</p>

    <h2>1. Clear and Compelling Headlines</h2>
    <p>Your headline is the first thing visitors see, and it plays a critical role in capturing attention and communicating your value proposition. A great headline must be clear, concise, and highly relevant to your target audience’s needs and desires. Use action words and power phrases such as <strong>“Boost Your Sales,” “Increase Conversion Rates,”</strong> or <strong>“Get More Leads Fast.”</strong> Incorporate trending keywords like <em>“landing page optimization,” “conversion rate optimization,”</em> and <em>“digital marketing success”</em> naturally to improve SEO without sounding forced.</p>

    <p>Remember, your headline should promise a benefit or solution your visitor is looking for. Avoid generic or vague language that doesn’t clearly state what they stand to gain. For example, instead of <em>“Welcome to Our Site,”</em> use <strong>“Discover How to Double Your Leads in 30 Days.”</strong> This creates immediate curiosity and sets clear expectations.</p>

    <h2>2. Single Call-to-Action (CTA)</h2>
    <p>One of the biggest mistakes in landing page design is overwhelming visitors with too many choices. Multiple CTAs can dilute focus and reduce the likelihood of conversion. Instead, focus on a single, well-defined CTA that guides visitors toward your primary goal, whether it’s to <strong>“Download a Free Guide,” “Sign Up for a Webinar,”</strong> or <strong>“Start Your Free Trial.”</strong></p>

    <p>Make your CTA button stand out visually using contrasting colors and ample padding. Use clear, persuasive language with action verbs like <strong>“Get Started Now,” “Claim Your Spot,”</strong> or <strong>“Join Thousands of Happy Customers.”</strong> The more specific and compelling your CTA text is, the higher your click-through rates will be.</p>

    <h2>3. Mobile-First Design</h2>
    <p>Mobile traffic now accounts for the majority of web visitors worldwide, so designing your landing page with a <strong>mobile-first approach</strong> is no longer optional — it’s mandatory. Ensure your landing page is fully responsive, loads quickly on mobile devices, and provides an intuitive user experience.</p>

    <p>Optimize font sizes for readability on small screens, design buttons large enough for easy tapping, and minimize unnecessary elements that can slow down load times. Google rewards mobile-optimized pages with better rankings, so this practice also improves your SEO performance.</p>

    <h2>4. Incorporate Social Proof</h2>
    <p>Visitors are more likely to convert if they trust your brand. Incorporating social proof such as <strong>customer testimonials, reviews, star ratings, trust badges, case studies,</strong> and <strong>client logos</strong> builds credibility and reduces hesitation. Authentic feedback from real customers shows that others have had positive experiences and can reassure new visitors about the quality and reliability of your product or service.</p>

    <p>Consider using video testimonials or user-generated content as well, as these tend to have a higher impact on trust and engagement. Highlight social proof near your CTA buttons to reinforce confidence at the moment of decision.</p>

    <h2>5. Fast Loading Speed</h2>
    <p>Speed matters more than ever. A slow-loading landing page frustrates visitors and leads to higher bounce rates, costing you potential conversions. Optimize your landing page’s load time by compressing images, minifying CSS and JavaScript files, and leveraging browser caching and content delivery networks (CDNs).</p>

    <p>Use tools like <strong>Google PageSpeed Insights, GTmetrix,</strong> or <strong>WebPageTest</strong> to analyze and improve your page speed regularly. A well-optimized page not only enhances user experience but also boosts search engine rankings, giving you better organic traffic.</p>

    <h2>6. Benefit-Focused Copy</h2>
    <p>Visitors want to know what’s in it for them — not just a list of features. Craft your copy to highlight the <strong>benefits and solutions</strong> your product or service provides. Explain how it can help visitors save time, increase revenue, reduce stress, or solve a specific problem.</p>

    <p>Use persuasive language that speaks directly to your audience’s pain points and desires. For example, instead of saying <em>“Our software has advanced analytics,”</em> say <strong>“Make smarter business decisions with real-time insights.”</strong> This approach resonates better and motivates action.</p>

    <h2>7. Visual Hierarchy</h2>
    <p>A clear visual hierarchy helps guide visitors’ eyes and focus toward the most important elements on your page. Use varying font sizes, bold headings, color contrast, and whitespace strategically to create a natural reading flow. Important content like headlines, CTAs, and benefits should stand out prominently.</p>

    <p>Use bullet points, numbered lists, and short paragraphs to improve scannability. Directional cues like arrows or images pointing toward your CTA can also subtly encourage clicks. Avoid clutter or distracting elements that can confuse visitors or obscure your message.</p>

    <h2>8. Trust Signals</h2>
    <p>Reassure visitors that their data and money are safe by including clear trust signals. Display <strong>SSL certificates, money-back guarantees, security badges, privacy policies,</strong> and contact information near your conversion points. These elements help reduce anxiety and objections, especially for first-time visitors.</p>

    <p>Also consider adding awards, certifications, or endorsements if available, as these add extra credibility. Trust signals are vital for building confidence and encouraging visitors to take the next step.</p>

    <h2>9. A/B Testing</h2>
    <p>What works for one audience might not work for another. Implement regular <strong>A/B testing</strong> to compare different versions of your landing page elements, such as headlines, CTA text, button colors, images, and layout. Use the data to identify the most effective combinations that drive higher conversion rates.</p>

    <p>Testing one element at a time allows you to isolate what impacts user behavior. Over time, you can continually refine your landing page for optimal results, ensuring that you stay ahead of competitors and evolving user expectations.</p>

    <h2>10. Analytics and Tracking</h2>
    <p>Tracking user behavior and conversions is essential for measuring the success of your landing page and identifying areas for improvement. Implement tools like <strong>Google Analytics, Hotjar heatmaps,</strong> and <strong>conversion funnels</strong> to gather detailed insights into how visitors interact with your page.</p>

    <p>Monitor metrics like bounce rate, time on page, exit pages, and form submissions to understand visitor engagement. Use these insights to optimize your content, design, and user flow continuously. A data-driven approach ensures you make informed decisions that maximize ROI.</p>

    <p><strong>Conclusion:</strong> Designing a landing page that converts requires a careful balance of user-focused design, persuasive copywriting, technical optimization, and continuous improvement. By applying these 10 best practices, you can create landing pages that not only attract traffic but also convert visitors into loyal customers.</p>

    <p><strong>Need expert help?</strong> At Top AD Runner, we specialize in landing page design and conversion rate optimization that drives real business results. Contact us today to elevate your online marketing strategy and achieve your growth goals.</p>
  `,
  },
  {
    slug: "facebook-ads-vs-google-ads",
    frontmatter: {
      title: "Facebook Ads vs Google Ads: Which Platform Wins in 2024?",
      date: "2024-01-12",
      excerpt:
        "Compare Facebook Ads and Google Ads to determine which platform delivers better ROI for your business goals and target audience.",
      author: "Top AD Runner Team",
      tags: ["Facebook Ads", "Google Ads", "Comparison", "ROI"],
      image: "/facebook-vs-google-ads-2024.png",
    },
    content: `
# Facebook Ads vs Google Ads: Which Platform Wins in 2024?

Choosing between Facebook Ads and Google Ads can significantly impact your marketing success. Let's compare these platforms to help you make the right decision.

## Intent vs Discovery
Google Ads targets users with high purchase intent who are actively searching for solutions.  
Facebook Ads excel at creating demand and reaching users who aren't actively searching.

## Targeting Capabilities
Facebook offers detailed demographic and interest-based targeting.  
Google Ads focuses on keyword-based targeting with some audience options.

## Cost Comparison
Google Ads typically have higher cost-per-click but often deliver higher conversion rates.  
Facebook Ads are generally cheaper but may require more nurturing.

## Ad Formats
Facebook offers diverse visual formats including video, carousel, and stories.  
Google Ads primarily use text-based ads with some visual options.

## Best Use Cases
**Choose Google Ads for:** High-intent searches, B2B services, local businesses, immediate conversions.  
**Choose Facebook Ads for:** Brand awareness, B2C products, visual products, audience building.

## The Winner?
The best approach often involves using both platforms strategically — Google Ads for capturing demand, Facebook Ads for creating it.

**Need help with your advertising strategy?**  
Top AD Runner manages both Google Ads and Facebook Ads to maximize your ROI.
  `,
  },
  {
    slug: "wordpress-vs-shopify-comparison",
    frontmatter: {
      title: "WordPress vs Shopify: Complete Platform Comparison 2024",
      date: "2024-01-08",
      excerpt:
        "Detailed comparison of WordPress and Shopify to help you choose the right platform for your business website or online store.",
      author: "Top AD Runner Team",
      tags: ["WordPress", "Shopify", "E-commerce", "Website"],
      image: "/wordpress.jpeg",
    },
    content: `
      <h1>WordPress vs Shopify: Complete Platform Comparison 2024</h1>
      
      <p>Choosing the right platform for your website is crucial for long-term success. Here's a comprehensive comparison of WordPress and Shopify.</p>
      
      <h2>Ease of Use</h2>
      <p><strong>Shopify:</strong> User-friendly interface designed for non-technical users. Quick setup and intuitive dashboard.</p>
      <p><strong>WordPress:</strong> Steeper learning curve but offers more flexibility and customization options.</p>
      
      <h2>E-commerce Capabilities</h2>
      <p><strong>Shopify:</strong> Built specifically for e-commerce with comprehensive features out of the box.</p>
      <p><strong>WordPress:</strong> Requires WooCommerce plugin but offers unlimited customization possibilities.</p>
      
      <h2>Cost Comparison</h2>
      <p><strong>Shopify:</strong> Monthly subscription fees plus transaction fees. Predictable costs but can add up.</p>
      <p><strong>WordPress:</strong> Lower ongoing costs but requires hosting, themes, and plugins investments.</p>
      
      <h2>Customization</h2>
      <p><strong>Shopify:</strong> Limited customization without coding knowledge. Theme-based approach.</p>
      <p><strong>WordPress:</strong> Unlimited customization possibilities with thousands of themes and plugins.</p>
      
      <h2>SEO Capabilities</h2>
      <p><strong>Shopify:</strong> Good built-in SEO features but limited advanced optimization options.</p>
      <p><strong>WordPress:</strong> Superior SEO capabilities with plugins like Yoast and RankMath.</p>
      
      <h2>Which Should You Choose?</h2>
      <p><strong>Choose Shopify if:</strong> You want quick setup, focus on selling, prefer managed hosting, need built-in payment processing.</p>
      <p><strong>Choose WordPress if:</strong> You want maximum flexibility, plan to blog extensively, need advanced SEO, want lower long-term costs.</p>
      
      <p><strong>Need help deciding?</strong> Top AD Runner develops both WordPress and Shopify sites tailored to your specific needs.</p>
    `,
  },
  {
    slug: "conversion-rate-optimization-guide",
    frontmatter: {
      title: "Conversion Rate Optimization: The Ultimate Guide",
      date: "2024-01-18",
      excerpt:
        "Master conversion rate optimization with proven strategies, tools, and techniques to turn more visitors into customers.",
      author: "Top AD Runner Team",
      tags: ["CRO", "Conversion", "Optimization", "Analytics"],
      image: "/conversion-and-optimization.jpeg",
    },
    content: `
      <h1>Conversion Rate Optimization: The Ultimate Guide</h1>
      
      <p>Conversion Rate Optimization (CRO) is the systematic process of increasing the percentage of website visitors who complete desired actions. Here's your complete guide to CRO success.</p>
      
      <h2>Understanding Conversion Rates</h2>
      <p>Your conversion rate is calculated by dividing conversions by total visitors. Even small improvements can significantly impact revenue.</p>
      
      <h2>CRO Process Framework</h2>
      <p><strong>1. Research:</strong> Analyze data, conduct user surveys, and identify pain points.</p>
      <p><strong>2. Hypothesize:</strong> Form testable hypotheses based on research findings.</p>
      <p><strong>3. Test:</strong> Run A/B tests to validate or disprove hypotheses.</p>
      <p><strong>4. Analyze:</strong> Review results and implement winning variations.</p>
      <p><strong>5. Iterate:</strong> Continuously repeat the process for ongoing improvement.</p>
      
      <h2>Key Elements to Test</h2>
      <p><strong>Headlines:</strong> Test different value propositions and messaging approaches.</p>
      <p><strong>Call-to-Actions:</strong> Experiment with button colors, text, and placement.</p>
      <p><strong>Forms:</strong> Optimize form length, fields, and design.</p>
      <p><strong>Images:</strong> Test different visuals and their impact on conversions.</p>
      <p><strong>Page Layout:</strong> Try different arrangements of elements.</p>
      
      <h2>Essential CRO Tools</h2>
      <p><strong>Google Analytics:</strong> Track conversions and user behavior.</p>
      <p><strong>Hotjar:</strong> Heatmaps and session recordings for user insights.</p>
      <p><strong>Optimizely:</strong> A/B testing platform for experiments.</p>
      <p><strong>Google Optimize:</strong> Free A/B testing tool from Google.</p>
      
      <h2>Common CRO Mistakes</h2>
      <p>Testing without sufficient traffic, making changes based on opinions rather than data, and stopping tests too early are common pitfalls to avoid.</p>
      
      <p><strong>Ready to optimize your conversions?</strong> Top AD Runner provides comprehensive CRO services to maximize your website's performance.</p>
    `,
  },
  {
    slug: "local-seo-small-business-guide",
    frontmatter: {
      title: "Local SEO for Small Businesses: Complete 2024 Guide",
      date: "2024-01-14",
      excerpt:
        "Dominate local search results with this comprehensive local SEO guide designed specifically for small businesses.",
      author: "Top AD Runner Team",
      tags: ["Local SEO", "Small Business", "Google My Business", "SEO"],
      image: "/local-SEO.jpg",
    },
    content: `
      <h1>Local SEO for Small Businesses: Complete 2024 Guide</h1>
      
      <p>Local SEO is crucial for small businesses to attract nearby customers. This guide covers everything you need to dominate local search results.</p>
      
      <h2>Google My Business Optimization</h2>
      <p>Your Google My Business profile is the foundation of local SEO. Ensure it's complete, accurate, and regularly updated with posts and photos.</p>
      
      <h2>Local Keyword Research</h2>
      <p>Target keywords that include your location and service. Use tools like Google Keyword Planner to find local search terms.</p>
      
      <h2>On-Page Local SEO</h2>
      <p>Include your business name, address, and phone number (NAP) consistently across your website. Create location-specific pages if you serve multiple areas.</p>
      
      <h2>Local Citations</h2>
      <p>List your business in local directories like Yelp, Yellow Pages, and industry-specific directories. Ensure NAP consistency across all listings.</p>
      
      <h2>Online Reviews Management</h2>
      <p>Encourage satisfied customers to leave reviews. Respond to all reviews professionally, both positive and negative.</p>
      
      <h2>Local Link Building</h2>
      <p>Build relationships with local businesses, sponsor local events, and get featured in local news to earn quality local backlinks.</p>
      
      <h2>Mobile Optimization</h2>
      <p>Ensure your website is mobile-friendly since most local searches happen on mobile devices.</p>
      
      <h2>Local Schema Markup</h2>
      <p>Implement local business schema markup to help search engines understand your business information.</p>
      
      <p><strong>Need help with local SEO?</strong> Top AD Runner specializes in local SEO strategies that drive foot traffic and phone calls.</p>
    `,
  },
];

function createSampleContent() {
  try {
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true });
    }

    samplePosts.forEach((post) => {
      const filePath = path.join(contentDirectory, `${post.slug}.mdx`);
      if (!fs.existsSync(filePath)) {
        const frontmatter = Object.entries(post.frontmatter)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`;
            }
            return `${key}: "${value}"`;
          })
          .join("\n");

        const content = `---\n${frontmatter}\n---\n\n${post.content}`;
        fs.writeFileSync(filePath, content);
      }
    });
  } catch (error) {
    console.error("Error creating sample content:", error);
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    createSampleContent();

    if (!fs.existsSync(contentDirectory)) {
      return [];
    }

    const files = fs.readdirSync(contentDirectory);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    if (mdxFiles.length === 0) {
      return [];
    }

    const posts = mdxFiles
      .map((file) => {
        try {
          const slug = file.replace(".mdx", " ");
          const filePath = path.join(contentDirectory, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data: frontmatter, content } = matter(fileContent);

          return {
            slug,
            frontmatter: frontmatter as Post["frontmatter"],
            content,
          };
        } catch (error) {
          console.error(`Error reading file ${file}:`, error);
          return null;
        }
      })
      .filter((post): post is Post => post !== null)
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      );

    return posts;
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    createSampleContent();

    const filePath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);

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
