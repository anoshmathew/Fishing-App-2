import React,{useState,useEffect,useRef} from 'react'
import { Link, useNavigate,useLocation } from "react-router-dom";
import Axios from "axios";
import FishCatchTable from './FishCatchTable';
import ReactLoading from "react-loading";
import { Url} from '../../../../constants/global'

function ListFishCatch(param) {
    
    const [fishingCatchList, setfishingCatchList] = useState([]);
    var getResult ;
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState(true);
    const location = useLocation()
    var itm = location.state;
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({     
        Req_id: "",
        Fish_id: "",
        id:""
      });
  

    const [activetogfishreq, setactivetogfishreq] = useState(false)
    const [togdelfishreq, settogdelfishreq] = useState(false)
    const isMounted1 = useRef(false);
    const isMounted2 = useRef(false);
    const isMounted3 = useRef(false);
    const isMounted4 = useRef(false);
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    const token = loggedUser.api_token;
    var lst;
var arr = [{card_name: "--Select a Card--"}];
const [fishlist, setfishlist] = useState(arr)
 
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
      useEffect(() => {
        getData();
        // loadData();
      }, [setfishingCatchList]);
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
      param.setSideNavSel("openfishingreq")
      console.log(loggedUser)
        Axios.post(
            Url.catchfishlisturl,
            { user_id: loggedUser.id,req_id:itm.id, limit:page},
            { headers: { Token: loggedUser.api_token } }
          ).then((res) => {
             getResult = res.data.data;  
            localStorage.setItem("fishreqdatalist", JSON.stringify(getResult));       
            console.log(getResult);
            setLoading(false)
            setfishingCatchList(getResult);
          });
      }
console.log(loggedUser)
        function handle(e) {
            const newdata = { ...data };
            newdata[e.target.id] = e.target.value;
            setData(newdata);
          }

          useEffect(() => {
            getfishlist()
          }, [])
          function getfishlist(){
  
            Axios.post(Url.catchfishlisturl, {
              user_id: loggedUser.id ,
              limit:page,
            },{ headers: { Token: loggedUser.api_token } }
            ).then((res) => {
             console.log(res)
             setfishlist([...arr, ...res.data.data])
            });
          }
          if(fishlist!=null){
            console.log(fishlist)
            lst = fishlist.filter((item)=>(item.fish_name != null)).map((item) =>
            <option key={item.id} value={JSON.stringify(item)}>{item.fish_name}</option>
            )
          }
        function submit(e) {
            e.preventDefault();
            var fish_data_obj =JSON.parse(data.fish_data);
            console.log(itm)
            Axios.post(
              Url.catchfishlisturl,
              { user_id: loggedUser.id, 
                
                limit:page,
                //^ To do--------------------------------------------------------------------------
                //-----------------------
                req_id:itm.id,
                fish_id: fish_data_obj.fish_id, 
                id:data.id,
              },
              { headers: { Token: loggedUser.api_token } }
            ).then((res) => {
                    
              console.log(res);
              setfishingCatchList(res.data.data);
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
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Manage Caught Fish</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="">User</a></li>
                  <li className="breadcrumb-item active">Manage Caught Fish</li>
                </ol>
              </div>{/*this is  /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        <div className="row" style={{clear: 'both', marginBottom: 10,marginRight: 10}}>
          <div className="col-md-12 " align="right" style={{clear: 'both'}}>
          {loggedUser.user_type == "user" ? <Link type="button" className="btn btn-inline btn-danger mr-1" to="../addfishcaught" state={itm} ><i className="fa fa-plus" /> Add Fish</Link>
:null
}
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
                 <label >Fish Name</label>
                  <select className="form-control" style={{color:"rgb(143, 143, 143)"}} onChange={(e) => handle(e)} id="fish_data" >
                  {lst}
                </select>
                 </div>
                       
                       <div className="form-group col-md-6">
                         <label >ID</label>
                         <input  className="form-control" 
                          type="text"
                          id="id"
                          onChange={(e) => handle(e)}
                          value={data.id}
                          placeholder="ID" />
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
                      <h3 className="card-title">Caught Fish List</h3>
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
                   </div>):(<FishCatchTable fishingCatchList={fishingCatchList} />)
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

export default ListFishCatch