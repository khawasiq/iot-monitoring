import { useState } from "react";
import { Link } from "react-router";

export default function UserHome() {
  const [homes, setHomes] = useState<{ id: number; name: string }[]>([]);
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const locations = ["Home", "Department", "Store"];
  const [formData, setFormData] = useState({
    name: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!formData.name.trim()) {
      setError("Enter location to register");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/register-home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          user_id: localStorage.getItem("user_id"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("Some error occured");
        return;
      }
      setHomes((prev) => [...prev, data]);
      setFormData({ name: "" });
      setShowForm(false);
    } catch (err) {
      if (err instanceof Error) {
        setError("Can't reach server");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl bg-slate-800 p-8 shadow-lg"
        >
          <h2 className="text-xl font-bold text-white">Add a location</h2>

          <div className="relative">
            <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
              Location name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="off"
              maxLength={50}
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="e.g. My House, Main Store"
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />

            {open && (
              <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-slate-600 bg-slate-900 shadow-lg">
                {locations.map((loc) => (
                  <li
                    key={loc}
                    onClick={() => setFormData({ name: loc })}
                    className="cursor-pointer px-3 py-2 text-white hover:bg-slate-700"
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error && <p className="text-sm bg-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white hover:bg-blue-500"
          >
            {loading ? "Adding..." : "Add location"}
          </button>

          {homes.length > 0 && (
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-full text-sm text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {!showForm && (
        <div className="space-y-4 rounded-xl bg-slate-800 p-8 shadow-lg">
          <h2 className="text-xl font-bold text-white">Your locations</h2>

          <ul className="space-y-2">
            {homes.map((home) => (
              <li key={home.id}>
                <Link
                  to={`/home/${home.id}`}
                  className="block rounded-md bg-slate-900 px-4 py-3 text-white hover:bg-slate-700"
                >
                  {home.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowForm(true)}
            className="w-full rounded-md border border-blue-500 py-2 text-blue-400 hover:bg-slate-700"
          >
            + Add another location
          </button>
        </div>
      )}
    </div>
  );
}
