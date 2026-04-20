import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Welcome } from "./pages/welcome"
import { YearPage } from "./pages/year"
import { ModulePage } from "./pages/module"
import { ResourcePage } from "./pages/resource"
import { AcknowledgementsPage } from "./pages/acknowledgements"
import { CareersPage } from "./pages/careers"
import { QuizzesPage } from "./pages/quizzes"
import { QuizPage } from "./pages/quiz"
import { CS133ClassTest } from "./pages/tools/cs133-class-test"

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/year/:year" element={<YearPage />} />
          <Route path="/module/:code" element={<ModulePage />} />
          <Route path="/resources/:category/:code/:filename" element={<ResourcePage />} />
          <Route path="/acknowledgements" element={<AcknowledgementsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/quizzes/:id" element={<QuizPage />} />
          <Route path="/tools/CS133/class-test" element={<CS133ClassTest />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
