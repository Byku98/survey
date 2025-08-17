import SurveyForm from "../components/SurveyForm";
import { useNavigate } from "react-router-dom";
import { handleLogout, handleSubmit } from "../hooks/surveyHooks";
import type { SurveyFields } from "../types/survey";

export default function Survey() {
  const navigate = useNavigate();

  const onFormSubmit = (data: SurveyFields) => {
    // Call the hook's handleSubmit, passing the data object and the navigate function
    handleSubmit(data, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 500px ">
      <div className="bg-white p-10 px-5 rounded-xl shadow-md w-full max-w-md space-y-8">
        <h2 className="text-2xl font-bold py-4">Page satisfaction survey</h2>
        <SurveyForm onSubmit={onFormSubmit} />
        <button
          onClick={handleLogout}
          className="btn btn-secondary w-100 text-nowrap btn-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
