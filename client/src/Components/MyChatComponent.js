import Talk from "talkjs";
import { useEffect, useRef } from "react";

export default function MyChatComponent() {
  const chatboxEl = useRef();

  useEffect(() => {
    Talk.ready.then(() => {
      const currentUser = new Talk.User({
        id: "1",
        name: "Henry Mill",
        email: "henrymill@example.com",
        photoUrl: "henry.jpeg",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tmpyzQVy",
        me: currentUser,
      });

      // After `Talk.ready`
      const otherUser = new Talk.User({
        id: "2",
        name: "Jessica Wells",
        email: "jessicawells@example.com",
        photoUrl: "jessica.jpeg",
        role: "default",
      });
      // Safe to use the SDK here

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
  }, []);

  return (
    <div>
      <div className="chatbox-div" ref={chatboxEl}></div>;
    </div>
  );
}
