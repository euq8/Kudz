import React from "react";
import Chatbot from "react-chatbot-kit";
import { makeStyles } from '@material-ui/core/styles'
import { createChatBotMessage } from "react-chatbot-kit";
// import "./Bot.css";
// import "./StyleLearningOptions.css";
// import "./StyleLinkList.css";


const useStyles = makeStyles(theme => ({
  bot: {
    textAlign: "center",
  },
  botHeader: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "#769ddb",
  },
  botLink: {
    color: "#61dafb",
  },
  learningOptionsContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  learningOptionButton: {
    padding: "0.5rem",
    borderRadius: "25px",
    background: "transparent",
    border: "1px solid green",
    margin: "3px",
  },
  linkList: {
    padding: 0,
  },
  linkListItem: {
    textAlign: "left",
    fontSize: "0.9rem",
  },
  linkListItemUrl: {
    textDecoration: "none",
    margin: "6px",
    display: "block",
    color: "#1d1d1d",
    backgroundColor: "#f1f1f1",
    padding: "8px",
    borderRadius: "3px",
    boxShadow: "2px 2px 4px rgba(150, 149, 149, 0.4)",
  },
}))


const LearningOptions = (props) => {
  const classes = useStyles()
  const options = [
    {
      text: "Covid-19",
      handler: props.actionProvider.handleJavascriptList,
      id: 1,
    },
    { text: "Fever", handler: () => {}, id: 2 },
    { text: "Lost Taste", handler: () => {}, id: 3 },
    { text: "Body Pain", handler: () => {}, id: 4 },
    { text: "Dry Cough", handler: () => {}, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className={classes.learningOptionButton}
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className={classes.learningOptionsContainer}>{optionsMarkup}</div>;
};


const LinkList = (props) => {
  const classes = useStyles()
  console.log(props);
  const linkMarkup = props.options.map((link) => (
    <li key={link.id} className={classes.linkListItem}>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.linkListItemUrl}
      >
        {link.text}
      </a>
    </li>
  ));

  return <ul className={classes.linkList}>{linkMarkup}</ul>;
};

const config = {
  botName: "Covid-19 Query Chat-bot",
  initialMessages: [
    createChatBotMessage("Hi, I'm here to help. Please select one of the below.", {
      widget: "learningOptions",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Introduction to JS",
            url:
              "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
            id: 1,
          },
          {
            text: "Mozilla JS Guide",
            url:
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          {
            text: "Frontend Masters",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ],
      },
    },
  ],
};

// MessageParser starter code in MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    }

    if (lowerCaseMessage.includes("javascript")) {
      this.actionProvider.handleJavascriptList();
    }
  }
}

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // new method
  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.");
    this.updateChatbotState(greetingMessage);
  }

  handleJavascriptList() {
    const message = this.createChatBotMessage(
      "Fantastic, I've got the following resources for you on Javascript:",
      {
        widget: "javascriptLinks",
      }
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}


function Covid19QueryBot() {
  const classes = useStyles();
  return (
    <div className={classes.bot}>
      <header classes={classes.botHeader}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </header>
    </div>
  );
}

export default Covid19QueryBot;