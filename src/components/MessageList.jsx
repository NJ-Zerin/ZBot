import React from 'react';
import { Bot, User } from 'lucide-react';

const MessageList = ({ darkMode, messages, isTyping, messagesEndRef }) => {
  return (
    <div 
      className={`overflow-y-auto p-4 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}
      style={{ height: 'calc(650px - 70px - 130px)' }}
    >
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-2 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-br-sm'
                  : darkMode
                    ? 'bg-gray-700 text-gray-100 rounded-bl-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {message.content}
              </p>
              {message.files && (
                <div className="mt-2 text-xs opacity-75 space-y-1">
                  {message.files.map((file, idx) => (
                    <div key={idx} className="truncate">📄 {file.name}</div>
                  ))}
                </div>
              )}
              <p
                className={`text-xs mt-1 ${
                  message.role === 'user'
                    ? 'text-purple-100'
                    : darkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div
              className={`rounded-2xl rounded-bl-sm px-4 py-3 ${
                darkMode ? 'bg-gray-700' : 'bg-white shadow-sm'
              }`}
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
