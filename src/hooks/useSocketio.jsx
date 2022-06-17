import { io } from "socket.io-client";

function useSocketio() {
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("hello", (arg) => {
    console.log(arg);
  });

  // socket.on("postedBid", (arg) => {
  //   console.log(arg);
  // });
}

export default useSocketio;
