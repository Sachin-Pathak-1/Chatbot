
import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import dayjs from 'dayjs';
import './ChatMessage.css';

export function ChatMessage ({message , sender , time}) {
    return(
        <div class={sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'}>
            {sender === 'robot' && 
            <img src={RobotProfileImage}
            className="chat-message-profile"/>}

            <div className="chat-message-text">
                {message}
                {time && (
                    <div className="chat-message-time">
                        {dayjs(time).format('hh:mma')}
                    </div>
                )}
            </div>

            {sender === 'user' && <img src={UserProfileImage}
            className="chat-message-profile"/> }
        </div>
    );
}
