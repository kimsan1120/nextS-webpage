"use client";

import React, { useState } from "react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userText, setUserText] = useState(""); // 사용자 메시지를 위한 상태
  const [adminText, setAdminText] = useState(""); // 관리자 메시지를 위한 상태
  const [chatMessages, setChatMessages] = useState([]);

  const getMessageClass = (type) => {
    return type === "admin" ? "bg-gray-300" : "bg-blue-300 ml-auto";
  };

  // 입력 필드의 변화를 처리하는 함수
  const handleChange = (event, isUser = true) => {
    isUser ? setUserText(event.target.value) : setAdminText(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  // 메시지 전송 함수
  const handleSendMessage = (isUser = true) => {
    const text = isUser ? userText : adminText;
    if (text) {
      const type = isUser ? "user" : "admin";
      setChatMessages([...chatMessages, { text, type }]);
      isUser ? setUserText("") : setAdminText("");
    }
  };

  // 메시지 내용을 .txt 파일로 저장하는 함수
  const saveMessagesToFile = () => {
    const combinedMessages = chatMessages.map(msg => `${msg.type.toUpperCase()}: ${msg.text}`).join('\n');
    const blob = new Blob([combinedMessages], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-messages.txt';
    a.click();

    URL.revokeObjectURL(url);
  };


  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button className="bg-blue-500 mx-5 my-5 text-white p-7 rounded-full focus:outline-none hover:bg-blue-700" 
        onClick={() => {setIsOpen(true);
          saveMessagesToFile();
        }}
        

        >
          <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" stroke-width="1.5" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </button>
      )}
      {isOpen && (
        <div className="flex flex-col mt-2 p-0 w-[600px] min-h-[500px] bg-white rounded-lg shadow-lg">
          <div class="p-6 m-3 flex justify-between">
            <h2 class="font-semibold text-lg">Chatbot</h2>

            {/* 닫기 버튼 */}
            <button onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 닫기 버튼 */}
          </div>
          {/* <div className="mb-5 mt-2 mx-1 max-h-[300px] overflow-y-auto"> */}
          <div className="flex-grow overflow-y-auto mb-2 mx-5 max-h-[300px]">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex my-1 p-4 text-gray-600 text-sm ${msg.type === "user" ? "justify-end" : ""}`}>
                <p className={`leading-relaxed ${msg.type === "admin" ? "text-left" : "text-right"}`}>
                  <span className="block font-bold text-gray-700">{msg.type === "admin" ? "Admin" : "User"}</span>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <div className="px-9 gap-2">
            <div className="flex-shrink-0 flex items-center pt-0">
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value={userText}
                onChange={(e) => handleChange(e, true)}
                style={{ overflow: "hidden" }}
              />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2" onClick={() => handleSendMessage(true)}>
                SendU
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center pt-0">
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Admin message"
                value={adminText}
                onChange={(e) => handleChange(e, false)}
                style={{ overflow: "hidden" }}
              />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2" onClick={() => handleSendMessage(false)}>
                SendA
              </button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default ChatBox;








