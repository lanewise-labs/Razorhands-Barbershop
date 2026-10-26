import './css/App.css'
import './css/desktop.css'
import NavBar from './components/NavBar'
import DemoBanner from './components/DemoBanner'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Contact from './pages/Contact'


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
