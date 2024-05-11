import { useContext } from "react";
import { QuizContext } from "../../store/QuizContext";
import QuizCard from "./components/QuizCard/QuizCard";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const { state } = useContext(QuizContext);
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.header}>
        <h2>Quiz Creator</h2>
        <button className={styles.btn} onClick={() => navigate("/add-quiz")}>
          Add New Quiz
        </button>
      </div>
      <div className={styles.cards}>
        {state.quizes.map((quiz, index) => {
          return <QuizCard key={index} quiz={quiz} />;
        })}
      </div>
    </>
  );
};

export default QuizList;
