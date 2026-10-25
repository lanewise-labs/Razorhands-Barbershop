export const promo = {
    title: 'Student Tuesday',
    desc: '₱50 off any haircut with a school ID.'
}

export const services = [
    {title: 'Hair Services', tab: 'Hair', items: [{name: 'Classic Haircut', price: 200}, 
        {name: 'Kids Haircut', price: 150},
        {name: 'Beard Trim', price: 100},
        {name: 'Hot Towel Shave', price: 150},
        {name: 'Haircut + Shave', price: 300}]},
    {title: 'Hair Styling', tab: 'Styling', items: [{name: 'Hair Color', price: 800}, 
        {name: 'Perm', price: 1500},
        {name: 'Highlights', price: 1200},
        {name: 'Blowout Styling', price: 250}],
    },
    {title: 'Spa Services', tab: 'Spa', items: [{name: 'Hair Spa Treatment', price: 600}, 
        {name: 'Scalp Massage (20 min)', price: 350},
        {name: 'Facial Cleansing', price: 500}]}
    ]

export const contact = {
    openinghours: ['Weekdays: 9:00 AM – 4:00 PM', 'Weekends: 9:00 AM – 2:00 PM'],
    location: '14 Sample Street, Barangay Placeholder, Demo City, Philippines',
    call: '+63 917 000 0000',
    email: 'hello@razorhands.example',
    social: '@razorhandsdemo'
}

export const booking_data = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Evan Santiago' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'santiago@example.com' },
    { id: 'phone', label: 'Contact Number', type: 'tel', placeholder: '0900 000 0000' },
    { id: 'datetime', label: 'Date & Time', type: 'datetime-local', placeholder: '' },
    { id: 'service', label: 'Service', type: 'select', placeholder: 'Choose a service' }
]
