const fs = require('fs');
const path = require('path');
const url = require('url');

const express = require('express');
const app = express();

const PORT = 8000;

const getPage = (page) => path.join(__dirname, 'static', 'views', `${page}.ejs`);
const post_list = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'comments.json')));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.render(getPage('main'), { title: 'Main' });
});

app.get('/posts', (req, res) => {
    console.log("Files loaded");
    let urlReq = url.parse(req.url, true);
    console.log(urlReq.query.id);
    if(typeof urlReq.query.id !== 'undefined') {
        if (urlReq.query.id >= 0 && urlReq.query.id < post_list.length) {
            res.render(getPage('post'), {title: "Post", post: post_list[urlReq.query.id]});
        }
    }
    else {
        res.render(getPage('topics'), {title: 'Posts', posts: post_list});
    }
});

app.use((req, res) => {
    res.send('Error');
})

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
})