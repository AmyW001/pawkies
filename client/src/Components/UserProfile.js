import React, { useState, useEffect, useRef } from "react";
import Talk from "talkjs";
import userheaderphoto from "../Images/userheaderphoto.jpeg";

export default function UserProfile({ sessionProps, usersProps }) {
  const [user, setUser] = useState();
  const chatboxEl = useRef();

  // const [error, setError] = useState("");

  useEffect(() => {
    const loadPage = async (e) => {
      console.log(sessionProps);
      try {
        let response = await fetch(`/user/${sessionProps.user_name}`, {
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

  useEffect(() => {
    //write something here which makes a call to the database to fetch the user's uploaded walks
    //then display below
  }, []);

  const startChat = (e, selectedUser) => {
    //setUser(selectedUser);
    console.log(selectedUser === null);
    console.log(sessionProps, "*******");
    Talk.ready
      .then(() => {
        const currentUser = new Talk.User({
          id: sessionProps.user_Id,
          name: sessionProps.user_name,
          email: sessionProps.user_email,
          photoUrl: "henry.jpeg",
          role: "default",
        });

        const session = new Talk.Session({
          appId: "tmpyzQVy",
          me: currentUser,
        });

        // After `Talk.ready`
        const otherUser = new Talk.User({
          id: selectedUser.user_Id,
          name: selectedUser.user_name,
          email: selectedUser.user_email,
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
      })
      .catch((err) => {
        console.log("talkjs error", err);
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

            {usersProps.map((user) => {
              return (
                <button
                  type="button"
                  class="btn btn-lg btn-outline-success message-button m-3"
                  onClick={(e) => startChat(e, user)}
                >
                  Message {user.user_name}!
                </button>
              );
            })}
            {/* <button
              type="button"
              class="btn btn-lg btn-outline-success message-button m-3"
              onClick={startChat}
            >
              Message Me!
            </button> */}

            <p> Get in touch to organise a meet up or group walk.</p>
          </div>
        </div>
      )}
      <div className="chatbox-div" ref={chatboxEl}></div>;
      <div className="m-4">
        <h3>My walks: (walk cards imported here)</h3>
      </div>
    </div>
  );
}
