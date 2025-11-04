import { selectAllTasks, insertTask } from "../models/Task.js";
import { ApiError } from "../helper/ApiError.js"


const getTasks = async(req, res, next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next(error)
    }
}

const postTask = async (req, res, next) => {
    const { task } = req.body;

    try {
        if (!task || !task.description || task.description.trim().length === 0) {
            //const error = new Error("Task description is required");
            //error.status = 400;
            //return next(error);
            throw new ApiError("Task description is required", 400);
        }

        const result = await insertTask(task.description);

        return res.status(201).json({
            id: result.rows[0].id,
            description: result.rows[0].description
        });

    } catch (error) {
        return next(error);
    }
};


export { getTasks, postTask }