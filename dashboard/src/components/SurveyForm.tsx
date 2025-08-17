import { useState } from "react";
import NameInput from "../components/SurveyNameInput";
import CheckboxGroup from "../components/SurveyCheckboxGroup";
import RadioGroup from "../components/SurveyRadioGroup";
import OpenTextAnswer from "../components/SurveyOpenTextAnswer";
import type { SurveyFields } from "../types/survey";

type SurveyFormProps = {
  onSubmit: (data: SurveyFields) => void;
};

export default function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [checkboxAnswers, setCheckboxAnswers] = useState<string[]>([]);
  const [radioAnswer, setRadioAnswer] = useState<string>("");
  const [openAnswer, setOpenAnswer] = useState<string>("");
  const [openName, setOpenName] = useState<string>("");

  const localHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const surveyData: SurveyFields = {
      openName,
      checkboxAnswers,
      radioAnswer,
      openAnswer,
    };

    onSubmit(surveyData);
  };

  return (
    <form method="post" onSubmit={localHandleSubmit}>
      <NameInput openName={openName} setOpenName={setOpenName} />
      <CheckboxGroup
        checkboxAnswers={checkboxAnswers}
        setCheckboxAnswers={setCheckboxAnswers}
      />
      <RadioGroup radioAnswer={radioAnswer} setRadioAnswer={setRadioAnswer} />
      <OpenTextAnswer openAnswer={openAnswer} setOpenAnswer={setOpenAnswer} />

      <button
        type="submit"
        className="btn btn-primary w-100 text-nowrap btn-lg mb-3 mt-3"
      >
        Submit
      </button>
    </form>
  );
}
