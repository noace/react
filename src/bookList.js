import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Link} from 'react-router-dom';

const useStyles = {
    table: {
        maxWidth: 350,
    }
}

class BookList extends React.Component {

    constructor(){
        super();
        this.state={
            books:{}
            ,data:[]
        }
    }

    componentDidMount(){
        this.getAllBooks();
        
    }

    getAllBooks = async () => {
        const res = await axios.get('/api/books');
        //console.log(res);
        //修改books的state
        this.setState({books: res.data.data});
        //console.log(this.state.books);
        //将state中books赋值给数组
        this.setState({data:this.state.books});
        
    }

    create=() => {
        this.props.history.push("/bookList/add");
    }

    render() {
        //将books转为数组
        // const bookData = Array.from(this.state.books);
        return (
            <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>作者</TableCell>
                            <TableCell align="left">书名</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {bookData.map((book) => ( */}
                    {this.state.data.map((book) => (
                        <TableRow key={book.name}>
                            <TableCell component="th" scope="row">
                                {book.author}
                            </TableCell>
                            <TableCell align="left">
                                <Link to={`/bookList/items/${book.id}`}>{book.name}</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={this.create}>新增</Button>
            </>
        );
    }
}

export default withStyles(useStyles)(BookList);