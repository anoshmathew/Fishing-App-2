const baseUrl = "http://work.phpwebsites.in/fishing/api/";
const Url = {
  loginurl: baseUrl + "login",
  passreseturl: baseUrl + "resetpassword",

  listfishurl: baseUrl + "fishlist",
  fishstatusurl: baseUrl + "fishstatus",
  fishdeleteurl: baseUrl + "fishdelete",
  editfishurl: baseUrl + "editfish",
  creatfishurl: baseUrl + "fishcreate",
  
  userstatusurl: baseUrl + "userstatus",
  userlisturl: baseUrl + "userslist",
  edituserurl: baseUrl + "edituser",
  userdeleteurl: baseUrl + "userdelete",

  userdetailsurl: baseUrl + "userdetail",
  uploadphotourl: baseUrl + "uploadph",

  pricelisturl: baseUrl + "pricelist",
  pricestatusurl: baseUrl + "pricestatus",
  pricedeleteurl: baseUrl + "pricedelete",
  editpriceurl: baseUrl + "editprice",


  listidcardurl: baseUrl + "listcard",
  idcardstatusurl: baseUrl + "idstatus",

  catchfishurl: baseUrl + "catfishlist",

  addfishcaught: baseUrl + "catfish",

  uploadidurl: baseUrl + "uploadid",
  fishreqflagurl: baseUrl + "fishreqflag",
  createfishrequrl: baseUrl + "fishreq",
  fishreqlisturl: baseUrl + "fishreqlist",
  fishreqopenediturl: baseUrl + "fishreqopenedit",
  fishreqdeleteurl: baseUrl + "fishreqdelete",
};

export { Url };
