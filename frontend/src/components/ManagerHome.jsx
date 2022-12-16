import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import Leaves from "./Leaves";

function ManagerHome() {
  const [isLeave, setIsLeave] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/leaves/")
      .then((res) => setMessages(res.data));
  }, []);

  return (
    <div className=" container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Nav manager={true} />
        </div>
      </div>
      <div className="conatiner mt-5">
        <div className="row">
          <div className="col col-lg-3"></div>
          <div className="col col-lg-5">
            <div className="card border-success" style={{ height: "30rem" }}>
              <div className="card header text-center display-5">
                Manager Approve/Reject Leave
              </div>
              <div className="card-body" style={{ overflow: "scroll" }}>
                <div className="btn btn-info">
                  Hii,Welcome to Leave Management
                </div>
                <div className="row mt-2">
                  <div className="col-sm-3">
                    <div className="btn btn-outline-success">All leaves</div>
                  </div>
                  <div className="col-sm-2">
                    <div className="btn btn-outline-primary">Logout</div>
                  </div>
                </div>
                <div className="row mt-5">
                  {/* {messages ? (messages.map((m, index) => {
                    return <Message text={m.msg} reply={m.reply} key={index} />;
                  })) : ''} */}

                  {isLeave ? <Leaves isLeave={isLeave}/> : null}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="type your message here"
                />
              </div>
              <div className="col col-lg-4">
                <button
                  className="btn btn-info w-100"
                  onClick={() => {{
                    if (message.toLowerCase()==="all leaves") {
                      setIsLeave(true);
                    }
                    if (message === "logout") {
                      navigate("/");
                    }}
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="col col-lg-4"></div>
        </div>
      </div>
    </div>
  );
}
export default ManagerHome;
