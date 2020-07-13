import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = {
    table: {
        maxWidth: 450,
    }
}

class AddBook extends React.Component{
    constructor(){
        super();
        this.state={
            data:{
                author:'',
                name:'',
                description:'',
                press:''
            } 
        }
    }

    save=async () => {
      const data = await axios.post('/api/books',
      {
        data:{
            author: this.state.author,
            name: this.state.name,
            description: this.state.description,
            press: this.state.press
        }
      })

      console.log(data);

      if(data.data.code == 20){
        this.props.history.push("/bookList");
      }else{
        console.log(data.data.message);
        
      }
    } 

    cancel=() => {
        this.props.history.push("/bookList");
    }
        
    reset=() => {
        this.setState({
            data:{
                
            }
        });
    }

    getAuthor=(event) => {
        this.setState({
            author:event.target.value
        })
    }

    getName=(event) => {
        this.setState({
            name:event.target.value
        })
    }

    getDescription=(event) => {
        this.setState({
            description:event.target.value
        })
    }

    getPress=(event) => {
        this.setState({
            press:event.target.value
        })
    }

    render(){
        return (
            <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                            <TextField id="standard-basic" label="作者" value={this.state.author} onChange={this.getAuthor}/>
                            </TableCell>
                            <TableCell align="left">
                                <TextField id="standard-basic2" label="书名" value={this.state.name} onChange={this.getName}/>
                            </TableCell>
                            <TableCell align="left">
                                <TextField id="standard-basic3" label="描述" value={this.state.description} onChange={this.getDescription}/>
                            </TableCell>
                            <TableCell align="left">
                                <TextField id="standard-basic4" label="出版社" value={this.state.press} onChange={this.getPress}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={this.save}>
                保存
            </Button>
            <Button variant="contained" color="primary" onClick={this.cancel}>
                取消
            </Button>
            <Button variant="contained" color="primary" onClick={this.reset}>
                重置
            </Button>
            </>
        )
    }
}

export default withStyles(useStyles)(AddBook);