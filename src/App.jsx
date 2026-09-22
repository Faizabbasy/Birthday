import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MusicProvider } from './context/MusicContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Letter from './pages/Letter/Letter'
import Moments from './pages/Moments/Moments'

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index        element={<Home />} />
            <Route path="letter"  element={<Letter />} />
            <Route path="moments" element={<Moments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MusicProvider>
  )
}

export default App
