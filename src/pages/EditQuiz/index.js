import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./styles.module.css";
import dummyQuestions from "../../dummyQuestions.json";
import * as Yup from "yup";
import { useContext } from "react";
import { QuizContext } from "../../store/QuizContext";
import { ACTION_TYPES } from "../../store/reducer";
import { useNavigate, useParams } from "react-router-dom";

const EditQuiz = () => {
  const { state, dispatch } = useContext(QuizContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    questions: Yup.array().min(1, "at Least one question"),
    title: Yup.string().required(),
    description: Yup.string().required(),
    url: Yup.string().required(),
  });

  const params = useParams();
  const filteredQuiz = state.quizes.find((quiz) => quiz.id === +params.id);

  const handleSubmit = (values) => {
    const updatedIndex = state.quizes.findIndex(
      (quiz) => quiz.id === +params.id
    );
    debugger;
    dispatch({
      payload: [
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: `quizes.${updatedIndex}`,
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
  return filteredQuiz ? (
    <Formik
      initialValues={{
        title: filteredQuiz.title || "",
        description: filteredQuiz.description || "",
        url: filteredQuiz.url || "",
        questions: filteredQuiz.questions_answers.map((e) => e.id) || [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, setFieldValue }) => (
        <div className={styles.container}>
          <Form className={styles.quizForm}>
            <h3 style={{ fontWeight: 500, marginBottom: 35 }}>Edit Quiz</h3>
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
                        onChange={(event) => {
                          // Extract the value of the checkbox that triggered the change
                          const value = event.target.value;

                          // Check if the checkbox value is already in the array
                          const isChecked = values.questions.some(
                            (element) => element == value
                          );

                          // Update the checkboxes array based on whether the checkbox was checked or unchecked
                          const updatedCheckboxes = isChecked
                            ? values.questions.filter((val) => val != value) // Remove the value if already checked
                            : [...values.questions, value]; // Add the value if not already checked
                          debugger;
                          // Update Formik's state with the new checkboxes array
                          setFieldValue("questions", updatedCheckboxes);
                        }}
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
  ) : (
    <div>Quiz is Not found</div>
  );
};

export default EditQuiz;
