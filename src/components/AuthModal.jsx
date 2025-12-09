import React from 'react';

const AuthModal = ({ darkMode, setShowAuthModal, setShowWelcomeAuth, setAuthMode }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Sign in to continue
        </h3>
        <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          You've used your 3 free questions. Sign in to get more access!
        </p>
        
        <button
          onClick={() => {
            setShowAuthModal(false);
            setShowWelcomeAuth(true);
            setAuthMode('login');
          }}
          className="w-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium mb-3"
        >
          Sign In
        </button>
        
        <button
          onClick={() => {
            setShowAuthModal(false);
            setShowWelcomeAuth(true);
            setAuthMode('signup');
          }}
          className="w-full bg-white border-2 border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-all font-medium"
        >
          Create Account
        </button>
        
        <button
          onClick={() => setShowAuthModal(false)}
          className={`w-full mt-4 py-2 rounded-xl ${
            darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;