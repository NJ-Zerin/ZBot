import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, ChevronDown, X, FileText, Image, Bot, Moon, Sun, Download, Trash2, Maximize2 } from 'lucide-react';

const ChatInput = ({
  darkMode,
  uploadedFiles,
  setUploadedFiles,
  fileInputRef,
  imageInputRef,
  showFileMenu,
  setShowFileMenu,
  fileMenuRef,
  textareaRef,
  input,
  setInput,
  handleKeyDown,
  sendMessage,
  isTyping
}) => {
  const [selectedModel, setSelectedModel] = useState('Sonnet 4.5');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [filePreviews, setFilePreviews] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  
  const models = [
    { name: 'Sonnet 4.5', description: 'Most intelligent model' },
    { name: 'Sonnet 4', description: 'Balanced performance' },
    { name: 'Opus 4', description: 'Powerful reasoning' },
    { name: 'Haiku 4', description: 'Fast responses' }
  ];

  useEffect(() => {
    if (uploadedFiles.length === 0) {
      setFilePreviews([]);
      return;
    }

    const newPreviews = [];
    let loadedCount = 0;
    
    uploadedFiles.forEach((file, index) => {
      if (file.type && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews[index] = { url: reader.result, type: 'image', name: file.name };
          loadedCount++;
          if (loadedCount === uploadedFiles.length) {
            setFilePreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      } else {
        newPreviews[index] = { type: 'file', name: file.name };
        loadedCount++;
        if (loadedCount === uploadedFiles.length) {
          setFilePreviews(newPreviews);
        }
      }
    });
  }, [uploadedFiles]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150);
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [input]);

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;
    
    const validFiles = files.filter(file => {
      if (type === 'pdf') {
        return file.type === 'application/pdf';
      } else {
        return file.type.startsWith('image/');
      }
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      setShowFileMenu(false);
    }
    
    e.target.value = '';
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const openPreview = (preview) => {
    setPreviewFile(preview);
  };

  return (
    <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Full File Preview Modal */}
      {previewFile && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewFile(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute -top-10 right-0 w-10 h-10 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center text-gray-800 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            {previewFile.type === 'image' ? (
              <img 
                src={previewFile.url} 
                alt={previewFile.name}
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
              />
            ) : (
              <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <FileText className="w-32 h-32 text-purple-600 mx-auto mb-4" />
                <p className={`text-center text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {previewFile.name}
                </p>
                <p className={`text-center text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  PDF files cannot be previewed
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* File Previews - Above Input */}
      {uploadedFiles.length > 0 && (
        <div className="px-4 pt-4 pb-2" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex flex-wrap gap-3">
            {uploadedFiles.map((file, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-lg overflow-visible border-2 shadow-md cursor-pointer transition-transform hover:scale-105 ${
                  darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                }`}
                style={{ width: '100px', height: '100px' }}
                onClick={() => filePreviews[idx] && openPreview(filePreviews[idx])}
              >
                <div className="w-full h-full rounded-lg overflow-hidden">
                  {filePreviews[idx]?.type === 'image' && filePreviews[idx]?.url ? (
                    <>
                      <img 
                        src={filePreviews[idx].url} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute bottom-0 left-0 right-0 px-1.5 py-1 text-xs truncate ${
                        darkMode ? 'bg-black/80 text-gray-200' : 'bg-white/95 text-gray-800'
                      }`}>
                        {file.name}
                      </div>
                      <div className="absolute top-1 right-1 bg-purple-600 text-white rounded-full p-1">
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-2">
                      <FileText className="w-10 h-10 text-purple-600 mb-1" />
                      <p className={`text-xs text-center truncate w-full px-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {file.name}
                      </p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-2xl transition-all border-2 border-white"
                  style={{ zIndex: 10 }}
                  aria-label="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Container */}
      <div className="p-4" style={{ position: 'relative', zIndex: 2 }}>
        {/* Textarea - Full Width */}
        <div className={`mb-2 rounded-xl border ${
          darkMode 
            ? 'border-gray-600 bg-gray-700' 
            : 'border-gray-300 bg-gray-50'
        }`}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message ZBot..."
            rows={1}
            disabled={isTyping}
            className={`w-full px-4 py-3 rounded-xl focus:outline-none resize-none ${
              darkMode
                ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
                : 'bg-gray-50 text-gray-900 placeholder-gray-500'
            } ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ 
              maxHeight: '150px', 
              minHeight: '48px',
              lineHeight: '1.5'
            }}
          />
        </div>

        {/* Bottom Row: Plus + Model + Send */}
        <div className="flex items-center gap-2">
          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e, 'pdf')}
            accept="application/pdf"
            multiple
            className="hidden"
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleFileChange(e, 'image')}
            accept="image/*"
            multiple
            className="hidden"
          />
          
          {/* Plus Button (Attach) */}
          <div className="relative flex-shrink-0" ref={fileMenuRef}>
            <button
              onClick={() => setShowFileMenu(!showFileMenu)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                showFileMenu
                  ? 'bg-purple-600 text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
              aria-label="Attach files"
            >
              {showFileMenu ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            
            {/* File Upload Menu */}
            {showFileMenu && (
              <div 
                className={`absolute bottom-full left-0 mb-2 w-56 rounded-xl shadow-2xl border overflow-hidden ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-200'
                }`}
                style={{ zIndex: 100 }}
              >
                <div className={`px-3 py-2 border-b ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <p className={`text-xs font-semibold ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    ATTACH FILES
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                    setShowFileMenu(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-600 text-gray-200' 
                      : 'hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Upload PDF</p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Documents and files
                    </p>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    imageInputRef.current?.click();
                    setShowFileMenu(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-600 text-gray-200' 
                      : 'hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Image className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Upload Image</p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      PNG, JPG, GIF, etc.
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Model Selector - Flex Grows */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowModelMenu(!showModelMenu)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600' 
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              }`}
            >
              <span className="font-medium truncate">{selectedModel}</span>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>

            {showModelMenu && (
              <div 
                className={`absolute bottom-full left-0 right-0 mb-2 rounded-xl shadow-2xl border overflow-hidden ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-200'
                }`}
                style={{ zIndex: 100 }}
              >
                <div className={`px-3 py-2 border-b ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <p className={`text-xs font-semibold ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    SELECT MODEL
                  </p>
                </div>
                {models.map((model) => (
                  <button
                    key={model.name}
                    onClick={() => {
                      setSelectedModel(model.name);
                      setShowModelMenu(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between transition-colors text-left ${
                      selectedModel === model.name
                        ? darkMode ? 'bg-gray-600' : 'bg-gray-100'
                        : darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-medium ${
                        darkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {model.name}
                      </p>
                      <p className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {model.description}
                      </p>
                    </div>
                    {selectedModel === model.name && (
                      <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={(!input.trim() && uploadedFiles.length === 0) || isTyping}
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              (!input.trim() && uploadedFiles.length === 0) || isTyping
                ? darkMode 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105'
            }`}
            aria-label="Send message"
          >
            {isTyping ? (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;