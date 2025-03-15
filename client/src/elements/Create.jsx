import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/add_user', values) 
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-primary text-center">Add Student</h2>
                <div className="text-end mb-3">
                    <Link to="/" className="btn btn-secondary">Back to Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Enter student name"
                            onChange={(e) => setValues({ ...values, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select className="form-select" name="gender"
                            onChange={(e) => setValues({ ...values, gender: e.target.value })} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" name="age" placeholder="Enter age"
                            onChange={(e) => setValues({ ...values, age: e.target.value })} required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100">Save Student</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
