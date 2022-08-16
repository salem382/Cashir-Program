import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import './navbar.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

   
    const [openNav, setOpenNav] = useState(false);
    const open = {
        padding:'20px',
        height:'auto'
    }
    const close = {
        padding:'0',
        height:'0',
        overflow: 'hidden'
    }
    return (
        <section className='navbar nav-color'>
            <Container>
                <div className='nav-content'>
                    <div className='d-flex'>
                        <img className='' src='images/2.png' alt=''/>
                        <p className='text-white fw-bold mt-3'>Cashir Program</p>
                    </div>
                    <div className='position-relative' style={{height:'32px'}}>
                        <FontAwesomeIcon  onClick={() => setOpenNav((prev) => !prev)} style={{right:'0'}} className='icon fs-3 text-white position-absolute' icon={faBars} />
                        <ul style={openNav ? open : close} className='links list-unstyled position-absolute'>
                          <Link onClick={() => setOpenNav(false)} style={{textDecoration:'none'}} to='/'><li>Main Page</li></Link> 
                          <Link onClick={() => setOpenNav(false)}  style={{textDecoration:'none'}} to='/addnew'> <li>Add New Items</li></Link> 
                          <Link onClick={() => setOpenNav(false)}  style={{textDecoration:'none'}} to='/update'><li>Update Items </li></Link> 
                          <Link onClick={() => setOpenNav(false)}  style={{textDecoration:'none'}} to='/endshift'><li>End Shift</li></Link> 
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Navbar;
