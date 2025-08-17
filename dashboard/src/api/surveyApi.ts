import { SurveyFields } from "../types/survey";

export async function sendSurvey(surveyData: SurveyFields, token: string) {
  
  console.log("Survey data to send:", surveyData);
  console.log("Survey data to send in JSON format:" + JSON.stringify(surveyData));
  console.log("Token:", token)

  const response = await fetch('${API_URL}/surveys/sendSurvey', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(surveyData),
  });

  return response.json();
}

export async function logoutUser(idToken: string) {
  const response = await fetch('${API_URL}/responder/logout', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  return response.json();
}
