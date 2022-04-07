import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react/cjs/react.development";

function ListUserData({lim,page,setPage,activetog,setactivetog,del,setdel,setSearch,search,setlist2,list2}) {
  var list = JSON.parse(localStorage.getItem("userlist"));
 
  var obj = JSON.parse(localStorage.getItem("listform"));

  
  const url1 = "http://work.phpwebsites.in/fishing/api/userdelete";
  const url2 = "http://work.phpwebsites.in/fishing/api/userslist";
  const url3 = "http://work.phpwebsites.in/fishing/api/userstatus";
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  
  const token = loggedUser.api_token;
  const navigate = useNavigate();

  const [data, setData] = useState({
    User_ID: "",
    Email: "",
    Mobile: "",
    UserName: "",
    Name: "",
  });
  
  function delFun(item) {
    console.log(token);
    console.log(" User id: ", loggedUser.id, "deleting user id: ", item.id);
    console.log(obj);
    Axios.post(
      url1,
      { user_id: loggedUser.id, del_id: item.id },
      { headers: { Token: token } }
    ).then((res) => {
      setdel(del+1);
      console.log("deleted");

      });
  }

  function toggleStatus(item){
    if(item.status == "active"){
      Axios.post(
        url3,
        { user_id: loggedUser.id,st_id: item.id, status: "inactive" },
        { headers: { Token: token } }
      ).then((res) => {
        setactivetog(true);
        console.log(res);
        setactivetog(false);
        console.log(res);
      });
    }
    else{
      Axios.post(
        url3,
        { user_id: loggedUser.id, st_id: item.id, status: "active" },
        { headers: { Token: token } }
      ).then((res) => {
        setactivetog(false);
        console.log(res);
        setactivetog(true);
        console.log(res);
     
      });
    }
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  function submit(e) {
    e.preventDefault();
    
    list.map((item) => 
    {
      if(item.name == data.Name){
        setSearch(true);
        setlist2(item);
        console.log(list2);
      }
      
    })

  }




  function nextPage(e){  
    e.preventDefault();
   setPage(page+1);
   console.log(page);
  }
  function prevPage(){
    setPage(page-1) ;
    console.log(page);
   }


  return (
    <div>
<div className="content-wrapper justify-content-center mt-5" >



<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Users</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">List Users</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>

<div className="row" style={{clear: 'both', marginBottom: 10,marginRight: 10}}>
  <div className="col-md-12 " align="right" style={{clear: 'both'}}>
    <Link type="button" className="btn btn-inline btn-danger mr-1" to="../createuser"><i className="fa fa-edit" /> New User</Link>
    <button className="btn btn-warning" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2"><i className="fa fa-search" />  Search</button>    
  </div>
</div>

<section className="content collapse multi-collapse" id="multiCollapseExample2">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-8 mx-auto">
         {/* general form elements */}
         <div className="card card-warning">
           <div className="card-header">
             <h3 className="card-title">Edit Details</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body">
               
               
             <div className="row">
             <div className="form-group col-md-6">
                 <label >Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="Name"
                  onChange={(e) => handle(e)}
                  value={data.Name}
                  placeholder="Name" />
               </div>
               <div className="form-group col-md-6">
                 <label >Username</label>
                 <input  className="form-control" 
                 type="text"
                 id="UserName"
                 onChange={(e) => handle(e)}
                 value={data.UserName}
                  placeholder="User Name"/>
               </div>
               </div>
               <div className="row">
               <div className="form-group col-md-6">
                 <label >Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="Mobile"
                  onChange={(e) => handle(e)}
                  value={data.Mobile}
                  placeholder="Mobile" />
               </div>
               <div className="form-group col-md-6">
                 <label >Email</label>
                 <input  className="form-control" 
                 type="text"
                 id="Email"
                 onChange={(e) => handle(e)}
                 value={data.Email}
                  placeholder="Email" />
               </div>
               </div>



               
             </div>

             <div className="card-footer">
               <button type="submit" className="btn btn-primary">Submit</button>
             </div>

           </form>
           
         </div>
         {/* /.card */}</div>
     </div>
     </div>
     </section>

  <section className="content">
    <div className="container-fluid" >
      <div className="row" >
        <div className="col-md-12" >
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">User List</h3>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-bordered table-hover table-sm">
                {(search) ? (
                  <div>
                          {list2}
                          
                  </div>

                ) :
                (
                  <div>
                     <thead>
                  <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Mobile</th>
                            <th>User Type</th>
                            <th>Action</th>
                            <th>Password</th>
                            
                  </tr>
                </thead>
                <tbody>
                          {list.filter(item => !item.name.includes(loggedUser.name)).filter(item => !item.username.includes(loggedUser.username)).map((item) => (
                            
                            <tr key={item.id}>
                              <td className="center">{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.username}</td>
                              <td>{item.mobile}</td>
                              <td>{item.user_type}</td>                              
                              <td>
                                <Link type="button" className="btn btn-inline btn-warning mr-1"  to="../edituserform" state={item}><i className="fa fa-edit" /></Link>
                                <a role="button" className="btn btn-primary mr-1" onClick={() => toggleStatus(item)}>{item.status=='active'?<i className="fas fa-lock-open"></i>:<i className="fas fa-lock"></i> }</a>
                                <a role="button" className="btn btn-danger mr-1" onClick={() => delFun(item)} ><i className="fas fa-trash-alt"></i></a>
                              </td>
                              <td>
                                <button className="btn btn-warning" type="button" data-toggle="collapse" data-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1"><i className="fa fa-angle-double-down" /></button>
                              </td>
                            </tr>
                                                    
                          ))}
                          
                          
                  </tbody>
                  </div>
                )
                }
               
              </table>
            </div>
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm float-right"> 
              <li className="page-item mr-2" >
          <a href="#" onClick={prevPage}className="page-link">
            &laquo;
          </a>
          </li>
          <li className="page-item mr-2" >
          <a href="#" onClick={nextPage}className="page-link">
            &laquo;
          </a>          
          </li>       
              </ul>
            </div>
          </div>
        </div>
      </div>

   

    </div>
  </section>

  </div>



   
   


  </div>

























   
      
  );
  
}


export default ListUserData;
