import GoogleBusinessSetup from "@/components/GoogleBusinessSetup"

export default function SetupGoogleReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Google Reviews Setup
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your website to your Google Business account to display real customer reviews.
            Follow the steps below to get your live reviews showing on the website.
          </p>
        </div>

        <GoogleBusinessSetup />

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Need Help?
            </h3>
            <p className="text-blue-700 text-sm">
              If you need assistance setting up the Google Places API or have questions about the integration,
              contact your developer or refer to the{" "}
              <a
                href="https://developers.google.com/maps/documentation/places/web-service/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                Google Places API documentation
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
