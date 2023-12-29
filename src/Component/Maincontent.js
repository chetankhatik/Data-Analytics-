import React from "react";
import Graph1 from './Line';
import Graph5 from './MixedChart';
import Graph6 from './PolarArea';
import Graph7 from './Radar';
import ScaleGraph from './Mix2';



const LoadData=()=>{


    return(
            <div className="mianload">
            <Graph1/>
          <br/>
          <Graph5/>
          <br/>
          <div className='G2'>
          <Graph6/>
          <br />
          <Graph7/>
          </div>
          <br />
          <ScaleGraph/>
            </div>


    )
}

export default LoadData;