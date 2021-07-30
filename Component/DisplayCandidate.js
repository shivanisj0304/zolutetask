import MaterialTable from "material-table"
import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices"
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import { isBlank } from "./Checks"
import renderHTML from "react-render-html"
//import state from "sweetalert/typings/modules/state";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
    },
    subdiv:{
       padding:20,
       width:900,
       marginTop:20,
       background:'#f1f2f6'
       },
     input: {
    display: 'none',
  },
formControl: {
    minWidth: 690,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DisplayCandidate(props)
{ const[list,setList]=useState()
  const classes = useStyles();
  //////////////////////////Edit Form//////////////////////////////
  
  const [userId,setUserId]=useState('')
  const [candidateName,setCandidateName]=useState('');
 
//   var firstname=name[0];
//   var lastname=name[1];
  const [candidateFirstName,setCandidateFirstName]=useState('');
  const [candidateLastName,setCandidateLastName]=useState('');
  const [candidateEmail,setCandidateEmail]=useState('');
  const [candidatePhone,setCandidatePhone]=useState('');

 
    
  const [getRowData,setRowData]=useState([])
 
  const handleDelete=async()=>{
    var body={userid:userId}
  var result=await postData("candidate/deleteuser",body)
  if(result)
  {
   swal({
     title: "user Deleted Successfully",
     icon: "success",
     dangerMode: true,
   })
  }
else
{
 swal({
   title: "Fail to Deleted User",
   icon: "success",
   dangerMode: true,
 })
}
  }
  const handleClick=async()=>{
    var error=false
        var msg="<div>"
        if(isBlank(candidateFirstName))
        {error=true
        msg+="<font color='#b2bec3'><b>TaskTitle must be filled</b></font><br>";
        }
        if(isBlank(candidateLastName))
        {error=true
        msg+="<font color='#b2bec3'><b>TaskDescription must be filled</b></font><br>";
        }
        if(isBlank(candidateEmail))
        {error=true
        msg+="<font color='#b2bec3'><b>TaskAssigned must be filled</b></font><br>";
        }
        if(isBlank(candidatePhone))
        {error=true
          msg+="<font color='#b2bec3'><b>Pls fill the DATE</b></font><br>";
        }
        msg+="</div>"
        if(error)
        {
         swalhtml(renderHTML(msg))
        }

    else
    {
   var body={userid:userId,
           firstname:candidateFirstName,
           lastname:candidateLastName,
           email:candidateEmail,
           phone:candidatePhone
           

    }
   
   var result=await postData('candidate/edituser',body)
   if(result)
   {
    swal({
      title: "candidate Updated Successfully",
      icon: "success",
      dangerMode: true,
    })
   }
  }
 }
 
 const editFormView=()=>{
    return(<div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
                        Candidate
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField value={candidateFirstName} onChange={(event)=>setCandidateFirstName(event.target.value)} label="First Name" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField value={candidateLastName} onChange={(event)=>setCandidateLastName(event.target.value)} label="Last Name" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={candidateEmail} onChange={(event)=>setCandidateEmail(event.target.value)} label="Email" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={candidatePhone} onChange={(event)=>setCandidatePhone(event.target.value)} label="Phone" variant="outlined" fullWidth/>
                </Grid>
                
            </Grid> 
        </div>
    </div>)
 }




  ////////////////////////////////////////////////////////////////////
///////////////////////////Edit Dialog ///////////////////////////////

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    setUserId(rowData.userid)
    setCandidateName(rowData.name)
    var name = rowData.name.split(" ");
    setCandidateFirstName(name[0])
    setCandidateLastName(name[1])
    setCandidateEmail(rowData.email)
    setCandidatePhone(rowData.phone)
    
    
  };

  const handleClose = () => {
    setOpen(false);
    fetchUser()
  };

  const showEditdialog=()=>{
    return (
      <div>
        
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit/Delete User
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClick}>
                Update
              </Button>
              <Button autoFocus color="inherit" onClick={handleDelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          {editFormView()}
        </Dialog>
      </div>
    );

  }
  ///////////////////////////////////////////////////////////////////
const fetchUser=async()=>{
var result=await getData("candidate/displayall")
setList(result)

}
useEffect(function(){
    fetchUser()

},[])


function displayall() {
    return (
      <div>
      <MaterialTable
        title="Pending Task"
        columns={[
         { title: 'Id', field: 'userid' },
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email' },
          { title: 'Phone', field: 'phone' },
          
        ]}
        data={list}       
        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Task',
            onClick: (event, rowData) =>handleClickOpen(rowData)
          },
        ]}
      />
      {showEditdialog()}
      </div>
    )
  }
  return( <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<div style={{width:1200,marginTop:90,padding:3}}>
{displayall()}
</div>

  </div>
  )
  
}