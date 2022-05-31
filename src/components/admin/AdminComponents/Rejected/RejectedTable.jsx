import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function RejectedTable(param) {
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
              {param.pricelist.filter((item)=>item.status=="Rejected").map((item) => (
                
              <tr key={item.id}>
                  <td >{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.card_name}</td>
                  <td>{item.status}</td>
                  <td>{item.user_id}</td>
                
                  <td>
               
                      <a role="button" className="btn btn-primary mr-1" onClick={() => param.toggleConfirm(item)} >{<i className="fas fa-check"></i>}</a>
                     
                  </td>    
                         
              </tr>                     
              ))}
  
      </tbody>
      </>
    )
  }

export default RejectedTable