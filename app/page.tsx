"use client";

import { useState } from "react";

const sectors = [
  "Subsistence Farmers",
  "Street Vendors",
  "Cross-Border Traders",
  "Transporters",
  "Artisanal Miners",
  "Mechanics",
  "Artisanal Workers",
  "Market Traders",
  "Domestic Workers",
  "All Informal Workers",
];

const focusAreas = [
  "Safe and humane working environments for all",
  "Fair land and housing allocation",
  "Reasonable tobacco prices for farmers",
  "Direct farmer-to-retailer networks",
  "Formalisation of informal workers",
  "Protection of livelihoods",
  "Fair agricultural markets",
  "Artisanal mining reform",
];

const updates = [
  {
    tag: "STATEMENT",
    title: "ZIWA Statement on Housing Demolitions",
    date: "June 2026",
    href: "/statements",
  },
  {
    tag: "POLICY",
    title: "Fair Market Access for Subsistence Farmers",
    date: "June 2026",
    href: "/policies",
  },
  {
    tag: "POLICY",
    title: "Formalisation of Artisanal Mining",
    date: "June 2026",
    href: "/policies",
  },
];

const navigation = [
  { label: "HOME", href: "/" },
  { label: "Admin Content", href: "/admin/content" },
 {label: "Reports", href: "/report" },
  { label: "ABOUT", href: "/about" },
  { label: "POLICIES", href: "/policies" },
  { label: "STATEMENTS", href: "/statements" },
  { label: "CAMPAIGNS", href: "/campaigns" },
  { label: "RESOURCES", href: "/resources" },
  { label: "LEADERSHIP", href: "/leadership" },
  { label: "JOIN", href: "/join" },
  { label: "CONTACT", href: "/contact" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-green-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 text-xs font-semibold sm:px-6 lg:px-8">
          <p>Empowering Workers. Building Communities. Growing Zimbabwe.</p>
          <div className="hidden items-center gap-4 sm:flex">
            <span>Facebook</span>
            <span>X</span>
            <span>WhatsApp</span>
            <span>Email</span>
          </div>
        </div>
      </section>

      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/ziwa-logo.jpg.png"
              alt="ZIWA Logo"
              className="h-20 w-auto shrink-0 object-contain sm:h-24"
            />

            <div className="hidden sm:block">
              <p className="text-3xl font-black leading-7 text-green-800">
                ZIWA
              </p>
              <p className="text-[11px] font-black leading-3 text-zinc-900">
                ZIMBABWE INFORMAL
                <br />
                WORKERS ASSOCIATION
              </p>
              <p className="text-[10px] font-bold text-red-700">
                
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-xs font-black xl:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={item.href === "/" ? "text-green-800" : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="/join"
            className="hidden rounded-md bg-green-700 px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-green-800 lg:inline-block"
          >
            JOIN ZIWA
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-black xl:hidden"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-zinc-200 bg-white px-4 py-4 text-sm font-black xl:hidden">
            <div className="grid gap-4">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section className="relative min-h-[90vh] overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/workers-bg.jpg.jpeg')" }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-green-950/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <p className="mb-5 inline-block rounded-full border border-green-400/50 bg-green-800/40 px-5 py-2 text-xs font-black tracking-wider text-green-200">
              ZIMBABWE INFORMAL WORKERS ASSOCIATION
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Building Zimbabwe Through The Power Of{" "}
              <span className="block text-green-400">Informal Workers</span>
            </h1>

            <div className="mt-6 h-1.5 w-24 bg-red-600" />

            <p className="mt-8 max-w-2xl text-lg font-medium leading-9 text-zinc-100">
              ZIWA is Zimbabwe&apos;s national association representing farmers,
              street vendors, transporters, mechanics, artisans, cross-border
              traders, domestic workers, miners and every informal worker. We
              advocate for dignified livelihoods, fair economic participation
              and policies that strengthen Zimbabwe&apos;s productive economy
              while maintaining zero tolerance to the reversal of the gains of
              the liberation struggle.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/join"
                className="rounded-lg bg-green-700 px-8 py-4 text-center text-sm font-black text-white shadow-lg hover:bg-green-800"
              >
                JOIN ZIWA TODAY
              </a>

              <a
                href="/policies"
                className="rounded-lg border-2 border-white px-8 py-4 text-center text-sm font-black text-white hover:bg-white hover:text-black"
              >
                OUR POLICIES
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["10 Provinces", "All Sectors", "National Voice", "Fair Policy"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur"
                  >
                    <p className="text-sm font-black">{item}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-7 shadow-2xl backdrop-blur">
            <h2 className="text-3xl font-black text-green-400">
              Our National Policy Priorities
            </h2>

            <div className="mt-6 grid gap-4">
              {focusAreas.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/10 p-4 font-bold"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-green-800">
            Our Guiding Principles
          </h2>
          <div className="mt-4 h-1 w-20 bg-red-700" />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 p-7 shadow-sm">
              <h3 className="text-xl font-black text-green-700">
                National Development
              </h3>
              <p className="mt-4 leading-8 text-zinc-700">
                We believe informal workers are the backbone of Zimbabwe&apos;s
                economy and deserve recognition, protection and opportunities
                to prosper.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-7 shadow-sm">
              <h3 className="text-xl font-black text-green-700">
                Liberation Legacy
              </h3>
              <p className="mt-4 leading-8 text-zinc-700">
                ZIWA maintains zero tolerance to the reversal of the gains of
                Zimbabwe&apos;s liberation struggle while promoting
                constitutional rights, productive enterprise and inclusive
                economic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-2xl font-black text-green-800">
            WHO WE REPRESENT
          </h2>
          <div className="mt-3 h-1 w-12 bg-green-700" />
          <p className="mt-5 text-sm font-medium leading-7 text-zinc-700">
            ZIWA represents Zimbabwe&apos;s informal and subsistence economy,
            giving organized voice to workers who feed, move, build and sustain
            communities.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
          {sectors.map((sector) => (
            <div
              key={sector}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-black shadow-sm"
            >
              <span className="mr-2 text-green-700">●</span>
              {sector}
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-green-800 p-8 text-white lg:col-span-3">
          <h3 className="text-2xl font-black">Supporting Farmers</h3>
          <p className="mt-5 leading-8">
            ZIWA advocates for reasonable tobacco prices, stronger producer
            organisations, direct farmer-to-retailer networks, value addition
            and fair agricultural markets that maximise returns for Zimbabwean
            farmers.
          </p>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-2xl bg-green-800 p-8 text-white">
            <h2 className="text-2xl font-black">OUR MISSION</h2>
            <p className="mt-6 text-sm font-medium leading-7">
              To unite and empower Zimbabwe&apos;s informal workers through
              representation, policy advocacy, skills development, market
              access, economic inclusion and the promotion of safe, humane and
              dignified working environments for all.
            </p>
          </div>

          <div className="rounded-2xl bg-black p-8 text-white">
            <h2 className="text-2xl font-black">OUR POLICY WORK</h2>
            <p className="mt-6 text-sm font-medium leading-7">
              We issue policy statements on housing, land, agriculture, mining,
              transport, vending, cross-border trade, tobacco pricing, direct
              farmer-to-retailer networks and worker formalisation.
            </p>
          </div>

          <div className="rounded-2xl bg-red-700 p-8 text-white">
            <h2 className="text-2xl font-black">HAVE YOUR SAY</h2>
            <p className="mt-6 text-sm font-medium leading-7">
              Members and the public can submit issues affecting informal
              workers, communities, agriculture, markets, livelihoods and public
              policy across Zimbabwe.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-black text-green-800">
              LATEST STATEMENTS & CAMPAIGNS
            </h2>
            <div className="mt-3 h-1 w-12 bg-green-700" />
          </div>
          <a href="/statements" className="text-sm font-black text-green-800">
            View all updates →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {updates.map((update) => (
            <article
              key={update.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-black text-green-700">{update.tag}</p>
              <h3 className="mt-3 text-lg font-black leading-6">
                {update.title}
              </h3>
              <p className="mt-4 text-sm font-semibold text-zinc-500">
                {update.date}
              </p>
              <a
                href={update.href}
                className="mt-6 inline-block text-sm font-black text-green-800"
              >
                Read more →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-green-800 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-black">Join ZIWA</h2>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7">
              Become part of the national movement for fair policies, protected
              livelihoods and dignified economic participation.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-zinc-950 shadow-xl">
            <p className="text-xl font-black text-green-800">
              Membership Recruitment
            </p>
            <p className="mt-3 text-sm font-medium leading-7 text-zinc-700">
              Submit your membership interest through the official recruitment
              page.
            </p>
            <a
              href="/join"
              className="mt-6 inline-block rounded-md bg-green-800 px-5 py-4 text-sm font-black text-white hover:bg-green-900"
            >
              OPEN MEMBERSHIP FORM
            </a>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <h2 className="text-2xl font-black">CONTACT ZIWA</h2>
            <div className="mt-3 h-1 w-12 bg-green-500" />
            <p className="mt-5 text-sm font-medium leading-7 text-zinc-300">
              Zimbabwe Informal Workers Association
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm font-black text-green-400">
              General Enquiries
            </p>
            <p className="mt-2 font-bold">info@ziwa.online</p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm font-black text-green-400">
              Legal / Director
            </p>
            <p className="mt-2 font-bold">legal@ziwa.online</p>
            <p className="mt-1 font-bold">director@ziwa.online</p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm font-black text-green-400">
              Phone / WhatsApp
            </p>
            <p className="mt-2 font-bold">+263 78 486 5777</p>
            <p className="mt-2 text-sm font-bold text-red-300">
              WhatsApp Messages Only: +263 77 001 502
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-950 px-4 py-6 text-sm text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">
          <p>© 2026 ZIWA. All Rights Reserved.</p>
          <p>Privacy Policy | Terms of Use</p>
        </div>
      </footer>
    </main>
  );
}