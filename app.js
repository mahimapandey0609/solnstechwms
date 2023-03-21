require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var alert = require("alert");


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));



mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/solnstechWMS", {useNewUrlParser : true});
// var emailbox =[];
var username ="";
var options="";

const userSchema = {
    email : String,
    options: String,
    password: String
}

const User = new mongoose.model("User", userSchema);

const adminSchema ={
    email : String,
    options: String,
    password: String
}
const Admin = new mongoose.model("Admin", adminSchema);

const leaveSchema ={
    empid: Number,
    ename : String,
    leavetype: String,
    leavefrom: Date,
    leaveto: Date,
    teammail: String,
    reason: String
}
const Leave = new mongoose.model("Leave", leaveSchema);

const employeedetailsSchema ={
    Empid :Number,
    Firstname: String,
   
    Nickname:String,
    employeemail :String,
    dept : String,
    designation:String,
    Streams:String,
    solnstechrole:String,
    emptype :String,
    empstatus :String,
    doj :Date,
    Currentexp:Number,
    sourceofhire:String,
    Totalexp:Number,
    reportingManager :String,
    dob:Date,
    expertise: String,
    age :Number,
    gender :String,
   maritalstatus:String,
    aboutme : String,
    uan :Number,
    pan:Number,
    aadhar:Number,
    wpno: Number,
    pno:Number,
    extension:String,
    pemail : String,
    seatinglocation:String,
    tags :String,
    street:String,
    city:String,
    state :String,
    pin:Number,
    country:String,
    street1:String,
    city2:String,
    state3 :String,
    pin4:Number,
    country5:String,
    doe:Date,
    perviouscompanyname:String,
    jobtitle:String,
    fromdate:Date,
    todate:Date,
    jobdescription:String,
    relevant: String,
    institutename :String,
    degree :String,
    specialization:String,
    doc:Date,
    dependentname:String,
    relation: String,
    relationdob: Date

}
const Employeedetails = new mongoose.model("Employeedetails", employeedetailsSchema);

const deptSchema = {
    deptName:String,
    Alias:String,
    parentDept:String,
    addedBy:String,
    addedTime :Date
}

const Department = new mongoose.model("Department", deptSchema);

const designationSchema ={
    desigName:String,
    Alias:String,
    addedBy :String,
    addedTime :Date
}
const Designation = new mongoose.model("Designation", designationSchema);

const exitdetailsSchema ={
    empName:String,
    sepDate:Date,
    interviewer :String,
    reason:String,
    workagain:String,
    likeabout:String,
    improveStaff:String,
    sharewithus:String,
    vehicle:String,
    equipment:String,
    library:String,
    security:String,
    exitInterview:String,
    notice:String,
    resignationletter:String,
    clearance:String
}
const Exitdetail = new mongoose.model("Exitdetail", exitdetailsSchema);

const timelogSchema ={
    name:String,
    pName:String,
    jName:String,
    workItem:String,
    logTime:Date,
    description:String,
    loghours:String,
    billableStatus:String
}
const Timelog = new mongoose.model("Timelog", timelogSchema);

const clockSchema ={
    Name : String,
    Todaysdate:String,
    clockintime: String,
    Clockouttime : String
}

const Clock = new mongoose.model("Clock", clockSchema);

const timesheetSchema ={
    name:String,
    period:String,
    employee:String,
    clients:String,
    projects:String,
    jobs:String,
    billableStatus:String
}
const Timesheet = new mongoose.model("Timesheet", timesheetSchema);

const approvalsSchema ={
    name:String,
    period:String,
    employee:String,
    clients:String,
    projects:String,
    jobs:String,
    billableStatus:String
}
const Approvals = new mongoose.model("Approvals", approvalsSchema);
const jobSchema={
    name:String,
    jobName:String,
    project:String,
    startDate:Date,
    endDate:Date,
    hours:String,
    billableStatus:String,
    assignedTo:String,
    workItem:String,
    description:String
}
const Job = new mongoose.model("Job",jobSchema);

const projectSchema ={
    name:String,
    projectName:String,
    clientName: String,
    projectCost:Number,
    projectHead:String,
    projectManager:String,
    projectUsers:String,
    description:String
}
const Project= new mongoose.model("Project",projectSchema);

const clientSchema ={
    name:String,
    clientName:String,
    currency:String,
    bilingmethod:String,
    clientId:String,
    clientfName:String,
    clientlName:String,
    clientPhone:String,
    clientfax:String,
    clientnumber:Number,
    streetaddress:String,
    clientcity:String,
    clientState:String,
    clientzip:Number,
    clientcountry:String,
    clientIndustry:String,
    clientcompanySize:String,
    Description:String
}

