import './css/App.css'
import NavBar from './components/NavBar'
import DemoBanner from './components/DemoBanner'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'


function App() {
  return (
    <>
      <DemoBanner/>
      <NavBar/>
      <div className='container'>
        <Home/>
        <About/>
      </div>
      <Contact/>
      
    </>
  )
}

export default App
