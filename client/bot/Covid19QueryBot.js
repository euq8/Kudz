import React from "react";
import Chatbot from "react-chatbot-kit";

import config from "./botUtils/chatbotConfig";
import MessageParser from "./botUtils/MessageParser";
import ActionProvider from "./botUtils/ActionProvider";


function Covid19QueryBot() {
  return (
    <div className="Covid19QueryBot">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default Covid19QueryBot;