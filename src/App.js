import './App.css';
import React,{Component} from 'react';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank';
import Particles from'react-particles-js'



 const particlesOption = {
  particles:{
    number:{
      values: 1000,
      density: {
        enable:true,
        value_area:300
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl :'',
      box:{},
      route:'signin',
      isSignIn:false,
      user: {
              id:'',
              name:'',
              email:'' ,
              entries:0,
              joined:''
          }
      }
  }
  //registering user
  registerUser = (data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width =Number(image.width);
    const height =Number(image.height);
    return{
      leftCol : clarifaiFace.left_col * width,
      topRow   : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow   : height - (clarifaiFace.bottom_row * height)
     }
   }
 
       faceBox = (box) => {   
         this.setState({box:box})
       }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  onSubmit =()=>{
    this.setState({imageUrl:this.state.input})
    fetch('http://localhost:3001/rankApi',{
      method:'post',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
          input:this.state.input
      })
  }).then(response=>response.json())
    .then(response => {
      if(response){
        fetch('http://localhost:3001/rank',{
          method:'put',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
              id:this.state.user.id
          })
      })
      .then(response => response.json())
      .then(count =>{
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
        
      }
     this.faceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))


  }

  onRouteChange =(routeIndex)=>{
    if(routeIndex === "signout"){
      this.setState({isSignIn:false})
    }else if (routeIndex === "home"){
      this.setState({isSignIn:true})
    }
    this.setState({route:routeIndex})
  }

render(){
  return (
    <div className="App">
     <Particles className="particles" 
     params={particlesOption}
     />
      <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange}/>
      {this.state.route === 'home'
      ? <div> 
        <Logo />
        <Rank name={this.state.user.name} entries ={this.state.user.entries} />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onSubmit={this.onSubmit}
        />
        <FaceRecognition box={this.state.box}imageUrl={this.state.imageUrl}/>
      </div>
      :(this.state.route === 'signin'
        ?
          <SignIn registeredUser={this.registerUser}onRouteChange={this.onRouteChange}/>  
        :
          <Register registeredUser={this.registerUser} onRouteChange={this.onRouteChange}/>
      )
    }

    </div>
  )
}
};


export default App;
