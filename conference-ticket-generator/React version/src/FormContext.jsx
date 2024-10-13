import { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUsername: "",
  });

  function updateFormData(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <FormContext.Provider
      value={{
        ticketGenerated,
        setTicketGenerated,
        file,
        setFile,
        formData,
        updateFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
