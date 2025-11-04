import { pool } from "../helper/db.js";

const selectAllTasks = async() => {
    return await pool.query("SELECT * FROM task")
}

const insertTask = async (description) => {
    return await pool.query(
        "INSERT INTO task (description) VALUES ($1) RETURNING *",
        [description]
    );
};


export{selectAllTasks, insertTask}