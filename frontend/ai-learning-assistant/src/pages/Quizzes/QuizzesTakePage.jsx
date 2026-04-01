// import React , {useState , useEffect} from 'react'
// import { useParams , useNavigate} from 'react-router-dom';
// import {ChevronLeft , ChevronRight , CheckCircle2} from 'lucide-react';
// import quizService from '../../services/QuizService';
// import PageHeader from '../../components/common/PageHeader';
// import Spinner from '../../components/common/Spinner';
// import toast from 'react-hot-toast';
// import Button from '../../components/common/Button';

// const QuizzesTakePage = () => {

//   const { quizId } = useParams();
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState(null);
//   const [loading , setLoading] = useState(true);
//   const [currentQuestionIndex , setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers , setSelectedAnswers] = useState({});
//   const [submitting , setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       setLoading(true);
//       try {
//         const data = await quizService.getQuizById(quizId);
//         setQuiz(data.data);
//       } catch (error) {
//         toast.error("Failed to fetch the quiz");
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [quizId]);

//   const handleOptionChange = (questionId, optionId) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
//   }

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prev) => prev - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     setSubmitting(true);
//     try{
//       const formattedAnswers = Object.keys(selectedAnswers).map(questionId => {
//         const question = quiz.questions.find(q => q._id === questionId);
//         const questionIndex = quiz.questions.findIndex(q => q._id === questionId);
//         const optionIndex = selectedAnswers[questionId];
//         const selectedAnswer = question.options[optionIndex];
//         return {questionIndex , selectedAnswer}; 
//       })
//       await quizService.submitQuiz(quizId , formattedAnswers);
//       toast.success("Quiz submitted successfully");
//       navigate(`/quizzes/${quizId}/results`);
//     }
//     catch(error){
//       toast.error("Failed to submit the quiz");
//     }
//     finally{
//       setSubmitting(false);
//     }
//   }; 

//   if(loading){
//     return (
//       <div className='flex items-center justify-center min-h-[60vh]' >
//         <Spinner />
//       </div>
//     )
//   }

//   if(!quiz || !quiz.questions || quiz.questions.length === 0){
//     return (
//       <div className='flex items-center justify-center min-h-[60vh]' >
//         <div className='text-center'>
//           <p className='text-slate-600 text-lg' >Quiz not found or has no questions</p>
//         </div>
//       </div>
//     )
//   }

//   const currentQuestion = quiz?.questions?.[currentQuestionIndex];
//   // const isAnswered = selectedAnswers.hasOwnProperty(currentQuestion._id);
//   const isAnswered = currentQuestion && selectedAnswers.hasOwnProperty(currentQuestion._id);
//   const answeredCount = Object.keys(selectedAnswers).length;

//   return (
//     <div className='max-w-4xl mx-auto'>
//       {/* progress bar */}

//       <div className='mb-6'>
//         <div className='flex items-center justify-between mb-2'>
//           <span className='text-sm font-semibold text-slate-700'>
//             Questions {currentQuestionIndex + 1} of {quiz.questions.length}
//           </span>
//           <span className='text-sm font-medium text-slate-500'>
//             {answeredCount} answered
//           </span>
//         </div>
//         <div className='relative h-2 bg-slate-100 rounded-full overflow-hidden'>
//           <div className='absolute inset-y-0 left-0 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out' style={{width : `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`}}></div>
//         </div>
//       </div>
//       {/* question cards */}

//       <div className='bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 mb-8'>
//         <div className='items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl mb-6'>
//           <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'>
//             <span className='text-sm font-semibold text-emerald-700'>Question {currentQuestionIndex + 1}</span>
//           </div>
//            <h3 className='text-lg font-semibold text-slate-900 leading-relaxed'>{currentQuestion.question}</h3>

//            {/* options */}

//           <div className='space-y-3'>
//             {currentQuestion.options.map((option , index) => {
//               const isSelected = selectedAnswers[currentQuestion._id] === index ; 
//               return (
//                 <label key={index} className={`group relative flex items-center p-3 cursor-pointer rounded-xl border-2 ${isSelected ? 'border-emerald-500 bg-emerald-50 shadow-emerald-500/10' : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md'} transition-all duration-200`}>
//                   <input type='radio' name={`question-${currentQuestion._id}`} value={index} checked={isSelected} onChange={() => handleOptionChange(currentQuestion._id, index)} className='sr-only'/>

//                   {/* custom radio button */}

//                   <div className={`shrink-0 w-5 h-5 rounded-full border-2 ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white group-hover:border-emerald-400'} transition-all duration-200`}>
//                     {isSelected && (
//                       <div className='w-full h-full flex items-center justify-center'>
//                         <div className='w-2 h-2 bg-white rounded-full'/>
//                       </div>
//                     )}
//                   </div>