const Client = new mongoose.model("Client",clientSchema);

const jobscheduleSchema ={
    name:String,
    Cname:String,
    Pname:String,
    Jname:String,
    date:Date,
    Time:String,
    Description:String
}
const Jobschedule = new mongoose.model("Jobschedule", jobscheduleSchema);

const eventSchema = {
    name:String,
    Title: String,
    Description:String
}
const Event = new mongoose.model("Event", eventSchema);

app.get("/", function(req,res){
    res.render("home");
});
app.get("/home", function(req,res){
    res.render("home");
});

app.get("/employee", function(req, res){
   Event.find({name:username}, function(err, foundEvent){
    if(err){
        console.log(err);
    }
    else{
        if(foundEvent){
            res.render("employee",{events:foundEvent});
        }
    }
   })
  
   
});

app.get("/admin", function(req, res){
   res.render("admin");
});

app.get("/service", function(req,res){
res.render("service");
});



app.get("/calender", function(req,res){
    res.render("calender");
});

app.get("/listview", function(req,res){
if(options== "As Admin"){
    Leave.find({}, function(err, foundLeave){
        if(err){
            console.log(err);
        }else{
            if(foundLeave){
                res.render("listview" , {leave:foundLeave});
            }
        }
    });
}
else{
    Leave.find({ename:username},function(err, foundLeave){
        if(err){
            console.log(err);
        }else{
            if(foundLeave){
                res.render("listview" , {leave:foundLeave});
            }
        }
    });
}
});

app.get("/leaveapplication", function(req,res){
  
    if(options =="As Admin"){
        Leave.find({},function(err, foundLeave){
if(err){
    console.log(err);
        }
        else{
            if(foundLeave){
           
                res.render("leaveapplication" , {leave:foundLeave});
            }
        }

        });
    }

    else {
    Leave.find({ename:username},function(err, foundLeave){
        if(err){
            console.log(err);
        }else{
            if(foundLeave){
            //  console.log(foundLeave);
                res.render("leaveapplication" , {leave:foundLeave});
            }
        }
    });
}
});

app.get("/applyleave", function(req,res){
    res.render("applyleave");
});

app.get("/employeedata", function(req,res){

    if(options=="As Admin"){
        Employeedetails.find({},function(err, foundEmployee){
            if(err){
                console.log(err);
            }
            else{
                if(foundEmployee){
                    res.render("employeedata", {newEmployee : foundEmployee});
                }
            }
        })
    }
else{
    Employeedetails.find({Firstname:username}, function(err, foundEmployee){
        if(err){
           console.log(err);
        }
        else{
           if(foundEmployee){
               res.render("employeedata", {newEmployee : foundEmployee});
           }
        }
       });
    }
   });

app.get("/adddirectory", function(req,res){
    res.render("adddirectory");
});

app.get("/department", function(req,res){
   Department.find({}, function(err, foundDepartment){
    if(err){
        console.log(err);
    }
    else{
        if(foundDepartment){
            res.render("department", {department:foundDepartment});
        }
    }
    // console.log(department);
   });
});

app.get("/adddepartment", function(req,res){
    res.render("adddepartment");
   
});

app.get("/designation",function(req,res){
    Designation.find({}, function(err, foundDesignation){
        if(err){
            console.log(err);
        }
        else{
            if(foundDesignation){
                res.render("designation", {designation:foundDesignation});
            }
        }
    });
   
});

app.get("/adddesignation", function(req,res){
    res.render("adddesignation");
});

app.get("/exitdetails", function(req,res){
    Exitdetail.find({empname:username}, function(err, foundExitdetails){
        if(err){
            console.log(err);
        }
        else{
           if(foundExitdetails){
            res.render("exitdetails", {exitDetails:foundExitdetails});
           }
        }
    });
   
});

app.get("/addexitdetails", function(req,res){
    res.render("addexitdetails");
});

app.get("/self", function(req,res){

   Employeedetails.find({Firstname:username}, function(err, foundEmployee){
    if(err){
        console.log(err);
    }
    else{
        if(foundEmployee){
          
            res.render("self",{self:foundEmployee});
            // console.log(foundEmployee.Firstname);
          }
        }
    
    
   });
});
app.get("/timetracker", function(req,res){
    Timelog.find({name:username},function(err,foundtimelog){
        if(err){
            console.log(err);
        }
        else{
            if(foundtimelog){
                res.render("timetracker", {timelog:foundtimelog});
            }
        }
    });
   
});

