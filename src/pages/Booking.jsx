import { useState } from 'react'
import { HiCalendar, HiChevronDown } from 'react-icons/hi'
import '../css/booking.css'
import { booking_data, services } from '../data/siteData'
import BottomSheet from '../components/BottomSheet'
import DateTimeSheet, { formatDateTime } from '../components/DateTimeSheet'

function Booking(){
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [activeSheet, setActiveSheet] = useState(null)
    const [category, setCategory] = useState(services[0].title)
    const [selected, setSelected] = useState([])
    const [serviceValues, setServiceValues] = useState([])
    const [dateTimeValue, setDateTimeValue] = useState(null)

    const currentCategory = services.find((cat) => cat.title === category)
    const allItems = services.flatMap((cat) => cat.items)
    const selectedItems = allItems.filter((item) => selected.includes(item.name))
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0)

    function serviceLabel(placeholder) {
        if (serviceValues.length === 0) return placeholder
        if (serviceValues.length === 1) return serviceValues[0]
        return `${serviceValues.length} services`
    }

    function openServiceSheet() {
        setSelected([...serviceValues])
        setActiveSheet('service')
    }

    function openDateTimeSheet() {
        setActiveSheet('datetime')
    }

    function closeSheet() {
        setActiveSheet(null)
    }

    function toggleService(name) {
        setSelected((prev) =>
            prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
        )
    }

    function confirmService() {
        setServiceValues(selected)
        if (selected.length > 0) {
            setErrors((prev) => ({ ...prev, service: '' }))
        }
    }

    function confirmDateTime(value) {
        setDateTimeValue(value)
        setErrors((prev) => ({ ...prev, datetime: '' }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)
        const next = {}

        if (!data.get('name').trim()) {
            next.name = 'Please enter your name.'
        }
        if (!/^\S+@\S+\.\S+$/.test(data.get('email').trim())) {
            next.email = 'Enter a valid email, like name@example.com.'
        }
        if (data.get('phone').replace(/\D/g, '').length < 7) {
            next.phone = 'Enter a phone number with at least 7 digits.'
        }
        if (!dateTimeValue) {
            next.datetime = 'Please choose a date and time.'
        }
        if (serviceValues.length === 0) {
            next.service = 'Please choose at least one service.'
        }

        setErrors(next)

        if (Object.keys(next).length === 0) {
            setSubmitted(true)
            setServiceValues([])
            setDateTimeValue(null)
            form.reset()
        } else {
            setSubmitted(false)
        }
    }

    function renderControl(field) {
        const invalid = errors[field.id] ? 'true' : 'false'

        if (field.type === 'select') {
            return (
                <button
                    id={field.id}
                    type='button'
                    className='picker-trigger'
                    aria-haspopup='dialog'
                    aria-invalid={invalid}
                    onClick={openServiceSheet}
                >
                    <span className={serviceValues.length > 0 ? 'picker-value' : 'picker-placeholder'}>
                        {serviceLabel(field.placeholder)}
                    </span>
                    <HiChevronDown className='picker-icon' />
                </button>
            )
        }

        if (field.id === 'datetime') {
            return (
                <button
                    id={field.id}
                    type='button'
                    className='picker-trigger'
                    aria-haspopup='dialog'
                    aria-invalid={invalid}
                    onClick={openDateTimeSheet}
                >
                    <span className={dateTimeValue ? 'picker-value' : 'picker-placeholder'}>
                        {formatDateTime(dateTimeValue) || field.placeholder}
                    </span>
                    <HiCalendar className='picker-icon' />
                </button>
            )
        }

        return (
            <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                aria-invalid={invalid}
            />
        )
    }

    return (
        <section className='booking' id='booking'>
            <span className='section-title'>Booking</span>
            <form onSubmit={handleSubmit} noValidate>
                {booking_data.map((field) => (
                    <div className='field' key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        {renderControl(field)}
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

            {activeSheet === 'service' && (
                <BottomSheet title='Choose services' titleId='service-sheet-title' onClosed={closeSheet}>
                    {(close) => (
                        <>
                            <div className='tabs' role='tablist'>
                                {services.map((cat) => (
                                    <button
                                        key={cat.title}
                                        type='button'
                                        role='tab'
                                        aria-selected={category === cat.title}
                                        className='tab'
                                        onClick={() => setCategory(cat.title)}
                                    >
                                        {cat.tab}
                                    </button>
                                ))}
                            </div>

                            <div className='service-list' role='group' aria-label={currentCategory.title}>
                                {currentCategory.items.map((service) => (
                                    <button
                                        key={service.name}
                                        type='button'
                                        role='checkbox'
                                        aria-checked={selected.includes(service.name)}
                                        className='service-option'
                                        onClick={() => toggleService(service.name)}
                                    >
                                        <span className='radio-dot'></span>
                                        <span className='service-name'>{service.name}</span>
                                        <span className='service-price'>₱{service.price.toLocaleString()}</span>
                                    </button>
                                ))}
                            </div>

                            {selectedItems.length > 0 && (
                                <div className='selected-row'>
                                    <p className='selected-name'>Selected: {selectedItems.length}</p>
                                    <p className='selected-price'>₱{total.toLocaleString()}</p>
                                </div>
                            )}

                            <div className='sheet-actions'>
                                <button
                                    type='button'
                                    className='done-btn'
                                    onClick={() => {
                                        confirmService()
                                        close()
                                    }}
                                >
                                    Done
                                </button>
                                <button type='button' className='cancel-btn' onClick={close}>Cancel</button>
                            </div>
                        </>
                    )}
                </BottomSheet>
            )}

            {activeSheet === 'datetime' && (
                <DateTimeSheet
                    initialValue={dateTimeValue}
                    onConfirm={confirmDateTime}
                    onClosed={closeSheet}
                />
            )}
        </section>
    )
}

export default Booking