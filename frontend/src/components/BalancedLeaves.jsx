import axios from "axios";
import { useEffect, useState } from "react";
export default function BalancedLeaves() {
  const [leaves, setLeaves] = useState(0);

  const getLeaves = async () => {
    const id = 1;
    const response = await axios.get(`http://localhost:8080/user/${id}`);
    if (response.status === 200) {
      setLeaves(response.data.availableLeaves);
    }
  };
console.log(leaves);
  useEffect(() => {
    getLeaves();
  }, [leaves]);
  return (
    <div>
      <div className="display-6">Available Leaves : {leaves}</div>
    </div>
  );
}
