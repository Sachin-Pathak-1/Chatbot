import {useState} from 'react'
import {Chatbot} from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';
import dayjs from 'dayjs'
import './ChatInput.css';

export function ChatInput({chatMessages,setChatMessages}) {

    const [inputText , setInputText] = useState('');

     function saveInputText(event) {
        setInputText(event.target.value);
     }

     function handleKeyDown(event) {
        if (event.key === 'Enter') {
                sendMessage();
            }
        if (event.key === 'Escape') {
                setInputText('');
            }
        }

    async function sendMessage() {
        if(inputText === ''){
            return;
        }

        setInputText('')
        const newChatMessages=[
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                id: crypto.randomUUID(),
                time:dayjs().valueOf()
            }
        ]
        setChatMessages([
            ...newChatMessages,
            {
                message: <img className="loading-spinner" src={LoadingSpinner}/> ,
                sender:'robot',
                id: crypto.randomUUID()
            }]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: "robot",
                id: crypto.randomUUID(),
                time:dayjs().valueOf()

            }
        ]); 
    }

    function clearMessage() {
        setChatMessages([]);
    }

    return(
        <div className="chat-input-container">
            <input 
                className="chat-input"
                placeholder="Send a message to ChatBot" 
                size="30" 
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                value= {inputText}
            />
            <button className="send-button" onClick={sendMessage} >
                Send
            </button>
            <button className='clear-button' onClick={clearMessage}>
                Clear
            </button>
        </div>
    );
}