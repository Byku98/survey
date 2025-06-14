import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NameInput from "../components/SurveyNameInput";
import CheckboxGroup from "../components/SurveyCheckboxGroup";
import RadioGroup from "../components/SurveyRadioGroup";
import OpenTextAnswer from "../components/SurveyOpenTextAnswer";

export default function Survey() {
  const [checkboxAnswers, setCheckboxAnswers] = useState<string[]>([]);
  const [radioAnswer, setRadioAnswer] = useState<string>("");
  const [openAnswer, setOpenAnswer] = useState<string>("");
  const [openName, setOpenName] = useState<string>("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const surveyDate = new Date();

    const surveyData = {
      name: openName,
      selectedIngredients: checkboxAnswers,
      mood: openAnswer,
      selfDescription: radioAnswer,
      date: surveyDate,
    };

    try {
      const response = await fetch("http://localhost:3000/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(surveyData),
      });

      const result = await response.json();
      console.log(result);
      navigate("/thankyou");
    } catch (error) {
      navigate("/error");
      console.error("Error submitting survey:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 500px ">
      <div className="bg-white p-10 px-5 rounded-xl shadow-md w-full max-w-md space-y-8">
        <h2 className="text-2xl font-bold py-4">Page satisfaction survey</h2>

        <form method="post" onSubmit={handleSubmit}>
          <NameInput openName={openName} setOpenName={setOpenName} />
          <CheckboxGroup
            checkboxAnswers={checkboxAnswers}
            setCheckboxAnswers={setCheckboxAnswers}
          />
          <RadioGroup radioAnswer={radioAnswer} setRadioAnswer={setRadioAnswer} />
          <OpenTextAnswer openAnswer={openAnswer} setOpenAnswer={setOpenAnswer} />

          <button
            type="submit"
            className="btn btn-primary w-100 text-nowrap btn-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}