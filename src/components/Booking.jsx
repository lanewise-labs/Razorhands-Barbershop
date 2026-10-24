import { useRef, useState } from 'react'
import '../css/booking.css'
import { booking_data } from '../data/siteData'

function handleSubmit (){
    return
}
function Booking(){
    const [errors, setErrors] = useState(0)
    const submitted = false
    const serviceSheet = useRef(null)
    return (
        <section className='booking' id='booking'>
            <span className='section-title'>Booking</span>
            <form onSubmit={handleSubmit} noValidate>
                {booking_data.map((field) => (
                    <div className='field' key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            aria-invalid={errors[field.id] ? 'true' : 'false'}
                        />
                        {errors[field.id] && (
                            <p className='field-error'>{errors[field.id]}</p>
                        )}
                    </div>
                ))}
                <button className='btn' type='submit'>Book Appointment</button>
            </form>
            <p className='form-note' role='status'>
                {submitted ? 'Demo only. Nothing was sent.' : 'Demo form. Nothing is sent or saved.'}
            </p>
        </section>
    )
}

export default Booking