import { useState, useEffect } from "react";
import axios from "axios";
const Leaves = ({isLeave}) => {
  const [leaveData, setLeaveData] = useState([]);
  // const [isLeave, setIsLeave] = useState(false);

  const getLeaves = async () => {
    const result = await axios.get(`http://localhost:8080/leaves/`);
    setLeaveData(result.data.filter((leave) => leave.isApproved === false));
  };

  useEffect(() => {
    getLeaves();
  }, []);

  const handleClick = (id, isApproved) => {
    axios
      .put(`http://localhost:8080/leaves/${id}`, { isApproved: isApproved })
      .then((res) => {
        if (res.status === 200) {
          getLeaves();
        }
      });
  };
  function EachLeave(leave, index) {
    return (
      <tr key={index}>
        <td>{leave.id}</td>
        <td>{leave.name}</td>
        <td>{leave.fromDate}</td>
        <td>{leave.toDate}</td>
        <td>
          {" "}
          <button
            className="btn btn-success"
            onClick={() => {
              handleClick(leave.id, true);
            }}
          >
            Approve
          </button>{" "}
          |
          <button
            className="btn btn-danger"
            onClick={() => {
              handleClick(leave.id, true);
            }}
          >
            Decline
          </button>
        </td>
      </tr>
    );
  }
  return (
    <table>
      <tr>
        <th>Id</th>
        <th>User Name</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>Actions</th>
      </tr>
      {isLeave ? leaveData.map(EachLeave) : null}
    </table>
  );
};

export default Leaves;
