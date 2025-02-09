import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Top from "./Top/Top";
import NotFound from "./Notfound/Notfound";
import ErrorBoundary from "./ErrorBoundary/Errorboundary";
import BugButton from "./ErrorBoundary/throwError";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BugButton />
    </Router>
  </ErrorBoundary>
);
