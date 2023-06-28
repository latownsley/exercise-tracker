import 'dotenv/config';
import * as exercise from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise
 */
app.post('/exercises', (req, res) => {
    if (isValid(req)=== false) {
        console.error("Add Failed.")
        res.status(400).json({ Error: "Invalid request"}).type('application/json');
    } else {
        exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise).type('application/json');
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' }).type('application/json');
        });

    }
    
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;

    exercise.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise).type('application/json');
            } else {
                res.status(404).json({ Error: "Not found"}).type('application/json');
            }         
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request"}).type('application/json');
        });

});

/**
 * Retrieve all exercises. 
 * Returns A JSON array containing the entire collection.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    exercise.findExercise(filter)
        .then(exercise => {
            res.status(200).send(exercise).type('application/json');
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' }).type('application/json');
        });

});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its values to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    if (isValid(req) === false) {
        console.error("Update Failed.")
        res.status(400).json({ Error: "Invalid request"}).type('application/json');
    } else {
        exercise.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit:req.body.unit, date: req.body.date }).type('application/json');
            } else {
                res.status(404).json({ Error: "Not found"}).type('application/json');
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request"}).type('application/json');
        });
    }

    
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercise.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not found"}).type('application/json');
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' }).type(application/json);
        });
});

/**
 * 
 * @param {*} req 
 * @returns True if all the valadation passes. 
 */
function isValid(req) {
    // test date
    if (isDateValid(req.params.date) === false) {
        console.error("Date is invalid")
        return false;
    } 

    //test unit (must be kgs or lbs)
    if (req.params.unit !== " kgs" || "lbs"){
        console.error("Unit is invalid")
        return false;
    }

    //test weight
    if (!req.params.weight.isInteger()){
        console.error("Weight is invalid")
        return false;
    } else if (req.params.weight < 0){
        console.error("Weight is invalid")
        return false;
    }

    //test reps
    if (!req.params.reps.isInteger()){
        console.error("Weight is invalid")
        return false;
    } else if (req.params.reps < 0){
        console.error("Weight is invalid")
        return false;
    }

    //test name
    if (typeof req.param.name !== 'string'){
        console.error("Name is invalid")
        return false;
    } else if (!req.param.name || req.param.name === 0 ) {
        console.error("Name is invalid")
        return false;
    }

    return true;
}

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});