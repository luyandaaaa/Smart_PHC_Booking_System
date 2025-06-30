// GameModal.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const GameModal = ({ game, onClose, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(game.timeLimit);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // playing, completed, paused
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const sampleQuestions = {
    'health-quiz': [
      {
        question: "What is the recommended daily water intake?",
        options: ["4 glasses", "6 glasses", "8 glasses", "10 glasses"],
        correct: 2,
        xp: 25
      },
      {
        question: "Which vitamin is produced when skin is exposed to sunlight?",
        options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
        correct: 3,
        xp: 25
      },
      {
        question: "What should you do first for a minor cut?",
        options: ["Apply bandage", "Clean the wound", "Apply pressure", "Use antiseptic"],
        correct: 1,
        xp: 30
      }
    ],
    'medicine-match': [
      {
        question: "Match Paracetamol with its primary use:",
        options: ["Antibiotic", "Pain relief", "Vitamin", "Antiseptic"],
        correct: 1,
        xp: 35
      },
      {
        question: "What is Aspirin commonly used for?",
        options: ["Diabetes", "High blood pressure", "Heart protection", "Infections"],
        correct: 2,
        xp: 40
      }
    ],
    'symptom-detective': [
      {
        question: "A patient has fever, headache, and muscle pain. What condition is most likely?",
        options: ["Common cold", "Influenza (flu)", "Food poisoning", "Broken bone"],
        answer: 1,
        xp: 30
      },
      {
        question: "Which symptoms suggest a possible heart attack?",
        options: ["Chest pain and shortness of breath", "Itchy skin", "Sore throat", "Runny nose"],
        answer: 0,
        xp: 40
      },
      {
        question: "What condition might cause yellowing of skin and eyes?",
        options: ["Jaundice", "Sunburn", "Allergies", "Dehydration"],
        answer: 0,
        xp: 30
      },
      {
        question: "A patient has sudden numbness on one side of the body. What should you suspect?",
        options: ["Stroke", "Headache", "Muscle strain", "Allergic reaction"],
        answer: 0,
        xp: 40
      }
    ],
    'daily-fitness': [
      {
        question: "What is the recommended minimum daily steps for good health?",
        options: ["1,000 steps", "5,000 steps", "10,000 steps", "20,000 steps"],
        answer: 2,
        xp: 25
      },
      {
        question: "Which exercise is best for improving cardiovascular health?",
        options: ["Bicep curls", "Running or brisk walking", "Leg lifts", "Neck stretches"],
        answer: 1,
        xp: 30
      },
      {
        question: "How often should adults do muscle-strengthening activities?",
        options: ["Never", "Once a month", "2+ times per week", "Only in winter"],
        answer: 2,
        xp: 25
      },
      {
        question: "What is a benefit of regular stretching?",
        options: ["Improved flexibility", "Better eyesight", "Stronger teeth", "Louder voice"],
        answer: 0,
        xp: 20
      }
    ],
    'nutrition-puzzle': [
      {
        question: "Which nutrient is most important for muscle repair?",
        options: ["Protein", "Sugar", "Salt", "Water"],
        answer: 0,
        xp: 25
      },
      {
        question: "What percentage of your plate should be fruits and vegetables?",
        options: ["10%", "25%", "50%", "75%"],
        answer: 2,
        xp: 30
      },
      {
        question: "Which is a good source of complex carbohydrates?",
        options: ["White bread", "Whole grain bread", "Candy", "Soda"],
        answer: 1,
        xp: 25
      },
      {
        question: "What's the recommended daily limit for added sugars?",
        options: ["No limit", "25g (6 teaspoons) for women, 36g (9 teaspoons) for men", "100g", "200g"],
        answer: 1,
        xp: 30
      }
    ],
    'first-aid-sim': [
      {
        question: "What should you do first for a severe burn?",
        options: ["Apply butter", "Cool with running water", "Pop blisters", "Rub with ice"],
        answer: 1,
        xp: 35
      },
      {
        question: "How should you position someone in shock?",
        options: ["Standing up", "Lying down with legs elevated", "Sitting in a chair", "On their stomach"],
        answer: 1,
        xp: 30
      },
      {
        question: "What's the correct hand position for CPR compressions?",
        options: ["On the stomach", "Center of the chest", "On the neck", "On the forehead"],
        answer: 1,
        xp: 40
      },
      {
        question: "How do you help someone having a seizure?",
        options: ["Hold them down", "Put something in their mouth", "Clear area and cushion head", "Pour water on them"],
        answer: 2,
        xp: 35
      }
    ],
  };

  const questions = sampleQuestions[game.id] || sampleQuestions['health-quiz'];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('completed');
    }
  }, [timeLeft, gameState]);

  const handleAnswer = (selectedIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(selectedIndex);
    setShowFeedback(true);
    const question = questions[currentQuestion];
    const correctIndex = typeof question.answer === 'number' ? question.answer : question.correct;
    if (selectedIndex === correctIndex) {
      setScore(score + (question.xp || 0));
      setCorrectCount(correctCount + 1);
      setFeedbackMsg('Your answer is correct!');
    } else {
      setFeedbackMsg(`The correct answer is: ${question.options[correctIndex]}`);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setFeedbackMsg('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('completed');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'completed') {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          minWidth: '320px',
          maxWidth: '90vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative',
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.15)'
        }}>
          <button onClick={onClose} style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#6b7280',
            cursor: 'pointer'
          }}>
            <X className="w-6 h-6" />
          </button>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '0.5rem' }}>Game Complete!</h3>
          <p style={{ color: '#4b5563', marginBottom: '1rem' }}>You earned {score} XP!</p>
          <div style={{ color: '#059669', fontWeight: 600, marginBottom: 8 }}>
            You got {correctCount} out of {questions.length} correct
          </div>
          <div style={{
            backgroundColor: '#fef9c3',
            border: '1px solid #fcd34d',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            width: '100%'
          }}>
            <div style={{ color: '#92400e', fontWeight: 'bold', marginBottom: '0.5rem' }}>Rewards Earned:</div>
            <div style={{ color: '#92400e', fontSize: '0.875rem' }}>
              • {score} Health XP
              • Progress towards badges
              • Leaderboard points
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              width: '100%',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#388e3c'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
          >
            Collect Rewards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        minWidth: '320px',
        maxWidth: '90vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.15)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Game Header */}
        <div style={{
          width: '100%',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1d4ed8' }}>{game.title}</h3>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                <span>Question {currentQuestion + 1}/{questions.length}</span>
                <span>Score: {score} XP</span>
                <span style={{ fontWeight: 'semibold', color: timeLeft < 30 ? '#dc2626' : '#4ade80' }}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <X className="w-6 h-6" style={{ color: '#6b7280' }} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '0.5rem',
          backgroundColor: '#e5e7eb',
          borderRadius: '0.25rem',
          marginBottom: '1.5rem'
        }}>
          <div 
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              height: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: '0.25rem',
              transition: 'width 0.3s'
            }}
          ></div>
        </div>

        {/* Question */}
        <div style={{ width: '100%' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 'semibold', color: '#1d4ed8', marginBottom: '1rem' }}>
            {questions[currentQuestion]?.question}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {questions[currentQuestion]?.options.map((option, index) => {
              let buttonColor = 'transparent';
              if (showFeedback && index === selectedAnswer) {
                buttonColor = selectedAnswer === (typeof questions[currentQuestion].answer === 'number' ? questions[currentQuestion].answer : questions[currentQuestion].correct)
                  ? '#bbf7d0' : '#fecaca';
              }
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback || selectedAnswer !== null}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '2px solid #e5e7eb',
                    backgroundColor: buttonColor,
                    color: '#374151',
                    fontSize: '0.875rem',
                    fontWeight: 'medium',
                    cursor: showFeedback || selectedAnswer !== null ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    if (!showFeedback && selectedAnswer === null) {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!showFeedback && selectedAnswer === null) {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
          {/* Feedback message and Next button */}
          {showFeedback && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <div style={{ fontWeight: 600, color: feedbackMsg === 'Your answer is correct!' ? '#059669' : '#dc2626', marginBottom: 12 }}>
                {feedbackMsg === 'Your answer is correct!' ? feedbackMsg : 'The correct answer is: ' + questions[currentQuestion].options[typeof questions[currentQuestion].answer === 'number' ? questions[currentQuestion].answer : questions[currentQuestion].correct]}
              </div>
              <button
                onClick={handleNext}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 24px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  marginTop: 4
                }}
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          )}
        </div>

        {/* Game Controls */}
        <div style={{
          width: '100%',
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1rem'
        }}>
          <button
            onClick={() => setGameState(gameState === 'playing' ? 'paused' : 'playing')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: 'semibold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              border: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            {gameState === 'playing' ? 'Pause' : 'Resume'}
          </button>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            XP for this question: {questions[currentQuestion]?.xp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
