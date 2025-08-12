import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found. Return to our homepage or browse our services.",
}

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, the page you are looking for could not be found. It might have been moved, deleted, or you entered the
          wrong URL.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>

          <div className="text-gray-600">
            <p>Or try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link href="/about" className="text-blue-600 hover:underline">
                About Us
              </Link>
              <Link href="/blog" className="text-blue-600 hover:underline">
                Blog
              </Link>
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
