import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(exerciseToEdit),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.status === 201){
            alert("Successfully updated the exercise.");
        } else {
            alert(`Failed to update exercise.`);
            console.error(`Failed to update exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <label>Name:
                <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </label>
            <label>Reps:
                <input
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.valueAsNumber)} />
            </label>
            <label>Weight:
                <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.valueAsNumber)} />
            </label>
            <label>Unit:
                <select
                    value={unit}
                    onChange={e => setUnit(e.target.value)} 
                    >
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
            </label>
            <label> Date:
                <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
            </label>
            <p>
            <button
                onClick={editExercise}
            >Save</button>
            </p>
        </div>
    );
}

export default EditExercisePage;