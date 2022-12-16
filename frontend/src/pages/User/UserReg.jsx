import axios from "axios";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

function UserReg() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
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
      .post("http://localhost:8080/userReg", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
      });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Nav />
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-7 mt-5">
          <h1 className="display-5">User Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="name" className="col-sm-3 col-form-label">
                Name:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={data.name}
                  required
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="exampleFormControlInput1"
                className="col-sm-3 col-form-label"
              >
                Email address:
              </label>
              <div className="col-sm-6">
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  name="email"
                  required
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-3 col-form-label"
              >
                Password:
              </label>
              <div className="col-sm-6">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="phone" className="col-sm-3 col-form-label">
                PhoneNumber:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  required
                  value={data.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <Link to="/login" className="btn btn-success btn-lg float-start">
                {" "}
                &larr;Login
              </Link>
              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg text-center"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}
export default UserReg;
