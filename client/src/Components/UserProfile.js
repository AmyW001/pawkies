import React, { useState, useEffect, useRef } from "react";
import Talk from "talkjs";
import userheaderphoto from "../Images/userheaderphoto.jpeg";

export default function UserProfile({ sessionProps }) {
  const [user, setUser] = useState();
  const [prepareChat, setprepareChat] = useState({
    user_name: "",
  });
  const [primaryChatUser, setPrimaryChatUser] = useState();
  const [error, setError] = useState("");
  const chatboxEl = useRef();

  useEffect(() => {
    console.log(sessionProps);
    const loadPage = async (e) => {
      try {
        let response = await fetch(window.location.pathname, {
          method: "GET",
        });
        if (response.ok) {
          let data = await response.json();
          setUser(data[0]);
        } else {
          console.log(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      } catch (err) {
        console.log(`Network error:", err.message`);
      }
    };

    loadPage();
  }, []);

  const handleInputChange = (event) => {
    // handle key presses
    const value = event.target.value;
    const name = event.target.name;

    setprepareChat((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("/login/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: prepareChat.user_name,
        }),
      });
      if (response.ok) {
        let data = await response.json();
        console.log("user prepared!", data);
        setPrimaryChatUser(data[0]);
      } else {
        setError(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError("Network error:", err.message);
    }

    return null;
  };

  const startInbox = () => {
    Talk.ready.then(() => {
      const currentUser = new Talk.User({
        id: sessionProps[0].user_Id,
        name: sessionProps[0].user_name,
        email: sessionProps[0].user_email,
        photoUrl: "henry.jpeg",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tmpyzQVy",
        me: currentUser,
      });

      // After `Talk.ready`
      const otherUser = new Talk.User({
        id: user.user_Id,
        name: user.user_name,
        email: user.user_email,
        photoUrl: "jessica.jpeg",
        role: "default",
      });

      const conversationID = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationID);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const inbox = session.createInbox();
      inbox.select(conversation);
      inbox.mount(chatboxEl.current);

      // const chatbox = session.createChatbox();
      // chatbox.select(conversation);
      // chatbox.mount(chatboxEl.current);
    });
  };

  const startChat = () => {
    console.log(primaryChatUser);
    console.log(user);
    Talk.ready.then(() => {
      const currentUser = new Talk.User({
        id: primaryChatUser.user_Id,
        name: primaryChatUser.user_name,
        email: primaryChatUser.user_email,
        photoUrl: "henry.jpeg",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tmpyzQVy",
        me: currentUser,
      });

      // After `Talk.ready`
      const otherUser = new Talk.User({
        id: user.user_Id,
        name: user.user_name,
        email: user.user_email,
        photoUrl: "jessica.jpeg",
        role: "default",
      });

      console.log(currentUser, otherUser);

      const conversationID = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationID);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const inbox = session.createInbox();
      inbox.select(conversation);
      inbox.mount(chatboxEl.current);

      // const chatbox = session.createChatbox();
      // chatbox.select(conversation);
      // chatbox.mount(chatboxEl.current);
    });
  };

  return (
    <div>
      {user && (
        <div className="user-main-div">
          <div className="user-header-image-div">
            <img className="user-header-image" src={userheaderphoto}></img>
          </div>

          <img
            className="user-img"
            src="https://images.unsplash.com/photo-1595314544137-1b106b06e2c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          ></img>

          <div>
            <h1 className="user-header">Hi! My name is {user.user_name}!</h1>

            <div className="user-second-div">
              <h3>
                <u>I'm based in {user.location}</u>
              </h3>
            </div>

            <div className="container dog-info-div m-5 w-75">
              <div className="row shadow p-5 mb-5 bg-white rounded">
                <div className="col-6 ">
                  <h2 className="user-header-2">
                    My dog is {user.user_dog_name}
                  </h2>
                  <p>
                    More about {user.user_dog_name}: {user.user_dog_description}
                  </p>
                </div>

                <div className="col-6">
                  <img
                    className="user-dog-image"
                    src="https://images.unsplash.com/photo-1554020997-47f84383f66a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {sessionProps.length >= 1 ? (
        <div className="user-main-div">
          <button
            type="button"
            className="btn btn-lg btn-outline-success message-button m-3"
            onClick={startInbox}
          >
            View My Inbox
          </button>
        </div>
      ) : (
        !primaryChatUser && (
          <div className="user-main-div">
            <p> Get in touch to organise a meet up or group walk.</p>
            <form>
              <label for="username">Enter your username to start a chat!</label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                value={prepareChat.user_name}
                onChange={(e) => handleInputChange(e)}
              />
              <button
                className="btn btn-m btn-outline-success message-button m-3"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </form>
          </div>
        )
      )}
      {primaryChatUser && (
        <div className="user-main-div">
          <button
            className="btn btn-m btn-outline-success message-button m-3"
            onClick={startChat}
          >
            Start Chatting
          </button>
        </div>
      )}
      <div className="chatbox-div" ref={chatboxEl}></div>;
      <div className="m-1">
        <h3>My walks: (walk cards imported here)</h3>
      </div>
    </div>
  );
}
