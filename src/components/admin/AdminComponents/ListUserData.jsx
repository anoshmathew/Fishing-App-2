import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import TableComponent from "./TableComponent";
import ReactLoading from "react-loading";

import "./ListUserData.css"
function ListUserData({lim,page,setPage,activetog,setactivetog,del,setdel,setSearch,search,setSideNavSel,sucess,setsucess}) {
  useEffect(()=>{
    setSideNavSel("manageusers");
    listUser();
  
},[]);
  const [loading, setLoading] = useState(true)
  var list = JSON.parse(localStorage.getItem("userlist"));
  var obj = JSON.parse(localStorage.getItem("listform"));
  const isMounted1 = useRef(false);
  const isMounted2 = useRef(false);
  const isMounted3 = useRef(false);

console.log(sucess);

useEffect(()=>{
  if (isMounted1.current){
    listUser();
  }
  else {
    isMounted1.current = true;
  }
},[sucess]);

  useEffect(()=>{
    if (isMounted2.current){
      listUser();
    }
    else {
      isMounted2.current = true;
    }
  },[page]);
  useEffect(()=>{
    if (isMounted3.current){
      listUser();
    }
    else {
      isMounted3.current = true;
    }
  },[del]);
  
  const url1 = "http://work.phpwebsites.in/fishing/api/userdelete";
  const url2 = "http://work.phpwebsites.in/fishing/api/userslist";
  const url3 = "http://work.phpwebsites.in/fishing/api/userstatus";
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  
  const token = loggedUser.api_token;
  const navigate = useNavigate();
  const [showgreen, setshowgreen] = useState(false);
  const [detailsShown, setDetailShown] = useState([]);
  const [data, setData] = useState({
    User_ID: "",
    Email: "",
    Mobile: "",
    UserName: "",
    Name: "",
  });
  const [timeOut, setTimeOut] = useState(null)
    if(sucess.createuser===true){
      setTimeout(() => {
        setsucess({...sucess, createuser:false,statusmsg:""})
      }, 3000)
    }

  //const [list2, setlist2] = useState([list])
  const [list2, setlist2] = useState([])
  function listUser(){
    Axios.post(
      url2,
      { user_id: loggedUser.id, 
        limit:page,
        //^ To do-------------------------------------------
        //-----------------------
        username:data.UserName
      },
      { headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      let li = res.data.data;
      console.log(res);
      
      setLoading(false)
      setlist2(li)
    });
  }

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
  const toggleShown = username => {
    const shownState = detailsShown.slice();
    const index = shownState.indexOf(username);
    if (index >= 0) {
      shownState.splice(index, 1);
      setDetailShown(shownState);
    } else {
      shownState.push(username);
      setDetailShown(shownState);
    }
  };

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
    Axios.post(
      url2,
      { user_id: loggedUser.id, 
        
        limit:1,
        //^ To do--------------------------------------------------------------------------
        
        //-----------------------
        name:data.Name,
        username:data.UserName,
        mobile:data.Mobile,
        email:data.Email
      },
      { headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      let li = res.data.data;
      
      console.log(res);
      setlist2(li)
    });
  }

  function cancelSearch(e){
    e.preventDefault();
    Axios.post(
      url2,
      { user_id: loggedUser.id, 
        limit:1,  
      },
      { headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      let li = res.data.data;
      
      console.log(res);
      setlist2(li)
    });
    setData({Name:"",
  UserName:"",
  Email:"",
  Mobile:""
});
  }
if(sucess){
  //setsucess(false)
  //setshowgreen(true);
  console.log(sucess.createuser)
}
 
  function nextPage(e){  
    e.preventDefault();
   setPage(page+1);
   console.log(page);
  }
  function prevPage(e){
    e.preventDefault();
    setPage(page-1) ;
    console.log(page);
   }


  return (
    <div>
<div className="content-wrapper justify-content-center mt-5" >


<div className={"alert alert-success alert-dismissable " + (sucess.createuser?"":"hide")} style={{position: "absolute","z-index":"2","width":"100%"}}>
			<button type="button" className="close" data-dismiss="alert" aria-hidden="true">
			<i className="ace-icon fa fa-times"></i>
			</button>
			<strong>
			<i className="ace-icon fa fa-check"></i>
			</strong>
      {sucess.statusmsg}<br/>
	</div>
<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">List Users</h1>
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
    <button className="btn btn-warning" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
      <i className="fa fa-search" />  
      Search
      </button>    
  </div>
</div>

<section className="content collapse multi-collapse" id="multiCollapseExample2">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-12 mx-auto">
         {/* general form elements */}
         <div className="card card-warning">
           <div className="card-header">
             <h3 className="card-title">Search</h3>
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
               <button type="submit" className="btn btn-warning mr-2"><i className="fa fa-search" />Search</button>
               <button className="btn btn-danger" onClick={cancelSearch} data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2"><i className="fa fa-back" />Cancel</button>
               
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
                {
                 loading===true?(<div>
                   <ReactLoading
                  type="spinningBubbles"
                  color="grey"
                  height={100}
                  width={50}
                />
                   </div>):(<TableComponent list={list} list2={list2} toggleStatus={toggleStatus} delFun={delFun} detailsShown={detailsShown} setDetailShown={setDetailShown} toggleShown={toggleShown}/>)
               }                                   
              </table>
            </div>
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm float-left"> 
                <li className="page-item mr-2" >
                  <a href="" onClick={prevPage}className="page-link">
                 &lArr; Prev 
                  </a>
                </li>
                </ul>
                <ul className="pagination pagination-sm float-right">
                <li className="page-item mr-2" >
                  <a href="" onClick={nextPage}className="page-link">
                  Next &rArr;
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
