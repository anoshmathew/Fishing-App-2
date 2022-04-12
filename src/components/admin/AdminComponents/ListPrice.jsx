import React,{useState,useEffect,useRef} from 'react'
import Axios from "axios";
import PriceTable from './PriceTable';
function ListPrice() {
    const url1 = "http://work.phpwebsites.in/fishing/api/pricelist";      
    const url2 = "http://work.phpwebsites.in/fishing/api/pricestatus";
    const url3 = "http://work.phpwebsites.in/fishing/api//pricedelete";
    const [pricelist, setpricelist] = useState([]);
    const [activetogprice, setactivetogprice] = useState(false)
    const [togdelprice, settogdelprice] = useState(false)
    var getResult ;
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    const token = loggedUser.api_token;
    const isMounted1 = useRef(false);
    const isMounted2 = useRef(false);
    useEffect(()=>{
        if (isMounted1.current){
            getData();
        }
        else {
          isMounted1.current = true;
        }
      },[activetogprice]);
      useEffect(()=>{
        if (isMounted1.current){
            getData();
        }
        else {
          isMounted2.current = true;
        }
      },[togdelprice]);

    useEffect(() => {
        getData();
        // loadData();
      }, []);
    async function getData() {
        Axios.post(
            url1,
            { user_id: loggedUser.id, limit:1},
            { headers: { Token: loggedUser.api_token } }
          ).then((res) => {
             getResult = res.data.data;  
            localStorage.setItem("pricedataist", JSON.stringify(getResult));       
            console.log(getResult);
            setpricelist(getResult);
          });
      }
      function toggleStatusPrice(item){
        if(item.status == "active"){
          Axios.post(
            url2,
            { user_id: loggedUser.id,price_id: item.id, status: "inactive" },
            { headers: { Token: token } }
          ).then((res) => {
            setactivetogprice(!activetogprice);
            
            console.log(res);
          });
        }
       
        else{
          Axios.post(
            url2,
            { user_id: loggedUser.id, price_id: item.id, status: "active" },
            { headers: { Token: token } }
          ).then((res) => {
            
            setactivetogprice(!activetogprice);
            console.log(res);
          });
        }
      }
      function delFun(item) {
        
        console.log(" User id: ", loggedUser.id, "deleting user id: ", item.id);
        
        Axios.post(
          url3,
          { user_id: loggedUser.id, price_id: item.id },
          { headers: { Token: token } }
        ).then((res) => {
          settogdelprice(!togdelprice);
          console.log("deleted");
    
          });
          
        }
      
  return (
    
    <div className="content-wrapper justify-content-center mt-5" >



<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Manage Price</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Manage Price</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>
        
    

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
               
                {<PriceTable pricelist={pricelist} toggleStatusPrice={toggleStatusPrice} activetogprice={activetogprice} setactivetogprice={setactivetogprice} delFun={delFun} />}
                                                  
              </table>
            </div>
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm float-right"> 
              <li className="page-item mr-2" >
          <a href="#" className="page-link">
            &laquo;
          </a>
          </li>
          <li className="page-item mr-2" >
          <a href="#" className="page-link">
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
    
  )
}

export default ListPrice