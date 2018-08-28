const express = require('express'),
    todoController = require('./controllers/TodoController'),
    app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

todoController(app);

app.listen(3000, () => console.log('Simon\'s Server is listening on port 3000'));