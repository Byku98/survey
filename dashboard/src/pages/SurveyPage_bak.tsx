import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Survey() {
  const [checkboxAnswers, setCheckboxAnswers] = useState<string[]>([]);
  const [radioAnswer, setRadioAnswer] = useState<string>("");
  const [openAnswer, setMoodAnswer] = useState<string>("");
  const [openName, setNameAnswer] = useState<string>("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const surveyDate = new Date();

    // Prepare the data to be sent
    const surveyData = {
      name: openName,
      selectedIngredients: checkboxAnswers,
      mood: openAnswer,
      selfDescription: radioAnswer,
      date: surveyDate
    };

    // Send data as JSON to the backend
    try {
      const response = await fetch("http://localhost:3000/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });
  
      const result = await response.json();
      //console.log('Server response:', result);
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

        {/* Initiate form */}
        <form method="post" onSubmit={handleSubmit}>
          {/* Openbox for Name */}
          <div className="card shadow-lg p-2 mb-1">
            <p className="mb-2 font-semibold">Give me Your name handsome...</p>
            <textarea
              value={openName}
              onChange={(e) => setNameAnswer(e.target.value)}
              className="w-full p-2 border rounded resize-none"
              rows={1}
              maxLength={50}
              placeholder="Your beautiful name..."
            />
          </div>

          {/* Checkbox Group */}
          <div className="card shadow-lg p-2 mb-1">
            <p className="mb-2 font-semibold">
              How You'd compose Your hamburger?
            </p>
            {[
              "Meat",
              "Cheese",
              "Onion",
              "Fried Onion",
              "Tomato",
              "Picle",
              "Salad",
              "Sauce",
            ].map((option) => (
              <label key={option} className="block">
                <input
                  type="checkbox"
                  value={option}
                  checked={checkboxAnswers.includes(option)}
                  onChange={(e) => {
                    if (checkboxAnswers.includes(option)) {
                      setCheckboxAnswers(
                        checkboxAnswers.filter((item) => item !== option)
                      );
                    } else {
                      setCheckboxAnswers([...checkboxAnswers, option]);
                    }
                  }}
                  className="mr-2 mx-2"
                />
                {option}
              </label>
            ))}
          </div>

          {/* Radio Group */}
          <div className="card shadow-lg p-2 border rounded mb-1">
            <p className="mb-2 font-semibold">How You'd describe Yourself?</p>
            {[
              "Night Owl",
              "Morning Sunshine",
              "Sleeper all time",
              "Sleep? What sleep?",
            ].map((option) => (
              <label key={option} className="block">
                <input
                  type="radio"
                  name="decision"
                  value={option}
                  defaultChecked={option === "Maybe"}
                  //checked={radioAnswer === option}
                  onChange={(e) => setRadioAnswer(e.target.value)}
                  className="mx-2"
                />
                {option}
              </label>
            ))}
          </div>

          {/* Open Text Answer */}
          <div className="card shadow-lg p-2 mb-1">
            <p className="mb-2 font-semibold">How is Your mood today?</p>
            <textarea
              value={openAnswer}
              onChange={(e) => setMoodAnswer(e.target.value)}
              className="w-full p-2 border rounded resize-none"
              rows={4}
              placeholder="Your answer..."
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary w-100 text-nowrap btn-lg"
            //disabled
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
