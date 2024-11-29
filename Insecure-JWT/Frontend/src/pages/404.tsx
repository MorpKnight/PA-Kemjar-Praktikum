export default function NotFound() {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Page not found. You are not authorized to access this page.
          </p>
        </div>
      </div>
    );
  }
  