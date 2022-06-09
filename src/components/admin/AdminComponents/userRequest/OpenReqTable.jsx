import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function OpenReqTable(param) {
  const today = new Date()
//console.log(new Date().format('DD-MM-YYYY'));  
//&&(today.format('DD-MM-YYYY').isAfter('2019-01-01'))
//console.log(moment().format('DD-MM-YYYY')+' sdac');
//console.log(moment(moment().format('YYYY-MM-DD')).isAfter('2022-06-01')); 
    //if(new Date().getTime()>new Date('01-01-2010').getTime())
    //{
      //console.log(new Date('02-01-2010') + 'is the Smallest')
    //}
    var loggedUser = JSON.parse(localStorage.getItem("data"));
  return (
    <>
        
    <thead>
<tr>
          <th>ID</th>            
          <th>Name</th>
          
              
          <th>Start Date</th>
          <th>End Date</th>   
          <th>Purchase Date</th> 
          <th>Amount</th>            
          <th>Days</th>     
          <th>Details</th>       
          <th>Fish Caught</th>      
                                     
</tr>
</thead>
<tbody>
        {param.fishingRequestList.filter((item)=>((item.user_id == loggedUser.id) ||(item.open_edit == "yes")//&&(new Date(item.end_date).getTime() > new Date().getTime() )&&(new Date(item.start_date).getTime() >= new Date().getTime() )
        )).map((item) => (
          
        <tr key={item.id}>
            <td >{item.id}</td>
            <td>{item.name}</td>
            
           
            <td>{item.formatted_stdate}</td>
            <td>{item.formatted_closdate}</td>
            <td>{item.formatted_edate}</td>
            <td >${item.amount}</td>
            <td>{item.days}</td>
            <td><button type="button" className="btn btn-inline btn-warning mr-1" onClick={() => param.detailsClicked(item)} data-toggle="modal" data-target="#modal-xl">
                                   Details
                            </button></td>
            <td><Link type="button" className="btn btn-inline btn-warning mr-1"  to="../listfishcatch" state={item}><b>View</b></Link></td>
                      
        </tr>                     
        ))}

</tbody>
</>
  )
}

export default OpenReqTable