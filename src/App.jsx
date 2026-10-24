import './css/App.css'
import NavBar from './components/NavBar'
import DemoBanner from './components/DemoBanner'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Booking from './components/Booking'
import Contact from './components/Contact'


function App() {
  return (
    <>
      <DemoBanner/>
      <NavBar/>
      <div className='container'>
        <Home/>
        <About/>
        <Services/>
        <Booking/>
      </div>
      <Contact/>
      
    </>
  )
}

export default App
