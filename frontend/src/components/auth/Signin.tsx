export default function Signin() {
  return (
    <div>
      <div className="flex min-h-[80vh] items-center justify-center">
  <form className="w-full max-w-md space-y-5 rounded-xl bg-slate-800 p-8 shadow-lg">
    <h2 className="text-2xl font-bold text-white">Sign in</h2>

    <div>
      <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label htmlFor="password" className="mb-1 block text-sm text-slate-300">
        Password
      </label>
      <input
        id="password"
        type="password"
        name="password"
        required
        className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
      />
    </div>

    <button
      type="submit"
      className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-500"
    >
      Sign In
    </button>
  </form>
</div>
    </div>
  );
}
