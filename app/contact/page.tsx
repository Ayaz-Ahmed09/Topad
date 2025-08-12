import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Get Your Free Digital Marketing Consultation",
  description:
    "Ready to grow your business? Contact our digital marketing experts for a free consultation. We're here to help with web development, Google Ads, and more.",
  openGraph: {
    title: "Contact Us - Get Your Free Digital Marketing Consultation",
    description:
      "Ready to grow your business? Contact our digital marketing experts for a free consultation.",
    url: "https://topad.site/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-display text-fire mb-8 text-center">
          Get Your Free Consultation
        </h1>

        <p className="text-xl text-white/80 text-center mb-12">
          Ready to take your business to the next level? Let's discuss how our
          digital marketing expertise can help you achieve your goals.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white/80 mb-5">
              Get in Touch
            </h2>

            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-semibold text-white/80">Email</h3>
                <p className="text-white/80">team@topad.site</p>
              </div>
              <div>
                <h3 className="font-semibold text-white/80">Phone</h3>
                <p className="text-white">+923096194974</p>
                <p className="text-white">+92328787123</p>
              </div>
              <div>
                {/* <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">
                  123 Business Street
                  <br />
                  Suite 100
                  <br />
                  City, State 12345
                </p> */}
              </div>
            </div>

            <div className="small-card rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white/80 mb-2">
                Free Strategy Session
              </h3>
              <p className="text-gray-100">
                Book a complimentary 30-minute strategy session to discuss your
                digital marketing goals and how we can help achieve them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
