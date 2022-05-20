import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function FishingRequestTable(param) {
  return (
    <>
        
    <thead>
<tr>
          <th>ID</th>            
          <th>Name</th>
          <th>City</th>   
          <th>Email</th>            
          <th>Start Date</th>
          <th>End Date</th>   
          <th>Amount</th>            
          <th>Days</th>
          <th>Purchase Date</th>   
          <th>Email</th>      
          <th>Fish Caught</th>      
          <th>Open For Edit</th>
          <th>Actions</th>                           
</tr>
</thead>
<tbody>
        {param.fishingRequestList.map((item) => (
          
        <tr key={item.id}>
            <td >{item.id}</td>
            <td>{item.name}</td>
            <td>{item.city}</td>
            <td>{item.email}</td>
            <td>{item.start_date}</td>
            <td>{item.close_date}</td>
            <td >{item.amount}</td>
            <td>{item.days}</td>
            <td>{item.pur_date}</td>
            <td>{item.email}</td>
            <td><Link type="button" className="btn btn-inline btn-warning mr-1"  to="../listfishcatch" state={item}><i className="fa fa-edit" /></Link></td>
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