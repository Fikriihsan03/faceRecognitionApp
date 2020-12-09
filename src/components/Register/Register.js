import React from 'react';
import 'animate.css'

class Register extends React.Component  {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            name:''
        }
    }
    onNameChange=(event)=>{
        this.setState({name:event.target.value})
    }
    onEmailChange=(event)=>{
        this.setState({email:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({password:event.target.value})
    }
    onSubmit=()=>{
        // console.log(this.state)
        fetch('http://localhost:3001/register',{
            method:'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name:this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user === "unable to register"){
                alert("invalid email")
            }else if(user === "please fill the form"){
                alert("please fill the form")
            }
            else if(user){
                this.props.registeredUser(user)
                this.props.onRouteChange("home")
            }
        })
    }
        
    render(){
        // const {onRouteChange} = this.props
    return(
        <article className="animate__animated animate__lightSpeedInLeft br3 ba  b--black-10 mv5 w-100 w-50-m w-25-l mw6 center shadow-5">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="animate__animated animate__bounce animate__delay-1s f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="username">Name</label>
                        <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="username"  
                        id="user-name"
                        onChange={this.onNameChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" name="email-address"  
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input
                    onClick={this.onSubmit} 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Register" 
                    />
                </div>
            </div>
            </main>
        </article>

    )
    }
}
    export default Register ;