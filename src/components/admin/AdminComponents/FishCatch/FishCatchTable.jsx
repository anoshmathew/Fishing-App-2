import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function FishCatchTable(param) {
  return (
    <>
        
    <thead>
<tr>
          <th>ID</th>        
          <th>Req ID</th>     
          <th>Fish Name</th>
          <th>Fish Weight</th>      
          <th>Status</th>
            
          <th>Created Date</th>                             
</tr>
</thead>
<tbody>
        {param.fishingCatchList.map((item) => (
        
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.req_id}</td>
            <td>{item.fish_name}</td>
            <td>{item.fish_weight} Kg</td>
            
            <td>{item.status}</td>
           
            <td >{item.created_date}</td>    
                        
        </tr>                     
        ))}

</tbody>
</>
  )
}

export default FishCatchTable