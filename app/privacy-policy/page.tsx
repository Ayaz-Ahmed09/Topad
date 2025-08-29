import type { Metadata } from "next";
import { Shield, Lock, Eye, UserCheck, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - TopAd Digital Marketing & Web Development",
  description:
    "TopAd's comprehensive privacy policy explaining how we collect, use, and protect your personal information across our digital marketing and web development services.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-theme-gradient min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-heading-readable mb-6">
              Privacy Policy
            </h1>
            <p className="text-readable text-lg max-w-3xl mx-auto">
              TopAd Digital is committed to protecting your privacy and ensuring transparency 
              in how we handle your personal information across all our services.
            </p>
          </div>

          <div className="schema-card mb-8">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-orange-400 mr-3" />
              <p className="text-accent-readable font-semibold">
                Last Updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <p className="text-readable">
              This Privacy Policy governs TopAd Digital's collection, use, and protection of your 
              personal information when you visit our website, use our services, or engage with our content.
            </p>
          </div>

          <div className="space-y-8">
            {/* Information We Collect */}
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-fire">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div className="small-card">
                  <h3 className="text-xl font-bold text-accent-readable mb-3">Personal Information You Provide</h3>
                  <p className="text-readable mb-4">
                    When you interact with TopAd Digital's services, we may collect:
                  </p>
                  <ul className="text-readable space-y-2">
                    <li>• <strong>Contact Information:</strong> Name, email address, phone number, business details</li>
                    <li>• <strong>Project Requirements:</strong> Service inquiries, project specifications, budget information</li>
                    <li>• <strong>Communication Data:</strong> Messages sent through contact forms, email correspondence, consultation notes</li>
                    <li>• <strong>Account Information:</strong> Login credentials for client portals, project management systems</li>
                    <li>• <strong>Payment Information:</strong> Billing addresses, payment method details (processed securely through third-party processors)</li>
                    <li>• <strong>Marketing Preferences:</strong> Newsletter subscriptions, content preferences, communication choices</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-xl font-bold text-accent-readable mb-3">Automatically Collected Information</h3>
                  <ul className="text-readable space-y-2">
                    <li>• <strong>Website Usage Data:</strong> Pages visited, time spent on site, navigation patterns</li>
                    <li>• <strong>Technical Information:</strong> IP address, browser type, device information, operating system</li>
                    <li>• <strong>Performance Metrics:</strong> Website loading times, error logs, feature usage analytics</li>
                    <li>• <strong>Referral Data:</strong> Source of website visits, search terms used to find our content</li>
                    <li>• <strong>Blog Engagement:</strong> Articles read, comments posted, content sharing activities</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-xl font-bold text-accent-readable mb-3">Service-Specific Data Collection</h3>
                  <ul className="text-readable space-y-2">
                    <li>• <strong>Web Development Projects:</strong> Website requirements, design preferences, technical specifications</li>
                    <li>• <strong>Digital Marketing Campaigns:</strong> Target audience data, campaign objectives, performance metrics</li>
                    <li>• <strong>Graphic Design Services:</strong> Brand guidelines, creative briefs, asset requirements</li>
                    <li>• <strong>Video Production:</strong> Project scope, creative concepts, production timelines</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <UserCheck className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-ice">How We Use Your Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Service Delivery</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Provide web development and design services</li>
                    <li>• Execute digital marketing campaigns</li>
                    <li>• Deliver graphic design and video production</li>
                    <li>• Manage client projects and communications</li>
                    <li>• Process payments and invoicing</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Communication & Support</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Respond to inquiries and support requests</li>
                    <li>• Send project updates and status reports</li>
                    <li>• Provide technical support and maintenance</li>
                    <li>• Share relevant industry insights and updates</li>
                    <li>• Notify about service changes or improvements</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Content & Marketing</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Share educational blog content and tutorials</li>
                    <li>• Send newsletters with industry insights</li>
                    <li>• Provide comparative analysis (Google vs Meta, etc.)</li>
                    <li>• Share ROI optimization strategies</li>
                    <li>• Deliver personalized content recommendations</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Analytics & Improvement</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Analyze website performance and user behavior</li>
                    <li>• Improve service quality and user experience</li>
                    <li>• Develop new features and services</li>
                    <li>• Create better content based on user interests</li>
                    <li>• Optimize our marketing and communication strategies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content and Blog Policy */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-warm mb-6">Our Content and Educational Materials</h2>
              <div className="space-y-4">
                <p className="text-readable">
                  TopAd Digital creates educational content, including blog posts, tutorials, and comparative analyses 
                  to help businesses make informed decisions about digital marketing and web development.
                </p>
                
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Content Guidelines</h3>
                  <ul className="text-readable space-y-2">
                    <li>• All content is fact-based and researched for accuracy</li>
                    <li>• Comparative analyses (e.g., "Google vs Meta") are objective and educational</li>
                    <li>• ROI and conversion optimization content is based on industry best practices</li>
                    <li>• No misleading information or false claims are published</li>
                    <li>• Content aims to educate rather than disparage competitors</li>
                    <li>• Regular updates ensure information remains current and relevant</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">User-Generated Content</h3>
                  <p className="text-readable mb-3">
                    When you comment on our blog posts or share feedback, you grant TopAd Digital permission to:
                  </p>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Display your comments and feedback on our website</li>
                    <li>• Use testimonials in marketing materials (with your consent)</li>
                    <li>• Moderate content to maintain quality and relevance</li>
                    <li>• Remove inappropriate or spam content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-fire mb-6">Cookies and Tracking Technologies</h2>
              <div className="space-y-6">
                <p className="text-readable">
                  We use cookies and similar technologies to enhance your experience and understand how our 
                  services are being used. This helps us provide better, more personalized service.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">Essential Cookies</h3>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>• Website functionality and navigation</li>
                      <li>• Security and authentication</li>
                      <li>• Form submission and data processing</li>
                      <li>• Language and regional preferences</li>
                    </ul>
                  </div>

                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">Analytics Cookies</h3>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>• Google Analytics for website performance</li>
                      <li>• User behavior and content engagement</li>
                      <li>• Traffic sources and conversion tracking</li>
                      <li>• A/B testing for service improvements</li>
                    </ul>
                  </div>

                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">Marketing Cookies</h3>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>• Personalized content recommendations</li>
                      <li>• Retargeting and remarketing campaigns</li>
                      <li>• Social media integration and sharing</li>
                      <li>• Email marketing optimization</li>
                    </ul>
                  </div>

                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">Cookie Management</h3>
                    <p className="text-readable text-sm">
                      You can control cookie preferences through your browser settings. However, 
                      disabling certain cookies may limit website functionality and personalization features.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-ice mb-6">Third-Party Services and Integrations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Analytics & Performance</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Google Analytics & Search Console</li>
                    <li>• Website performance monitoring tools</li>
                    <li>• Heatmap and user behavior analytics</li>
                    <li>• Conversion tracking platforms</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Communication Tools</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Email marketing platforms</li>
                    <li>• Customer relationship management (CRM)</li>
                    <li>• Live chat and support systems</li>
                    <li>• Video conferencing tools</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Payment & Security</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Secure payment processors</li>
                    <li>• SSL certificate providers</li>
                    <li>• Backup and security services</li>
                    <li>• Cloud hosting platforms</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Social Media</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Facebook, LinkedIn, Twitter integration</li>
                    <li>• Social media management tools</li>
                    <li>• Content sharing platforms</li>
                    <li>• Review and testimonial platforms</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Development Tools</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Code repositories and version control</li>
                    <li>• Content delivery networks (CDN)</li>
                    <li>• API integrations and webhooks</li>
                    <li>• Testing and deployment platforms</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Content Creation</h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Design and editing software</li>
                    <li>• Stock photo and video libraries</li>
                    <li>• Font and asset management</li>
                    <li>• Collaboration platforms</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection and Security */}
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-warm">Data Protection and Security</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-readable">
                  TopAd Digital implements industry-standard security measures to protect your personal information 
                  and ensure data integrity across all our services and client interactions.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">Technical Safeguards</h3>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>• SSL/TLS encryption for data transmission</li>
                      <li>• Secure cloud storage with encryption at rest</li>
                      <li>• Regular security audits and vulnerability testing</li>
                      <li>• Multi-factor authentication for sensitive access</li>
                      <li>• Automated backup systems and disaster recovery</li>
                    </ul>
                  </div>

                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">Administrative Controls</h3>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>• Limited access to personal data on need-to-know basis</li>
                      <li>• Employee training on data protection practices</li>
                      <li>• Regular review of data handling procedures</li>
                      <li>• Incident response and breach notification protocols</li>
                      <li>• Secure disposal of data when no longer needed</li>
                    </ul>
                  </div>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Data Retention</h3>
                  <p className="text-readable mb-3">
                    We retain your personal information only as long as necessary for:
                  </p>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Active client projects: Duration of project plus 3 years for reference</li>
                    <li>• Marketing communications: Until you unsubscribe or request deletion</li>
                    <li>• Website analytics: Anonymized data retained for up to 26 months</li>
                    <li>• Financial records: As required by tax and business regulations (typically 7 years)</li>
                    <li>• Legal compliance: As required by applicable laws and regulations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights and Choices */}
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <Lock className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-fire">Your Rights and Choices</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Data Access and Control</h3>
                  <ul className="text-readable space-y-2">
                    <li>• <strong>Access:</strong> Request a copy of your personal information</li>
                    <li>• <strong>Correction:</strong> Update or correct inaccurate information</li>
                    <li>• <strong>Deletion:</strong> Request removal of your personal data</li>
                    <li>• <strong>Portability:</strong> Receive your data in a machine-readable format</li>
                    <li>• <strong>Objection:</strong> Object to processing for certain purposes</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">Communication Preferences</h3>
                  <ul className="text-readable space-y-2">
                    <li>• <strong>Unsubscribe:</strong> Opt-out of marketing emails at any time</li>
                    <li>• <strong>Customize:</strong> Choose specific types of communications</li>
                    <li>• <strong>Frequency:</strong> Adjust how often you hear from us</li>
                    <li>• <strong>Channels:</strong> Select preferred communication methods</li>
                    <li>• <strong>Content:</strong> Choose topics and services of interest</li>
                  </ul>
                </div>
              </div>

              <div className="small-card mt-6">
                <h3 className="text-lg font-bold text-accent-readable mb-3">How to Exercise Your Rights</h3>
                <p className="text-readable mb-3">
                  To exercise any of these rights or if you have questions about our privacy practices:
                </p>
                <ul className="text-readable space-y-1 text-sm">
                  <li>• Send an email to: <strong>privacy@topad.site</strong></li>
                  <li>• Contact our main support team: <strong>teams@topad.site</strong></li>
                  <li>• Use the contact form on our website with "Privacy Request" in the subject</li>
                  <li>• Response time: We will respond to your request within 30 days</li>
                </ul>
              </div>
            </section>

            {/* International Data Transfers */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-ice mb-6">International Data Transfers</h2>
              <p className="text-readable mb-4">
                TopAd Digital may transfer your personal information to countries outside your region for 
                processing and storage. We ensure appropriate safeguards are in place for such transfers.
              </p>
              <div className="small-card">
                <h3 className="text-lg font-bold text-accent-readable mb-3">Transfer Safeguards</h3>
                <ul className="text-readable space-y-1 text-sm">
                  <li>• Use of standard contractual clauses for international transfers</li>
                  <li>• Selection of service providers with adequate data protection measures</li>
                  <li>• Regular assessment of international data protection compliance</li>
                  <li>• Encryption and security measures for data in transit and at rest</li>
                </ul>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-warm mb-6">Changes to This Privacy Policy</h2>
              <p className="text-readable mb-4">
                TopAd Digital may update this Privacy Policy periodically to reflect changes in our practices, 
                services, or legal requirements. We will notify you of significant changes through:
              </p>
              <ul className="text-readable space-y-2">
                <li>• Email notification to active clients and subscribers</li>
                <li>• Prominent notice on our website</li>
                <li>• Updated "Last Modified" date at the top of this policy</li>
                <li>• Direct communication for material changes affecting your rights</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <Mail className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-fire">Contact Us</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-accent-readable mb-4">Privacy Questions</h3>
                  <p className="text-readable mb-4">
                    For questions about this Privacy Policy, data practices, or to exercise your privacy rights:
                  </p>
                  <ul className="text-readable space-y-2">
                    <li>• <strong>Email:</strong> privacy@topad.site</li>
                    <li>• <strong>General Support:</strong> teams@topad.site</li>
                    <li>• <strong>Response Time:</strong> Within 48 hours for privacy inquiries</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-accent-readable mb-4">Business Information</h3>
                  <p className="text-readable mb-4">TopAd Digital</p>
                  <ul className="text-readable space-y-2">
                    <li>• Digital Marketing & Web Development Agency</li>
                    <li>• Serving clients worldwide since 2019</li>
                    <li>• Committed to transparency and data protection</li>
                    <li>• Regular policy reviews and updates</li>
                  </ul>
                </div>
              </div>

              <div className="small-card mt-6">
                <p className="text-readable text-sm">
                  <strong>Note:</strong> This Privacy Policy is effective as of the date listed above and applies to 
                  all information collected by TopAd Digital through our website, services, and client interactions. 
                  By using our services, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}