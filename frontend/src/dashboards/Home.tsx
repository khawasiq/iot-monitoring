import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: logo / app name */}
        <Link to="/" className="text-xl font-bold text-white">
          IoT Monitor
        </Link>

        {/* Right: auth links */}
        <div className="flex items-center gap-4">
          <Link
            to="/signin"
            className="text-sm font-medium text-slate-300 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}