import { Building2, LockKeyhole, Mail, Phone, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function Login() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const utils = trpc.useUtils();
  const getRoleDestination = (role?: string | null) => {
    if (role === "tenant") return "/tenant";
    if (role === "admin") return "/";
    return "/buildings";
  };
  const login = trpc.auth.login.useMutation({
    onSuccess: user => {
      try {
        window.localStorage.setItem("golden-prime-user-info", JSON.stringify(user));
      } catch {
        // Ignore storage quota errors
      }
      utils.auth.me.setData(undefined, user);
      const destination = getRoleDestination(user.role);
      setLocation(destination);
    },
    onError: error => toast.error(error.message || "Could not sign in with those details."),
  });

  useEffect(() => {
    if (!loading && user) {
      setLocation(getRoleDestination(user.role));
    }
  }, [loading, setLocation, user]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate({ phone: phone.trim(), password });
  };

  const handleGmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "aws.shashanksingh@gmail.com";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, "_blank", "noopener,noreferrer");
    }
  };

  return <main className="grid min-h-[100dvh] bg-[#F8F7F3] lg:grid-cols-[1.05fr_0.95fr]">
    <section className="relative hidden overflow-hidden bg-[#113D39] p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-[#51A68E]/30 blur-3xl" />
      <div className="relative flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10"><Building2 className="h-5 w-5 text-[#BCE7D6]" /></span><span className="text-lg font-semibold tracking-tight">Golden Prime PG</span></div>
      <div className="relative max-w-md"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#BCE7D6]">Property operations</p><h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.08] tracking-[-0.05em]">A calm, clear way to manage every stay.</h1><p className="mt-6 max-w-sm text-base leading-7 text-white/70">One secure workspace for rooms, collections, electricity, and day-to-day PG operations.</p></div>
      <div className="relative flex items-center gap-2 text-sm text-white/65"><ShieldCheck className="h-4 w-4 text-[#BCE7D6]" />Private phone-password access</div>
    </section>
    <section className="flex items-center justify-center p-5 sm:p-8">
      <div className="w-full max-w-md">
        <div className="mb-10 flex items-center gap-3 lg:hidden"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary"><Building2 className="h-5 w-5" /></span><span className="font-semibold tracking-tight text-primary">Golden Prime PG</span></div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">Sign in to your space</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Use your registered phone number (or username) and password to access your dashboard.</p>
        
        <form onSubmit={submit} className="mt-8 space-y-5 rounded-3xl border border-border/70 bg-card p-5 shadow-[0_16px_42px_rgba(23,43,77,0.08)] sm:p-7">
          <label className="block text-sm font-semibold">
            <span className="mb-2 block">Phone number or username</span>
            <span className="relative block">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <input required name="phone" value={phone} onChange={event => setPhone(event.target.value)} autoComplete="username" placeholder="10-digit mobile number" className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
            </span>
          </label>
          <label className="block text-sm font-semibold">
            <span className="mb-2 block">Password</span>
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <input required name="password" value={password} onChange={event => setPassword(event.target.value)} type="password" autoComplete="current-password" placeholder="Your password" className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
            </span>
          </label>
          <button disabled={login.isPending} type="submit" className="h-12 w-full rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_10px_22px_rgba(15,118,110,0.22)] transition enabled:hover:brightness-95 disabled:opacity-70">
            {login.isPending ? "Signing in…" : "Sign in securely"}
          </button>

          {/* Developer Credit & Social Badge at bottom of sign-in card */}
          <div className="mt-6 border-t border-border/70 pt-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary/10 via-emerald-500/10 to-teal-600/10 px-4 py-2 border border-primary/20 shadow-sm">
              <span className="text-xs font-bold tracking-wide bg-gradient-to-r from-teal-700 via-primary to-emerald-600 bg-clip-text text-transparent">
                Developed by Shashank Rajput
              </span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2.5">
              <a
                href="https://www.instagram.com/shashankrajput.__/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-pink-200 bg-pink-50 text-pink-700 transition hover:bg-pink-100"
                title="Instagram: @shashankrajput.__"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/shashankrajputx/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 transition hover:bg-sky-100"
                title="LinkedIn: @shashankrajputx"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <button
                type="button"
                onClick={handleGmailClick}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100 cursor-pointer"
                title="Contact via Gmail: aws.shashanksingh@gmail.com"
                aria-label="Gmail"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">Contact the Building Owner if you need your phone number or access role updated.</p>
      </div>
    </section>
  </main>;
}

