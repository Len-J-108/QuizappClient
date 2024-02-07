import axios from "axios";
export async function getQuestions() {
  axios.get("http://localhost:5000/questions/get-all-questions")
  .then ((data)=> console.log(data))
}

getQuestions()