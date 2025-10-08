'use client';

import { useState } from 'react';
import { contactFormSchema, type ContactFormInput } from '@/lib/validators';

const CONTACT_EMAIL = 'hello@upgradewellness.example'; // set your real inbox

type Errors = Partial<Record<keyof ContactFormInput, string>>;

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormInput>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onChange<K extends keyof ContactFormInput>(k: K, v: string) {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fe: Errors = {};
      for (const issue of parsed.error.issues) fe[issue.path[0] as keyof ContactFormInput] = issue.message;
      setErrors(fe); setSent(false);
      return;
    }
    const subject = encodeURIComponent(`[Website] Contact from ${values.name}`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm text-slate-600">Name</label>
        <input id="name" type="text" value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-brand-600"
          placeholder="Jane Doe" required />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-slate-600">Email</label>
        <input id="email" type="email" value={values.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-brand-600"
          placeholder="jane@example.com" required />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-slate-600">Message</label>
        <textarea id="message" rows={6} value={values.message}
          onChange={(e) => onChange('message', e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-brand-600"
          placeholder="How can we help?" required />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="btn btn-primary">Send message</button>
        {sent && <span className="text-sm text-green-400">Opening your email client…</span>}
      </div>
    </form>
  );
}
