import axios from "axios";
import { useState, useEffect } from "react";
export default function Message(props) {
  const [leaves, setLeaves] = useState(0);

  const getLeaves = async () => {
    const id = 1;
    const response = await axios.get(`http://localhost:8080/user/${id}`);
    if (response.status === 200) {
      setLeaves(response.data.availableLeaves);
    }
    console.log(response.data);
  };

  useEffect(() => {
    getLeaves();
  }, []);
console.log(props.reply)
  return (
    <div>
      <div className="row mt-1">
        <div className="col col-lg-4"></div>
        <div className="col col-lg-4"></div>
        <div className="col col-lg-4">
          <div className="card bg-success text-light text-end">
            {props.text}
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col col-lg-4">
          <div className="card bg-danger text-light  text-start">
            {props.reply}
          </div>
          <div>
            {props.reply === "Date" ? (
              <>
                <input
                  type="date"
                  placeholder="fromDate"
                  className="form-control"
                  value={props.fromDate}
                  onChange={(e) => props.setFromDate(e.target.value)}
                  required
                />
                <input
                  type="date"
                  className="form-control"
                  value={props.toDate}
                  onChange={(e) => props.setToDate(e.target.value)}
                  required
                />
              </>
            ) : null}
          </div>
          <div>
            {props.reply  === "available Leaves" ? (
            
              <div className="btn btn-outline-primary">
                Available Leaves :{leaves}
              </div>
            ) : null
          
            }
          </div>
        </div>
        <div className="col col-lg-4"></div>
        <div className="col col-lg-4"></div>
      </div>
    </div>
  );
}
