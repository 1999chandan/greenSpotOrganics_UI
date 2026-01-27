export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="text-center px-6">
                <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}