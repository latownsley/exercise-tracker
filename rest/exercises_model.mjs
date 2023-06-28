import mongoose from 'mongoose';
import 'dotenv/config';

mongoose
    .connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
    ).catch((err) => {
        console.error('Error connecting to Mongo', err);
    });


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
 const Exercise = mongoose.model("Exercise", exerciseSchema);

 /**
  * Create an Exercise
  * @param {String} name 
  * @param {Number} reps 
  * @param {Number} weight 
  * @param {String} unit 
  * @param {String} date 
  * @returns 
  */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Movie
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

/**
 * Find a particular exercise
 * @param {} filter 
 * @returns 
 */
const findExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

/**
 * Find an Exercise by ID
 * @param {*} _id 
 * @returns 
 */
const findExerciseById = async(_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

/**
 * Replace an existing Exercise
  * @param {String} name 
  * @param {Number} reps 
  * @param {Number} weight 
  * @param {String} unit 
  * @param {String} date 
 * @returns 
 */
const replaceExercise = async(_id, name, reps, weight, unit, date) => {
    const replace = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return replace.modifiedCount;
}

/**
 * Delete an existing Exercise from it's ID 
 * @param {} _id 
 * @returns 
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}


export {createExercise, findExercise, findExerciseById, replaceExercise, deleteById}

