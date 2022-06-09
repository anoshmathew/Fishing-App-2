import React,{useState,useEffect,useRef} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactLoading from "react-loading";
import { Url} from '../../../../constants/global'
import OpenReqTable from './OpenReqTable';

function OpenReqList(param) {
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();
  const notify = () => toast("Wow so easy!");
    const url2 = "http://work.phpwebsites.in/fishing/api/fishreqopenedit";

    const [fishingRequestlist, setfishingRequestlist] = useState([]);
    var getResult ;
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState(true);
    const [data, setData] = useState({  
      //user_id:"",
      name: loggedUser.name,   
      email:loggedUser.email,
      mobile:loggedUser.mobile,
      house_name:loggedUser.house_name,
      street:loggedUser.street,
      city:loggedUser.city,
      state:loggedUser.state,
      country:loggedUser.country,
      pincode:loggedUser.pincode,
      price_id:loggedUser.price_id,
      start_date:loggedUser.start_date,
     
    });
  const [reqcreate, setreqcreate] = useState(true)
 
    const [activetogfishreq, setactivetogfishreq] = useState(false)
    const [EditFishingReq, setEditFishingReq] = useState(false)
    const [togdelfishreq, settogdelfishreq] = useState(false)
    const isMounted1 = useRef(false);
    const isMounted2 = useRef(false);
    const isMounted3 = useRef(false);
    const isMounted4 = useRef(false);
    const isMounted5 = useRef(false);
    
    const token = loggedUser.api_token;
    useEffect(() => {
        getData();
        // loadData();
      }, []);
     
      useEffect(()=>{
        if (isMounted1.current){
            getData();
        }
        else {
          isMounted1.current = true;
        }
      },[activetogfishreq]);

      useEffect(()=>{
        if (isMounted2.current){
            getData();
        }
        else {
          isMounted2.current = true;
        }
      },[togdelfishreq]);
      useEffect(()=>{
        if (isMounted3.current){
            getData();
        }
        else {
          isMounted3.current = true;
        }
      },[search]);
      useEffect(()=>{
        if (isMounted4.current){
            getData();
        }
        else {
          isMounted4.current = true;
        }
      },[page]);
      useEffect(()=>{
        if (isMounted5.current){
            getData();
        }
        else {
          isMounted5.current = true;
        }
      },[reqcreate]);

      const [details, setdetails] = useState(null)
   
      const detailsClicked = it => {
        console.log(it)
      
          Axios.post(
            Url.userdetailsurl,
            { user_id: loggedUser.id, 
              req_user_id:it.id
                   
            },
            { headers: { Token: loggedUser.api_token } }
          ).then((res) => {
            
            console.log(res);
            setdetails(res.data)
            
          });
        
        
      };
      if(details != null){
        console.log(details.photo)
      
      }

      var lst;
      var arr = [{card_name: "--Select a Card--",
  card_type: "",
  days: null,
  id: null,
  price: null,
  status: "active"}
];
      const [priceCards, setpriceCards] = useState(arr)
      console.log(loggedUser)
      var msg;
      useEffect(() => {
        getcards();
      }, [])
      
     function getcards(){
     // param.setSideNavSel("listidcard")
      Axios.post(Url.pricelisturl, {
        user_id: loggedUser.id ,
        price_id: loggedUser.price_id,   
        limit:"1",
       
    },{ headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      console.log(res);
      setpriceCards([...arr, ...res.data.data])
      
    });
     }
      if(priceCards != null){
        console.log(priceCards)
        lst = priceCards.map((item) =>
        <option key={item.id} value={JSON.stringify(item)}>{item.card_name}</option>
        )
       }

    async function getData() {
      param.setSideNavSel("openfishingreq");
        Axios.post(
            Url.fishreqlisturl,
            { user_id: loggedUser.id, limit:page},
            { headers: { Token: loggedUser.api_token } }
          ).then((res) => {
             getResult = res.data.data;  
            localStorage.setItem("fishreqdatalist", JSON.stringify(getResult));       
            console.log(getResult);
            setLoading(false)
            setfishingRequestlist(getResult);
          });
      }

    

      function toggleStatusFish(item){
        if(item.open_edit == "yes"){
          Axios.post(
            Url.fishreqopenediturl,
            { user_id: loggedUser.id,req_id: item.id, status: "no" },
            { headers: { Token: token } }
          ).then((res) => {
            setactivetogfishreq(!activetogfishreq);  
            console.log(res);
          });
        }
        else {
            Axios.post(
              url2,
              { user_id: loggedUser.id,req_id: item.id, status: "yes" },
              { headers: { Token: token } }
            ).then((res) => {
              setactivetogfishreq(!activetogfishreq);  
              console.log(res);
            });
          }

       
      }
      function delFun(item) {

        Axios.post(
          Url.fishreqdeleteurl,
          { user_id: loggedUser.id, req_id: item.id },
          { headers: { Token: token } }
        ).then((res) => {
         
          console.log(res);
          if(res.data.status == "yes"){
            param.setsucess({...param.sucess,color:"success",statusmsg:"Deleted", createuser:true})
            console.log("deleted");
            settogdelfishreq(!togdelfishreq);
          }
          else{
            param.setsucess({...param.sucess,color:"danger",statusmsg:"Error", createuser:false})
            console.log("Not deleted");
          }
          
          });
          
        }


        function handle(e) {
            const newdata = { ...data };
            newdata[e.target.id] = e.target.value;
            setData(newdata);
          }

        function submit1(e) {
            e.preventDefault();
            Axios.post(
              Url.fishreqlisturl,
              { user_id: loggedUser.id, 
                
                limit:1,
                //^ To do--------------------------------------------------------------------------
                
                //-----------------------
                req_id:data.req_id
              },
              { headers: { Token: loggedUser.api_token } }
            ).then((res) => {
                    
              console.log(res);
              setfishingRequestlist(res.data.data);
            });
          }
        
          function cancelSearch(e){
            e.preventDefault();
            setSearch(!search);
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


           function submit(e) {
            e.preventDefault()
            var priceObj =JSON.parse(data.price_id);
            console.log(priceObj)
            console.log(loggedUser)
            
            
              Axios.post(Url.createfishrequrl, {
                user_id: loggedUser.id ,
                name: loggedUser.name,   
                email:loggedUser.email,
                mobile:loggedUser.mobile,
                house_name:data.house_name,
                street:data.street,
                city:data.city,
                state:data.state,
                country:data.country,
                pincode:data.pincode,
                price_id:priceObj.id,
                start_date:data.start_date   , 
            },{ headers: { Token: loggedUser.api_token } }
            ).then((res) => {
              console.log(res);
              setreqcreate(!reqcreate)
              //navigate("../listfish");
              if(res.data.status == "yes"){
               // param.setsucess({...param.sucess,color:"success",statusmsg:"Fish Created", createuser:true})
               navigate("../openreqlist");
                //Alert.success('Success Alert')
                console.log("Confirm")
              }
              else{
               // param.setsucess({...param.sucess,color:"danger",statusmsg:"Error!!", createuser:false})
              }
              
            });
          }


  return (
    <div className="content-wrapper justify-content-center mt-5" >
      
<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Open Fishing Requests</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">User</a></li>
          <li className="breadcrumb-item active">Open Fishing Requests</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>
<div className="row" style={{clear: 'both', marginBottom: 10,marginRight: 10}}>
  <div className="col-md-12 " align="right" style={{clear: 'both'}}>
    {/*<Link type="button" className="btn btn-inline btn-danger mr-1" to="../createrequest"><i className="fa fa-edit" />New Fishing Request</Link>*/}
    <button className="btn btn-danger" style={{marginRight:"10px"}} type="button" data-toggle="collapse" data-target="#multiCollapseAddReq" aria-expanded="false" aria-controls="multiCollapseAddReq">
      <i className="fa fa-plus" />  
       Create Request
      </button> 
    
    <button className="btn btn-warning" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
      <i className="fa fa-search" />  
       Search
      </button>  
        
  </div>
</div>

<div className="modal fade" id="modal-xl">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Details</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {details != null?<>
                <div class="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <img src={details.photo}/>
                  </div>
              </div>
              </div>

              <div className="row">
                
              <ul style={{listStyle:"none"}}>
                <li>ID:{details.data.id}</li>
                <li>Name:{details.data.name}</li>
                <li>Username:{details.data.username}</li>
                <li>Mobile:{details.data.mobile}</li>   
                <li>Email:{details.data.email}</li>
                <li>Address:{details.data.address}</li>
                <li>Country:{details.data.country}</li>
                <li>User Type:{details.data.user_type}</li>
                <li>Created Date:{details.data.create_date}</li>
                <li>Password:{details.data.password}</li>
                
              </ul>
              </div>
              </div>
              </>:null}
            </div>
            
            <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      
      <button onClick={notify}>Notify!</button>
        <ToastContainer />
     
      <button type="button" className="btn btn-success toastrDefaultSuccess" id="toastrDefaultSuccess">
                  Launch Success Toast
                </button>
              
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
           <form onSubmit={(e)=>submit1(e)}>
             <div className="card-body">
               
               
             <div className="row">
             <div className="form-group col-md-6">
                 <label >Req ID</label>
                 <input  className="form-control" 
                  type="text"
                  id="req_id"
                  onChange={(e) => handle(e)}
                  value={data.req_id}
                  placeholder="Req id" />
               </div>    

               </div>
               
             </div>

             <div className="card-footer">
               <button type="submit" className="btn btn-warning mr-2"><i className="fa fa-search" />Search</button>
               <button className="btn btn-danger" onClick={cancelSearch}  type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2"><i className="fa fa-back" />Cancel</button>
             </div>

           </form>
           
         </div>
         {/* /.card */}</div>
     </div>
     </div>
     </section>
<section className="content collapse multi-collapse" id="multiCollapseAddReq">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-12 mx-auto">
         {/* general form elements */}
         <div className="card card-warning">
           <div className="card-header">
             <h3 className="card-title">Create Fishing Request</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
                 <div className="card-body">
                 <div className="row">
                 <div className="form-group col-md-12">
                 <label >Price Card</label>
                 <select className="form-control" style={{color:"rgb(143, 143, 143)"}} onChange={(e) => handle(e)} id="price_id" >
                  {lst}
                </select>
                 </div>
                 </div>

                {/*

                
                 <div className="form-group col-md-6">
                     <label >Price Id</label>
                     <input  className="form-control" 
                      type="text"
                      id="price_id"
                      onChange={(e) => handle(e)}
                      value={JSON.stringify(JSON.parse(data.price_id).id)}
                      placeholder="Disabled" />
                   </div>
  */
  }

                   <div className="row">
                  
                 <div className="form-group col-md-6">
                     <label >Name</label>
                     <input  className="form-control" 
                      type="text"
                      id="name"
                      onChange={(e) => handle(e)}
                      value={data.name}
                      placeholder="Disabled" />
                   </div>
                   <div className="form-group col-md-6">
                 <label >Email</label>
                 <input  className="form-control" 
                  type="text"
                  id="email"
                  onChange={(e) => handle(e)}
                  value={data.email}
                  placeholder="Disabled" />
               </div>
               <div className="form-group col-md-6">
                 <label >Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="mobile"
                  onChange={(e) => handle(e)}
                  value={data.mobile}
                  placeholder="Disabled" />
               </div>
               <div className="form-group col-md-6">
                 <label >House Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="house_name"
                  onChange={(e) => handle(e)}
                  value={data.house_name}
                  placeholder="House Name" />
               </div>
               <div className="form-group col-md-6">
                 <label>Street</label>
                 <input  className="form-control" 
                  type="text"
                  id="street"
                  onChange={(e) => handle(e)}
                  value={data.street}
                  placeholder="Street" />
               </div>
               <div className="form-group col-md-6">
                 <label >City</label>
                 <input  className="form-control" 
                  type="text"
                  id="city"
                  onChange={(e) => handle(e)}
                  value={data.city}
                  placeholder="City" />
               </div>
               <div className="form-group col-md-6">
                 <label>State</label>
                 <input  className="form-control" 
                  type="text"
                  id="state"
                  onChange={(e) => handle(e)}
                  value={data.state}
                  placeholder="State" />
               </div>
               <div className="form-group col-md-6">
                 <label >Country</label>
                 <input  className="form-control" 
                  type="text"
                  id="country"
                  onChange={(e) => handle(e)}
                  value={data.country}
                  placeholder="Country" />
               </div>
               <div className="form-group col-md-6">
                 <label >Pincode</label>
                 <input  className="form-control" 
                  type="text"
                  id="pincode"
                  onChange={(e) => handle(e)}
                  value={data.pincode}
                  placeholder="Pincode" />
               </div>
               
               <div className="form-group col-md-6">
                 <label >Start Date</label>
                 <input  className="form-control" 
                  type="date"
                  id="start_date"
                  onChange={(e) => handle(e)}
                  value={data.start_date}
                  placeholder="Start Date" />
               </div>
                   </div>
                   
                {/* /.col */}
                  
                  <div className="card-footer">
                  <button type="submit" className="btn btn-primary btn-block"  style={{width:"130px"}}>Send</button>
                </div>
                {/* /.col */}
                
            
    
                   
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
              <h3 className="card-title">Fishing Request List</h3>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-bordered table-hover table-sm">
              {
                 loading===true?(<div style={{display:"flex",justifyContent:"center"}}>
                   <ReactLoading
                  type="spinningBubbles"
                  color="grey"
                  height={100}
                  width={50}
                />
                   </div>):(<OpenReqTable fishingRequestList={fishingRequestlist} delFun={delFun} toggleStatusFish={toggleStatusFish} detailsClicked={detailsClicked}/>)
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
  )
}

export default OpenReqList