import '../css/contact.css'

import { contact } from '../data/siteData'

function Contact(){
    return (
        <footer className='contact' id='contact'>
            <div className='info'>
                <span className='label'>Opening Hours</span>
                <p className='value'>{contact.openinghours[0]}</p>
                <p className='value'>{contact.openinghours[1]}</p>
            </div>

            <div className='info'>
                <span className='label'>Location</span>
                <p className='value'>{contact.location}</p>
            </div>

            <div className='reach'>
                <span className='label reach-title'>Reach us</span>
                <div className='info'>
                    <span className='label'>Call</span>
                    <a className='value' href='tel:+639170000000'>{contact.call}</a>
                </div>

                <div className='info'>
                    <span className='label'>Email</span>
                    <a className='value' href='mailto:hello@razorhands.example'>{contact.email}</a>
                </div>

                <div className='info'>
                    <span className='label'>Social</span>
                    <p className='value'>{contact.social}</p>
                </div>
            </div>

            <p className='copyright'>© Razorhands Barbershop. A fictional demo business created by LaneWise Labs. All people and details are made up.</p>
        </footer>
    )
}

export default Contact