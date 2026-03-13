import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Welcome } from "./pages/welcome";
import { YearPage } from "./pages/year";
import { ModulePage } from "./pages/module";
import { NotePage } from "./pages/note";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/year/:year" element={<YearPage />} />
          <Route path="/module/:code" element={<ModulePage />} />
          <Route path="/notes/:code/:note" element={<NotePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}