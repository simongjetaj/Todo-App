const bodyParser = require('body-parser'),
    mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_CONN_STRING, {
    useNewUrlParser: true
});

const todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = (app) => {
    app.get('/todo', async (req, res) => {
        await Todo.find({}, (err, todos) => {
            if (err) throw err;
            res.render('todo', {
                todos
            });
        });
    });

    app.post('/todo', urlencodedParser, async (req, res, next) => {
        var newTodo = new Todo(req.body);
        await newTodo.save((err, todos) => {
            if (err) throw err;
            res.json(todos);
        });
    });

    app.delete('/todo/:item', (req, res, next) => {
        // todos = todos.filter(todo => {
        //     return todo.item.replace(/ /g, '-') !== req.params.item
        // });
        try {
            Todo.deleteOne({
                item: req.params.item.replace(/\-/g, " ")
            }, (err, todos) => {
                if (err) throw err;
                res.json(todos);
            });
        } catch (e) {
            next(e);
        }
    });
}