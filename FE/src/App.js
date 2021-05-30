import React, { Component, useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";

import SocketIOComponent from "./SocketIo";
import "./App.css";

const App = () => {
    // socket io implementation
    // const ENDPOINT = "http://192.168.100.130:4001";
    const ENDPOINT = "http://localhost:4001";
    const [socketInput, setSocketInput] = useState("");
    const [socketResponse, setSocketResponse] = useState("");
    const [response, setResponse] = useState();
    const [loadClient, setLoadClient] = useState(true);

    const socket = socketIOClient(ENDPOINT);

    const handleInputSocket = (e) => {
        let { value } = e.target;
        setSocketInput(value);
        socket.emit("USERINPUT", value);
    };

    socket.on("FEEDBACK", (data) => {
        console.log(data);
        setSocketResponse(data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    useEffect(() => {
        socket.on("connect", () => {
            socket.on("TIMESTAMP", (data) => {
                console.log("TIMESTAMP", data);
                setResponse(data);
            });
        });

        // stop
        return () => socket.disconnect();
    }, []);

    return (
        <div className='App'>
            <div className='test'>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3> Socket IO data:</h3>
                    {/* {loadClient ? <SocketIOComponent socket={socket} /> : null} */}
                    <span>{response}</span>

                    {/* <button
                        onClick={() =>
                            setLoadClient((prevState) => !prevState)
                        }>
                        STOP
                    </button> */}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <h3>Socket IO INPUT:</h3>
                        <input
                            type='text'
                            onChange={handleInputSocket}
                            value={socketInput}></input>
                    </div>
                    <div>
                        <h3>Socket IO RESP:</h3>
                        <span>{socketResponse}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
