import { useState } from "react";
import { format } from "date-fns";
import { toZonedTime  } from 'date-fns-tz';
import { useNavigate } from "react-router-dom";

export default function Add() {

    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate();

    const now = new Date();
    const timeZone = 'America/New_York';
  
    // Convert to the desired timezone (EST/EDT for New York)
    const estDate = toZonedTime(now, timeZone);
  
    // Format the date according to your needs
    const estDateString = format(estDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });


    async function handleSubmit(event){
        event.preventDefault()

        const formData = new FormData(event.target)
        const visitor = Object.fromEntries(formData.entries())

        if(!visitor.name || !visitor.company || !visitor.email || !visitor.phone 
            || !visitor.personV || !visitor.purpose || !visitor.signIn ){

                alert("Please fill out all the data..!")
                return
        }

        try{
            const response = await fetch("http://localhost:4000/visitors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(visitor),
            });
            if( response.ok){
                //alert(formData)
                navigate("/")
            }
            else if (response.status === 400) {
                const data = await response.json();
                setValidationErrors(data);
            }
            else{
                alert("Failed to create the record..!")
            }
        }
        catch(error){
            alert("Failed to connect with the server..!")

        }
    

    }
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                <h2 className="text-center mb-5">Add Visitor's Details</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div class="row mb-3">
                    <label className="col-sm-4 col-form-lable" for="">Name</label>
                        <div className="col-sm-8">
                            <input type="text" class="form-control" placeholder="Enter Name" aria-label="name" name="name"></input>
                            <span className="text-danger">{validationErrors.name}</span>
                        </div>          
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-4 col-form-lable" for="">Company</label>
                        <div className="col-sm-8">                    
                            <input type="text" class="form-control" placeholder="Enter Company's Name" aria-label="cname" name="company"></input>
                            <span className="text-danger">{validationErrors.company}</span>
                        </div>
                    </div>
                    
                    <div className="row mb-3">
                    <label className="col-sm-4 col-form-lable" for="">Email</label>
                        <div className="col-sm-8">                        
                            <input type="email" class="form-control" placeholder="Enter Email Id" id="inputEmail4" name="email"/>
                            <span className="text-danger">{validationErrors.email}</span>
                        </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-4 col-form-lable" for="">Phone</label>
                        <div className="col-sm-8">                        
                            <input type="text" class="form-control" placeholder="Enter Phone Number" aria-label="name" name="phone"></input>
                            <span className="text-danger">{validationErrors.phone}</span>
                        </div>
                    </div>
                    
                    <div className="row mb-3">
                    <label className="col-sm-4 col-form-lable" for="">Name of Person Visiting</label>
                        <div className="col-sm-8">                        
                            <input type="text" class="form-control" placeholder="Enter Name of Person Visiting" aria-label="name" name="personV"></input>
                            <span className="text-danger">{validationErrors.personV}</span>
                        </div>
                    </div>
                    
                    <div className="row mb-3">
                    <label className="col-sm-4 col-form-lable" for="">Purpose of Visit</label>
                        <div className="col-sm-8">                        
                            <input type="text" class="form-control" placeholder="Enter Purpose of Visit" aria-label="name" name="purpose"></input>
                            <span className="text-danger">{validationErrors.purpose}</span>
                        </div>
                    </div>

                    <div class="row mb-3">
                    <label className="col-sm-4 col-form-lable" for="">Sign In</label>
                        <div className="col-sm-8">
                            {/* <input type="readonly" value={new Date().toISOString()} class="form-control"  aria-label="name" name="signIn"></input> */}
                             <input type="readonly" value={estDateString} class="form-control"  aria-label="name" name="signIn"></input>
                             <span className="text-danger">{validationErrors.name}</span>
                        </div>          
                    </div>
                   
                    {/* <div className="row mb-3">
                            <label className="col-sm-4 col-form-label" htmlFor="signIn">Date & Time</label>
                            <div className="col-sm-8">
                                <input
                                    aria-label="Date and time"
                                    type="datetime-local"
                                    name="signIn"
                                />
                                <span className="text-danger">{validationErrors.signIn}</span>
                            </div>
                    </div> */}

                    <div className="row">
                        <div className="offset-sm-4 col-sm-4 d-grid">
                            <button type="submit" class="btn btn-primary">Save</button>                            
                        </div>
                        <div className="col-sm-4 d-grid">                            
                            <button type="reset" class="btn btn-secondary">Cancle</button>
                        </div>
                    </div>                      
                </form>
                </div>
            </div>            
        </div>
        
    )

}