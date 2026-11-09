import SideBar from "./SideBar"
import MainBar from "./MainBar"

function App() {
  return (
      <div
        className="scrollbar-none app-shell flex min-h-screen overflow-hidden"
      >
        <SideBar/>
        <MainBar/>
      </div>
  )
}

export default App
