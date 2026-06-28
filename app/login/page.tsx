"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Incorrect administrator password.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-black text-green-800">
          ZIWA Admin Login
        </h1>

        <p className="mt-3 text-sm font-medium text-zinc-600">
          Restricted access for authorized ZIWA administrators only.
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 font-bold text-red-700">
            {error}
          </div>
        )}

        <input
          type="password"
          placeholder="Administrator Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-6 w-full rounded-lg border p-4"
        />

        <button
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-green-800 py-4 font-black text-white hover:bg-green-900 disabled:bg-zinc-500"
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>
    </main>
  );
}