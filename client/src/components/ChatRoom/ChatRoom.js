import { useParams } from "react-router-dom";
// hooks
import { useLocalStorage, useChat } from "hooks";
// components
import { MessageForm } from "./MessageForm";
import { MessageList } from "./MessageList";
import { UserList } from "./UserList";
import VideoContainer from "./VideoContainer";
// styles
import { Container } from "react-bootstrap";

export function ChatRoom() {
  const { roomId } = useParams();
  const [username] = useLocalStorage("username");
  const { users, messages, sendMessage, removeMessage } = useChat(roomId);

  return (
    <Container>
      <h2 className="text-center">Room: {roomId}</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <VideoContainer />
        </div>
        <div>
          <UserList users={users} />
          <MessageList messages={messages} removeMessage={removeMessage} />
          <MessageForm username={username} sendMessage={sendMessage} />
        </div>
      </div>
    </Container>
  );
}
