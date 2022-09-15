import React, { useState, useEffect, useRef } from "react";
import Talk from "talkjs";
import userheaderphoto from "../Images/userheaderphoto.jpeg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserProfile(sessionProps) {
  const [user, setUser] = useState();
  const [allwalks, setAllwalks] = useState([]);
  const chatboxEl = useRef();

  const walklocation = useLocation()
  const path= (walklocation.pathname.split("/")[2]);



  useEffect(() => {
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

  useEffect(() => {
    fetch("/all-walk/" + path) 
            .then(res => res.json())
            .then(json => {
              console.log(json)
              setAllwalks(json);
            })
            .catch(error => {
              // upon failure, show error message
            });
        }, [path]);

  const startChat = () => {
    Talk.ready.then(() => {
      const currentUser = new Talk.User({
        id: sessionProps.sessionProps.user_Id,
        name: sessionProps.sessionProps.user_name,
        email: sessionProps.sessionProps.user_email,
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

  return (
    <div>
      {user && (
        <div className="user-main-div">
          <div className="user-header-image-div">
            <img className="user-header-image" src={userheaderphoto}></img>
          </div>

          <img
            className="user-img"
            src={user.user_photo}
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
                    src={user.user_dog_photo}
                  ></img>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-lg btn-outline-success message-button m-3"
              onClick={startChat}
            >
              Message Me!
            </button>

            <p> Get in touch to organise a meet up or group walk.</p>
          </div>
        </div>
      )}
      <div className="chatbox-div" ref={chatboxEl}></div>
      <div className="m-4">



        <h3>My walks: (walk cards imported here)</h3>
        {allwalks.map(onewalk=> (
        <tr key={onewalk.walk_id}>
          <Link to={`/walk/${onewalk.walk_id}`}>
          <p>{onewalk.walk_name}</p>
          </Link>
          <img
          src={onewalk.photo_url}
          />
        </tr>
        ))}
      </div>
    </div>
  );
}
