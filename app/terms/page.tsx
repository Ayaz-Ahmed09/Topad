import type { Metadata } from "next";
import {
  Scale,
  FileText,
  AlertTriangle,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { DisplayAd } from "@/components/AdSenseComponents";

export const metadata: Metadata = {
  title: "Terms of Service - TopAd Digital Marketing & Web Development",
  description:
    "TopAd's terms of service governing the use of our digital marketing, web development, and creative services. Read our comprehensive service terms and conditions.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-theme-gradient min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-heading-readable mb-6">
              Terms of Service
            </h1>
            <p className="text-readable text-lg max-w-3xl mx-auto">
              These terms govern your use of TopAd Digital's services, website,
              and content. Please read carefully to understand your rights and
              obligations.
            </p>
          </div>

          <div className="schema-card mb-8">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-orange-400 mr-3" />
              <p className="text-accent-readable font-semibold">
                Last Updated:
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <p className="text-readable">
              By accessing or using TopAd Digital's website, services, or
              content, you agree to be bound by these Terms of Service and our
              Privacy Policy. These terms apply to all visitors, users, clients,
              and others who access or use our services.
            </p>
          </div>

          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <Scale className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-fire">
                  Acceptance of Terms
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-readable">
                  By accessing TopAd Digital's website (topad.site), engaging
                  our services, or consuming our content, you acknowledge that
                  you have read, understood, and agree to be bound by these
                  Terms of Service.
                </p>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    What This Agreement Covers
                  </h3>
                  <ul className="text-readable space-y-2">
                    <li>
                      • <strong>Website Usage:</strong> Browsing, reading
                      content, and using interactive features
                    </li>
                    <li>
                      • <strong>Service Engagement:</strong> Web development,
                      digital marketing, design, and video production
                    </li>
                    <li>
                      • <strong>Content Access:</strong> Blog posts, tutorials,
                      guides, and educational materials
                    </li>
                    <li>
                      • <strong>Communication:</strong> Consultations, support,
                      and ongoing client relationships
                    </li>
                    <li>
                      • <strong>Third-Party Integrations:</strong> Tools and
                      platforms we use to deliver services
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-readable">
                    <strong>Important:</strong> If you do not agree with any
                    part of these terms, you must discontinue use of our website
                    and services immediately. Continued use constitutes
                    acceptance of these terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Services Description */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-ice mb-6">Our Services</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Core Services
                  </h3>
                  <ul className="text-readable space-y-2">
                    <li>
                      • <strong>Web Development:</strong> Custom websites,
                      e-commerce platforms, web applications
                    </li>
                    <li>
                      • <strong>Digital Marketing:</strong> SEO, PPC, social
                      media marketing, email campaigns
                    </li>
                    <li>
                      • <strong>Graphic Design:</strong> Brand identity,
                      marketing materials, UI/UX design
                    </li>
                    <li>
                      • <strong>Video Production:</strong> Marketing videos,
                      tutorials, promotional content
                    </li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Content & Education
                  </h3>
                  <ul className="text-readable space-y-2">
                    <li>
                      • <strong>Blog Content:</strong> Industry insights,
                      tutorials, best practices
                    </li>
                    <li>
                      • <strong>Comparative Analysis:</strong> Platform
                      comparisons (Google vs Meta, ROI studies)
                    </li>
                    <li>
                      • <strong>Educational Resources:</strong> Guides, case
                      studies, industry reports
                    </li>
                    <li>
                      • <strong>Consultation Services:</strong> Strategy
                      sessions, technical advice, planning
                    </li>
                  </ul>
                </div>
              </div>

              <div className="small-card">
                <h3 className="text-lg font-bold text-accent-readable mb-3">
                  Service Delivery Standards
                </h3>
                <p className="text-readable mb-3">
                  TopAd Digital commits to delivering services with
                  professionalism and quality. However, specific outcomes,
                  timelines, and results may vary based on project complexity,
                  client requirements, and external factors beyond our control.
                </p>
                <ul className="text-readable space-y-1 text-sm">
                  <li>
                    • All projects begin with detailed scope and timeline
                    discussions
                  </li>
                  <li>
                    • Regular communication and progress updates throughout
                    project lifecycle
                  </li>
                  <li>
                    • Quality assurance testing and review processes before
                    delivery
                  </li>
                  <li>
                    • Post-launch support and maintenance as agreed in service
                    contracts
                  </li>
                </ul>
              </div>
            </section>

            {/* Content Policy and Blog Guidelines */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-warm mb-6">
                Content Policy and Editorial Standards
              </h2>

              <div className="space-y-6">
                <p className="text-readable">
                  TopAd Digital creates educational and informational content to
                  help businesses make informed decisions. Our content policy
                  ensures accuracy, fairness, and educational value.
                </p>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Content Creation Standards
                  </h3>
                  <ul className="text-readable space-y-2">
                    <li>
                      • <strong>Fact-Based Information:</strong> All content is
                      researched and verified for accuracy
                    </li>
                    <li>
                      • <strong>Educational Purpose:</strong> Content aims to
                      inform and educate, not mislead
                    </li>
                    <li>
                      • <strong>Objective Analysis:</strong> Comparative content
                      (Google vs Meta, etc.) presents balanced viewpoints
                    </li>
                    <li>
                      • <strong>Industry Best Practices:</strong> ROI and
                      conversion guidance based on proven methodologies
                    </li>
                    <li>
                      • <strong>Regular Updates:</strong> Content is reviewed
                      and updated to maintain relevance and accuracy
                    </li>
                    <li>
                      • <strong>Professional Standards:</strong> All content
                      adheres to industry ethical guidelines
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">
                      Comparative Analysis Policy
                    </h3>
                    <p className="text-readable mb-3">
                      When we create comparative content (such as "Google vs
                      Meta" analyses):
                    </p>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>
                        • All comparisons are based on publicly available data
                        and industry research
                      </li>
                      <li>
                        • We present objective pros and cons for each platform
                        or service
                      </li>
                      <li>
                        • No content is intended to disparage or unfairly
                        criticize competitors
                      </li>
                      <li>
                        • Recommendations are based on specific use cases and
                        business needs
                      </li>
                      <li>
                        • We disclose any business relationships that might
                        influence content
                      </li>
                    </ul>
                  </div>

                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">
                      User-Generated Content
                    </h3>
                    <p className="text-readable mb-3">
                      When you interact with our content through comments,
                      feedback, or testimonials:
                    </p>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>
                        • You grant us permission to display and share your
                        contributions
                      </li>
                      <li>
                        • We reserve the right to moderate and remove
                        inappropriate content
                      </li>
                      <li>
                        • Spam, offensive, or irrelevant content will be removed
                      </li>
                      <li>
                        • We may use testimonials and feedback in marketing
                        materials
                      </li>
                      <li>
                        • You retain ownership of your original content
                        contributions
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-accent-readable font-semibold mb-2">
                    Content Disclaimer
                  </h4>
                  <p className="text-readable text-sm">
                    While we strive for accuracy, all content is provided for
                    informational purposes only. Business decisions should be
                    made based on your specific circumstances and professional
                    consultation. TopAd Digital is not responsible for business
                    outcomes resulting from the use of our educational content.
                  </p>
                </div>
              </div>
            </section>

            {/* Use License and Restrictions */}
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-fire">
                  Use License and Restrictions
                </h2>
              </div>

              <div className="space-y-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Permitted Use
                  </h3>
                  <p className="text-readable mb-3">
                    TopAd Digital grants you a limited, non-exclusive,
                    non-transferable license to:
                  </p>
                  <ul className="text-readable space-y-2">
                    <li>
                      • Access and browse our website for personal or business
                      research purposes
                    </li>
                    <li>
                      • Read, share, and reference our blog content with proper
                      attribution
                    </li>
                    <li>
                      • Use our contact forms and communication tools for
                      legitimate business inquiries
                    </li>
                    <li>
                      • Download resources we explicitly make available for
                      download
                    </li>
                    <li>
                      • Engage with our services as outlined in separate service
                      agreements
                    </li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Prohibited Activities
                  </h3>
                  <p className="text-readable mb-3">
                    You may not use TopAd Digital's website or services to:
                  </p>
                  <ul className="text-readable space-y-2">
                    <li>
                      • Copy, reproduce, or distribute our proprietary content
                      without permission
                    </li>
                    <li>
                      • Reverse engineer, decompile, or disassemble any software
                      or systems
                    </li>
                    <li>
                      • Use automated tools to scrape or harvest data from our
                      website
                    </li>
                    <li>
                      • Attempt to gain unauthorized access to our systems or
                      client information
                    </li>
                    <li>
                      • Transmit malicious code, viruses, or other harmful
                      software
                    </li>
                    <li>
                      • Use our services for illegal activities or to violate
                      others' rights
                    </li>
                    <li>
                      • Impersonate TopAd Digital or claim affiliation without
                      authorization
                    </li>
                    <li>
                      • Submit false information or engage in fraudulent
                      activities
                    </li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Intellectual Property Rights
                  </h3>
                  <p className="text-readable mb-3">
                    Unless otherwise stated, TopAd Digital owns or licenses all
                    intellectual property rights in:
                  </p>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Website design, layout, and functionality</li>
                    <li>
                      • Blog content, tutorials, and educational materials
                    </li>
                    <li>• Proprietary methodologies and frameworks</li>
                    <li>• Logos, trademarks, and brand elements</li>
                    <li>
                      • Software tools and custom applications developed for
                      clients
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Client Service Terms */}
            <DisplayAd />
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-ice">
                  Client Service Terms
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Service Agreements
                  </h3>
                  <p className="text-readable mb-3">
                    Specific service engagements are governed by separate
                    service agreements that detail:
                  </p>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>• Project scope, deliverables, and timelines</li>
                    <li>• Pricing, payment terms, and schedules</li>
                    <li>• Client responsibilities and required materials</li>
                    <li>• Intellectual property ownership and usage rights</li>
                    <li>• Confidentiality and non-disclosure provisions</li>
                    <li>• Termination conditions and procedures</li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Performance Expectations
                  </h3>
                  <p className="text-readable mb-3">
                    While we strive for excellence, clients should understand:
                  </p>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>
                      • Results may vary based on market conditions and
                      competition
                    </li>
                    <li>
                      • Digital marketing outcomes depend on multiple factors
                      beyond our control
                    </li>
                    <li>
                      • Website performance can be affected by hosting, content,
                      and user behavior
                    </li>
                    <li>
                      • Third-party platform changes may impact ongoing
                      campaigns
                    </li>
                    <li>
                      • Client cooperation and timely feedback are essential for
                      success
                    </li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Payment and Billing
                  </h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>
                      • Payment terms are specified in individual service
                      agreements
                    </li>
                    <li>
                      • Most projects require deposits or milestone payments
                    </li>
                    <li>• Late payments may result in service suspension</li>
                    <li>
                      • Refund policies vary by service type and project stage
                    </li>
                    <li>
                      • All fees are exclusive of applicable taxes unless stated
                      otherwise
                    </li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Client Responsibilities
                  </h3>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>
                      • Provide accurate information and required materials
                      promptly
                    </li>
                    <li>
                      • Respond to requests for feedback within agreed
                      timeframes
                    </li>
                    <li>
                      • Ensure you have rights to materials you provide to us
                    </li>
                    <li>
                      • Comply with platform policies for marketing campaigns
                    </li>
                    <li>
                      • Maintain confidentiality of proprietary methodologies
                      shared
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Disclaimers and Limitations */}
            <DisplayAd />
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-warm">
                  Disclaimers and Limitations
                </h2>
              </div>

              <div className="space-y-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Service Disclaimers
                  </h3>
                  <p className="text-readable mb-3">
                    TopAd Digital provides services and content "as is" without
                    warranties of any kind. We specifically disclaim:
                  </p>
                  <ul className="text-readable space-y-2">
                    <li>
                      • <strong>Performance Guarantees:</strong> Specific
                      results, rankings, or conversion rates
                    </li>
                    <li>
                      • <strong>Timeline Guarantees:</strong> Exact completion
                      dates (though we provide estimates)
                    </li>
                    <li>
                      • <strong>Third-Party Platform Changes:</strong> Algorithm
                      updates, policy changes, or service disruptions
                    </li>
                    <li>
                      • <strong>Market Conditions:</strong> Economic factors,
                      competition, or industry changes
                    </li>
                    <li>
                      • <strong>Technical Issues:</strong> Internet
                      connectivity, server downtime, or software conflicts
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">
                      Limitation of Liability
                    </h3>
                    <p className="text-readable mb-3 text-sm">
                      TopAd Digital's liability is limited to the maximum extent
                      permitted by law. We are not liable for:
                    </p>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>• Indirect, incidental, or consequential damages</li>
                      <li>
                        • Lost profits, revenue, or business opportunities
                      </li>
                      <li>
                        • Data loss or corruption not caused by our negligence
                      </li>
                      <li>• Third-party actions or platform policy changes</li>
                      <li>
                        • Force majeure events beyond our reasonable control
                      </li>
                    </ul>
                  </div>

                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">
                      Indemnification
                    </h3>
                    <p className="text-readable mb-3 text-sm">
                      Clients agree to indemnify TopAd Digital against claims
                      arising from:
                    </p>
                    <ul className="text-readable space-y-1 text-sm">
                      <li>
                        • Client's breach of these terms or service agreements
                      </li>
                      <li>• Misuse of our services or content</li>
                      <li>
                        • Violation of third-party rights or applicable laws
                      </li>
                      <li>• Inaccurate information provided by the client</li>
                      <li>• Client's business activities and decisions</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="text-accent-readable font-semibold mb-2">
                    Important Legal Notice
                  </h4>
                  <p className="text-readable text-sm">
                    Some jurisdictions do not allow the exclusion or limitation
                    of certain warranties or liabilities. In such cases, our
                    liability will be limited to the maximum extent permitted by
                    applicable law. These terms should be read in conjunction
                    with your local consumer protection laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Termination and Suspension */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-fire mb-6">
                Termination and Suspension
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Termination by Client
                  </h3>
                  <ul className="text-readable space-y-2">
                    <li>
                      • You may terminate services according to your service
                      agreement terms
                    </li>
                    <li>• Website access can be discontinued at any time</li>
                    <li>
                      • Subscription services can be cancelled with appropriate
                      notice
                    </li>
                    <li>
                      • Refund eligibility depends on project stage and
                      agreement terms
                    </li>
                    <li>
                      • Data export and handover procedures will be followed as
                      agreed
                    </li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Termination by TopAd
                  </h3>
                  <ul className="text-readable space-y-2">
                    <li>
                      • We may suspend or terminate services for terms
                      violations
                    </li>
                    <li>• Non-payment may result in service suspension</li>
                    <li>
                      • Abusive or unethical behavior toward staff may result in
                      termination
                    </li>
                    <li>
                      • Illegal activities or policy violations warrant
                      immediate termination
                    </li>
                    <li>
                      • We will provide reasonable notice except in cases of
                      serious misconduct
                    </li>
                  </ul>
                </div>
              </div>

              <div className="small-card mt-6">
                <h3 className="text-lg font-bold text-accent-readable mb-3">
                  Post-Termination
                </h3>
                <p className="text-readable mb-3">
                  Upon termination of services:
                </p>
                <ul className="text-readable space-y-1 text-sm">
                  <li>
                    • Client data will be handled according to our Privacy
                    Policy and data retention schedule
                  </li>
                  <li>
                    • Access to proprietary tools and platforms will be revoked
                  </li>
                  <li>
                    • Final invoicing and payment reconciliation will be
                    completed
                  </li>
                  <li>
                    • Confidentiality obligations continue beyond termination
                  </li>
                  <li>
                    • Intellectual property rights remain as specified in
                    service agreements
                  </li>
                </ul>
              </div>
            </section>

            {/* Governing Law and Disputes */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-ice mb-6">
                Governing Law and Dispute Resolution
              </h2>

              <div className="space-y-6">
                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Applicable Law
                  </h3>
                  <p className="text-readable mb-3">
                    These Terms of Service are governed by and construed in
                    accordance with applicable business and consumer protection
                    laws. Specific jurisdictional terms may be outlined in
                    individual service agreements.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">
                      Dispute Resolution Process
                    </h3>
                    <ol className="text-readable space-y-2">
                      <li>
                        1. <strong>Direct Communication:</strong> Contact us to
                        discuss the issue
                      </li>
                      <li>
                        2. <strong>Formal Notice:</strong> Provide written
                        notice of the dispute
                      </li>
                      <li>
                        3. <strong>Good Faith Negotiation:</strong> Attempt to
                        resolve through discussion
                      </li>
                      <li>
                        4. <strong>Mediation:</strong> Use neutral third-party
                        mediation if needed
                      </li>
                      <li>
                        5. <strong>Legal Action:</strong> Court proceedings as a
                        last resort
                      </li>
                    </ol>
                  </div>

                  <div className="small-card">
                    <h3 className="text-lg font-bold text-accent-readable mb-3">
                      Class Action Waiver
                    </h3>
                    <p className="text-readable text-sm mb-3">
                      To the extent permitted by law, you agree that disputes
                      will be resolved individually, not as part of a class
                      action or collective proceeding.
                    </p>
                    <p className="text-readable text-sm">
                      This waiver does not apply where prohibited by applicable
                      consumer protection laws.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="schema-card">
              <div className="flex items-center mb-6">
                <Zap className="w-8 h-8 text-orange-400 mr-4" />
                <h2 className="text-3xl font-bold text-warm">
                  Changes to These Terms
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-readable">
                  TopAd Digital reserves the right to modify these Terms of
                  Service at any time to reflect changes in our services, legal
                  requirements, or business practices.
                </p>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Notification Process
                  </h3>
                  <p className="text-readable mb-3">
                    When we make significant changes to these terms, we will
                    notify you through:
                  </p>
                  <ul className="text-readable space-y-2">
                    <li>
                      • Email notification to active clients and subscribers
                    </li>
                    <li>• Prominent notice on our website homepage</li>
                    <li>
                      • Updated "Last Modified" date at the top of this document
                    </li>
                    <li>
                      • Direct communication for changes affecting active
                      service agreements
                    </li>
                  </ul>
                </div>

                <div className="small-card">
                  <h3 className="text-lg font-bold text-accent-readable mb-3">
                    Your Options
                  </h3>
                  <p className="text-readable mb-3">
                    If you disagree with updated terms:
                  </p>
                  <ul className="text-readable space-y-1 text-sm">
                    <li>
                      • You may discontinue using our website and services
                    </li>
                    <li>
                      • Active service agreements remain governed by their
                      original terms unless mutually agreed
                    </li>
                    <li>
                      • Continued use after notification constitutes acceptance
                      of new terms
                    </li>
                    <li>
                      • You may contact us to discuss concerns about specific
                      changes
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="schema-card">
              <h2 className="text-3xl font-bold text-fire mb-6">
                Contact Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-accent-readable mb-4">
                    Legal and Terms Questions
                  </h3>
                  <p className="text-readable mb-4">
                    For questions about these Terms of Service, legal matters,
                    or dispute resolution:
                  </p>
                  <ul className="text-readable space-y-2">
                    <li>
                      • <strong>Email:</strong> legal@topad.site
                    </li>
                    <li>
                      • <strong>General Contact:</strong> teams@topad.site
                    </li>
                    <li>
                      • <strong>Response Time:</strong> Within 48 hours for
                      legal inquiries
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-accent-readable mb-4">
                    Business Information
                  </h3>
                  <p className="text-readable mb-4">TopAd Digital</p>
                  <ul className="text-readable space-y-2">
                    <li>• Digital Marketing & Web Development Agency</li>
                    <li>• Founded 2019 by Ayaz Ahmad and Nazim Abbas</li>
                    <li>
                      • Serving clients globally with comprehensive digital
                      solutions
                    </li>
                    <li>
                      • Committed to transparent business practices and client
                      success
                    </li>
                  </ul>
                </div>
              </div>

              <div className="small-card mt-6">
                <h3 className="text-lg font-bold text-accent-readable mb-3">
                  Document Information
                </h3>
                <p className="text-readable text-sm">
                  <strong>Effective Date:</strong> These Terms of Service are
                  effective as of the date listed above and apply to all users,
                  visitors, and clients of TopAd Digital. By using our services
                  or website, you acknowledge that you have read, understood,
                  and agree to be bound by these terms and our Privacy Policy.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-6">
                <p className="text-readable text-sm">
                  <strong>Questions or Concerns?</strong> We encourage open
                  communication about our terms and policies. If you have
                  questions, concerns, or suggestions for improvement, please
                  don't hesitate to contact our team. We\'re committed to fair
                  and transparent business relationships with all our clients
                  and users.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
