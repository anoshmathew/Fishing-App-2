import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Url } from '../../../constants/global';
function TableComponent(param) {
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    const [idcard, setidcard] = useState(null)
    
    console.log(param.list2);
  return (
    <>
                     <thead>
                  <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Mobile</th>
                            <th>User Type</th>
                            {loggedUser.user_type == "admin" ?<th>Action</th>:null}
                            
                            <th>User Details</th>      
                            <th>User ID Card</th>                     
                  </tr>
                </thead>
                <tbody>
                          {loggedUser.user_type == "admin" ? param.list2.filter(item => item.username != loggedUser.username ).map((item) => (
                            <>
                            <tr key={item.id}>
                              <td className="center">{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.username}</td>
                              <td>{item.mobile}</td>
                              <td>{item.user_type}</td>                   
                              <td>
                                <Link type="button" className="btn btn-inline btn-warning mr-1"  to="../edituserform" state={item}><i className="fa fa-edit" /></Link>
                                <a role="button" className="btn btn-primary mr-1" onClick={() => param.toggleStatus(item)}>{item.status=='active'?<i className="fas fa-lock-open"></i>:<i className="fas fa-lock"></i> }</a>
                                <a role="button" className="btn btn-danger mr-1" onClick={() => param.delFun(item)} ><i className="fas fa-trash-alt"></i></a>
                              </td>
                              {/*<td>
                                <button className="btn btn-warning" type="button" onClick={() => param.toggleShown(item.username)}>{param.detailsShown.includes(item.username) ? <i className="fa fa-angle-double-up" />:<i className="fa fa-angle-double-down" />}</button>
                          </td>*/}
                             <td>
                             <button type="button" onClick={() => param.detailsClicked(item)} className="btn btn-success" data-toggle="modal" data-target="#modal-xl1">
                                   User Detail
                            </button>
                            </td>
                            <td><button type="button" onClick={() => param.detailsClicked(item)} className="btn btn-success" data-toggle="modal" data-target="#modal-xl2">
                                   ID Card</button>
                            </td>


                            </tr>
                            {param.detailsShown.includes(item.username) && (
                              <tr key={item.id} className="additional-info">
                              <td colSpan="7">{"Password: " + item.password}</td>
                            </tr>
                            )}
                            </>                      
                          )):loggedUser.user_type == "employee"?   
                          param.list2.filter(item => item.username != loggedUser.username && item.user_type=="user" ).map((item) => (
                            <>
                            <tr key={item.id}>
                              <td className="center">{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.username}</td>
                              <td>{item.mobile}</td>
                              <td>{item.user_type}</td> 
                             {/*<td>
                                <button className="btn btn-warning" type="button" onClick={() => param.toggleShown(item.username)}>{param.detailsShown.includes(item.username) ? <i className="fa fa-angle-double-up" />:<i className="fa fa-angle-double-down" />}</button>
                          </td>*/}
                          <td>
                            <button type="button" onClick={() => param.detailsClicked(item)} className="btn btn-success" data-toggle="modal" data-target="#modal-xl1">View</button>
                          </td>
                          <td><button type="button" onClick={() => param.detailsClicked(item)} className="btn btn-success" data-toggle="modal" data-target="#modal-xl2">View</button>
                          </td>
                          </tr>
                            {param.detailsShown.includes(item.username) && (
                              <tr key={item.id} className="additional-info">
                              <td colSpan="7">{"Password: " + item.password}</td>
                            </tr>
                            )}
                            </>                      
                          )):null                         
                          }
       
                  </tbody>
                  </>
  )
}

export default TableComponent