import React from "react";
import "./index.js";
import "./App.css";
import "weather-icons/css/weather-icons.css"; // install in mosam using npm install https://github.com/erikflowers/weather-icons.git
import"bootstrap/dist/css/bootstrap.min.css"; // install in mosam terminal using nmp i bootstrap
import Mosam from "./component/mosam.component";
import Form from "./component/form.component";
const API_KEY="476a11e072d85e8f9b93b9d32fa7f353"; // key generated from https://home.openweathermap.org/api_keys

class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };

    this.icon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog",

    };
  }



  calCelsius(temp){
    let cal=Math.floor(temp-273.15);
    return cal;
  }

  getIcon(icon,rangeId){
    switch (true) {
      case rangeId>=200 && rangeId<=232:
        this.setState({icon:this.icon.Thunderstorm})
        break;
      case rangeId>=300 && rangeId<=321:
        this.setState({icon:this.icon.Drizzle})
        break;
      case rangeId>=500 && rangeId<=531:
        this.setState({icon:this.icon.Rain})
        break;
      case rangeId>=600 && rangeId<=622:
        this.setState({icon:this.icon.Snow})
        break;
      case rangeId>=701 && rangeId<=781:
        this.setState({icon:this.icon.Atmosphere})
        break;
      case rangeId===800:
        this.setState({icon:this.icon.Clear})
        break;
      case rangeId>=801 && rangeId<=804:
        this.setState({icon:this.icon.Clouds})
        break;
    
      default:
        break;
    }
  }

  getMosam=async(e)=>{
    
    e.preventDefault();

    //Getting city value from form through name property
    const city=e.target.elements.city.value;

    //Getting country value from form through name property
    const country=e.target.elements.country.value;


    if(city && country){

       //fetching data from https://openweathermap.org/current example section
      const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);

      const response=await api_call.json(); // Convert data into api format

      console.log(response);

      this.setState({
      // Get these values from console in web app under object directory
        city:`${response.name}, ${response.sys.country}`,
        celsius:this.calCelsius(response.main.temp),
        temp_min:this.calCelsius(response.main.temp_min),
        temp_max:this.calCelsius(response.main.temp_max),
        description:response.weather[0].description

      });

      this.getIcon(this.icon,response.weather[0].id);
    }else{
      this.setState({error:true});
    }
  };
  
  render(){
    return(
      <div className="App">
        <Form loadmosam={this.getMosam} error={this.state.error}/>
        <Mosam 
         city={this.state.city} 
         country={this.state.country} 
         celsius={this.state.celsius} 
         temp_min={this.state.temp_min} 
         temp_max={this.state.temp_max} 
         description={this.state.description}
         icon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
