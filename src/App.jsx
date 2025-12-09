import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import WelcomeAuth from './components/WelcomeAuth';
import WelcomeScreen from './components/WelcomeScreen';
import ChatWindow from './components/ChatWindow';
import AuthModal from './components/AuthModal';
import DownloadModal from './components/DownloadModal';

const App = () => {
  const GREETING = "Hey there 👋\nHow can I help you today?";
  
  // Load stored users or initialize empty array
  const [storedUsers, setStoredUsers] = useState(() => {
    const saved = localStorage.getItem('zbotUsers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING, timestamp: new Date().toISOString() }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [downloadFileName, setDownloadFileName] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('txt');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [showWelcomeAuth, setShowWelcomeAuth] = useState(true);
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);
  
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileMenuRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
        setShowFileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
    }
  }, [input]);

  const handleAuthFormChange = (field, value) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('zbotUsers', JSON.stringify(users));
    setStoredUsers(users);
  };

  const handleGoogleAuth = () => {
    const mockUser = {
      name: 'Google User',
      email: 'user@gmail.com',
      provider: 'google',
      verified: true,
      createdAt: new Date().toISOString()
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setShowWelcomeAuth(false);
    setQuestionCount(0);
    
    if (!hasLoggedInBefore) {
      const welcomeMessage = {
        role: 'assistant',
        content: `Welcome ${mockUser.name}! 🎉 You're now signed in with Google. You can now chat unlimited!`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, welcomeMessage]);
      setHasLoggedInBefore(true);
    }
  };

  const handleAuthSubmit = () => {
    if (authMode === 'signup') {
      // Signup validation
      if (!authForm.name || !authForm.email || !authForm.password) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (!validateEmail(authForm.email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      if (verificationMethod === 'phone' && authForm.phone && !validatePhone(authForm.phone)) {
        alert('Please enter a valid phone number');
        return;
      }
      
      if (authForm.password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
      
      if (authForm.password !== authForm.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // Check if user already exists
      const userExists = storedUsers.find(u => u.email === authForm.email);
      if (userExists) {
        alert('User with this email already exists. Please login instead.');
        setAuthMode('login');
        return;
      }
      
      setShowVerification(true);
      alert(`Verification code sent to your ${verificationMethod}: ${verificationMethod === 'email' ? authForm.email : authForm.phone}\n\nFor demo purposes, use code: 123456`);
    } else {
      // Login validation
      if (!authForm.email || !authForm.password) {
        alert('Please enter email and password');
        return;
      }

      // Find user in stored users
      const foundUser = storedUsers.find(u => u.email === authForm.email);
      
      if (!foundUser) {
        alert('No account found with this email. Please sign up first.');
        return;
      }

      if (foundUser.password !== authForm.password) {
        alert('Incorrect password. Please try again.');
        return;
      }
      
      completeAuth(false, foundUser);
    }
  };

  const handleVerificationSubmit = () => {
    if (verificationCode === '123456') {
      completeAuth(true, null);
    } else {
      alert('Invalid verification code. Please use: 123456');
    }
  };

  const completeAuth = (isNewUser, existingUser = null) => {
    let newUser;

    if (existingUser) {
      // Login with existing user
      newUser = existingUser;
    } else {
      // Create new user
      newUser = {
        id: Date.now().toString(),
        name: authForm.name,
        email: authForm.email,
        phone: authForm.phone,
        password: authForm.password,
        provider: 'email',
        verified: authMode === 'signup',
        createdAt: new Date().toISOString()
      };

      // Save new user to storage
      const updatedUsers = [...storedUsers, newUser];
      saveUsers(updatedUsers);
    }

    setUser(newUser);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setShowWelcomeAuth(false);
    setShowVerification(false);
    setQuestionCount(0);
    
    const welcomeMessage = {
      role: 'assistant',
      content: `Welcome back ${newUser.name}! 🎉 You're now ${isNewUser ? 'registered and' : ''} signed in. You can now chat unlimited!`,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, welcomeMessage]);
    setHasLoggedInBefore(true);
    
    // Clear form
    setAuthForm({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setVerificationCode('');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear all user data
      setIsAuthenticated(false);
      setUser(null);
      setQuestionCount(0);
      setHasLoggedInBefore(false);
      
      // Reset to initial greeting
      const logoutMessage = {
        role: 'assistant',
        content: 'You have been logged out successfully. You can ask 3 free questions or sign in again for unlimited access.',
        timestamp: new Date().toISOString()
      };
      
      setMessages([
        { role: 'assistant', content: GREETING, timestamp: new Date().toISOString() },
        logoutMessage
      ]);

      // Close chat window
      setIsOpen(false);
      
      // Show welcome auth screen
      setShowWelcomeAuth(true);
    }
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (type === 'pdf') {
        return file.type === 'application/pdf';
      } else {
        return file.type.startsWith('image/');
      }
    });

    if (validFiles.length > 0) {
      const fileInfos = validFiles.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
      }));
      
      setUploadedFiles(prev => [...prev, ...fileInfos]);
      setShowFileMenu(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && uploadedFiles.length === 0) return;

    if (!isAuthenticated && questionCount >= 3) {
      setShowAuthModal(true);
      return;
    }

    const userMessage = {
      role: 'user',
      content: input || '📎 Sent files',
      timestamp: new Date().toISOString(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setUploadedFiles([]);
    setIsTyping(true);

    if (!isAuthenticated) {
      setQuestionCount(prev => prev + 1);
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: userMessage.content
            }
          ],
        })
      });

      const data = await response.json();
      
      let responseContent = '';
      if (data.content && data.content.length > 0) {
        responseContent = data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n');
      } else {
        responseContent = "I received your message but couldn't generate a proper response.";
      }
      
      if (!isAuthenticated) {
        const remaining = 3 - questionCount;
        if (remaining > 0) {
          responseContent += `\n\n⚠️ You have ${remaining} question${remaining > 1 ? 's' : ''} remaining. Sign in for unlimited access!`;
        } else {
          responseContent += `\n\n⚠️ This was your last free question. Please sign in to continue!`;
        }
      }

      if (userMessage.files) {
        responseContent += `\n\n📎 Files received: ${userMessage.files.map(f => f.name).join(', ')}`;
      }
      
      const assistantMessage = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to the AI service. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openDownloadModal = () => {
    const defaultName = `zbot_chat_${new Date().toISOString().split('T')[0]}`;
    setDownloadFileName(defaultName);
    setShowDownloadModal(true);
  };

  const confirmDownload = () => {
    let content = '';
    let mimeType = 'text/plain';
    let extension = downloadFormat;

    switch(downloadFormat) {
      case 'txt':
        content = messages.map(m => 
          `${m.role === 'user' ? 'You' : 'ZBot'} (${new Date(m.timestamp).toLocaleString()}):\n${m.content}\n\n`
        ).join('');
        mimeType = 'text/plain';
        break;

      case 'md':
        content = messages.map(m => 
          `## ${m.role === 'user' ? 'You' : 'ZBot'} (${new Date(m.timestamp).toLocaleString()})\n\n${m.content}\n\n---\n\n`
        ).join('');
        mimeType = 'text/markdown';
        break;

      case 'json':
        content = JSON.stringify({
          exportDate: new Date().toISOString(),
          user: isAuthenticated ? { name: user?.name, email: user?.email } : 'Guest',
          messages: messages
        }, null, 2);
        mimeType = 'application/json';
        break;

      case 'html':
        content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZBot Chat Export</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
    .message { margin: 15px 0; padding: 15px; border-radius: 10px; }
    .user { background: #e3f2fd; text-align: right; }
    .assistant { background: #fff; }
    .timestamp { font-size: 0.8em; color: #666; margin-top: 5px; }
    h1 { color: #7c3aed; }
  </style>
</head>
<body>
  <h1>ZBot Chat Export</h1>
  <p>Exported on: ${new Date().toLocaleString()}</p>
  ${messages.map(m => `
    <div class="message ${m.role}">
      <strong>${m.role === 'user' ? 'You' : 'ZBot'}:</strong>
      <p>${m.content.replace(/\n/g, '<br>')}</p>
      <div class="timestamp">${new Date(m.timestamp).toLocaleString()}</div>
    </div>
  `).join('')}
</body>
</html>`;
        mimeType = 'text/html';
        break;

      case 'csv':
        content = 'Role,Content,Timestamp\n' + messages.map(m => 
          `"${m.role}","${m.content.replace(/"/g, '""')}","${new Date(m.timestamp).toLocaleString()}"`
        ).join('\n');
        mimeType = 'text/csv';
        break;

      default:
        content = messages.map(m => 
          `${m.role === 'user' ? 'You' : 'ZBot'} (${new Date(m.timestamp).toLocaleString()}):\n${m.content}\n\n`
        ).join('');
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${downloadFileName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowDownloadModal(false);
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
      const initialMessage = { 
        role: 'assistant', 
        content: GREETING, 
        timestamp: new Date().toISOString() 
      };
      setMessages([initialMessage]);
      setUploadedFiles([]);
      setInput('');
      
      // Show success message temporarily
      const successMsg = {
        role: 'assistant',
        content: '✅ Chat history has been cleared successfully!',
        timestamp: new Date().toISOString()
      };
      setMessages([initialMessage, successMsg]);
      
      // Remove success message after 3 seconds
      setTimeout(() => {
        setMessages([initialMessage]);
      }, 3000);
    }
  };

  return (
    <>
      {showWelcomeAuth && !isAuthenticated && (
        <WelcomeAuth
          darkMode={darkMode}
          authMode={authMode}
          setAuthMode={setAuthMode}
          showVerification={showVerification}
          authForm={authForm}
          handleAuthFormChange={handleAuthFormChange}
          verificationMethod={verificationMethod}
          setVerificationMethod={setVerificationMethod}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleGoogleAuth={handleGoogleAuth}
          handleAuthSubmit={handleAuthSubmit}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleVerificationSubmit={handleVerificationSubmit}
          setShowVerification={setShowVerification}
          setShowWelcomeAuth={setShowWelcomeAuth}
        />
      )}

      <div className={isOpen ? 'blur-sm pointer-events-none' : ''}>
        <WelcomeScreen 
          darkMode={darkMode}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </button>

      {isOpen && (
        <ChatWindow
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          openDownloadModal={openDownloadModal}
          clearChat={clearChat}
          isAuthenticated={isAuthenticated}
          user={user}
          questionCount={questionCount}
          handleLogout={handleLogout}
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
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
        />
      )}

      {showAuthModal && !showWelcomeAuth && (
        <AuthModal
          darkMode={darkMode}
          setShowAuthModal={setShowAuthModal}
          setShowWelcomeAuth={setShowWelcomeAuth}
          setAuthMode={setAuthMode}
        />
      )}

      {showDownloadModal && (
        <DownloadModal
          darkMode={darkMode}
          downloadFileName={downloadFileName}
          setDownloadFileName={setDownloadFileName}
          downloadFormat={downloadFormat}
          setDownloadFormat={setDownloadFormat}
          confirmDownload={confirmDownload}
          setShowDownloadModal={setShowDownloadModal}
        />
      )}
    </>
  );
};

export default App;