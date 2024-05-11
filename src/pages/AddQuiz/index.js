import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./styles.module.css";
import dummyQuestions from "../../dummyQuestions.json";
import * as Yup from "yup";
import { useContext } from "react";
import { QuizContext } from "../../store/QuizContext";
import { ACTION_TYPES } from "../../store/reducer";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
  const { dispatch } = useContext(QuizContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    questions: Yup.array().min(1, "at Least one question"),
    title: Yup.string().required(),
    description: Yup.string().required(),
    url: Yup.string().required(),
  });
  const handleSubmit = (values) => {
    dispatch({
      payload: [
        {
          type: ACTION_TYPES.MERGE_PROP,
          prop: "quizes",
          value: {
            description: values.description,
            id: Date.now() + Math.floor(Math.random() * 1000),
            questions_answers: dummyQuestions.filter((obj) =>
              values.questions.some((element) => element == obj.id)
            ),
            score: null,
            title: values.title,
            url: values.url,
          },
        },
      ],
    });
    navigate("/");
  };
  return (
    <Formik
      initialValues={{ title: "", description: "", url: "", questions: [] }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values }) => (
        <div className={styles.container}>
          <Form className={styles.quizForm}>
            <h3 style={{ fontWeight: 500, marginBottom: 35 }}>Add Quiz</h3>
            <div className={styles.inputContainer}>
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className={styles.input}
              />
              <ErrorMessage name="title">
                {(msg) => <div className={styles.error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.inputContainer}>
              <Field
                type="text"
                name="description"
                placeholder="Description"
                className={styles.input}
              />
              <ErrorMessage name="description">
                {(msg) => <div className={styles.error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.inputContainer}>
              <Field
                type="url"
                name="url"
                placeholder="Url"
                className={styles.input}
              />
              <ErrorMessage name="url">
                {(msg) => <div className={styles.error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.inputContainer}>
              <h3>Select Questions</h3>
              {dummyQuestions.map((option, index) => {
                return (
                  <div key={index}>
                    <label>
                      <Field
                        type="checkbox"
                        name="questions"
                        value={option.id}
                        checked={values.questions.some(
                          (element) => element == option.id
                        )}
                      />
                      {option.text}
                    </label>
                  </div>
                );
              })}
              <ErrorMessage name="questions">
                {(msg) => <div className={styles.error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div style={{ width: "100%" }}>
              <button className={styles.btn} type="submit">
                Submit
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AddQuiz;
