import { pool } from '../helper/db.js';
import { Router } from 'express';
import { auth } from '../helper/auth.js';
import {getTasks, postTask } from '../controllers/TaskController.js';
import { ApiError } from "../helper/ApiError.js";

const router = Router()

router.get("/", getTasks)

/* router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM task', (err, result) => {
        if(err) {
            return next(err)
        }
        res.status(200).json(result.rows || [])
    })
})*/

router.post("/create", postTask);
/* router.post('/create', (req, res, next) => {
    const {task} = req.body

if (!task){
    return res.status(400).json({error: "Task is required"})    
    //const error = new Error("Task is required")
    //error.status = 400
    //return next(error)   
} */

/* pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [task.description],
    (err, result) => {
        if (err){
            return next(err)
        }
        res.status(201).json({id: result.rows[0].id, description: task.description})
    })
}) */

router.delete('/delete/:id', (req, res, next) => {
    const {id} = req.params

console.log(`Deleting task with id: ${id}`)
pool.query('DELETE FROM task WHERE id = $1',
    [id], (err, result) => {
    if (err) {
        return next(err)
    }
    if(result.rowCount === 0) {
        //const error = new Error('Task not found')
        //error.status = 404
        //return next(error)
        return next(new ApiError("Task not found", 404));
    }
    return res.status(200).json({id:id})
    })
}) 


export default router