import { createContext, useState } from "react";

export const Context = createContext(null);

const defaultStudentToken =
  JSON.parse(localStorage.getItem("StudentToken")) || null;
const defaultStudent = JSON.parse(localStorage.getItem("student")) || null;

function ContextProvider({ children }) {
  const [student, setStudent] = useState(defaultStudent);
  const [studentToken, setStudentToken] = useState(defaultStudentToken);
  const [errors, setErrors] = useState(null);
  const [teachers, setTeachers] = useState(null);

  return (
    <Context.Provider
      value={{
        student,
        setStudent,
        studentToken,
        setStudentToken,
        errors,
        setErrors,
        teachers,
        setTeachers,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
