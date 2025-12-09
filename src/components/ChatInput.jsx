import React from 'react';
import { Send, X, FileText, Image } from 'lucide-react';

const ChatInput = ({
  darkMode,
  input,
  setInput,
  uploadedFiles = [],
  setUploadedFiles,
  sendMessage,
  handleKeyDown,
  showFileMenu,
  setShowFileMenu,
  fileMenuRef,
  fileInputRef,
  imageInputRef,
  handleFileUpload,
  textareaRef,
  isTyping
}) => {
  return (
    <div 
      className={`p-3 border-t ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      style={{ height: '130px' }}
    >
      {uploadedFiles && uploadedFiles.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1 max-h-12 overflow-y-auto">
          {uploadedFiles.map((file, idx) => (
            <div key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center gap-1">
              <span className="truncate max-w-[150px]">📎 {file.name}</span>
              <button onClick={() => setUploadedFiles && setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}>
                <X className="w-3 h-3 flex-shrink-0" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex gap-2 items-end">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileUpload && handleFileUpload(e, 'pdf')}
          accept="application/pdf"
          multiple
          className="hidden"
        />
        <input
          type="file"
          ref={imageInputRef}
          onChange={(e) => handleFileUpload && handleFileUpload(e, 'image')}
          accept="image/*"
          multiple
          className="hidden"
        />
        
        <div className="relative" ref={fileMenuRef}>
          <button
            onClick={() => setShowFileMenu && setShowFileMenu(!showFileMenu)}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <svg 
              className={`w-5 h-5 transition-transform ${showFileMenu ? 'rotate-45' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          
          {showFileMenu && (
            <div className={`absolute bottom-full left-0 mb-2 w-48 rounded-lg shadow-xl ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            } border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors rounded-t-lg ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Upload PDF</span>
              </button>
              <button
                onClick={() => imageInputRef.current?.click()}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors rounded-b-lg ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                <Image className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">Upload Image</span>
              </button>
            </div>
          )}
        </div>
        
        <textarea
          ref={textareaRef}
          value={input || ''}
          onChange={(e) => setInput && setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className={`flex-1 px-4 py-3 rounded-2xl focus:outline-none resize-none ${
            darkMode
              ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
              : 'bg-gray-100 text-gray-900 placeholder-gray-500'
          }`}
          style={{ maxHeight: '100px', minHeight: '48px' }}
        />
        <button
          onClick={sendMessage}
          disabled={(!input?.trim() && (!uploadedFiles || uploadedFiles.length === 0)) || isTyping}
          className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;