app.get("/addtimelogs", function(req,res){
    res.render("addtimelogs");
});
app.get("/timesheet", function(req,res){
    Timesheet.find({name:username}, function(err,foundrecord){
        if(err){
            console.log(err);
        }
        else{
            if(foundrecord){
                res.render("timesheet", {record:foundrecord});
            }
        }
    });
   
});

app.get("/addtimesheets", function(req,res){
    res.render("addtimesheets");
});
app.get("/approvals", function(req,res){
    Approvals.find({name:username},function(err,foundapprovals){
        if(err){
            console.log(err);
        }
        else{
            if(foundapprovals){
                res.render("approvals",{record:foundapprovals});
            }
        }
    });
   
});

app.get("/addapprovals",function(req,res){
    res.render("addapprovals");
});
app.get("/jobs", function(req,res){
    Job.find({name:username},function(err,foundJob){
        if(err){
            console.log(err);
        }
        else{
            if(foundJob){
                res.render("jobs", {job:foundJob});
            }
        }
    })
   
});
app.get("/addjobs", function(req,res){
    res.render("addjobs");
});
app.get("/project", function(req,res){
Project.find({name:username},function(err,foundProject){
    if(err){
        console.log(err);
    }
    else{
        if(foundProject){
            res.render("project",{project:foundProject});
        }
    }
})

   
});
app.get("/addprojects", function(req,res){
    res.render("addprojects");
});
app.get("/clients", function(req,res){
    Client.find({name:username}, function(err, foundClient){
        if(err){
            console.log(err);
        }
        else{
            if(foundClient){
                res.render("clients",{clients:foundClient}); 
                // console.log(foundClient);
            }
        }
    });
 
});

app.get("/addclients", function(req,res){
    res.render("addclients");
});
app.get("/settimer", function(req,res){
    res.render("settimer");
});

app.get("/jobschedule", function(req,res){
    Jobschedule.find({name:username},function(err,foundjobschedule){
        if(err){
            console.log(err);
        }
        else{
            if(foundjobschedule){
                res.render("jobschedule",{jobschedule:foundjobschedule});
            }
        }
    });
   
});

app.get("/addjobschedule",function(req,res){
    res.render("addjobschedule");
});

app.get("/task", function(req,res){
    res.render("task");
});

app.get("/attendance",function(req,res){
    Clock.find({Name:username},function(err,foundrecord){
        if(err){
            console.log(err);
        }
        else{
            if(foundrecord){
                res.render("attendance", {record:foundrecord});
            }
        }
    });

});

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
   
      options = req.body.loginoptions;
  

    const newUser = new User({
        email : req.body.username,
        options : req.body.loginoptions,
        password : req.body.password
    });

    // console.log(newUser);

    var newAdmin = new Admin({
        email : req.body.username,
        options : req.body.loginoptions,
        password : req.body.password
    });

    //  console.log(newAdmin);

    if(options == "As Employee"){
    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
           res.redirect("/login")
          
        }
    });
    }

    else{
     newAdmin.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/login");
        }
     });
    }

});


app.post("/login", function(req, res){

    username = req.body.username;
    options = req.body.loginoptions;
    const password = req.body.password;
    if(options == "As Admin"){
        Admin.findOne({ email: username }, function (err, foundAdmin) {
            if (err) {
               console.log(err);
            } else {
                if (foundAdmin) {
                        if (foundAdmin.password === password) {
                            res.redirect("/admin");
                            alert("Thank You! Welcome to Admin Panel,You are Successfully Loggedin ");
                              
                        }
                    }
        }
    });
    }
    else{
        User.findOne({ email: username }, function (err, foundUser) {
            if (err) {
               console.log(err);
            } else {
                if (foundUser) {
                        if (foundUser.password === password) {
                            res.redirect("/employee");
                            alert("Thank You! Welcome to Employee Panel, You are Successfully Loggedin");
                              
                        }
                    }
        }
    });
    }

});

