//jshint esversion:6
const bodyparser=require("body-parser");
const express=require("express");
const request=require("request");
const https = require('https');

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstname  = (req.body.Fname);
  const lastname = (req.body.Lname);
  const mail =(req.body.email);

  const data={
    members:[
      {
        email_address:mail,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };
  const jsondata=JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/bf2e19848c";
  const options={
    method:"POST",
    auth:"Bikshu:daf8a0fc9f48a915e10ef9a5ff0e2f7f-us6"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode == 200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();

});
app.post("/failure",function(req,res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});


// daf8a0fc9f48a915e10ef9a5ff0e2f7f-us6
// bf2e19848c
