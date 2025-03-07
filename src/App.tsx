import { Routers } from "./Routes"
import { ToggleTheme } from "./components/ToggleTheme"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

function App() {

  return (
    <>
      <Header/>
      <ToggleTheme/>
      <Routers/>
      <Footer/>
    </>
  )
}

export default App
