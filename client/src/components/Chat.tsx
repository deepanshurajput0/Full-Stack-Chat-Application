import React, { useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([]);
  const { user } = useAuth()
  const socket: Socket = useMemo(
    () =>
      io("http://localhost:8000", {
        withCredentials: true,
      }),
    []
  );
 useEffect(() => {
  socket.on("connect", () => {
    console.log("Connected to server", socket.id);
    if (user?.id) {
      socket.emit("register", user.id);
    }
  });

  socket.on("receive_message", (message) => {
    console.log("Message received:", message);
    setMessages((prev) => [...prev, message]);
  });

  return () => {
    socket.off("connect");
    socket.off("receive_message");
    socket.disconnect();
  };
}, [socket, user?.id,id]); // depend on user.id


  function sendMessage (e:React.FormEvent){
     e.preventDefault()
      if (!message.trim()) return;
     socket.emit('send_message',{to:Number(id),text:message,from:user?.id})
     setMessage("");
   }
  return <div>

    <div className=" flex flex-col overflow-y-auto space-y-5 p-10">
        
  {
    messages.map((msg,i)=>(
          <div key={i} className={`chat-bubble ${msg.senderId === user?.id ? `chat-bubble-primary self-end` : `chat-bubble`}  `}>{msg.message}</div>
    ))
  }
  

    </div>
<div className=" justify-center p-5 mb-10 
 w-full">
    <form onSubmit={sendMessage} >
        <div className=" flex justify-evenly space-x-3 pt-11 ">
        <input 
        type="text" 
        className="input" 
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="type your message..." 
        list="browsers" /> 
   <button  type="submit" className="btn btn-active btn-primary">Send</button>
    </div>
</form>
</div>
  </div>;
};

export default Chat;
