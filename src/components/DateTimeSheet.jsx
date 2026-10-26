import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import BottomSheet from './BottomSheet'
import { shop_hours } from '../data/siteData'

const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]
const SLOT_MINUTES = 30
const MONTHS_AHEAD = 2

function pad(number) {
    return String(number).padStart(2, '0')
}

function toDateKey(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function fromDateKey(key) {
    const [year, month, day] = key.split('-').map(Number)
    return new Date(year, month - 1, day)
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    const suffix = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 === 0 ? 12 : hours % 12
    return `${hour12}:${pad(rest)} ${suffix}`
}

function formatLongDate(date) {
    return `${WEEKDAY_NAMES[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`
}

export function formatDateTime(value) {
    if (!value) return ''
    const date = fromDateKey(value.dateKey)
    const weekday = WEEKDAY_NAMES[date.getDay()].slice(0, 3)
    const month = MONTH_NAMES[date.getMonth()].slice(0, 3)
    return `${weekday}, ${date.getDate()} ${month} ${date.getFullYear()} · ${formatTime(value.minutes)}`
}

function getSlots(date) {
    const hours = shop_hours[date.getDay()]
    if (!hours) return []
    const slots = []
    for (let minutes = hours.open * 60; minutes < hours.close * 60; minutes += SLOT_MINUTES) {
        slots.push(minutes)
    }
    return slots
}

function isSlotTaken(date, minutes, now) {
    if (date.getDate() % 7 === 5) return true
    if ((date.getDate() + minutes / SLOT_MINUTES) % 4 === 0) return true
    const isToday = toDateKey(date) === toDateKey(now)
    return isToday && minutes <= now.getHours() * 60 + now.getMinutes()
}

function isDayAvailable(date, now) {
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    if (date < todayStart) return false
    return getSlots(date).some((minutes) => !isSlotTaken(date, minutes, now))
}

function DateTimeSheet({ initialValue, onConfirm, onClosed }) {
    const [viewDate, setViewDate] = useState(() => {
        const base = initialValue ? fromDateKey(initialValue.dateKey) : new Date()
        return new Date(base.getFullYear(), base.getMonth(), 1)
    })
    const [dateKey, setDateKey] = useState(initialValue ? initialValue.dateKey : null)
    const [minutes, setMinutes] = useState(initialValue ? initialValue.minutes : null)

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonth = new Date(now.getFullYear(), now.getMonth() + MONTHS_AHEAD, 1)
    const canGoBack = viewDate > thisMonth
    const canGoForward = viewDate < lastMonth

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const blanks = viewDate.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const dayNumbers = Array.from({ length: daysInMonth }, (_, index) => index + 1)

    const selectedDate = dateKey ? fromDateKey(dateKey) : null
    const slots = selectedDate ? getSlots(selectedDate) : []
    const hours = selectedDate ? shop_hours[selectedDate.getDay()] : null
    const canConfirm = dateKey !== null && minutes !== null

    function changeMonth(step) {
        setViewDate(new Date(year, month + step, 1))
    }

    function pickDay(day) {
        const key = toDateKey(new Date(year, month, day))
        if (key === dateKey) return
        setDateKey(key)
        setMinutes(null)
    }

    return (
        <BottomSheet title='Pick a date & time' titleId='datetime-sheet-title' onClosed={onClosed} wide>
            {(close) => (
                <>
                    <div className='picker-body'>
                        <div className='picker-calendar'>
                            <div className='month-bar'>
                                <button
                                    type='button'
                                    className='month-nav'
                                    aria-label='Previous month'
                                    disabled={!canGoBack}
                                    onClick={() => changeMonth(-1)}
                                >
                                    <HiChevronLeft />
                                </button>
                                <p className='month-title' aria-live='polite'>{MONTH_NAMES[month]} {year}</p>
                                <button
                                    type='button'
                                    className='month-nav'
                                    aria-label='Next month'
                                    disabled={!canGoForward}
                                    onClick={() => changeMonth(1)}
                                >
                                    <HiChevronRight />
                                </button>
                            </div>

                            <div className='weekdays' aria-hidden='true'>
                                {WEEKDAY_LETTERS.map((letter, index) => (
                                    <span key={index}>{letter}</span>
                                ))}
                            </div>

                            <div className='days' role='group' aria-label='Choose a day'>
                                {Array.from({ length: blanks }, (_, index) => (
                                    <span key={`blank-${index}`} className='day-blank' aria-hidden='true'></span>
                                ))}
                                {dayNumbers.map((day) => {
                                    const date = new Date(year, month, day)
                                    const available = isDayAvailable(date, now)
                                    const isPast = date < todayStart
                                    return (
                                        <button
                                            key={day}
                                            type='button'
                                            className={isPast ? 'day past' : 'day'}
                                            disabled={!available}
                                            aria-pressed={toDateKey(date) === dateKey}
                                            aria-label={`${formatLongDate(date)}${available ? '' : ', unavailable'}`}
                                            onClick={() => pickDay(day)}
                                        >
                                            {day}
                                        </button>
                                    )
                                })}
                            </div>

                            <div className='legend'>
                                <span className='legend-item'><span className='legend-dot'></span>Available</span>
                                <span className='legend-item'><span className='legend-dot selected'></span>Selected</span>
                                <span className='legend-item'><span className='legend-dot booked'></span>Fully booked</span>
                            </div>
                        </div>

                        <div className='picker-times'>
                            {selectedDate ? (
                                <>
                                    <h4 className='slots-title'>{formatLongDate(selectedDate)}</h4>
                                    <p className='slots-note'>
                                        Open {formatTime(hours.open * 60)} – {formatTime(hours.close * 60)}. Crossed-out times are taken.
                                    </p>
                                    <div className='slots' role='group' aria-label='Choose a time'>
                                        {slots.map((slot) => (
                                            <button
                                                key={slot}
                                                type='button'
                                                className='slot'
                                                disabled={isSlotTaken(selectedDate, slot, now)}
                                                aria-pressed={minutes === slot}
                                                onClick={() => setMinutes(slot)}
                                            >
                                                {formatTime(slot)}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className='slots-empty'>Choose a day to see open times.</p>
                            )}
                        </div>
                    </div>

                    <div className='sheet-actions'>
                        <button
                            type='button'
                            className='done-btn'
                            disabled={!canConfirm}
                            onClick={() => {
                                onConfirm({ dateKey, minutes })
                                close()
                            }}
                        >
                            Confirm date &amp; time
                        </button>
                        <button type='button' className='cancel-btn' onClick={close}>Cancel</button>
                    </div>
                </>
            )}
        </BottomSheet>
    )
}

export default DateTimeSheet