import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function IdcardTable(param) {
    return (
      <>
          
          <thead>
      <tr>
                <th>ID</th>
               
                <th>Name</th>
                <th>Card Name</th>
                <th>Status</th>
                <th>User ID</th>
                <th>Approve</th>
      </tr>
    </thead>
    <tbody>
              {param.pricelist.map((item) => (
                
              <tr key={item.id}>
                  <td >{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.card_name}</td>
                  <td>{item.status}</td>
                  <td>{item.user_id}</td>
                
                  <td>
               
                      <a role="button" className="btn btn-primary mr-1" onClick={() => param.toggleStatus(item)} >{item.status=='active'?<i className="fas fa-lock-open"></i>:<i className="fas fa-lock"></i>}</a>
                     
                  </td>             
              </tr>                     
              ))}
  
      </tbody>
      </>
    )
  }

export default IdcardTable