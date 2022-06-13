import React,{useEffect,useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

function OpenReqTable(param) {
  const [list, setlist] = useState([])
  const date = new Date()
  const day = date.getDate();
const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
const year = date.getFullYear();
const str = `${day}/${month}/${year}`;

useEffect(() => {
  filtDate()
}, [])

  function filtDate() 
  {
    //setlist(param.fishingRequestList.filter((item)=>((item.user_id == loggedUser.id) && (item.open_edit == "yes")&&(new Date(item.end_date).getTime() == new Date().getTime() )&&(new Date(item.start_date).getTime() == new Date().getTime() )
    //  )))
    setlist(param.fishingRequestList.filter((item)=>( (item.user_id == loggedUser.id) && ( (parseInt(item.end_date.substring(0, 4))) > year)  ) 
    ))
  }
 
    if(list.length > 0){
      console.log(new Date(list[0].end_date).getTime())
      console.log(new Date(date).getTime())
    }
  
  
    
    
     
    
// const dateVar = new Date('07-06-2022')
//console.log(new Date().format('DD-MM-YYYY'));  
//&&(today.format('DD-MM-YYYY').isAfter('2019-01-01'))
//console.log(moment().format('DD-MM-YYYY')+' sdac');
//console.log(moment(moment().format('YYYY-MM-DD')).isAfter('2022-06-01')); 
   
    var loggedUser = JSON.parse(localStorage.getItem("data"));
  
    return (
    <>
        
    <thead>
<tr>
          <th>ID</th>            
          <th>Name</th>
          <th>Start Date</th>
          <th>End Date</th>   
          <th>Close Date</th> 
          <th>Amount</th>            
          <th>Days</th>     
          <th>Details</th>       
          <th>Fish Caught</th>      
                                     
</tr>
</thead>
<tbody>
        {param.fishingRequestList.filter((item)=>(

          (item.user_id == loggedUser.id) && (
          
            (
              (new Date(date).getTime() < new Date(item.end_date).getTime()) && 
              (new Date(date).getTime() >= new Date(item.start_date).getTime())
            )
            ||
            (item.open_edit == "yes")
          )

        )).map((item) => (
          
        <tr key={item.id}>
            <td >{item.id}</td>
            <td>{item.name}</td>
            
           
            <td>{item.formatted_stdate}</td>           
            <td>{item.formatted_edate}</td>
            <td>{item.formatted_closdate}</td>
            <td >${item.amount}</td>
            <td>{item.days} days</td>
            <td><button type="button" className="btn btn-inline btn-warning mr-1" onClick={() => param.detailsClicked(item)} data-toggle="modal" data-target="#modal-xl">
            <b>Details</b>
                            </button></td>
            <td><Link type="button" className="btn btn-inline btn-warning mr-1"  to="../listfishcatch" state={item}><b>Enter Catch</b></Link></td>
                      
        </tr>                     
        ))}

</tbody>
</>
  )
}

export default OpenReqTable