import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Nav />
          </div>
          <div className="col-md-12">
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="jumbotron">
                    <h1 className="display-4">
                      Welcome to Leave Management System
                    </h1>
                    <p className="lead">
                      This is a web application for managing leaves of
                      employees. In this application, you can apply for leave,
                      view your leaves and the manager will approve or reject
                      your leave.
                    </p>
                    <hr className="my-4" />
                    <Link className="btn btn-primary btn-lg" to="/register">
                      Register
                    </Link>
                    <Link className="btn btn-success btn-lg ms-5" to="/login">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
