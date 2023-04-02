import { BrowserRouter as Router } from "react-router-dom"
import Routes from './routes'
import './Root.css'


export const Root = function () {
  return (
    <div className='containerr flex column'>
      <Router>
        <Routes />
        <div className='foot'>
        </div>
      </Router>
    </div>
  )
}
