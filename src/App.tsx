import { Routers } from "./Routes"
import { ToggleTheme } from "./components/ToggleTheme"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

function App() {
  const html = document.querySelector('html')

  if(localStorage.theme === "dark") {
    html?.classList.add('dark')
  }

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
