import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

const useStyles = {
    table: {
        maxWidth: 350,
    }
}

class BookItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookList:[],
            book:{},
            disabled: true,
        }
    }

    componentDidMount(){
        this.getBookList();
    }

    getBookList = async () => {
        const list = await axios.get('/api/books');
        this.setState({ bookList: list.data.data });
        //获取路由中的id值
        const bookId = this.props.match.params.id;
        console.log(bookId + '----------路由中的bookId');
        //过滤
        const oneBook =  this.state.bookList.filter((bookList) => 
            bookId == bookList.id
        )[0];
        
        this.setState({book:oneBook});
        };

    editBook=() =>{
        this.setState({disabled:false});
    }

    deleteBook= async () => {
        
        const list2 = await axios.get('/api/books');
        this.setState({ bookList: list2.data.data });
        //获取路由中的id值
        const bookId = this.props.match.params.id;
        console.log(bookId + '----------路由中的bookId');
        //过滤
        const oneBook =  this.state.bookList.filter((bookList) => 
            bookId != bookList.id
        );

        console.log(oneBook);
        const list = await axios.post('/api/books',{
            data:oneBook
        });
        this.props.history.push("/bookList");
    }

    save=async() => {
        console.log(this.state.book,'updatebook')

        const editData = await axios.post('/api/books',{
            data:{
                id:this.state.book.id,
                author:this.state.book.author,
                name:this.state.book.name,
                description:this.state.book.description,
                press:this.state.book.press
            }
        });
        console.log(editData);
        
        this.props.history.push("/bookList");
    }

    cancle=() => {
        
        //取消修改
        this.getBookList();
        //更改状态
        this.setState({disabled:!this.state.disabled});
    }

    setAuthor= (event) =>{
        
        this.setState({
            book: {
                ...this.state.book,
                author: event.target.value
            }
        });
    }

    setName=(event) =>{
        this.setState({
            book:{
                ...this.state.book,
                name: event.target.value
            }
        });
    }

    setDescription=(event) =>{
        this.setState({
            book:{
                ...this.state.book,
                description: event.target.value
            }
        });
    }

    setPress=(event) =>{
        this.setState({
            book:{
                ...this.state.book,
                press: event.target.value
            }
        });
    }

    render(){
        return (
            <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                <TableHead>
                        <TableRow>
                            <TableCell>作者</TableCell>
                            <TableCell align="left">书名</TableCell>
                            <TableCell align="left">描述</TableCell>
                            <TableCell align="left">出版社</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                <TextField id="standard-basic" disabled={this.state.disabled} value={this.state.book.author} onChange={this.setAuthor} />
                            </TableCell>
                            <TableCell align="left">
                                <TextField id="standard-basic2" disabled={this.state.disabled} value={this.state.book.name} onChange={this.setName} />
                            </TableCell>

                            <TableCell align="left">
                                <TextField id="standard-basic3" disabled={this.state.disabled} value={this.state.book.description} onChange={this.setDescription} />
                            </TableCell>
                            <TableCell align="left">
                                <TextField id="standard-basic4" disabled={this.state.disabled} value={this.state.book.press} onChange={this.setPress} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            { 
            this.state.disabled
            ?<>
            <Button variant="contained" color="primary" disabled={!this.state.disabled} onClick={this.editBook}>编辑</Button>
            <Button variant="contained" color="primary" disabled={!this.state.disabled} onClick={this.deleteBook}>删除</Button>
            </>
            :<>
            <Button variant="contained" color="primary" disabled={this.state.disabled} onClick={this.save}>保存</Button>
            <Button variant="contained" color="primary" disabled={this.state.disabled} onClick={this.cancle}>取消</Button>
            </>
            }
        </>
        );
    }
}

export default withStyles(useStyles)(BookItems);