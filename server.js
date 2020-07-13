const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const _ = require('lodash');

app.use(express.urlencoded({ extended: true }))
app.use( bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

let bookLists = [
    { id: 1, name: '你不知道的Javascript-上', author: 'Kyle Simpson', description: '你不知道的Javascript-上，这是一本非常好的书籍...', press: '清华大学出版社' },
    { id: 2, name: '你不知道的Javascript-中', author: 'Kyle Simpson', description: '你不知道的Javascript-中，这是一本非常好的书籍...', press: '北京工业出版社' },
    { id: 3, name: '你不知道的Javascript-下', author: 'Kyle Simpson', description: '你不知道的Javascript-下，这是一本非常好的书籍...', press: '电子大学出版社' },
    { id: 4, name: 'c语言', author: '谭浩强', description: '大学必修课程...', press: '人民教育出版社' },
    { id: 5, name: '数据结构', author: '谭浩强', description: '值得一读...', press: '中国书籍出版社' },
]

// 获取全部书籍列表
app.get('/api/books', (req, res) => {
    res.send({
        code: 10,
        data: bookLists,
        message: ''
    });
});

// 更新 ｜ 新增 | 删除 书籍
app.post('/api/books', (req, res) => {
    const { data } = req.body;
    // console.log(req.body, '=====req.body')
    if (!Array.isArray(data)) {
        if (!data.id) {
            data.id = bookLists.length + 1;
            bookLists.push(data);
        } else {
            bookLists.forEach(item => {
                if (item.id === data.id) {
                    item.name = data.name;
                    item.author = data.author;
                    item.description = data.description;
                    item.press = data.press;
                }
            })
        }
    } else {
        bookLists = data;
    }

    res.send({
        code: 20,
        data: bookLists,
        message: ''
    });
});

app.post("/api/login", function (req, res) {
    const { name, pwd } = req.body;
    if (name === 'erealm' && pwd === '123gogogo') {
        res.send({
            code: 20,
            data: '',
            message: '登录成功'
        });
    } else {
        res.send({
            code: 40,
            data: '',
            message: '用户名或密码错误'
        });
    }
});

app.listen(3001, () => console.log('listening on port 3001'));
