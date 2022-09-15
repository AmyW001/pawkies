import React, { useState, useEffect, useRef } from "react";
import Talk from "talkjs";
import userheaderphoto from "../Images/userheaderphoto.jpeg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserProfile({ sessionProps, usersProps }) {
  const [user, setUser] = useState();
  const [prepareChat, setprepareChat] = useState({
    user_name: "",
    password: "",
  });
  const [primaryChatUser, setPrimaryChatUser] = useState();
  const [error, setError] = useState("");
  const [allwalks, setAllwalks] = useState([]);
  const chatboxEl = useRef();

  const walklocation = useLocation();
  const path = walklocation.pathname.split("/")[2];

  useEffect(() => {
    console.log(sessionProps);
    const loadPage = async (e) => {
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
    fetch("/all-walk/" + path)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setAllwalks(json);
      })
      .catch((error) => {
        // upon failure, show error message
      });
  }, [path]);

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
          password: prepareChat.password,
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

  const startChat = () => {
    console.log(primaryChatUser);
    console.log(user);
    Talk.ready.then(() => {
      const primaryUser = new Talk.User({
        id: primaryChatUser.user_Id,
        name: primaryChatUser.user_name,
        email: primaryChatUser.user_email,
        photoUrl: "henry.jpeg",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tmpyzQVy",
        me: primaryUser,
      });

      // After `Talk.ready`
      const secondaryUser = new Talk.User({
        id: user.user_Id,
        name: user.user_name,
        email: user.user_email,
        photoUrl: "jessica.jpeg",
        role: "default",
      });

      // console.log(currentUser, otherUser);

      const conversationID1 = Talk.oneOnOneId(primaryUser, secondaryUser);
      const conversation1 = session.getOrCreateConversation(conversationID1);
      conversation1.setParticipant(primaryUser);
      conversation1.setParticipant(secondaryUser);

      const inbox = session.createInbox();
      inbox.select(conversation1);
      inbox.mount(chatboxEl.current);

      // const chatbox = session.createChatbox();
      // chatbox.select(conversation);
      // chatbox.mount(chatboxEl.current);
    });
  };

  const startInbox = () => {
    Talk.ready
      .then(() => {
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
            <button
              type="button"
              class="btn btn-lg btn-outline-success message-button m-3"
              onClick={startChat}
            >
              Message Me!
            </button>

            <p> Get in touch to organise a meet up or group walk.</p>
            <form>
              <label for="username">
                Enter your username and password to start a chat!
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                value={prepareChat.user_name}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                type="password"
                name="password"
                id="password"
                value={prepareChat.password}
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
      <div className="chatbox-div" ref={chatboxEl}></div>;{/* walks: */}
      <div className="m-1">
        <h3>My walks: (walk cards imported here)</h3>
        {allwalks.map((onewalk) => (
          <tr key={onewalk.walk_id}>
            <Link to={`/walk/${onewalk.walk_id}`}>
              <p>{onewalk.walk_name}</p>
            </Link>
            <img src={onewalk.photo_url} />
          </tr>
        ))}
      </div>
    </div>
  );
}

// [{   "walk_name": "Fog Lane Park",
//     "location": "Manchester, UK",
//     "address": "139 Fog Ln, Parkville Rd, Park, Manchester M20 4UP",
//     "types": "Park",
//     "length": "Short",
//     "rating": 5,
//     "difficulty": 1,
//     "description": "Nice gentle walk with some beautiful trees and the other dog owners are really friendly",
//     "photo_url": "https://cdn.pixabay.com/photo/2019/07/19/10/43/the-side-of-the-road-4348501__480.jpg",
//     "user_name": "Am1",
//     "latitude": "53.423615",
//     "longitude": "-2.223066"
// },
// {
//     "walk_name": "Central Park",
//     "location": "New York, USA",
//     "address": "Central Park",
//     "types": "Park",
//     "length": "Long",
//     "rating": 5,
//     "difficulty": 1,
//     "description": "Walking in the city of the world with your dog is the best experience of all!",
//     "photo_url": "https://cdn.pixabay.com/photo/2020/06/09/06/39/walk-5277224__480.jpg",
//     "user_name": "Ash15",
//     "latitude": "40.78144544684661",
//     "longitude": "-73.96693758753773"
// },
// {
//     "walk_name": "Grand Canyon",
//     "location": "Arizona, USA",
//     "address": "Arizona",
//     "types": "Desert",
//     "length": "Long",
//     "rating": 5,
//     "difficulty": 5,
//     "description": "It can be a wild ride for you and your dog, but it’s fascinating!",
//     "photo_url": "https://images.unsplash.com/photo-1515723630229-3b70d270b9fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nJTIwaW4lMjBhJTIwZGVzZXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     "user_name": "Sara8",
//     "latitude": "36.10111460547827",
//     "longitude": "-112.11106843230205"
// },
// {
//     "walk_name": "Machu Pichu",
//     "location": "Cuzco, Peru",
//     "address": "Machu Pichu",
//     "types": "Mountain",
//     "length": "Long",
//     "rating": 5,
//     "difficulty": 5,
//     "description": "Going to a sacred place with your dog is something you cannot miss",
//     "photo_url": "https://cdn.pixabay.com/photo/2016/01/30/12/45/mountaineer-1169535__480.jpg",
//     "user_name": "Kerry6",
//     "latitude": "-13.174691288071598",
//     "longitude": "-72.54153417482678"
// },
// {
//     "walk_name": "Bogatell Beach",
//     "location": "Barcelona, Spain",
//     "address": "Paseo Maritimo del Bogatell S/N",
//     "types": "Beach",
//     "length": "Short",
//     "rating": 5,
//     "difficulty": 2,
//     "description": "If you are in Barcelona and want to have fun playing volleyball with your dog or just on the beach, this is the best place",
//     "photo_url": "https://cdn.pixabay.com/photo/2020/04/19/17/38/beach-5064674__480.jpg",
//     "user_name": "Ash15",
//     "latitude": "41.39524050623052",
//     "longitude": "2.2061088176884933"
// },
// {
//     "walk_name": "Garden Route",
//     "location": "South Africa, Africa",
//     "address": "Bonajala, North west",
//     "types": "Mountain",
//     "length": "Long",
//     "rating": 5,
//     "difficulty": 5,
//     "description": "The combination between beach and mountains is the best!",
//     "photo_url": "https://images.unsplash.com/photo-1530691597833-05979f8e2d7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW4lMjBiZWFjaCUyMGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
//     "user_name": "Sam10",
//     "latitude": "-33.3285761023333",
//     "longitude": "23.069771972626548"
// },
// {
//     "walk_name": "Parkinson",
//     "location": "Brisbane, Australia",
//     "address": "Brisbane",
//     "types": "Lake",
//     "length": "Short",
//     "rating": 5,
//     "difficulty": 2,
//     "description": "If you want a quiet place, this is the place for you and your dog.",
//     "photo_url": "https://cdn.pixabay.com/photo/2016/11/21/00/47/view-1844110__480.jpg",
//     "user_name": "Kerry6",
//     "latitude": "-27.63298301853734",
//     "longitude": "153.02473122853758"
// },
// {
//     "walk_name": "Chugach Park",
//     "location": "Alaska, USA",
//     "address": "Anchorage",
//     "types": "Mountain",
//     "length": "Long",
//     "rating": 5,
//     "difficulty": 5,
//     "description": "If your dog likes the cold and beautiful landscapes, this is the place.",
//     "photo_url": "https://cdn.pixabay.com/photo/2018/03/29/11/59/animal-3272072__480.jpg",
//     "user_name": "Sara8",
//     "latitude": "61.30954912463848",
//     "longitude": "-149.05789999790565"
// },
// {
//     "walk_name": "Chapultepec",
//     "location": "Mexico City, Mexico",
//     "address": "Miguel Hidalgo",
//     "types": "Park",
//     "length": "Short",
//     "rating": 4,
//     "difficulty": 2,
//     "description": "A place to lose yourself with your dog from the noise of the city.",
//     "photo_url": "https://images.unsplash.com/photo-1610708990659-f18171d1d8a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2Fsa2luZyUyMGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
//     "user_name": "Am1",
//     "latitude": "19.422516451172026",
//     "longitude": "-99.18727113243747"
// },
// {
//     "walk_name": "Sierra Nevada",
//     "location": "Santa Martha, Colombia",
//     "address": "Sierra Nevada",
//     "types": "Mountain",
//     "length": "Long",
//     "rating": 5,
//     "difficulty": 5,
//     "description": "The best place to reconnect with your dog.",
//     "photo_url": "https://images.unsplash.com/photo-1587916369552-4c5b9b2fc3f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWluJTIwZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     "user_name": "Ash15",
//     "latitude": "10.831559277392465",
//     "longitude": "-73.69436136660283"
// },
// {
//     "walk_name": "Kuta Beach",
//     "location": "Bali, Indonesia",
//     "address": "Bali",
//     "types": "Beach",
//     "length": "Short",
//     "rating": 5,
//     "difficulty": 1,
//     "description": "If what you want is to be in a paradise you cannot miss this with your dog.",
//     "walk_id": 36,
//     "photo_url": "https://images.unsplash.com/photo-1539981979235-86d7f364f6eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2glMjBkb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
//     "user_name": "Sam10",
//     "longitude": "114.96099926644807",
//     "latitude": "-8.47448706385395"
//  },
// {
//     "walk_name": "Marrakech Desert",
//     "location": "Marrakech, Africa",
//     "address": "Marrakech",
//     "types": "Desert",
//     "length": "Long",
//     "rating": 5,
//     "difficulty": 5,
//     "description": "A wild adventure for you and your dog!",
//     "photo_url": "https://images.unsplash.com/photo-1522032183912-b0363624909d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGRlc2VydCUyMGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
//     "user_name": "Kerry6",
//     "latitude": "31.638864216193323",
//     "longitude": "-8.08303648114193"
// }]

// [{
//   "user_name": "Am1",
//   "user_email": "amy@google.com",
//   "password": "secret123",
//   "location": "Manchester, UK",
//   "user_dog_name": "Ira",
//   "user_dog_description": "Cute Patootie",
//   "user_dog_photo": "https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186__480.jpg",
//   "user_photo": "https://cdn.pixabay.com/photo/2018/08/05/19/34/dog-3586281__480.jpg"
// },
// {
//   "user_name": "Ash15",
//   "user_email": "ash@google.com",
//   "password": "Coco949829832",
//   "location": "Madrid, Spain",
//   "user_dog_name": "Coco",
//   "user_dog_description": "The best Coconut",
//   "user_dog_photo": "https://images.unsplash.com/photo-1531842477197-54acf89bff98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVsbGRvZyUyMGZyYW5jJUMzJUE5c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
//   "user_photo": "https://images.unsplash.com/photo-1603682274105-c015c571d03d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVsbGRvZyUyMGZyYW5jJUMzJUE5cyUyMGNvbiUyMGh1bWFub3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
// },
// {
//   "user_name": "Sara8",
//   "user_email": "sara@google.com",
//   "password": "Sarim876",
//   "location": "Barcelona, Spain",
//   "user_dog_name": "Lucky",
//   "user_dog_description": "The dog that makes everyone lucky!",
//   "user_dog_photo": "https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsY2hpY2hhJTIwZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   "user_photo": "https://images.unsplash.com/photo-1592521821430-12fcfbb4a6f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZyUyMHdpdGglMjBodW1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
// },
// {
//   "user_name": "Kerry6",
//   "user_email": "kerry@google.com",
//   "password": "Kworld93",
//   "location": "Miami, USA",
//   "user_dog_name": "Stella Bella",
//   "user_dog_description": "The most familiar dog of all",
//   "user_dog_photo": "https://images.unsplash.com/photo-1628579550131-a99284d5b330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmlnJTIwZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   "user_photo": "https://images.unsplash.com/photo-1543966399-7c3c66f8c8d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGRvZyUyMHdpdGglMjBodW1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
// },
// {
//   "user_name": "Sam10",
//   "user_email": "sam@google.com",
//   "password": "Samu9305",
//   "location": "Bogota, Colombia",
//   "user_dog_name": "Mango",
//   "user_dog_description": "The most exotic dog on the planet!",
//   "user_dog_photo": "https://images.unsplash.com/photo-1602241628512-459cdd3234fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   "user_photo": "https://images.unsplash.com/photo-1557199582-14cd70bc6d39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmV0cmlldmVyJTIwd2l0aCUyMGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
// }]
