import React from "react";
import "./mosem.style.css";

const mosam=props=>{
  return(
      <div id="mainDiv" className="container py-5">
        <div className="cards">
          <h1>
            {props.city} {props.country}
          </h1>
          <h5 className="py-8">
            <i className={`wi ${props.icon} display-1`}></i>
          </h5>
          {props.celsius ? (<h1 className="py-2">{props.celsius}&deg;</h1>):null}

          {/* SHOW MIN MAX TEMPERATURE*/}
          {minmaxtemp(props.temp_min,props.temp_max)}

          <h4 className="py-3">{props.description}</h4>
        </div>
      </div>
  );
};

function minmaxtemp(min,max) {
  if(min && max){
    return(
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    ); 
  } 
}
export default mosam;