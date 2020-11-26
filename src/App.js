import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from'react-particles-js'
function App() {
  
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
  return (
    <div className="App">
     <Particles className="particles" 
     params={particlesOption}
     />
        
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
