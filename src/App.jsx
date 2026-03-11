import { ThemeProvider } from "@/style/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Layout from "@/layout/Layout";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
