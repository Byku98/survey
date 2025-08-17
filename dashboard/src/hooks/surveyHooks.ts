import { NavigateFunction } from "react-router-dom";
import { logoutUser } from "../api/surveyApi";
import { removeAuthTokenCookie, getCookieValue } from "../utils/cookieUtils";
import { sendSurvey } from "../api/surveyApi";
import type { SurveyFields } from "../types/survey";

export async function handleSubmit(
  data: SurveyFields,
  navigate: NavigateFunction
) {
  const surveyDate = new Date();
  const token = getCookieValue("token");
  console.log("Lets tak token value: " + token);

  const surveyData = {
    ...data,
    date: surveyDate,
  };

  if (!token) {
    console.error("Missing token");
    navigate("/auth");
    return;
  }

  try {
    const response = await sendSurvey(surveyData, token);

    console.debug("Response from server:", response);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error submitting survey:", errorResponse);
      navigate("/error");
    }

    const result = await response.json();
    console.log("Survey send successfully:", result);
    navigate("/thankyou");
  } catch (error) {
    console.error("Error submitting survey:", error);
    navigate("/error");
  }
}

export async function handleLogout() {
  const token = getCookieValue("token");

  // setTimeout(() => {
  //   console.log("Token from cookie:", token);
  // }, 2000); // 2000 milliseconds = 2 second

  if (token) {
    try {
      const response = await logoutUser(token); // Call server-side logout
      console.log("Server-side logout response:", response);
    } catch (error) {
      console.error("Error during server-side logout:", error);
      // Even if server logout fails, proceed with client-side cleanup
    } finally {
      removeAuthTokenCookie("token"); // Always remove client-side cookie
      window.location.reload(); // Always reload page for full reset
    }
  } else {
    console.warn(
      "No token found in cookie. Cannot perform server-side logout with token. Proceeding with client-side cleanup."
    );
    removeAuthTokenCookie("token"); // Still remove the client-side cookie if it somehow got set but was undefined
    window.location.reload(); // Still reload
  }
}
