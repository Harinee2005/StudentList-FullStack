import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Read() {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/get_student/${id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setData(res.data[0]);
                } else {
                    setData(null);
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!data) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger" role="alert">
                    No student found.
                </div>
                <Link to="/" className="btn btn-secondary">Back</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-primary text-center">Student Details</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>ID:</b> {data.id}</li>
                    <li className="list-group-item"><b>Name:</b> {data.name}</li>
                    <li className="list-group-item"><b>Email:</b> {data.email}</li>
                    <li className="list-group-item"><b>Age:</b> {data.age}</li>
                    <li className="list-group-item"><b>Gender:</b> {data.gender}</li>
                </ul>
                <div className="text-center mt-3">
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Read;
