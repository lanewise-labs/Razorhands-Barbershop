import { useEffect, useRef, useState } from 'react'
import { HiX } from 'react-icons/hi'

const DESKTOP_QUERY = '(min-width: 768px)'

function BottomSheet({ title, titleId, onClosed, wide = false, children }) {
    const [animation, setAnimation] = useState('slide-up')
    const [dragY, setDragY] = useState(0)
    const closeTimer = useRef(null)
    const dragStartY = useRef(null)

    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = previousOverflow
            clearTimeout(closeTimer.current)
        }
    }, [])

    function startClose(nextAnimation, delay) {
        if (closeTimer.current) return
        setDragY(0)
        setAnimation(nextAnimation)
        closeTimer.current = setTimeout(onClosed, delay)
    }

    function requestClose() {
        startClose('slide-down', 500)
    }

    function handleDragStart(event) {
        if (closeTimer.current || window.matchMedia(DESKTOP_QUERY).matches) return
        dragStartY.current = event.clientY
        event.currentTarget.setPointerCapture(event.pointerId)
        setAnimation('dragging')
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
            setAnimation('settled')
        }
    }

    return (
        <div className='modal-overlay' onClick={requestClose}>
            <div
                className={`modal-content${wide ? ' modal-wide' : ''} ${animation}`}
                style={dragY > 0 ? { transform: `translateY(${dragY}px)` } : undefined}
                role='dialog'
                aria-modal='true'
                aria-labelledby={titleId}
                onClick={(event) => event.stopPropagation()}
            >
                <button type='button' className='sheet-close' aria-label='Close' onClick={requestClose}>
                    <HiX />
                </button>
                <div
                    className='sheet-grab'
                    onPointerDown={handleDragStart}
                    onPointerMove={handleDragMove}
                    onPointerUp={handleDragEnd}
                    onPointerCancel={handleDragEnd}
                >
                    <div className='sheet-handle'></div>
                    <h3 className='modal-title' id={titleId}>{title}</h3>
                </div>
                {children(requestClose)}
            </div>
        </div>
    )
}

export default BottomSheet