import { useNavigate } from "react-router-dom"

export default function Add() {

    const navigate = useNavigate()

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
                body: formData
            })
            const data = await response.json()

            if( response.ok){
                //alert("Record Added..!")
                navigate("/")
            }
            else if (response.status === 400) {
                alert("Validation Errors..!")
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
                <h2>Welcome to the Add</h2>
                <form class="row g-3" onSubmit={handleSubmit}>
                    <div class="col-md-6">
                        <label for="" class="form-label">Name</label>
                        <input type="text" class="form-control" placeholder="Enter Name" aria-label="name" name="name"></input>
                        <span className="text-danger"></span>                  
                    </div>
                    <div class="col-md-6">
                    <label for="" class="form-label">Company</label>
                        <input type="text" class="form-control" placeholder="Enter Company's Name" aria-label="cname" name="company"></input>
                        <span className="text-danger"></span>
                    </div>
                    <div class="col-12">
                        <label for="" class="form-label">Email</label>
                        <input type="email" class="form-control" placeholder="Enter Email Id" id="inputEmail4" name="email"/>
                        <span className="text-danger"></span>
                    </div>
                    <div class="col-12">
                        <label for="" class="form-label">Phone</label>
                        <input type="text" class="form-control" placeholder="Enter Phone Number" aria-label="name" name="phone"></input>
                        <span className="text-danger"></span>
                    </div>
                    <div class="col-md-6">
                        <label for="" class="form-label">Name of Person Visiting</label>
                        <input type="text" class="form-control" placeholder="Enter Name of Person Visiting" aria-label="name" name="personV"></input>
                        <span className="text-danger"></span>
                    </div>
                    <div class="col-md-4">
                        <label for="" class="form-label">Purpose of Visit</label>
                        <input type="text" class="form-control" placeholder="Enter Purpose of Visit" aria-label="name" name="purpose"></input>
                        <span className="text-danger"></span>
                    </div>
                    <div class="col-md-2">
                        <label for="" class="form-label">Date & Time</label>
                        <div class='input-group date' id='datetimepicker1'>
                            <input aria-label="Date and time" type="datetime-local" name="signIn"/>
                            <span class="input-group-addon">
                            <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                            <span className="text-danger"></span>
                        </div>
                    </div>                
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Save</button>
                        <button type="reset" class="btn btn-primary">Cancle</button>
                    </div>
                </form>
                </div>
            </div>            
        </div>
    )

}