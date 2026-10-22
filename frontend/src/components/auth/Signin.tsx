import { useState } from "react";
import { useNavigate } from "react-router";
export default function Signin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Fill in the form data");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": formData.email,
                              "password": formData.password
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail);
        return;
      }
      localStorage.setItem("user_id", data.id);
      localStorage.setItem("user_name", data.first_name);

      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        setError("can't reach server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-[80vh] items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 rounded-xl bg-slate-800 p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white">Sign in</h2>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          {error && (
            <div
              role="alert"
              className="mt-3 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              <svg
                className="h-4 w-4 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-1 1v3a1 1 0 102 0V7a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-500"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
