import React from 'react';
import 'animate.css'

class SignIn extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword:''
        }
    }
    onEmailChange=(event)=>{
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({signInPassword:event.target.value})
    }
    onSubmit= () => {
        fetch('http://localhost:3001/signin', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
          })
        })
          .then(response => response.json())
          .then(user => {
              if(user === "wrong credential"){
                  alert("something wrong with your input")
              }else if(user==="please fill the form"){
                  alert("please fill the form")
              }
            else if (user.id) {
              this.props.registeredUser(user)
              this.props.onRouteChange('home');
            }
          })
      }
    render(){
        const {onRouteChange} = this.props
        return(
            <article className="animate__animated animate__lightSpeedInLeft br3 ba  b--black-10 mv5 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="animate__animated animate__bounce animate__delay-1s f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
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
                        value="Sign in" 
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p                
                        onClick={()=> onRouteChange("register")} 
                        className=" f6 link dim pointer" 
                        >
                        Register
                        </p>
                    </div>
                </div>
                </main>
            </article>
    
        )
    }
}

export default SignIn;