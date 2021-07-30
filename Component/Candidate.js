import React,{useEffect, useState} from "react"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import {postData,getData, postDataAndImage} from "./FetchNodeServices";
import{isBlank} from "./Checks"
import renderHTML from "react-render-html";


 
const useStyles = makeStyles((theme) =>({
 root:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center'
 },
 subdiv:{
     padding:20,
     width:700,
     marginTop:20,
     background:'#FFF'
    
 },
 input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 690,
  },
}));
export default function Candidate(props)
{
    const classes = useStyles();
    
    const [candidateFirstName,setCandidateFirstName]=useState('');
    const [candidateLastName,setCandidateLastName]=useState('');
    const [candidateEmail,setCandidateEmail]=useState('');
    const [candidatePhone,setCandidatePhone]=useState('');
    

  const handleClick=async()=>{
      var error=false
      var msg="<div>"
      if(isBlank(candidateFirstName))
      {error=true
        msg+="<font color='#e74c3c'><b>Candidate FirstName should not be blank</b></font><br>"
      }
      if(isBlank(candidateLastName))
      {error=true
        msg+="<font color='#e74c3c'><b>Candidate LastName should not be blank</b></font><br>"
      }
      if(isBlank(candidateEmail))
      {error=true
        msg+="<font color='#e74c3c'><b>Candidate Email should not be blank</b></font><br>"
      }
      if(isBlank(candidatePhone))
      {error=true
        msg+="<font color='#e74c3c'><b>Candidate Phone should not be blank</b></font><br>"
      }
      
       msg+="</div>"
      if(error)
      {
          swalhtml(renderHTML(msg))
      }
     else
     {
      var formData=new FormData()
      formData.append("firstname",candidateFirstName)
      formData.append("lastname",candidateLastName)
      formData.append("email",candidateEmail)
      formData.append("phone",candidatePhone)
      
      var config = {headers:{"content-type":"multipart/form-data"}}
      var result=await postDataAndImage('candidate/addnewcandidate',formData,config)
    if(result)
    {
        swal({
            title: "Candidate Submitted Successfully ",
            icon: "success",
            dangerMode: true,
          })
    }
    }
    }

    return(<div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{fontSize:22,fontWeight:700, letterSpacing:2, padding:20}}>
                        Candidate Interface
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField onChange={(event)=>setCandidateFirstName(event.target.value)} label="First Name" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField onChange={(event)=>setCandidateLastName(event.target.value)} label="Last Name" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(event)=>setCandidateEmail(event.target.value)} label="Email" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(event)=>setCandidatePhone(event.target.value)} label="Phone" variant="outlined" fullWidth/>
                </Grid>
                
                    <Grid item xs={12}  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button onClick={()=>handleClick()}fullWidth variant="contained" color="primary">Save</Button>
                    </Grid>
            </Grid> 
        </div>
    </div>)
}