import '../css/services.css'
import { services } from '../data/siteData'

function Services(){
    return (
        <section className='services' id='services'>
            <span className='section-title'>Services</span>
            {services.map((category, index)=> (
                <div className='card' key={index}>
                    <span className='card-title' >{category.title}</span>
                    {category.items.map((service, index) => (
                        <div className='service' key={index}>
                            <p>{service.name}</p>
                            <p>₱{service.price}</p>
                        </div>
                    ))}
                </div>
            ))}      
        </section>
    )
}

export default Services