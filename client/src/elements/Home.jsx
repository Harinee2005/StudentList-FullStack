import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/students')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/delete_student/${id}`)
            .then(() => setData(data.filter(student => student.id !== id)))
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-primary">Student Details</h2>
                <Link to="/create" className="btn btn-success">Add Student</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered shadow">
                    <thead className="table-dark text-center">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((eachStudent, index) => (
                            <tr key={index}>
                                <td>{eachStudent.id}</td>
                                <td>{eachStudent.name}</td>
                                <td>{eachStudent.email}</td>
                                <td>{eachStudent.age}</td>
                                <td>{eachStudent.gender}</td>
                                <td className="text-center">
                                    <Link to={`/get_student/${eachStudent.id}`} className="btn btn-info btn-sm me-2">View</Link>
                                    <Link to={`/edit/${eachStudent.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(eachStudent.id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted">No students available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
