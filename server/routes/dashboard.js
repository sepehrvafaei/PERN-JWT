const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query("select users.user_name,todo.todo_id,description from users left join todo on users.user_id=todo.user_id \
            where users.user_id = $1 ", [req.user]);
        res.json(user.rows)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

router.post("/todos", authorization, async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("insert into todo (user_id,description) values ($1,$2) returning *",
            [req.user, description]);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
});

router.put("/todos/:id", authorization, async (req, res) => {
    try {
        const id = req.params.id;
        const { description } = req.body;
        const updateTodo = await pool.query("update todo set description=$2 where todo_id=$1 and user_id=$3 returning *",
            [id, description, req.user]);
        if (updateTodo.rows.length === 0) { return res.json("this todo is not yours.") }
        res.json("todo was updated");
    }
    catch (err) {
        console.log(err.message);
    }
});

router.delete("/todos/:id", authorization, async (req, res) => {
    try {
        const id  = req.params.id;
        const deleteTodo = await pool.query("delete from todo where todo_id=$1 and user_id=$2 returning *",
            [id, req.user]);
        if (deleteTodo.rows.length === 0) { return res.json("this todo is not yours.") }
        res.json("Todo was deleted");
    }
    catch (err) {
        console.log(err.message);
    }
});


module.exports = router;