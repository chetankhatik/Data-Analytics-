
import React, { useState } from 'react';
import './index1.css';
import LoadData from './Maincontent';
import LoadData2 from './Maincontent2';
import LoadData3 from './Maincontent3';
import Main from './Portfolio';
import CustomizedChart from './Custome2';
import Customechart from './Custome3';
import Customechart4 from './Custome4';


 
 
const NavbarSidebarLayout = () => {

  const [componentToShow, setComponentToShow] = useState('');

  const handleButtonClick = (component) => {
     setComponentToShow(component);
  };
 
  const getComponent = () => {
     switch (componentToShow) {
     
       case 'Component1':
         return <LoadData/>;
       case 'Component2':
         return <LoadData2/>;
       case 'Component3':
         return <LoadData3/>;
       case 'Component4':
         return <CustomizedChart/> ;
       case 'Component5':
         return <Customechart/>;
        case 'Component6':
         return <Customechart4/>;
        case 'Componentx':
          return <Main/>;
       default:
         return <LoadData/>;
     }
  };

    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearch = () => {
        //template String
        console.log(`Searching for: ${searchQuery}`);
      };
  return (
    <div className="Nav_app">

    <nav className="navbar">
    <div className="search-bar">
    <input className='search'
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button>
  </div>
    </nav>



    <div className="container">

    <aside className="sidebar">
    <div className="logo">
    <img className='sidebarlogo' src='./ck.png'  alt='CK' ></img>
     <p className='ANALYTICS'> DATA  ANALYTICS</p> 
    </div>


    <div className='mainbtn'>
      <button className="btn" onClick={() => handleButtonClick('Component1')}>
        DashBoard
      </button>
      <br />
  
      <button className="btn" onClick={() => handleButtonClick('Component2')}>
        Graphs Data
      </button>
      <br />
     
      <button  className="btn" onClick={() => handleButtonClick('Component3')}>
        Country Filter
      </button>
      <br />
      
      <button  className="btn" onClick={() => handleButtonClick('Component4')}>
        Sector-Country 
      </button>
      <br />

      <button  className="btn" onClick={() => handleButtonClick('Component5')}>
        Insight-Swot 
      </button>
      <br />

      <button  className="btn" onClick={() => handleButtonClick('Component6')}>
        Article & Link
      </button>
      <br />

      <button  className="btn-pro" onClick={() => handleButtonClick('Componentx')}>
      My Portfolio
    </button>
    </div>

  
  </aside>
      <main className="content">
        <div>
        <div>{getComponent()}</div>
        </div>
      </main>
    </div>
  </div>
  );
};

export default NavbarSidebarLayout;
