import '../css/home.css'

function Home(){
    return (
        <section className='home' id='home'>
            <h1>Razorhands<span className='subtitle'>Barbershop</span></h1>
            <p className='tagline'>Sharp work. Fair prices.</p>

            <a href='tel:' className='btn'>Book Now</a>
            <p className='time'>Weekdays 9 AM – 4 PM · Weekends 9 AM – 2 PM</p>

            <div className='promo'>
                <span className='promo-title'>Student Tuesday</span>
                <p className='promo-desc'>₱50 off any haircut with a school ID.</p>
            </div>
        </section>
    )
}

export default Home