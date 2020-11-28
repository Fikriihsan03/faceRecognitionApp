import './App.css';
import React,{Component} from 'react';
import Clarifai from 'clarifai';
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
      imageUrl :''
    }
  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  onSubmit =()=>{
    this.setState({imageUrl:this.state.input})
    app.models.initModel({id:Clarifai.FACE_DETECT_MODEL})
    .then(generalModel => {
      return generalModel.predict("https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528");
    })
    .then(response => {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      // var concepts = response['outputs'][0]['data']['concepts']
    })

  }

render(){
  return (
    <div className="App">
     <Particles className="particles" 
     params={particlesOption}
     />
        
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onSubmit={this.onSubmit}
      />
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  )
}
};


export default App;
