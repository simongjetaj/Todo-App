const bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://simongjetaj:Simon2018@ds123822.mlab.com:23822/todos', {
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

    app.delete('/todo/:item', async (req, res, next) => {
        // todos = todos.filter(todo => {
        //     return todo.item.replace(/ /g, '-') !== req.params.item
        // });
        try {
            await Todo.deleteOne({
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