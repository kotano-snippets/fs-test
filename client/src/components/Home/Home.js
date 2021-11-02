import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
// hooks
import { useLocalStorage } from "hooks";
// styles
import { Form, Button } from "react-bootstrap";

const SERVER_URL = "http://localhost:5000";

export function Home() {
  const [username, setUsername] = useLocalStorage("username", "John");
  const [roomId, setRoomId] = useState("default");
  const linkRef = useRef(null);
  const socketRef = useRef(null);
  const [roomList, setRoomList] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {});

    socketRef.current.emit("rooms:get");

    socketRef.current.on("rooms", (rooms) => {
      setRoomList(rooms);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleNewRoomNameChange = useCallback((e) => {
    setNewRoomName(e.target.value);
  }, []);

  const handleAddNewRoom = useCallback(
    (e) => {
      socketRef.current.emit("rooms:add", newRoomName, (res) => {
        if (res === true) setRoomId(newRoomName);
        setNewRoomName("");
      });
    },
    [newRoomName]
  );

  const handleChangeName = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );

  const handleChangeRoom = useCallback((e) => {
    setRoomId(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      linkRef.current.click();
    },
    [linkRef]
  );

  return (
    <Form
      className="mt-5"
      style={{ maxWidth: "320px", margin: "0 auto" }}
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control value={username} onChange={handleChangeName} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Room:</Form.Label>
        <Form.Control as="select" value={roomId} onChange={handleChangeRoom}>
          {roomList.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </Form.Control>
        <Form.Group>
          <Form.Label>New room:</Form.Label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Control
              value={newRoomName}
              onChange={handleNewRoomNameChange}
            />
            <Button onClick={handleAddNewRoom}>Add</Button>
          </div>
        </Form.Group>
      </Form.Group>
      {username.trim() && (
        <Button
          variant="success"
          as={Link}
          to={`/${roomId}`}
          ref={linkRef}
          disabled={!username || !roomId}
        >
          Chat
        </Button>
      )}
    </Form>
  );
}