app.post("/applyleave", function(req,res){
const newLeave = new Leave({
    empid: req.body.empid,
    ename : req.body.ename,
    leavetype: req.body.leavetype,
    leavefrom: req.body.leavefrom,
    leaveto: req.body.leaveto,
    teammail:req.body.teammail,
    reason: req.body.reason
});
newLeave.save(function(err){
    if(err){
        console.log(err);
    }else{
        res.redirect("/leaveapplication");
    }
});

var availableLeave = 12;
var bookedLeave = 0; 

}) ;
app.post("/adddirectory", function(req,res){
  const newEmployee = new Employeedetails({
    Empid :req.body.Empid,
    Firstname: req.body.Firstname,
    // Lastname: req.body.Lastname,
    Nickname: req.body.Nickname,
    employeemail : req.body.employeemail,
    dept : req.body.dept,
    designation: req.body.designation,
    Streams: req.body.Streams,
    solnstechrole: req.body.solnstechrole,
    emptype : req.body.emptype,
    empstatus : req.body.empstatus,
    doj : req.body.doj,
    Currentexp: req.body.Currentexp,
    sourceofhire:req.body.sourceofhire,
    Totalexp: req.body.Totalexp,
    reportingManager : req.body.reportingManager,
    dob: req.body.dob,
    expertise: req.body.expertise,
    age : req.body.age,
    gender : req.body.gender,
    maritalstatus :req.body.maritalstatus,
    aboutme : req.body.aboutme,
    uan : req.body.uan,
    pan: req.body.pan,
    aadhar: req.body.aadhar,
    wpno: req.body.wpno,
    pno: req.body.pno,
    extension:req.body.extension,
    pemail : req.body.pemail,
    seatinglocation: req.body.seatinglocation,
    tags :req.body.tags,
    street: req.body.street,
    city: req.body.city,
    state :req.body.state,
    pin: req.body.pin,
    country:req.body.country,
    street1:req.body.street1,
    city2:req.body.city2,
    state3 :req.bodystate3,
    pin4:req.body.pin4,
    country5: req.body.country5,
    doe: req.body.doe,
    perviouscompanyname: req.body.perviouscompanyname,
    jobtitle: req.body.jobtitle,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
    jobdescription: req.body.jobdescription,
    relevant: req.body.relevant,
    institutename :req.body.institutename,
    degree : req.body.degree,
    specialization: req.body.specialization,
    doc: req.body.doc,
    dependentname: req.body.dependentname,
    relation: req.body.relation,
    relationdob: req.body.relationdob
  });
  newEmployee.save(function(err){
     if(err){
        console.log(err);
     }
     else{
        res.redirect("/employeedata");
     }
  });
});

app.post("/deleteLeave", function(req,res){
    const checkedItemId = req.body.checkbox;
    console.log(checkedItemId);
    Leave.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
          console.log("Record successfully deleted");
          res.redirect("/leaveapplication");
        }
      });
});
app.post("/deleteEmployee", function(req,res){
    const checkedItemId = req.body.checkbox;
    // console.log(checkedItemId);
    Employeedetails.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
        //   console.log("Record successfully deleted");
          res.redirect("/employeedata");
        }
      });
});
app.post("/deleteDepartment", function(req,res){
    const checkedItemId = req.body.checkbox;
    // console.log(checkedItemId);
    Department.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
        //   console.log("Record successfully deleted");
          res.redirect("/department");
        }
      });
});
app.post("/deleteDesignation", function(req,res){
    const checkedItemId = req.body.checkbox;
    // console.log(checkedItemId);
    Designation.findByIdAndRemove(checkedItemId , function(err){
        if(err){
        console.log(err);
        }else{
        //   console.log("Record successfully deleted");
          res.redirect("/designation");
        }
      });
});
app.post("/adddepartment", function(req,res){
const newDepartment= new Department({
    deptName: req.body.deptName,
    Alias: req.body.Alias,
    parentDept: req.body.parentDept,
    addedBy:  req.body.addedBy,
    addedTime : req.body.addedTime
});

newDepartment.save(function(err){
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/department")
    }
});
});

app.post("/adddesignation", function(req,res){
    const newDesignation = new Designation({
        desigName: req.body.desigName,
        Alias: req.body.Alias,
        addedBy : req.body.addedBy,
        addedTime : req.body.addedTime
    });
    newDesignation.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/designation");
        }
    });
});

app.post("/addexitdetails", function(req,res){
const newExitdetails = new Exitdetail({
    empName:req.body.empName,
    sepDate:req.body.sepDate,
    interviewer:req.body.interviewer,
    reason:req.body.reason,
    workagain:req.body.workagain,
    likeabout:req.body.likeabout,
    improveStaff:req.body.improveStaff,
    sharewithus:req.body.sharewithus,
    vehicle:req.body.vehicle,
    equipment:req.body.equipment,
    library:req.body.library,
    security:req.body.security,
    exitInterview:req.body.exitInterview,
    notice:req.body.notice,
    resignationletter:req.body.resignationletter,
    clearance:req.body.clearance
});
newExitdetails.save(function(err){
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/exitdetails");
    }
});
});

