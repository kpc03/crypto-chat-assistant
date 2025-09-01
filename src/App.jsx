import React, { useState, useEffect } from 'react';
import logo from '../public/chat-assistant.png';
import masterList from './data/masterList';

function App() {
  const [inputText, setInputText] = useState('');
  const [userMessages, setUserMessages] = useState([]); 
  

  useEffect(() => {
    const savedMessage = localStorage.getItem('userMessages');
    if(savedMessage){
      setUserMessages(JSON.parse(savedMessage));
    }
  }, []);

  useEffect(() => {
    if (userMessages.length > 0) {
      localStorage.setItem('userMessages', JSON.stringify(userMessages));
    }
  }, [userMessages])
  

  const handleUserMessage = () => {
    if(inputText.trim()){
      const newMessage = {
        sender: 'user',
        text: inputText.trim(),
        time: new Date().toLocaleTimeString()
      }
      const updatedMessaged = [...userMessages, newMessage];
      setUserMessages(updatedMessaged);
      setInputText('');

      // call keyword extractor
      const userQuery = newMessage.text.toLowerCase();
      const keywords = extractKeywords(userQuery);
      handleIntent(keywords);
    }
  }

  const extractKeywords = (userQuery) => {
    console.log('k: ', userQuery);
    const intent = masterList.find((item) => {
      return item.keywords.some((keyword) => userQuery.includes(keyword));
    })?.intent;
    console.log('intent: ', intent);
  }

  const handleIntent = (uq) => {
    console.log('uq: ', uq);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleUserMessage();
    }
  }

  console.log('userMessages: ', userMessages);

  return (
    <main>
      <header>
        <h1>Crypto Chat Assistant</h1>
        <img src={logo} alt="" height="50px"/>
      </header>

      <section id="chat-window">
        {userMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            <p className="message-text">{msg.text}</p>
            <span className="message-time">{msg.time}</span>
          </div>
        ))}
      </section>

      <footer>
        <button>🎤</button>
        <input 
          type='text'
          value={inputText}
          placeholder="Type your message..." 
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown} />
        <button onClick={handleUserMessage}>➤</button>
      </footer>
    </main>
  )
}

export default App