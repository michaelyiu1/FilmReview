import React from 'react';
function Navbar() {
  return (
   <nav className='nav'>
    <a href='/' className='site-title'>Movies For You!</a>
    <ul>
        <li>
            <a href='/About'>About</a>
         </li>
            <li>  <a href='/Movies'>Movies</a> 
         </li>
        <li> <a href='/Signup'>Signup</a>
            </li>

    </ul>
   </nav>
  );

}

export default Navbar;