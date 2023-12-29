import React from "react";
import Graph3 from './Doughnut';
import Graph4 from './Bubble';
import Graphline2 from './Line2';
import Graphy from './Bar3';

import "./index1.css";

const LoadData2=()=>{


    return(
            <div className="mianload2">
            <Graphline2/>
            <br />
            <div className="innerload2">
            <Graph3/>
            <Graph4/>
            </div>
            <br />
            <Graphy/>
           
            </div>


    )
}

export default LoadData2;