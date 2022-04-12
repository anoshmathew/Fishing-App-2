import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function PriceTable(param) {
  return (
    <div>
        {console.log(param.pricelist)}
        <thead>
    <tr>
              <th>ID</th>
             
              <th>Card Name</th>
              <th>Card Type</th>
              <th>Days</th>
              <th>Price</th>
              <th>Status</th>                           
    </tr>
  </thead>
  <tbody>
            {param.pricelist.map((item) => (
              
            <tr key={item.id}>
                <td >{item.id}</td>
                <td>{item.card_name}</td>
                <td>{item.card_type}</td>
                <td>{item.days}</td>
                <td>{item.price}</td>
                <td>
                    <a role="button" className="btn btn-primary mr-1" onClick={() => param.toggleStatusPrice(item)} >{item.status=='active'?<i className="fas fa-lock-open"></i>:<i className="fas fa-lock"></i>}</a>
                    <a role="button" className="btn btn-danger mr-1" onClick={() => param.delFun(item)} ><i className="fas fa-trash-alt"></i></a>                              
                </td>             
            </tr>                     
            ))}

    </tbody>
    </div>
  )
}

export default PriceTable