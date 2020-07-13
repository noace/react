import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:''
            ,pwd:''
        }
    }

    componentDidMount(){
        this.login();
    }

    login = async () => {
    const data = await axios.post('/api/login',
        {
            name:this.state.name,
            pwd:this.state.pwd
        });

        //console.log(data);

        const loginCode = data.data.code;
        
        if(loginCode == 20){
            //成功
            this.props.history.push("/bookList");
        }else{
            // 失败
            this.setState({name:''});
            this.setState({pwd:''});
        }
    }

    changeName=(event) => {
        this.setState({
            name: event.target.value
        });
    }

    changePwd=(event) => {
        this.setState({
            pwd: event.target.value
        });
    }

    render(){
        return(
            <>
            <TextField id="standard-basic" label="用户名" value={this.state.name} onChange={this.changeName} /><br/>
            <TextField id="standard-basic" label="密码" value={this.state.pwd} onChange={this.changePwd} /><br/>
            <Button variant="contained" onClick={this.login}>登录</Button>
            </>
        );
    }
}