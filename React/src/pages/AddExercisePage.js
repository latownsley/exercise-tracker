import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    //const history = uuseHistory();
    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise.");
        } else {
            alert(`Failed to add exercise.`);
            console.error(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
        //history.push("/");
    
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <label>Name</label>
            <input
                type="text"
                placeholder="Enter title here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <label>Reps</label>
            <input
                type="number"
                value={reps}
                placeholder="Enter number of reps here"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <label>Weight</label>
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.valueAsNumber)}/>
            <label>Unit</label>
            <select
                value={unit}
                placeholder="Choose units here"
                onChange={e => setUnit(e.target.value)} 
                >
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
            <label>Date</label>
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;