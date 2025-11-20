const express=require("express");
const fs=require("fs");

const app = express();
app.use(express.json());

const FILE_PATH = "./todos.json";

// --- Helper functions ---

function loadTodos() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
}

function saveTodos(todos) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

// --- CRUD APIs ---

// GET ALL TODOS LIST ITEMS
app.get("/todos", (req, res) => {
    const todos = loadTodos();
    res.json({ success: true, data: todos });
});

// CREATE A NEW TODO ITEM
app.post("/todos", (req, res) => {
    const { title, completed = false } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: "Title required" });
    }

    const todos = loadTodos();
    const newTodo = { id: Date.now(), title, completed };

    todos.push(newTodo);
    saveTodos(todos);

    res.status(201).json({ success: true, data: newTodo });
});

// UPDATE THE EXISTING TODO ITEM
app.put("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const todos = loadTodos();
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Not found" });
    }

    if (title !== undefined) todos[index].title = title;
    if (completed !== undefined) todos[index].completed = completed;

    saveTodos(todos);

    res.json({ success: true, data: todos[index] });
});

// DELETE A PARTICULAR TODO ITEM
app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todos = loadTodos();

    const filtered = todos.filter((t) => t.id !== id);

    if (filtered.length === todos.length) {
        return res.status(404).json({ success: false, message: "Not found" });
    }

    saveTodos(filtered);

    res.json({ success: true, message: "Todo deleted" });
});

// --- Start Server ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
