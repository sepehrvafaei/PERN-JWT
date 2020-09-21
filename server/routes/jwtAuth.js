const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


router.post('/register', validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query('select * from users where user_email =$1', [email]);
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exist");
        }
        //-----------------------------
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);
        //------------------------------
        const newUser = await pool.query(
            "insert into users (user_name,user_email,user_password) values ($1,$2,$3) returning *",
            [name,email,hash]
        );
        //------------------------------
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

router.post("/login", validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("select * from users where user_email=$1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect.");
        }
        //------------------------
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) { return res.status(401).send("Password is not valid."); }
        //------------------------
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

router.get("/verify", authorization, async (req, res) => {
    try {
        res.json(true);
    }
    catch (err) {
        console.error(err.message);
        return res.status(403).send("Not Authorized");
    }
});

module.exports = router;