app.post("/addtimelogs", function(req,res){
    const newTimelog = new Timelog({
        name:req.body.name,
        pName:req.body.pName,
        jName:req.body.jName,
        workItem:req.body.workItem,
        logTime:req.body.logTime,
        description:req.body.description,
        loghours:req.body.loghours,
        billableStatus:req.body.billableStatus
    });
    newTimelog.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("timetracker")
        }
    });
});

app.post("/addtimesheets", function(req,res){
    const newTimesheet = new Timesheet({
        name:req.body.name,
        period:req.body.period,
        employee:req.body.employee,
        clients:req.body.clients,
        projects:req.body.projects,
        jobs:req.body.jobs,
        billableStatus:req.body.billableStatus
    });
    newTimesheet.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/timesheet");
        }
    });
});

app.post("/addapprovals",function(req,res){
    const newApprovals= new Approvals({
        name:req.body.name,
        period:req.body.period,
        employee:req.body.employee,
        clients:req.body.clients,
        projects:req.body.projects,
        jobs:req.body.jobs,
        billableStatus:req.body.billableStatus
    });
    newApprovals.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/approvals");
        }
    });
});

app.post("/addjobs", function(req,res){
    const newJob = new Job({
        name:req.body.name,
        jobName:req.body.jobName,
        project:req.body.project,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        hours:req.body.hours,
        billableStatus:req.body.billableStatus,
        assignedTo:req.body.assignedTo,
        workItem:req.body.workItem,
        description:req.body.description

    });
    newJob.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/jobs");
        }
    });
});

app.post("/addprojects", function(req,res){
    const newProject = new Project({
        name:req.body.name,
    projectName:req.body.projectName,
    clientName: req.body.clientName,
    projectCost:req.body.projectCost,
    projectHead:req.body.projectHead,
    projectManager:req.body.projectManager,
    projectUsers:req.body.projectUsers,
    description:req.body.description
    });

    newProject.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/project");
        }
    });
});
app.post("/addclients", function(req,res){
    const newClient = new Client({
        name:req.body.name,
    clientName:req.body.clientName,
    currency:req.body.currency,
    bilingmethod: req.body.bilingmethod,
    clientId: req.body.clientId,
    clientfName:req.body.clientfName,
    clientlName: req.body.clientlName,
    clientPhone:req.body.clientPhone,
    clientfax:req.body.clientfax,
    clientnumber:req.body.clientnumber,
    streetaddress:req.body.streetaddress,
    clientcity:req.body.clientState,
    clientState:req.body.clientState,
    clientzip:req.body.clientzip,
    clientcountry:req.body.clientcountry,
    clientIndustry:req.body.clientIndustry,
    clientcompanySize:req.body.clientcompanySize,
    Description:req.body.Description
    });
    newClient.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/clients");
        }
    });
});

app.post("/addjobschedule", function(req,res){
    const newJobschedulle = new Jobschedule({
        name:req.body.name,
        Cname:req.body.Cname,
        Pname:req.body.Pname,
        Jname:req.body.Jname,
        date:req.body.date,
        Time:req.body.Time,
        Description:req.body.Description
    });
    newJobschedulle.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/jobschedule");
        }
    });
});

app.post("/addevent", function(req, res){
    const newEvent = new Event({
        name:req.body.name,
        Title: req.body.Title,
        Description:req.body.Description
    });
    newEvent.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/employee");
        }
    });
});

app.post("/clockin", function(req,res){
    var today = new Date();
  
    var time = today.getHours()+":"+today.getMinutes()+":"+ today.getSeconds();
    const newclock = new Clock({
        Name:username,
        Todaysdate:today,
        clockintime:time
    });
    newclock.save(function(err){
        if(err){
            console.log(err);
        }
        else{
           res.redirect("/attendance");
        }
    });
    
});

app.post("/clockout", function(req,res){
    var today = new Date();
// console.log(today);
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // Clock.updateOne({Name:username}, {$set:{clockouttime:time}},{ upsert: true });
    Clock.findOneAndUpdate({Name:username},{$set:{Clockouttime:time}},{new:true}, function(err){
        if(!err){
            
         res.redirect("/attendance");
        }
         }).sort({_id : -1})
        });

app.listen(3000, function(){
    console.log("Server started on port 3000");
});