import React,{useState,useEffect,useRef} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import IdcardTable from './IdcardTable';
import { Url} from '../../../../constants/global'

function Listuseridcard(param) {

  const [pricelist, setpricelist] = useState([]);
  const [activetogprice, setactivetogprice] = useState(false)
  const [togdelprice, settogdelprice] = useState(false)
  const [page, setPage] = useState(1)
  var getResult ;
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const token = loggedUser.api_token;
  const isMounted1 = useRef(false);
  const isMounted2 = useRef(false);
  const isMounted3 = useRef(false);
  const isMounted4 = useRef(false);
  const [data, setData] = useState({
     
      Price_id: "",
    });
  const [search, setSearch] = useState(0);

  useEffect(()=>{
      if (isMounted1.current){
          getData();
      }
      else {
        isMounted1.current = true;
      }
    },[activetogprice]);

    useEffect(()=>{
      if (isMounted2.current){
          getData();
      }
      else {
        isMounted2.current = true;
      }
    },[togdelprice]);

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

  useEffect(() => {
      getData();
      // loadData();
    }, []);
  async function getData() {
      param.setSideNavSel("listidcard")
      Axios.post(
          Url.listidcardurl,
          { user_id: loggedUser.id, limit:page},
          { headers: { Token: loggedUser.api_token } }
        ).then((res) => {
           getResult = res.data.data;  
         // localStorage.setItem("pricedatalist", JSON.stringify(getResult));       
          console.log(res);
          setpricelist(getResult);
        });
    }
    function toggleStatus(item){
      if(item.status == "active"){
        Axios.post(
          Url.idcardstatusurl,
          { user_id: loggedUser.id,st_id: item.id, status: "inactive" },
          { headers: { Token: token } }
        ).then((res) => {
          setactivetogprice(!activetogprice);
          
          console.log(res);
        });
      }
     
      else{
        Axios.post(
          Url.idcardstatusurl,
          { user_id: loggedUser.id, st_id: item.id, status: "active" },
          { headers: { Token: token } }
        ).then((res) => {
          setactivetogprice(!activetogprice);
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
            Url.pricelisturl,
            { user_id: loggedUser.id, 
              limit:1,
              //^ To do--------------------------------------------------------------------------
              
              //-----------------------
              price_id:data.Price_id
            },
            { headers: { Token: loggedUser.api_token } }
          ).then((res) => {
                  
            console.log(res);
            setpricelist(res.data.data);
          });
        }
  function cancelSearch(e){
    e.preventDefault();
    setSearch(search+1);
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
        <h1 className="m-0 text-dark">Manage User ID Card</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Manage User ID Card</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>
   
        
<div className="row" style={{clear: 'both', marginBottom: 10,marginRight: 10}}>
  <div className="col-md-12 " align="right" style={{clear: 'both'}}>
    
    <button className="btn btn-warning" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
      <i className="fa fa-search" />  
      Search
      </button>    
  </div>
</div>

<section className="content collapse multi-collapse" id="multiCollapseExample2">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-8 mx-auto">
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
                 <label >Price ID</label>
                 <input  className="form-control" 
                  type="text"
                  id="Price_id"
                  onChange={(e) => handle(e)}
                  value={data.Price_id}
                  placeholder="Price_id" />
               </div>              
               </div>
               
             </div>

             <div className="card-footer">
               <button type="submit" className="btn btn-warning mr-2"><i className="fa fa-search" />Search</button>
               <button className="btn btn-danger" onClick={cancelSearch}><i className="fa fa-back" />Cancel</button>
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
              <h3 className="card-title">ID Card List</h3>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-bordered table-hover table-sm">
               
                {<IdcardTable pricelist={pricelist} toggleStatus={toggleStatus}  />}
                                                  
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

export default Listuseridcard