//                   {/* option text */}
//                   <span className={`ml-4 text-sm font-medium transition-colors duration-200 ${isSelected ? "text-emerald-900" : "text-slate-700 group-hover:text-slate-900"} `}>{option}</span>

//                   {/* selected checkmark */}

//                   {isSelected && (
//                     <CheckCircle2 className='ml-auto w-5 h-5 text-emerald-500' strokeWidth={2.5}/>
//                   )}
//                 </label>
//               )
//             })}
//           </div>
//         </div>

//         {/* navigation buttons */}

//         <div className='flex items-center justify-between gap-4'>
//           <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0 || submitting} variant='secondary'>
//             <ChevronLeft className='w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200' strokeWidth={2.5}/>
//             Previous
//           </Button>
//           {currentQuestionIndex === quiz.questions.length - 1 ? (
//             <button onClick={handleSubmitQuiz} disabled={submitting} className='group relative px-8 h-12 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl flex items-center justify-center transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-emerald-500/25 active:scale-95 disabled:active:scale-100 overflow-hidden'>
//               <span className='relative z-10 flex items-center gap-2'>{submitting ? (
//                 <>
//                 <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'/>
//                 Submitting ... 
//                 </>
//               ) : (
//                 <>
//                 <CheckCircle2 className='w-4 h-4 ' strokeWidth={2.5} />
//                 Submit Quiz
//                 </>
//               )}</span>
//               <div className='absolute inset-0 bg-linear-to-r from-white/20 via-white/20 to-white-0 translate-x-full group-hover:translate-x-full transition-transform duration-700'/>
//             </button>
//           ) : (
//             <Button onClick={handleNextQuestion} disabled={submitting}>
//               Next
//               <ChevronRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200' strokeWidth={2.5}/>
//             </Button>
//           )}
//         </div>

//         {/* question naviagtion dots */}

//         <div className='mt-0 flex items-center justify-center gap-2 flex-wrap'>
//           {quiz.questions.map((_ , index) => {
//             const isAnsweredQuestion = selectedAnswers.hasOwnProperty(quiz.questions[index]._id);
//             const isCurrent = index === currentQuestionIndex;
//             return (
//               <button key={index} onClick={() => setCurrentQuestionIndex(index)} disabled={submitting} className={`w-8 h-8 rounded-lg font-semibold text-xs mx-1 transition-all duration-200 ${isCurrent ? 'bg-emerald-500 text-white' : isAnsweredQuestion ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 scale-110' : isAnsweredQuestion ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} disabled:opacity-50 disabled:cursor-not-allowed`}>
//                 {index + 1}
//               </button>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default QuizzesTakePage

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import quizService from '../../services/QuizService';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const QuizzesTakePage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await quizService.getQuizById(quizId);
        setQuiz(res.data);
      } catch {
        toast.error("Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (qId, index) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: index }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = Object.keys(selectedAnswers).map(qId => {
        const q = quiz.questions.find(q => q._id === qId);
        return {
          questionIndex: quiz.questions.findIndex(q => q._id === qId),
          selectedAnswer: q.options[selectedAnswers[qId]]
        };
      });

      await quizService.submitQuiz(quizId, formattedAnswers);
      toast.success("Quiz submitted successfully");
      navigate(`/quizzes/${quizId}/results`);
    } catch {
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Spinner />
      </div>
    );
  }

  if (!quiz?.questions?.length) {
    return <p className="text-center mt-10 text-gray-600">No Quiz Found</p>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-1 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} / {quiz.questions.length}</span>
            <span>{answeredCount} answered</span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">

          {/* Question */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-3">
              Question {currentQuestionIndex + 1}
            </span>

            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selectedAnswers[currentQuestion._id] === i;

              return (
                <label
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200
                  ${isSelected
                      ? 'border-emerald-500 bg-emerald-50 shadow-md'
                      : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2
                    ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}
                  `}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>

                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => handleOptionChange(currentQuestion._id, i)}
                    className="hidden"
                  />

                  <span className={`text-sm ${isSelected ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                    {opt}
                  </span>

                  {isSelected && (
                    <CheckCircle2 className="ml-auto w-5 h-5 text-emerald-500" />
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
          >
            <ChevronLeft size={18} /> Previous
          </button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
            >
              Next <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Question Index */}
        <div className="flex flex-wrap justify-center gap-2 ">
          {quiz.questions.map((q, i) => {
            const isAnswered = selectedAnswers.hasOwnProperty(q._id);
            const isCurrent = i === currentQuestionIndex;

            return (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all
                ${isCurrent
                    ? 'bg-emerald-500 text-white scale-110'
                    : isAnswered
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default QuizzesTakePage;