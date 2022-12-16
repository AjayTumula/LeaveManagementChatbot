import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";

function UserLog() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.message === "Manager") {
          navigate("/managerHome");
        } else if (res.data.message === "User") {
          localStorage.setItem('user' , res.data.name)
          navigate("/userHome");
        } else {
          setError(true);
        }
      });
  }
  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="row">
          <Nav />
        </div>
        <div className="row mt-5">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h1 className="display-5 mb-5">Please Login Here</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label
                  for="exampleFormControlInput1"
                  className="col-sm-3 col-form-label"
                >
                  Email address
                </label>
                <div className="col-sm-6">
                  <input
                    value={data.email}
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-3 col-form-label">
                  Password
                </label>
                <div className="col-sm-6">
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="form-control"
                    id="inputPassword"
                    placeholder="password"
                  />
                </div>
              </div>
              <div className="form-group mb-3 row">
                <div className="col-sm-6">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Submit
                  </button>
                </div>
                <div className="col-sm-6 mb-5">
                  <h4>
                    <Link to="/register" className="btn btn-success btn-lg">
                      Register
                    </Link>
                  </h4>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
        <h4 style={{ color: "red" }}>
          {error ? "Please Enter Details Correcty" : ""}
        </h4>
      </div>
    </div>
  );
}
export default UserLog;
