import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

import Home from "./pages/Home";
import TaskListPage from "./pages/TaskListPage";

export default function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StyleSheetManager>
  );
}
