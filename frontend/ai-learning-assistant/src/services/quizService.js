import { API_PATHS } from "../utils/apiPath";
import axiosInstance from "../utils/axiosInstance";

const getQuizzesForDocument = async(documentId) => {
    try{
        const response = await axiosInstance.get(API_PATHS.QUIZZES.GET_QUIZZES_FOR_DOC(documentId));
        return response.data;
    }catch(error){
        throw error.reponse?.data || {message : "failed to fetch quizzes "};
    }
}

const getQuizById = async(id) => {
    try{
        const response = await axiosInstance.get(API_PATHS.QUIZZES.GET_QUIZ_BY_ID(id));
        return response.data;
    }catch(error){
        throw error.reponse?.data || {message : "failed to fetch quizzes "};
    }
}

const submitQuiz = async(id , answers) => {
    try{
        const response = await axiosInstance.post(API_PATHS.QUIZZES.SUBMIT_QUIZ(id) , {answers});
        return response.data;
    }catch(error){
        throw error.reponse?.data || {message : "failed to fetch quizzes "};
    }
}

const getQuizResults = async(id) => {
    try{
        const response = await axiosInstance.get(API_PATHS.QUIZZES.GET_QUIZ_RESULTS(id));
        return response.data;
    }catch(error){
        throw error.reponse?.data || {message : "failed to fetch quizzes "};
    }
}

const deleteQuiz = async(id) => {
    try{
        const response = await axiosInstance.delete(API_PATHS.QUIZZES.DELETE_QUIZ(id));
        return response.data;
    }catch(error){
        throw error.reponse?.data || {message : "failed to fetch quizzes "};
    }
}
const quizService = {
    getQuizzesForDocument , getQuizById , submitQuiz , getQuizResults , deleteQuiz
}
export default quizService; 
