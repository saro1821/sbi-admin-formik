import React from 'react'
import Sidebar from './component/Sidebar'
import Dashboard from './component/Dashboard'
import Class from './component/Class'
import User from './component/User'
import Query from './component/Query'
import Adduser from './component/Adduser'
import Edituser from './component/Edituser'
import{BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'

function App() {
  return <div id="wrapper">
<BrowserRouter>
<Sidebar/>

<Routes>
  <Route path='/dashboard' element={<Dashboard/>}></Route>
  <Route path='/adduser' element={<Adduser/>}></Route>
  <Route path='/edituser/:id' element={<Edituser/>}></Route>
           <Route path='user' element={<User/>}></Route>
           <Route path='class' element={<Class/>}></Route>
           <Route path='query' element={<Query/>}></Route>
      
  <Route path='*' element={<Navigate to='/dashboard'/>}></Route>

</Routes>
</BrowserRouter>

  </div>
}

export default App