import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import BalancedLeaves from "../../components/BalancedLeaves";
import Chat from "../../components/Chat";
import Nav from "../../components/Nav";

export default function UserHome(props) {
  const[leaves,setLeaves]=useState();
  useEffect( () => {
      const userId=1;
      const id=2;
      const response= axios.get(`http://localhost:8080/availableLeaves/${id}/${userId}`);
      if(response.status === 200){
        setLeaves(response.data.availableLeaves)
      
    };
  },[leaves]);
  return (
    <div>
      <Nav user={true} />
      <div className="container mt-5">
        <div className="row">
          <div className="col col-lg-3"></div>
          <div className="col col-lg-6">
            <Chat />
          </div>
          <div className="col col-lg-1"></div>
          <div className="col col-lg-2">
            {/* <BalancedLeaves /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
