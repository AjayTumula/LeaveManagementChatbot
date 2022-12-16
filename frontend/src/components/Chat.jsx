import { useState } from "react";
import Message from "./Message";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Chat(props) {
  const navigate=useNavigate();
  const [message, setMessage] = useState("");
  
  const [messages, setMessages] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  return (
    <div className="card border-success" style={{ height: "30rem" }}>
      <div className="card-header text-center display-6">Chat</div>
      <div className="card-body" style={{ overflow: "scroll" }}>
        <div className="btn btn-info">Hii,Welcome to Leave Management</div>
        <div className="row mt-2">
          <div className="col-sm-1">
        <div className="btn btn-outline-warning">Hi</div>
        </div>
        <div className="row mt-2"></div>
        <div className="col-sm-2">
        <div className="btn btn-outline-primary">Apply leave</div>
        </div>
        <div className="row mt-2"></div>
        <div className="col-sm-3">
        <div className="btn btn-outline-success">My leaves</div>
        </div>
        <div className="row mt-2"></div>
        <div className="col-sm-2">
        <div className="btn btn-outline-danger">Cancel Leave</div>
        </div>
        <div className="row mt-2"></div>
        <div className="col-sm-3">
        <div className="btn btn-outline-dark">Thank you</div>
        </div>
        </div>
        {messages.map((m, index) => {
          return (
            <Message
              text={m.msg}
              reply={m.reply}
              key={index}
              toDate={toDate}
              setToDate={setToDate}
              fromDate={fromDate}
              setFromDate={setFromDate}
            />
          );
        })}
       
      </div>
      <div className="row">
        <div className="col col-lg-8">
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="type your message here"
            required
          />
        </div>

        <div className="col col-lg-4">
          <button
            className="btn btn-info w-100"
            disabled={!message && !toDate}
            onClick={async () => {
              if (fromDate === "" && toDate === "") {
                axios
                  .post("http://localhost:8080/chat", {
                    fromUser: 1,
                    text: message,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      setMessages([...messages, res.data]);
                    }
                    setMessage("");
                  });
                  if(message === "logout"){
                    navigate("/")
                  }
              } else {
                const response = await axios.post(
                  "http://localhost:8080/leaves/",
                  {
                    fromDate,
                    toDate,
                    name: localStorage.getItem("user"),
                  }
                  
                );
             
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
