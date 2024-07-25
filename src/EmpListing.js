import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
  const [empData, setEmpData] = useState(null);
  const navigate=useNavigate();

const LoadDetail=(id)=>{
  navigate("/employee/detail/"+id)
}
const LoadEdit=(id)=>{
  navigate("/employee/edit/"+id)
}
const Remove=(id)=>{
  if(window.confirm('Do you want to remove?')){
    fetch("http://localhost:8000/employee/" + id, {
      method: "DELETE",     
    })
      .then((res) => {
        alert("Removed successfully.");
       window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  }  


  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setEmpData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {empData &&
                empData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <a onClick={()=>{LoadEdit(item.id)}} className="btn btn-success">Edit</a>
                      <a onClick={()=>{Remove(item.id)}} className="btn btn-danger">Remove</a>
                      <a onClick={()=>{LoadDetail(item.id)}} className="btn btn-primary">Details</a>
                      {/* <Link to={`/edit/${item.id}`} className="btn btn-success">
                        Edit
                      </Link>
                      <button className="btn btn-danger">Remove</button>
                      <Link
                        to={`/details/${item.id}`}
                        className="btn btn-primary"
                      >
                        Details
                      </Link> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div className="container">
  //       <div className="card">
  //         <div className="card-title">
  //           <h2>Employee Listing</h2>
  //         </div>
  //         <div className="card-body">
  //             <div>
  //                 <Link className="btn btn-success">Add New (+)</Link>
  //             </div>
  //           <table className="table table-bordered">
  //             <thead className="bg-dark text-white">
  //               <tr>
  //                 <td>ID</td>
  //                 <td>Name</td>
  //                 <td>Email</td>
  //                 <td>Phone</td>
  //                 <td>Action</td>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {empdata &&
  //               empdata.map((item) => (
  //                 <tr key={item.id}>
  //                   <td>{item.id}</td>
  //                   <td>{item.name}</td>
  //                   <td>{item.email}</td>
  //                   <td>{item.phone}</td>
  //                   <td>
  //                     <a className="btn btn-success">Edit</a>
  //                     <a className="btn btn-danger">Remove</a>
  //                     <a className="btn btn-primary">Details</a>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default EmpListing;
