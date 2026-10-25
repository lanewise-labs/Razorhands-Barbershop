import { useEffect, useRef, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import '../css/booking.css'
import { booking_data, services } from '../data/siteData'

function Booking(){
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalAnimation, setModalAnimation] = useState('slide-up')
    const [category, setCategory] = useState(services[0].title)
    const [selected, setSelected] = useState('')
    const [serviceValues, setServiceValues] = useState('')
    const [dragY, setDragY] = useState(0)
    const closeTimer = useRef(null)
    const dragStartY = useRef(null)

    const currentCategory = services.find((cat) => cat.title === category)
    const allItems = services.flatMap((cat) => cat.items)
    const selectedItems = allItems.filter((item) => selected.includes(item.name))
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0)
    function triggerLabel(placeholder) {
        if (serviceValues.length === 0) return placeholder
        if (serviceValues.length === 1) return serviceValues[0]
        return `${serviceValues.length} services`
    }
    useEffect(() => {
        return () => clearTimeout(closeTimer.current)
    }, [])
    useEffect(() => {
        if (!isModalOpen) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
        document.body.style.overflow = previousOverflow
        }
    }, [isModalOpen])
    function openSheet() {
        setSelected([...serviceValues])
        setIsModalOpen(true)
    }
    function toggleService(name) {
        setSelected((prev) =>
        prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
        )
    }

    function startClose(animation, delay) {
        if (closeTimer.current) return
        setDragY(0)
        setModalAnimation(animation)
        closeTimer.current = setTimeout(() => {
            setIsModalOpen(false)
            setModalAnimation('slide-up')
            closeTimer.current = null
        }, delay)
    }
    function closeSheet() {
        startClose('slide-down', 500)
    }

    function confirmService() {
        setServiceValues(selected)
        if (selected.length > 0) {
            setErrors((prev) => ({ ...prev, service: '' }))
        }
        closeSheet()
    }

    function handleDragStart(event) {
        if (closeTimer.current) return
        dragStartY.current = event.clientY
        event.currentTarget.setPointerCapture(event.pointerId)
        setModalAnimation('dragging')
    }
    function handleDragMove(event) {
        if (dragStartY.current === null) return
        setDragY(Math.max(0, event.clientY - dragStartY.current))
    }
    function handleDragEnd() {
        if (dragStartY.current === null) return
        dragStartY.current = null
        if (dragY > 100) {
            startClose('dismiss', 300)
        } else {
            setDragY(0)
            setModalAnimation('settled')
        }
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
        if (!data.get('datetime')) {
            next.datetime = 'Please choose a date and time.'
        }
        if (!serviceValues) {
            next.service = 'Please choose a service.'
        }

        setErrors(next)

        if (Object.keys(next).length === 0) {
            setSubmitted(true)
            setServiceValues('')
            form.reset()
        } else {
            setSubmitted(false)
        }
    }

    return (
        <section className='booking' id='booking'>
            <span className='section-title'>Booking</span>
            <form onSubmit={handleSubmit} noValidate>
                {booking_data.map((field) => (
                    <div className='field' key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        {field.type === 'select' ? (
                            <button
                                id={field.id}
                                type='button'
                                className='picker-trigger'
                                aria-haspopup='dialog'
                                aria-invalid={errors[field.id] ? 'true' : 'false'}
                                onClick={openSheet}
                            >
                                <span className={serviceValues ? 'picker-value' : 'picker-placeholder'}>
                                    {serviceValues || field.placeholder}
                                </span>
                                <HiChevronDown className='picker-icon' />
                            </button>
                        ) : (
                            <input
                                id={field.id}
                                name={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                                aria-invalid={errors[field.id] ? 'true' : 'false'}
                            />
                        )}
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

            {isModalOpen && (
                <div className='modal-overlay' onClick={closeSheet}>
                    <div
                    className={`modal-content ${modalAnimation}`}
                    style={dragY > 0 ? { transform: `translateY(${dragY})` } : undefined}
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby='service-sheet-title'
                    onClick={(event) => event.stopPropagation()}
                    >
                        <div
                        className='sheet-grab'
                        onPointerDown={handleDragStart}
                        onPointerMove={handleDragMove}
                        onPointerUp={handleDragEnd}
                        onPointerCancel={handleDragEnd}
                        >
                            <div className='sheet-handle'></div>
                            <h3 className='modal-title' id='service-sheet-title'>Choose services</h3>
                        </div>
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
                            <button type='button' className='done-btn' onClick={confirmService}>Done</button>
                            <button type='button' className='cancel-btn' onClick={closeSheet}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Booking