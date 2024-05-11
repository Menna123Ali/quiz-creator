import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>Title : {quiz.title}</h4>
        <p className={styles.cardText}> Description: {quiz.description}.</p>
        <p className={styles.cardText}>
          Url : <a href={quiz.url}>{quiz.url}</a>
        </p>
        <button
          className={styles.btn}
          onClick={() => navigate(`/quiz/${quiz.id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default React.memo(QuizCard);
