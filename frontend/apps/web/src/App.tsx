import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Welcome } from "./pages/welcome"

// Welcome is the landing page so it stays eager — avoiding a Suspense flicker
// on first paint. Every other route is code-split: only the chunks the user
// actually navigates to get downloaded, which keeps the index bundle (the
// thing that gates first-paint everywhere) lean.
const YearPage = lazy(() =>
  import("./pages/year").then((m) => ({ default: m.YearPage })),
)
const ModulePage = lazy(() =>
  import("./pages/module").then((m) => ({ default: m.ModulePage })),
)
const ResourcePage = lazy(() =>
  import("./pages/resource").then((m) => ({ default: m.ResourcePage })),
)
const AcknowledgementsPage = lazy(() =>
  import("./pages/acknowledgements").then((m) => ({
    default: m.AcknowledgementsPage,
  })),
)
const CareersPage = lazy(() =>
  import("./pages/careers").then((m) => ({ default: m.CareersPage })),
)
const ResourcesPage = lazy(() =>
  import("./pages/resources").then((m) => ({ default: m.ResourcesPage })),
)
const InternshipsPage = lazy(() =>
  import("./pages/internships").then((m) => ({ default: m.InternshipsPage })),
)
const WritingYourCVPage = lazy(() =>
  import("./pages/writing-your-cv").then((m) => ({
    default: m.WritingYourCVPage,
  })),
)
const InterviewPrepPage = lazy(() =>
  import("./pages/interview-prep").then((m) => ({
    default: m.InterviewPrepPage,
  })),
)
const SellingYourselfPage = lazy(() =>
  import("./pages/selling-yourself").then((m) => ({
    default: m.SellingYourselfPage,
  })),
)
const QuizzesPage = lazy(() =>
  import("./pages/quizzes").then((m) => ({ default: m.QuizzesPage })),
)
const QuizPage = lazy(() =>
  import("./pages/quiz").then((m) => ({ default: m.QuizPage })),
)
const ReviewsPage = lazy(() =>
  import("./pages/reviews").then((m) => ({ default: m.ReviewsPage })),
)
const CS133ClassTest = lazy(() =>
  import("./pages/tools/cs133-class-test").then((m) => ({
    default: m.CS133ClassTest,
  })),
)

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Navbar />
        <Suspense
          fallback={
            <div className="p-8 text-center text-sm text-muted-foreground">
              Loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/year/:year" element={<YearPage />} />
            <Route path="/module/:code" element={<ModulePage />} />
            <Route path="/resources/:category/:code/:filename" element={<ResourcePage />} />
            <Route path="/acknowledgements" element={<AcknowledgementsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/careers/internships" element={<InternshipsPage />} />
            <Route path="/careers/writing-your-cv" element={<WritingYourCVPage />} />
            <Route path="/careers/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/careers/selling-yourself" element={<SellingYourselfPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quizzes/:id" element={<QuizPage />} />
            <Route path="/reviews/:code" element={<ReviewsPage />} />
            <Route path="/tools/CS133/class-test" element={<CS133ClassTest />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
