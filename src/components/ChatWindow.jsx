import React from 'react';
import { Bot, Moon, Sun, Download, Trash2 } from 'lucide-react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatWindow = ({
  darkMode,
  setDarkMode,
  isAuthenticated,
  user,
  questionCount,
  messages,
  isTyping,
  messagesEndRef,
  handleLogout,
  openDownloadModal,
  clearChat,
  input,
  setInput,
  uploadedFiles,
  setUploadedFiles,
  sendMessage,
  handleKeyDown,
  showFileMenu,
  setShowFileMenu,
  fileMenuRef,
  fileInputRef,
  imageInputRef,
  handleFileUpload,
  textareaRef
}) => {
  return (
    <div 
      className="fixed bottom-24 right-6 shadow-2xl rounded-2xl overflow-hidden z-40"
      style={{ width: '400px', height: '650px' }}
    >
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center justify-between" style={{ height: '70px' }}>
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
          >
            <Download className="w-4 h-4 text-white" />
          </button>
          
          <button
            onClick={clearChat}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <MessageList
        darkMode={darkMode}
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        sendMessage={sendMessage}
        handleKeyDown={handleKeyDown}
        showFileMenu={showFileMenu}
        setShowFileMenu={setShowFileMenu}
        fileMenuRef={fileMenuRef}
        fileInputRef={fileInputRef}
        imageInputRef={imageInputRef}
        handleFileUpload={handleFileUpload}
        textareaRef={textareaRef}
        isTyping={isTyping}
      />
    </div>
  );
};

export default ChatWindow;
