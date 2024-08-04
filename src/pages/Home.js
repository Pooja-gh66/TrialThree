import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
    const [visitors, setVisitors] = useState([])

    function getVisitors(){
        fetch("http://localhost:4000/visitors?_sort=id&_order=desc")
        .then(response=>{
            if (response.ok){
                return response.json()
            }
            throw new Error()
        })
        .then(data => {
            setVisitors(data)
        })
        .catch(error => {
            alert("Unable to load the data..!")
        })
    }


    useEffect(getVisitors,[])

    return (
        <div className="container my-4">
            <h2>Visitor Records</h2>

            <div className="row mb-3">
                <div className="col">
                <Link class="btn btn-primary" to="/add" role="button">Add</Link>
                <button type="button" className="btn btn-outline-primary" onClick={getVisitors}>Refresh</button>

                </div>
                <div className="col">
                    
                </div>
            </div>
            <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Company</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Visitng Person's Name</th>
                            <th scope="col">Purpose of Visit</th>
                            <th scope="col">Sign In</th>
                            <th scope="col">Sign Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                visitors.map((visitor, index) =>{
                                    return (
                                        <tr key={index}>
                                            <td>{visitor.id}</td>
                                            <td>{visitor.name}</td>
                                            <td>{visitor.company}</td>
                                            <td>{visitor.email}</td>
                                            <td>{visitor.phone}</td>
                                            <td>{visitor.personV}</td>
                                            <td>{visitor.purpose}</td>
                                            <td>{visitor.signIn}</td>
                                            <td>{visitor.signOut}</td>                                            
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
            </table>      
        </div>
    )
}