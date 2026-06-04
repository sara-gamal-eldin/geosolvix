"use client";

import { useState } from "react";
import { Globe, Check, User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loginMode, setLoginMode] = useState<"login" | "signup">("login");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState("");

  const handleSocialLogin = (provider: string) => {
    setLoginError("");
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoginSuccess(true);
      setIsLoggingIn(false);
      setTimeout(() => {
        router.push("/");
      }, 1800);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (loginMode === "signup") {
      if (!signUpFirstName.trim()) {
        setLoginError("First name is required.");
        return;
      }
      if (!signUpLastName.trim()) {
        setLoginError("Last name is required.");
        return;
      }
      if (!loginEmail.trim() || !loginEmail.includes("@")) {
        setLoginError("Please enter a valid business email address.");
        return;
      }
      if (loginPassword.length < 6) {
        setLoginError("Your password must be at least 6 characters.");
        return;
      }
      if (loginPassword !== signUpPasswordConfirm) {
        setLoginError("Password confirmation does not match password.");
        return;
      }
    } else {
      if (!loginEmail.trim() || !loginEmail.includes("@")) {
        setLoginError("Please enter a valid business email address.");
        return;
      }
      if (loginPassword.length < 6) {
        setLoginError("Credentials unrecognized. Your password must be at least 6 characters.");
        return;
      }
    }

    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoginSuccess(true);
      setIsLoggingIn(false);
      setTimeout(() => {
        router.push("/");
      }, 1800);
    }, 1400);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#070b15] text-gray-100 py-20 px-4 md:px-20 border-t border-[#1e293b] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loginGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loginGrid)" />
        </svg>
      </div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#006ff0]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[480px]">
        <div className="flex flex-col items-center mb-8 text-center select-none">
          <Globe className="w-16 h-16 text-[#3b82f6] mb-3 shrink-0" style={{ animation: "spin 15s linear infinite" }} />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {loginMode === "signup" ? "Create a New Account" : "Sign in"}
          </h1>
          <p className="text-xs text-gray-400 mt-2 max-w-sm leading-relaxed">
            {loginMode === "signup"
              ? "Fill out your profile details below to establish your secure spatial developer cloud workspace."
              : "Enter your enterprise credentials or authorize via a single sign-on provider to connect to active GIS databases."}
          </p>
        </div>
        
        <div className="bg-[#0c1222] p-8 rounded-2xl border border-[#1e293b] shadow-2xl relative">
          {isLoginSuccess ? (
            <div className="py-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-400 mb-5 relative">
                <Check className="w-8 h-8" />
                <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping animate-duration-1000" />
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                {loginMode === "signup" ? "Registration Active" : "Identity Confirmed"}
              </span>
              <h2 className="text-xl font-bold text-white mt-1.5 mb-2">
                {loginMode === "signup" ? "Account Created successfully!" : "Welcome back!"}
              </h2>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                {loginMode === "signup"
                  ? "Welcome to Geosolvix. Your new spatial developer profile has been constructed. Instantiating interactive cloud catalogs..."
                  : "Your credentials have been validated successfully. Redirecting you to the main Geosolvix homepage portal..."}
              </p>
              <div className="w-full bg-[#050811] rounded-full h-1.5 mt-6 overflow-hidden border border-[#1e293b]">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: "100%" }} />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              {loginError && (
                <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2 animate-in slide-in-from-top-2 duration-200">
                  <span className="font-bold shrink-0">⚠️ Error: </span>
                  <span>{loginError}</span>
                </div>
              )}
              
              {loginMode === "signup" && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-1.5 font-sans">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                      <User className="w-3.5 h-3.5 text-blue-500" /> First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpFirstName}
                      onChange={(e) => setSignUpFirstName(e.target.value)}
                      placeholder="Sarah"
                      disabled={isLoggingIn}
                      className="w-full px-4 py-3 bg-[#050811] border border-[#1e293b] focus:border-[#006ff0] rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 font-sans">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                      <User className="w-3.5 h-3.5 text-blue-500" /> Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpLastName}
                      onChange={(e) => setSignUpLastName(e.target.value)}
                      placeholder="Gamal"
                      disabled={isLoggingIn}
                      className="w-full px-4 py-3 bg-[#050811] border border-[#1e293b] focus:border-[#006ff0] rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-1.5 font-sans">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Mail className="w-3.5 h-3.5 text-blue-500" /> Business Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. support@geosolvix.com"
                  disabled={isLoggingIn}
                  className="w-full px-4 py-3 bg-[#050811] border border-[#1e293b] focus:border-[#006ff0] rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                />
              </div>
              
              <div className="flex flex-col gap-1.5 font-sans">
                <div className="flex justify-between items-center select-none">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-500" /> Security Password
                  </label>
                  {loginMode === "login" && (
                    <span className="text-[10px] text-[#006ff0] hover:underline cursor-pointer">Forgot password?</span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoggingIn}
                  className="w-full px-4 py-3 bg-[#050811] border border-[#1e293b] focus:border-[#006ff0] rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                />
              </div>
              
              {loginMode === "signup" && (
                <div className="flex flex-col gap-1.5 font-sans animate-in fade-in duration-200">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 select-none">
                    <Lock className="w-3.5 h-3.5 text-blue-500" /> Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={signUpPasswordConfirm}
                    onChange={(e) => setSignUpPasswordConfirm(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoggingIn}
                    className="w-full px-4 py-3 bg-[#050811] border border-[#1e293b] focus:border-[#006ff0] rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                  />
                </div>
              )}
              
              {loginMode === "login" && (
                <div className="flex items-center gap-2 select-none py-1.5 font-sans">
                  <input type="checkbox" id="rememberMe" defaultChecked className="rounded bg-[#050811] border-[#1e293b] text-[#006ff0] focus:ring-0 cursor-pointer h-4 w-4" />
                  <label htmlFor="rememberMe" className="text-xs text-gray-400 cursor-pointer">Remember my credentials on this device</label>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-xl bg-[#006ff0] hover:bg-[#0057c0] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all disabled:opacity-60 disabled:cursor-wait hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-[#006ff0]/15 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    {loginMode === "signup" ? "Creating Free Account..." : "Authenticating Portal..."}
                  </>
                ) : (
                  <>
                    <span>{loginMode === "signup" ? "Create Free Account" : "Secure Sign In"}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
              
              <div className="text-center text-xs mt-1 font-sans text-gray-400 select-none">
                {loginMode === "signup" ? (
                  <>Already have an account? <button type="button" onClick={() => { setLoginError(""); setLoginMode("login"); }} className="text-[#006ff0] hover:underline font-bold focus:outline-none ml-1 cursor-pointer">Sign in</button></>
                ) : (
                  <>New to Geosolvix? <button type="button" onClick={() => { setLoginError(""); setLoginMode("signup"); }} className="text-[#006ff0] hover:underline font-bold focus:outline-none ml-1 cursor-pointer">Create an account</button></>
                )}
              </div>
              
              <div className="flex flex-col gap-3.5 select-none pt-4 border-t border-[#1e293b]/50">
                <div className="flex items-center gap-2">
                  <div className="h-[1px] bg-[#1e293b] flex-grow" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">or connect credentials via</span>
                  <div className="h-[1px] bg-[#1e293b] flex-grow" />
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button type="button" onClick={() => handleSocialLogin("Google")} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#050811] hover:bg-[#1e293b]/40 border border-[#1e293b] hover:border-[#3b82f6]/55 transition-all text-xs font-semibold text-gray-300 hover:text-white cursor-pointer select-none">
                    <svg className="w-4 h-4 shrink-0 text-[#ea4335]" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1H12v2.7h5.38c-.24 1.28-.91 2.37-1.95 3.07v2.55h3.15c1.84-1.7 2.9-4.2 2.9-7.12 0-.41-.03-.82-.13-1.2z M12 21c2.43 0 4.47-.8 5.96-2.18l-3.15-2.55c-.87.58-1.99.93-3.14.93-2.42 0-4.47-1.64-5.2-3.84H3.22v2.64C4.7 19.16 8.1 21 12 21z M12 5.82c1.32 0 2.51.46 3.44 1.35l2.58-2.58C16.46 3.12 14.42 2.25 12 2.25c-3.9 0-7.3 1.84-8.78 4.79l3.43 2.64c.73-2.2 2.78-3.86 5.35-3.86z" /></svg> Google
                  </button>
                  <button type="button" onClick={() => handleSocialLogin("Apple")} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#050811] hover:bg-[#1e293b]/40 border border-[#1e293b] hover:border-white transition-all text-xs font-semibold text-gray-300 hover:text-white cursor-pointer select-none">
                    <svg className="w-4 h-4 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.23.67-2.95 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.97-1.39z" /></svg> Apple
                  </button>
                  <button type="button" onClick={() => handleSocialLogin("LinkedIn")} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#050811] hover:bg-[#1e293b]/40 border border-[#1e293b] hover:border-[#0284c7]/55 transition-all text-xs font-semibold text-gray-300 hover:text-white cursor-pointer select-none">
                    <svg className="w-4 h-4 shrink-0 text-[#0284c7]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> LinkedIn
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
