import './App.css';
import React,{Component} from 'react';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank';
import Particles from'react-particles-js'

const app = new Clarifai.App({
  apiKey: 'ed1e6507635945c4a544fbde75250d67'
 });

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
      route:'signin'
      }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width =Number(image.width);
    const height =Number(image.height);
    // console.log(width,height)
    return{
      leftCol : clarifaiFace.left_col * width,
      topRow   : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow   : height - (clarifaiFace.bottom_row * height)
     }
   }
 
       faceBox = (box) => {
        //  console.log(box)
         this.setState({box:box})
       }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  onSubmit =()=>{
    this.setState({imageUrl:this.state.input})
    app.models.initModel({id:Clarifai.FACE_DETECT_MODEL})
    .then(generalModel => {
      return generalModel.predict(this.state.input);
    })
    .then(response => {
     this.faceBox(this.calculateFaceLocation(response))
    })
     .catch(err => console.log(err)) // var concepts = response['outputs'][0]['data']['concepts']

  }

  onRouteChange =()=>{
    this.setState({route:'home'})
  }

render(){
  return (
    <div className="App">
     <Particles className="particles" 
     params={particlesOption}
     />
      <Navigation />
      {this.state.route === 'signin'
      ?<SignIn onRouteChange={this.onRouteChange}/>  
      :
      <div> 
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onSubmit={this.onSubmit}
        />
        <FaceRecognition box={this.state.box}imageUrl={this.state.imageUrl}/>
      </div>
    }

    </div>
  )
}
};


export default App;
