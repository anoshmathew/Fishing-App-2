import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function OpenReqTable(param) {
    var loggedUser = JSON.parse(localStorage.getItem("data"));
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
          <th>Purchase Date</th> 
          <th>Amount</th>            
          <th>Days</th>  
          
          <th>Fish Caught</th>      
                                     
</tr>
</thead>
<tbody>
        {param.fishingRequestList.filter((item)=>item.user_id == loggedUser.id).map((item) => (
          
        <tr key={item.id}>
            <td >{item.id}</td>
            <td>{item.name}</td>
            <td>{item.city}</td>
            <td>{item.email}</td>
            <td>{item.formatted_stdate}</td>
            <td>{item.formatted_closdate}</td>
            <td>{item.formatted_edate}</td>
            <td >{item.amount}$</td>
            <td>{item.days}</td>
                       
            <td><Link type="button" className="btn btn-inline btn-warning mr-1"  to="../listfishcatch" state={item}><b>View</b></Link></td>
                      
        </tr>                     
        ))}

</tbody>
</>
  )
}

export default OpenReqTable