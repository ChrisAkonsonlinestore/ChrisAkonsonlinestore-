import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AdminLoginPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const {
    user,
    isAdmin,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logoutUser,
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      if (isRegisterMode) {
        await registerWithEmail(email.trim(), password);
        setSuccessMessage('Account created successfully! Checking admin access...');
      } else {
        await loginWithEmail(email.trim(), password);
      }
      setTimeout(() => {
        onNavigate('admin');
      }, 500);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Authentication failed. Please verify your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      setIsLoading(true);
      await loginWithGoogle();
      setTimeout(() => {
        onNavigate('admin');
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If already logged in and verified as Admin
  if (user && isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <Shield className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#0a1931]">
            Admin Authenticated
          </h2>
          <p className="text-xs text-slate-500">
            Signed in as <strong className="text-slate-800">{user.email}</strong>. You have full access to manage chrisAkons online store.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onNavigate('admin')}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Proceed to Admin Dashboard</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={logoutUser}
            className="text-xs text-slate-500 hover:text-rose-600 transition"
          >
            Sign out of this session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[#0a1931] text-amber-400 border border-amber-400/30 mx-auto flex items-center justify-center shadow-lg">
          <Shield className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a1931]">
          Admin Portal Login
        </h1>
        <p className="text-xs text-slate-500">
          Secure management access for <strong>Christian Akobundu</strong>.
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Google One-Click Login */}
        <div>
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-3 transition shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">
            or with email & password
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="christianakobundu09@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#0a1931] hover:bg-[#12284c] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            {isRegisterMode ? (
              <>
                <UserPlus className="w-4 h-4 text-amber-400" />
                <span>{isLoading ? 'Creating...' : 'Create Admin Account'}</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>{isLoading ? 'Signing in...' : 'Sign In as Admin'}</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className="text-xs text-amber-700 hover:underline font-semibold"
          >
            {isRegisterMode
              ? 'Already have an admin password? Sign In'
              : 'First time signing in with email? Create Password'}
          </button>
        </div>

        {/* Security Note */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">Authorized Admin Accounts:</p>
          <ul className="list-disc list-inside space-y-0.5 text-slate-600">
            <li>christianakobundu09@gmail.com (Store Owner)</li>
            <li>prolordaichristian001@gmail.com (Active Developer/Owner)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
