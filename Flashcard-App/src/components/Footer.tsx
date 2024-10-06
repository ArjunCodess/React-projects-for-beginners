export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 transition-colors duration-200 ease-in-out">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Built with ❤️ by <a href="https://arjuncodess.vercel.app" className="hover:underline text-neutral-700">@arjuncodess</a>
        </span>
      </div>
    </footer>
  );
}