import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function FishTable(param) {
  return (
    <div>
        
        <thead>
    <tr>
              <th>ID</th>            
              <th>Fish Name</th>
              <th>Status</th>                           
    </tr>
  </thead>
  <tbody>
            {param.fishlist.map((item) => (
              
            <tr key={item.id}>
                <td >{item.id}</td>
                <td>{item.name}</td>
                
                <td>
                <Link type="button" className="btn btn-inline btn-warning mr-1"  to="../editfishform" state={item}><i className="fa fa-edit" /></Link>
                    <a role="button" className="btn btn-primary mr-1" onClick={() => param.toggleStatusFish(item)} >{item.status=='active'?<i className="fas fa-lock-open"></i>:<i className="fas fa-lock"></i>}</a>
                    <a role="button" className="btn btn-danger mr-1" onClick={() => param.delFun(item)} ><i className="fas fa-trash-alt"></i></a>            
               </td>             
            </tr>                     
            ))}

    </tbody>
    </div>
  )
}

export default FishTable