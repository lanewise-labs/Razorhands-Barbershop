import '../css/contact.css'

function Contact(){
    return (
        <footer className='contact' id='contact'>
            <div className='info'>
                <span className='label'>Opening Hours</span>
                <p className='value'>Weekdays: 9:00 AM – 4:00 PM</p>
                <p className='value'>Weekends: 9:00 AM – 2:00 PM</p>
            </div>

            <div className='info'>
                <span className='label'>Location</span>
                <p className='value'>14 Sample Street, Barangay Placeholder, Demo City, Philippines</p>
            </div>

            <div className='info'>
                <span className='label'>Call</span>
                <a className='value' href='tel:+639170000000'>+63 917 000 0000</a>
            </div>

            <div className='info'>
                <span className='label'>Email</span>
                <a className='value' href='mailto:hello@razorhands.example'>hello@razorhands.example</a>
            </div>

            <div className='info'>
                <span className='label'>Social</span>
                <p className='value'>@razorhandsdemo</p>
            </div>

            <p className='copyright'>© Razorhands Barbershop. A fictional demo business created by LaneWise Labs. All people and details are made up.</p>
        </footer>
    )
}

export default Contact