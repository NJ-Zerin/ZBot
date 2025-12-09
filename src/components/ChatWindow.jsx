import React from 'react';
import { Moon, Sun, Download, Trash2, Bot, User, Send, X } from 'lucide-react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatWindow = ({
  darkMode,
  setDarkMode,
  openDownloadModal,
  clearChat,
  isAuthenticated,
  user,
  questionCount,
  handleLogout,
  messages,
  isTyping,
  messagesEndRef,
  uploadedFiles,
  setUploadedFiles,
  fileInputRef,
  imageInputRef,
  showFileMenu,
  setShowFileMenu,
  fileMenuRef,
  handleFileUpload,
  textareaRef,
  input,
  setInput,
  handleKeyDown,
  sendMessage
}) => {
  return (
    <div 
      className="fixed bottom-24 right-6 shadow-2xl rounded-2xl overflow-hidden z-40 flex flex-col"
      style={{ width: '400px', height: '650px' }}
    >
      {/* Header - Matches Input Border Color */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ height: '70px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <Bot className="w-6 h-6 text-purple-600" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-white font-bold text-lg truncate">ZBot</h2>
            <p className="text-purple-100 text-xs truncate">
              {isAuthenticated ? `${user?.name}` : `${3 - questionCount} questions left`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs text-white transition-colors"
            >
              Logout
            </button>
          )}
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-white" />
            ) : (
              <Moon className="w-4 h-4 text-white" />
            )}
          </button>
          
          <button
            onClick={openDownloadModal}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Download chat"
          >
            <Download className="w-4 h-4 text-white" />
          </button>
          
          <button
            onClick={clearChat}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Clear chat"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages - Flexible Height */}
      <div className="flex-1 overflow-hidden">
        <MessageList 
          darkMode={darkMode}
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Input - Fixed at Bottom, No Fixed Height */}
      <div className="flex-shrink-0">
        <ChatInput
          darkMode={darkMode}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          fileInputRef={fileInputRef}
          imageInputRef={imageInputRef}
          showFileMenu={showFileMenu}
          setShowFileMenu={setShowFileMenu}
          fileMenuRef={fileMenuRef}
          handleFileUpload={handleFileUpload}
          textareaRef={textareaRef}
          input={input}
          setInput={setInput}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default ChatWindow;