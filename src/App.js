import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routing/AppRoutes";
import { QuizProvider } from "./store/QuizContext";

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
