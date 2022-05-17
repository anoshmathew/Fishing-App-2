import React,{useState,useEffect,useRef} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import FishingRequestTable from './FishingRequestTable';
import ReactLoading from "react-loading";

function ListFishingRequest(param) {
    const url1 = "http://work.phpwebsites.in/fishing/api/fishreqlist";      
    const url2 = "http://work.phpwebsites.in/fishing/api/fishreqopenedit";
    const url3 = "http://work.phpwebsites.in/fishing/api/fishreqdelete";
    const [fishingRequestlist, setfishingRequestlist] = useState([]);
    var getResult ;
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState(true);
    const [data, setData] = useState({  
    //user_id:"",
    req_id:"",
    name: "",   
    email:"",
    mobile:"",
    house_name:"",
    street:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    price_id:"",
    start_date:""
  });
    const [activetogfishreq, setactivetogfishreq] = useState(false)
    const [EditFishingReq, setEditFishingReq] = useState(false)
    const [togdelfishreq, settogdelfishreq] = useState(false)
    const isMounted1 = useRef(false);
    const isMounted2 = useRef(false);
    const isMounted3 = useRef(false);
    const isMounted4 = useRef(false);

    var loggedUser = JSON.parse(localStorage.getItem("data"));
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
      },[EditFishingReq]);
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

    async function getData() {
      param.setSideNavSel("listfishreq");
        Axios.post(
            url1,
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

      if(param.sucess.createuser===true){
        setTimeout(() => {
          param.setsucess({...param.sucess, createuser:false,statusmsg:""})
        }, 3000)
      }

      function toggleStatusFish(item){
        if(item.open_edit == "yes"){
          Axios.post(
            url2,
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
          url3,
          { user_id: loggedUser.id, req_id: item.req_id },
          { headers: { Token: token } }
        ).then((res) => {
          settogdelfishreq(!togdelfishreq);
          console.log("deleted");
          });
          
        }


        function handle(e) {
            const newdata = { ...data };
            newdata[e.target.id] = e.target.value;
            setData(newdata);
          }

        function submit(e) {
            e.preventDefault();
            Axios.post(
              url1,
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
  return (
    <div className="content-wrapper justify-content-center mt-5" >
       <div className={"alert alert-"+(param.sucess.color)+" alert-dismissable " + (param.sucess.createuser?"":"hide")} style={{position: "absolute","z-index":"2","width":"100%"}}>
			<button type="button" className="close" data-dismiss="alert" aria-hidden="true">
			<i className="ace-icon fa fa-times"></i>
			</button>
			<strong>
			<i className="ace-icon fa fa-check"></i>
			</strong>
      {param.sucess.statusmsg}<br/>
	</div>
<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Manage Fishing Request</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Manage Fishing Request</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>
<div className="row" style={{clear: 'both', marginBottom: 10,marginRight: 10}}>
  <div className="col-md-12 " align="right" style={{clear: 'both'}}>
    <Link type="button" className="btn btn-inline btn-danger mr-1" to="../createrequest"><i className="fa fa-edit" />New Fishing Request</Link>
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

    <section className="content">
    <div className="container-fluid" >
      <div className="row" >
        <div className="col-md-12" >
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Fish List</h3>
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
                   </div>):(<FishingRequestTable fishingRequestList={fishingRequestlist} delFun={delFun} toggleStatusFish={toggleStatusFish}/>)
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

export default ListFishingRequest