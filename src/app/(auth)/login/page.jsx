"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthAPI } from '../../../lib/api';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]   = useState('');
  const [show, setShow]           = useState(false);
  const [errors, setErrors]       = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading]     = useState(false);
  const router = useRouter();

  const validate = () => {
    const e = {};
    if (!identifier.trim()) e.identifier = 'Enter email or phone.';
    else if (identifier.includes('@')) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) e.identifier = 'Enter a valid email.';
    } else if (!/^\d{10}$/.test(identifier)) e.identifier = 'Enter 10-digit phone number.';
    if (!password) e.password = 'Enter your password.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await AuthAPI.login(identifier, password); // sets httpOnly cookie on success
      router.push('/');                          // go wherever you like after login
    } catch (err) {
      setServerError(err?.status === 401 ? 'Invalid credentials.' : (err?.message || 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section py-16">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <form onSubmit={onSubmit} className="card p-8">
          <h1 className="text-2xl font-bold mb-6">Log in</h1>

          {serverError && <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{serverError}</div>}

          <label className="label" htmlFor="identifier">Email or Phone</label>
          <input id="identifier" className="input" value={identifier} onChange={e=>setIdentifier(e.target.value)} placeholder="you@example.com or 98XXXXXXXX" />
          {errors.identifier && <p className="error">{errors.identifier}</p>}

          <div className="mt-4">
            <label className="label" htmlFor="password">Password</label>
            <div className="relative">
              <input id="password" type={show? 'text':'password'} className="input pr-20" value={password} onChange={e=>setPassword(e.target.value)} />
              <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-2 top-1/2 -translate-y-1/2 btn-ghost text-sm">{show? 'Hide':'Show'}</button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Link href="#" className="text-sm text-vaani-accent hover:underline">Forgot password?</Link>
          </div>

          <button disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-60 disabled:cursor-not-allowed">
            {loading? 'Logging in…':'Log in'}
          </button>

          <p className="mt-4 text-sm text-center">No account? <Link href="/signup" className="text-vaani-accent hover:underline">Sign up</Link></p>
        </form>

        {/* right side content unchanged */}
      </div>
    </section>
  );
}
