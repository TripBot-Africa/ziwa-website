"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

const sectors = [
  "Subsistence Farmer",
  "Street Vendor",
  "Cross-Border Trader",
  "Transporter",
  "Artisanal Miner",
  "Artisanal Worker",
  "Market Trader",
  "Domestic Worker",
  "Self-Employed Worker",
  "Other",
];

export default function JoinPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    setSuccess("");
    setError("");

    const member = {
      full_name: String(formData.get("full_name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      province: String(formData.get("province") || "").trim(),
      district: String(formData.get("district") || "").trim(),
      suburb: String(formData.get("suburb") || "").trim(),
      ward: String(formData.get("ward") || "").trim(),
      sector: String(formData.get("sector") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      status: "pending",
    };

    const { error: insertError } = await supabase.from("members").insert(member);

    if (insertError) {
      setError("Failed to submit application. Please try again.");
    } else {
      setSuccess("Your ZIWA membership interest has been submitted successfully.");
      form.reset();
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="bg-green-800 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-200">
            Membership
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">Join ZIWA</h1>

          <p className="mt-6 max-w-3xl text-lg leading-8">
            Become part of Zimbabwe&apos;s growing movement for informal
            workers, farmers, traders, transporters, artisans and miners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-black text-green-800">
            Membership Application
          </h2>

          {success && (
            <div className="mt-6 rounded-xl border border-green-300 bg-green-50 p-4 font-bold text-green-800">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 font-bold text-red-800">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-5 md:grid-cols-2"
          >
            <input
              name="full_name"
              type="text"
              placeholder="Full Name"
              required
              className="rounded-lg border p-4"
            />

            <input
              name="phone"
              type="text"
              placeholder="Phone / WhatsApp"
              required
              className="rounded-lg border p-4"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address Optional"
              className="rounded-lg border p-4"
            />

            <input
              name="province"
              type="text"
              placeholder="Province"
              required
              className="rounded-lg border p-4"
            />

            <input
              name="district"
              type="text"
              placeholder="District"
              className="rounded-lg border p-4"
            />

            <input
              name="suburb"
              type="text"
              placeholder="Suburb / Street / Village"
              className="rounded-lg border p-4"
            />

            <input
              name="ward"
              type="text"
              placeholder="Ward"
              className="rounded-lg border p-4"
            />

            <select name="sector" required className="rounded-lg border p-4">
              <option value="">Select Sector</option>
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Tell us about yourself or the issues affecting workers in your area"
              className="col-span-full min-h-[140px] rounded-lg border p-4"
            />

            <button
              type="submit"
              disabled={loading}
              className="col-span-full rounded-lg bg-green-800 px-6 py-4 font-black text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-zinc-500"
            >
              {loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}