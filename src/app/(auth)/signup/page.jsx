"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthAPI } from '../../../lib/api';

const checks = [
  { key: 'len', label: '≥ 8 characters', test: v => v.length >= 8 },
  { key: 'low', label: 'lowercase', test: v => /[a-z]/.test(v) },
  { key: 'up',  label: 'uppercase', test: v => /[A-Z]/.test(v) },
  { key: 'num', label: 'number',    test: v => /\d/.test(v) },
  { key: 'sp',  label: 'special',   test: v => /[^A-Za-z0-9]/.test(v) }
];

export default function SignupPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const set = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Enter your first name.';
    if (!form.lastName.trim()) e.lastName = 'Enter your last name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter 10-digit phone number.';
    if (!form.password) e.password = 'Create a password.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await AuthAPI.signup(form);   // sets httpOnly cookie on success
      router.push('/');             // go wherever you like after signup
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Signup failed';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const score = checks.reduce((acc, c) => acc + (c.test(form.password) ? 1 : 0), 0);
  const strength = ['Weak', 'Okay', 'Good', 'Strong', 'Strong', 'Very strong'][score];

  return (
    <section className="section py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <form onSubmit={onSubmit} className="card p-8">
          <h1 className="text-2xl font-bold mb-6">Create your account</h1>

          {serverError && <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{serverError}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="firstName">First Name *</label>
              <input id="firstName" className="input" value={form.firstName} onChange={e=>set('firstName', e.target.value)} placeholder="First name" />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div>
              <label className="label" htmlFor="lastName">Last Name *</label>
              <input id="lastName" className="input" value={form.lastName} onChange={e=>set('lastName', e.target.value)} placeholder="Last name" />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="label" htmlFor="email">Email *</label>
            <input id="email" type="email" className="input" value={form.email} onChange={e=>set('email', e.target.value)} placeholder="you@example.com" />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="mt-4">
            <label className="label" htmlFor="phone">Phone *</label>
            <input id="phone" inputMode="numeric" className="input" value={form.phone} onChange={e=>set('phone', e.target.value.replace(/\D/g,''))} placeholder="98XXXXXXXX" />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="mt-4">
            <label className="label" htmlFor="password">Password *</label>
            <div className="relative">
              <input id="password" type={show? 'text':'password'} className="input pr-24" value={form.password} onChange={e=>set('password', e.target.value)} />
              <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-2 top-1/2 -translate-y-1/2 btn-ghost text-sm">{show? 'Hide':'Show'}</button>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 w-28 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-vaani-accent" style={{ width: `${(score/5)*100}%` }} />
              </div>
              <span className="text-sm text-gray-600">{strength}</span>
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
              {checks.map(c => (
                <li key={c.key}>{c.test(form.password) ? '✅' : '⬜'} {c.label}</li>
              ))}
            </ul>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-60 disabled:cursor-not-allowed">
            {loading? 'Creating account…':'Sign Up'}
          </button>
          <p className="mt-4 text-sm text-center">Already have an account? <Link href="/login" className="text-vaani-accent hover:underline">Log in</Link></p>
        </form>

        {/* right side content unchanged */}
      </div>
    </section>
  );
}
