import { useEffect, useState } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';

import './App.css'

function App() {
    const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) ||[]);

    useEffect(()=>{
        localStorage.setItem('messages',JSON.stringify(chatMessages))
    },[chatMessages]);

    useEffect(()=>{
        Chatbot.addResponses({
            'Goodbye': 'Good Bye , Have a great day!',
            'Give me an unique ID' : ()=>{
                return `Sure! Here's an unique ID : ${crypto.randomUUID()}`;
            },
            'Hii': 'Hello! , How can I help you?',
            'Hi': 'Hello! , How can I help you?'
        });
    },[]);

    return(
        <div className="app-container">

            {chatMessages.length === 0 &&
            (<p className="welcome-message">
                Welcome to Chatbot Project! Send a message using the textbox below
            </p>)}

            <ChatMessages chatMessages={chatMessages}/>

            <ChatInput 
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />

        </div>
    );
}

export default App
