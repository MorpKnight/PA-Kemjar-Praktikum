import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Login or Register" },
    { name: "description", content: "Login or Register to access the app" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
            <div className="h-[72px] w-[217px]">
            <img
              src="/logo-google.svg"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-google.svg"
              alt="Remix"
              className="hidden w-full dark:block"
            />
            </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Please login or register to continue
          </p>
          <div className="flex gap-4">
            <a
              href="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Register
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
