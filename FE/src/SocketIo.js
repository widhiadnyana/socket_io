import React, { Component, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const SocketIo = ({ socket }) => {
    const [response, setResponse] = useState();
    useEffect(() => {
        socket.on("connect", () => {
            socket.on("TIMESTAMP", (data) => {
                console.log(data);
                setResponse(data);
            });
        });

        // stop
        return () => socket.disconnect();
    }, []);
    return <span>{response}</span>;
};

export default SocketIo;
