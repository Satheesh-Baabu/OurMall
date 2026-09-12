"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formData.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = "Please enter a valid email.";
    if (!formData.message.trim()) nextErrors.message = "Please enter a message.";

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setErrors({});
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div className="rounded-3xl bg-primary/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Contact</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading">We’d love to hear from you.</h1>
          <p className="mt-4 text-base leading-7 text-body">
            Whether you have a question about a product, your order, or something else, our team is ready to help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-heading">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-heading">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-heading">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(event) => handleChange("message", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
          </div>

          <Button type="submit">
            Send Message
          </Button>

          {submitted && <p className="text-sm text-emerald-600">Your message has been sent successfully.</p>}
        </form>
      </div>
    </main>
  );
}
