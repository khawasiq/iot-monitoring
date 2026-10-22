import { useState } from "react";
import { useNavigate } from "react-router";
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const submitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitForm = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!res.ok) {
        setError("Failed to create account");
        return;
      }
      const data = await res.json()
      console.log(data)
      navigate("/signin");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md space-y-5 rounded-xl bg-slate-800 p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white">Create an account</h2>

        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="mb-1 block text-sm text-slate-300"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={submitChange}
              required
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="mb-1 block text-sm text-slate-300"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={submitChange}
              required
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={submitChange}
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
            onChange={submitChange}
            required
            minLength={8}
            className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-sm text-slate-300"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={submitChange}
            required
            className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-500"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
