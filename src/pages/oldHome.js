import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
    const [visitors, setVisitors] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);

    function getVisitors() {
        fetch("http://localhost:4000/visitors?_sort=id&_order=desc")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then(data => {
                setVisitors(data);
            })
            .catch(error => {
                alert("Unable to load the data..!");
            });
    }

    useEffect(getVisitors, []);

    const handleRowClick = (visitorId) => {
        fetch(`http://localhost:4000/visitors/${visitorId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then(data => {
                setSelectedRow(data);
                setShowModal(true);
            })
            .catch(error => {
                console.error("Unable to fetch visitor details:", error);
                alert("Unable to load visitor details.");
            });
    };

    const handleClose = () => setShowModal(false);

    const handleSignOut = (event, visitorId, signInDate) => {
        event.stopPropagation(); // Prevents the row click handler from firing

        const signInDateObject = new Date(signInDate);
        const signOutDateObject = new Date(signInDateObject);
        signOutDateObject.setHours(23, 59, 59, 999); // Set to end of the day
        
        const updatedVisitor = { signOut: signOutDateObject.toISOString() };

        fetch(`http://localhost:4000/visitors/${visitorId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedVisitor),
        })
        .then(response => {
            if (response.ok) {
                getVisitors(); // Refresh the list
            } else {
                throw new Error();
            }
        })
        .catch(error => {
            alert("Unable to update sign out time.");
        });
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Visitor Records</h2>
            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/add" role="button">Add</Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getVisitors}>Refresh</button>
                </div>
                <div className="col">
                </div>
            </div>
            <style>
                {`
                    .table tbody tr {
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }
                    .table tbody tr:hover {
                        background-color: #f5f5f5;
                    }
                    .table tbody tr.selected {
                        background-color: #d1e7dd;
                    }
                `}
            </style>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Email ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Visiting Person's Name</th>
                        <th scope="col">Purpose of Visit</th>
                        <th scope="col">Sign In</th>
                        <th scope="col">Sign Out</th>                        
                    </tr>
                </thead>
                <tbody>
                    {
                        visitors.map((visitor, index) => (
                            <tr key={index} onClick={() => handleRowClick(visitor.id)}>
                                <td>{visitor.id}</td>
                                <td>{visitor.name}</td>
                                <td>{visitor.company}</td>
                                <td>{visitor.email}</td>
                                <td>{visitor.phone}</td>
                                <td>{visitor.personV}</td>
                                <td>{visitor.purpose}</td>
                                <td>{visitor.signIn}</td>
                                <td>
                                    {visitor.signOut ? (
                                        <span>{visitor.signOut}</span>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={(event) => handleSignOut(event, visitor.id, visitor.signIn)}
                                        >
                                            Sign Out
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {/* Optional: Add more actions here */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {selectedRow && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="modal-label" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modal-label">Visitor Details</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>ID:</strong> {selectedRow.id}</p>
                                <p><strong>Name:</strong> {selectedRow.name}</p>
                                <p><strong>Company:</strong> {selectedRow.company}</p>
                                <p><strong>Email ID:</strong> {selectedRow.email}</p>
                                <p><strong>Phone:</strong> {selectedRow.phone}</p>
                                <p><strong>Visiting Person's Name:</strong> {selectedRow.personV}</p>
                                <p><strong>Purpose of Visit:</strong> {selectedRow.purpose}</p>
                                <p><strong>Sign In:</strong> {selectedRow.signIn}</p>
                                <p><strong>Sign Out:</strong> {selectedRow.signOut ? (
                                        <span>{selectedRow.signOut}</span>
                                    ) : (
                                        <span>Not Done Yet</span>
                                    )}</p>

                               

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
