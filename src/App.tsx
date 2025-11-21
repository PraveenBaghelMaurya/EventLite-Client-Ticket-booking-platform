import { Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/signup"
import Event from "./pages/Event"
import EventDetail from "./pages/EventDetail"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/events" element={<Event />} />
      <Route path="/events/:id" element={<EventDetail />} />
    </Routes>
  )
}

export default App