// 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import './Port.css';

const Contactdata = () => {
  return (
    <div className="contact-container">

    <div className='top'> 
     <img  className='me' src="./contactme.jpg" alt="Contact Icon" />
     <h2>Contacts</h2>
     </div>

     <div>
     <div className='imgleft'>
     <img className='gif' src="./contactme.gif" alt="" />
     </div>
     <div className='logoright'>

     <div className="social-logos">
     <a href="tel:+199373744595">
       <FontAwesomeIcon icon={faPhone}  className="icon1" />&nbsp;&nbsp;&nbsp;&nbsp; <span1> +91 9373744595</span1>
     </a>
     <br />
     <br />
     <a href="mailto:khatikck07@gmail.com">
       <FontAwesomeIcon icon={faEnvelope} className="icon2" /> &nbsp;&nbsp;&nbsp;&nbsp;<span2> khatikck07@gmail.com</span2>
     </a>
     <br />
     <br />
     <a href="www.linkedin.com/in/chetan-khatik" >
       <FontAwesomeIcon icon={faLinkedin} className="linkedIn-icon"  />&nbsp;&nbsp;&nbsp;&nbsp;<span3> www.linkedin.com/in/chetan-khatik</span3>
     </a>
     <br />
     <br />
     <a href="https://github.com/chetankhatik">
       <FontAwesomeIcon icon={faGithub} className="github-icon" /> &nbsp;&nbsp;&nbsp;&nbsp;<span4>https://github.com/chetankhatik</span4>
     </a>
     <br />
     <br />
     <a href="https://wa.me/9373744595" >
       <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />&nbsp;&nbsp;&nbsp;&nbsp;<span5> 9373744595</span5>
     </a>
     <br />
     <br />
     <a href="https://www.instagram.com/" >
       <FontAwesomeIcon icon={faInstagram} className="instagram-icon" /> &nbsp;&nbsp;&nbsp;&nbsp;<span5>beast_ck</span5>
     </a>
     <br />
   </div>
     
     </div>
     
     </div>
  
</div>
  );
}

export default Contactdata;
