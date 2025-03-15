import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ name: "", email: "", age: "", gender: "" });

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

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/update_student/${id}`, data)
            .then(() => navigate('/'))
            .catch((err) => console.log(err));
    };

    if (!data) {
        return (
            <div className="container text-center mt-5">
                <h1 className="text-danger">Student not found</h1>
                <Link to="/" className="btn btn-primary mt-3">Back</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-primary">Edit Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={data.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={data.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input type="number" className="form-control" name="age" value={data.age} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select className="form-select" name="gender" value={data.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Update</button>
                        <Link to="/" className="btn btn-secondary ms-3">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;
