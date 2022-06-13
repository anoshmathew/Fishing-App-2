import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function FishingRequestTable(param) {
  return (
    <>
        
    <thead>
<tr>
          <th>ID</th>            
          <th>Name</th>
         <th>Card Name</th>
          <th>Start Date</th>
          <th>End Date</th>   
          <th>Purchase Date</th> 
          <th>Amount</th>            
          <th>Days</th>  
          
          <th>Fish Caught</th>      
          <th>Open For Edit</th>
          <th>Actions</th>                           
</tr>
</thead>
<tbody>
        {param.fishingRequestList.map((item) => (
          
        <tr key={item.id}>
            <td >{item.id}</td>
            
            <td style={{cursor:"pointer",color:"blue",textDecoration:"underline"}} onClick={() => param.detailsClicked(item)} data-toggle="modal" data-target="#modal-xl3"><a>
              <b>{item.name}</b>
            </a></td>
            <td>{item.card_name}</td>     
            <td>{item.formatted_stdate}</td>
            <td>{item.formatted_closdate}</td>
            <td>{item.formatted_edate}</td>
            <td >${item.amount}</td>
            <td>{item.days}</td>
                       
            <td><Link type="button" className="btn btn-inline btn-warning mr-1"  to="../listfishcatch" state={item}><b>View</b></Link></td>
            <td>
            <a role="button" className="btn btn-primary mr-1" onClick={() => param.toggleStatusFish(item)} >{item.open_edit=='no'?<i className="fas fa-lock-open"></i>:<i className="fas fa-lock"></i>}</a>
            </td>
            <td>
            {/*<Link type="button" className="btn btn-inline btn-warning mr-1"  to="../editfishreq" state={item}><i className="fa fa-edit" /></Link>*/}
                
                <a role="button" className="btn btn-danger mr-1" onClick={() => param.delFun(item)} ><i className="fas fa-trash-alt"></i></a>            
           </td>             
        </tr>                     
        ))}

</tbody>
</>
  )
}

export default FishingRequestTable