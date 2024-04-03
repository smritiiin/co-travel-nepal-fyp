"use client";

import { Conversation } from "@/app/components/chat/Conversation";
import { Message } from "@/app/components/chat/Message";
import "./messenger.css";
import { Button, Textarea } from "@nextui-org/react";
import ChatProfile from "@/app/components/chat/ChatProfile";
import { useToken } from "@/utils/token";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Messenger = () => {
  const { getUsernameAndRoleFromToken } = useToken();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef(); 

  const { id } = getUsernameAndRoleFromToken("x-access-token");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/conversation/" + id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [id]);

  console.log("CURRENT CHAT", currentChat?.id);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get(
            `http://localhost:8000/api/message/${currentChat?.id}`
          );
          setMessages(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

useEffect(()=>{
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages])

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const message = {
      SenderId: id,
      Text: newMessage,
      ConversationId: currentChat.id,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/message/new",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />

            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={id} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m: any) => (
                    <div ref={scrollRef}> 
                      <Message message={m} own={m.SenderUserId === id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <Textarea
                    placeholder="Enter your message"
                    minRows={2}
                    size="sm"
                    onChange={(e: any) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></Textarea>
                  <Button color="primary" onClick={sendMessage}>
                    Send
                  </Button>
                </div>
              </>
            ) : (
              <p className=" absolute top-10 text-3xl font-semibold text-center cursor-default text-gray-300 ">
                Open a chat to start messaging.
              </p>
            )}
          </div>
        </div>
        <div className="chatProfile">
          <div className="chatProfileWrapper">
            <ChatProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
