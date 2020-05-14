import React from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm.js';
import Rank from './components/rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceReconition from './components/faceReconition.js';
import SignIn from './components/SignIn.js';
import Register from './components/Register.js';

const particlesOptions = {
  particles: {
      number: {
        value: 80,
        density:{
          enable: true,
          value_area: 800
        }
      }

}
}


const app = new Clarifai.App({
 apiKey: '9ec8546120ba45fa86f861be5f576adc'
});

const initialState =  {
      input: '',
      imageUrl:'',
      box:{},
      route:'signIn',
      isSignedIn:false,
      user: {
        id:"",
        name:"",
        email:"",
        entries: 0 ,
        joined: ''
  }
}




class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    
  }

loadUser = (data) => {
  this.setState({user: {
        id:data.id,
        name:data.name,
        email:data.email,
        entries: data.entries ,
        joined: data.joined
  }})
}



calculateFaceLocation = (data) => {
  
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height),
  }

}

displayFaceBox = (box) => {
  this.setState({box:box});
}


onInputChange = (event) => {
  this.setState({ input: event.target.value })
}


onSubmit = () => {
this.setState(this.setState({imageUrl: this.state.input}));
app.models
  .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response => {
    if(response){
      fetch('https://floating-chamber-91954.herokuapp.com/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      id:this.state.user.id
      })})
      .then(response => response.json()).then(count => {
        this.setState(Object.assign(this.state.user, {entries: count})
    )})}
    this.displayFaceBox(this.calculateFaceLocation(response))
  }).catch(err => console.log(err));
}


onRouteChange = (route) => {
  if (route === 'signOut'){
    this.setState(initialState)
  } else if (route === 'home'){
    this.setState({isSignedIn:true})
  }
    this.setState({route:route});
  }



  render(){
    return (
        <div className='App'>
        <Particles className ='particles' params={particlesOptions} />

          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          {this.state.route === 'home'
          ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
                <FaceReconition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>

            
            :(
              this.state.route === 'signIn' 
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
             
          }
        </div>
      );
  }
}

export default App;