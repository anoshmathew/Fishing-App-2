import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


function ListUserData({lim,page,setPage}) {
  var list = JSON.parse(localStorage.getItem("userlist"));
  var obj = JSON.parse(localStorage.getItem("listform"));

  const url1 = "http://work.phpwebsites.in/fishing/api/userdelete";
  const url2 = "http://work.phpwebsites.in/fishing/api/userslist";
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const token = loggedUser.api_token;
  const navigate = useNavigate();
 console.log(lim);


  function delFun(item) {
    console.log(token);
    console.log(" User id: ", loggedUser.id, "deleting user id: ", item.id);
    console.log(obj);
    Axios.post(
      url1,
      { user_id: loggedUser.id, del_id: item.id },
      { headers: { Token: token } }
    ).then((res) => {
      console.log("deleted");

      Axios.post(
        url2,
        { user_id: obj.user_id, limit: obj.limit },
        { headers: { Token: token } }
      ).then((res) => {
        console.log("list refresh");

        navigate("../listuserdata");
      });
    });
  }



  function nextPage(){
    
   setPage(page+1) 
   
  }
  function prevPage(){
    
    setPage(page-1) 
    
   }


  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="ion ion-clipboard mr-1"></i>
            <b>User List</b>
          </h2>

          <div className="card-tools">
            <ul className="pagination pagination-sm">
              <li className="page-item">
                <a onClick={prevPage}className="page-link">
                  &laquo;
                </a>
              </li>
            
              <li class="page-item">
                <a onClick={nextPage} className="page-link">
                  &raquo;
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card-body">
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  
                </div>
              </div>
              {/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      {/* /.card-header */}
                      <div className="card-body">
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Username</th>
                              <th>Mobile</th>
                              <th>User Type</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {list.map((item) => (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.mobile}</td>
                                <td>{item.user_type}</td>
                                <td>
                                  <button onClick={() => delFun(item)}>
                                    del
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* /.card-body */}
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.container-fluid */}
            </section>
            {/* /.content */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListUserData;
