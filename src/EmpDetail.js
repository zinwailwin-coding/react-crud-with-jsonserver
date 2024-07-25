import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
  const { empid } = useParams();
  const [empData, setEmpData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setEmpData(data);
        console.log(empData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      {empData && (
        <div>
          <h2>The Employee name is : {empData.name}</h2>
          <h3>Contact Details</h3>
          <h5>Email is: {empData.email}</h5>
          <h5>Phone is: {empData.phone}</h5>
          <Link className="btn btn-danger" to="/">
            Back To List
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmpDetail;
