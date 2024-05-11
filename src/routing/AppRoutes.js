import { useRoutes } from "react-router-dom";
import QuizList from "../pages/QuizList";
import AddQuiz from "../pages/AddQuiz";
import EditQuiz from "../pages/EditQuiz";

const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <QuizList />, exact: true },
    { path: "/add-quiz", element: <AddQuiz />, exact: true },
    { path: "/quiz/:id", element: <EditQuiz />, exact: true },
  ]);
};
export default AppRoutes;
