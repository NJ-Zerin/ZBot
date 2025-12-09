import React from 'react';
import { Bot } from 'lucide-react';

const WelcomeScreen = ({ darkMode, isAuthenticated, user, isOpen }) => {
  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
    } ${isOpen ? 'blur-sm pointer-events-none' : ''} flex items-center justify-center p-4`}>
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <Bot className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Welcome to ZBot
        </h1>
        <p className={`text-lg md:text-xl mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Your AI Study Assistant with Real-time Responses
        </p>
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {isAuthenticated ? `Signed in as ${user?.name}` : '3 free questions, then sign in for unlimited access'}
        </p>
        <p className={`mt-6 text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Click the chat icon in the bottom-right to get started 💬
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;