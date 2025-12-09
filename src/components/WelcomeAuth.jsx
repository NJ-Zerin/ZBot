import React from 'react';
import { Bot, Mail, Phone, Eye, EyeOff } from 'lucide-react';

const WelcomeAuth = ({
  darkMode,
  authMode,
  setAuthMode,
  authForm,
  handleAuthFormChange,
  showPassword,
  setShowPassword,
  verificationMethod,
  setVerificationMethod,
  showVerification,
  verificationCode,
  setVerificationCode,
  handleGoogleAuth,
  handleAuthSubmit,
  handleVerificationSubmit,
  setShowVerification,
  setShowWelcomeAuth
}) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
    }`}>
      <div className={`max-w-md w-full rounded-2xl p-8 shadow-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-4">
            <Bot className="w-12 h-12 text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Welcome to ZBot
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your AI Study Assistant
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              authMode === 'login'
                ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              authMode === 'signup'
                ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {!showVerification ? (
          <div className="space-y-4">
            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                  Or continue with email
                </span>
              </div>
            </div>

            {authMode === 'signup' && (
              <input
                type="text"
                placeholder="Full Name *"
                value={authForm.name}
                onChange={(e) => handleAuthFormChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            )}

            <input
              type="email"
              placeholder="Email Address *"
              value={authForm.email}
              onChange={(e) => handleAuthFormChange('email', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />

            {authMode === 'signup' && (
              <>
                <div>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => setVerificationMethod('email')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-2 ${
                        verificationMethod === 'email'
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Mail className="w-4 h-4" /> Email
                    </button>
                    <button
                      onClick={() => setVerificationMethod('phone')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-2 ${
                        verificationMethod === 'phone'
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Phone className="w-4 h-4" /> Phone
                    </button>
                  </div>
                  {verificationMethod === 'phone' && (
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={authForm.phone}
                      onChange={(e) => handleAuthFormChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  )}
                </div>
              </>
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password *"
                value={authForm.password}
                onChange={(e) => handleAuthFormChange('password', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border pr-12 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            {authMode === 'signup' && (
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password *"
                value={authForm.confirmPassword}
                onChange={(e) => handleAuthFormChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            )}

            <button
              onClick={handleAuthSubmit}
              className="w-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
            >
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </button>

            <button
              onClick={() => setShowWelcomeAuth(false)}
              className={`w-full py-2 rounded-lg text-sm ${
                darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              Continue as Guest (3 free questions)
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Enter the verification code sent to your {verificationMethod}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Demo code: 123456
              </p>
            </div>
            
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              className={`w-full px-4 py-3 rounded-lg border text-center text-2xl tracking-widest ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />

            <button
              onClick={handleVerificationSubmit}
              className="w-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Verify & Complete Registration
            </button>

            <button
              onClick={() => setShowVerification(false)}
              className={`w-full py-2 rounded-lg text-sm ${
                darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeAuth;