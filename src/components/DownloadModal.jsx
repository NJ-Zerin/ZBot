// ============================================
// FILE: src/components/DownloadModal.jsx - UPDATED
// ============================================
import React from 'react';
import { FileText, FileJson, FileCode, Table, Download } from 'lucide-react';

const DownloadModal = ({
  darkMode,
  downloadFileName,
  setDownloadFileName,
  downloadFormat,
  setDownloadFormat,
  confirmDownload,
  setShowDownloadModal
}) => {
  const formatOptions = [
    { value: 'txt', label: 'Plain Text (.txt)', icon: FileText, description: 'Simple text format' },
    { value: 'md', label: 'Markdown (.md)', icon: FileCode, description: 'Formatted markdown' },
    { value: 'json', label: 'JSON (.json)', icon: FileJson, description: 'Structured data' },
    { value: 'html', label: 'HTML (.html)', icon: FileCode, description: 'Web page format' },
    { value: 'csv', label: 'CSV (.csv)', icon: Table, description: 'Spreadsheet format' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-lg w-full rounded-2xl p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Download Chat
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Export your conversation
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              File Name
            </label>
            <input
              type="text"
              value={downloadFileName}
              onChange={(e) => setDownloadFileName(e.target.value)}
              placeholder="Enter filename"
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Export Format
            </label>
            <div className="space-y-2">
              {formatOptions.map((format) => {
                const IconComponent = format.icon;
                return (
                  <button
                    key={format.value}
                    onClick={() => setDownloadFormat(format.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      downloadFormat === format.value
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : darkMode
                          ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      downloadFormat === format.value
                        ? 'bg-purple-500 text-white'
                        : darkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${
                        downloadFormat === format.value
                          ? 'text-purple-700 dark:text-purple-300'
                          : darkMode
                            ? 'text-gray-200'
                            : 'text-gray-800'
                      }`}>
                        {format.label}
                      </p>
                      <p className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {format.description}
                      </p>
                    </div>
                    {downloadFormat === format.value && (
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={confirmDownload}
            className="flex-1 bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
          <button
            onClick={() => setShowDownloadModal(false)}
            className={`flex-1 py-3 rounded-lg ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors font-medium`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;