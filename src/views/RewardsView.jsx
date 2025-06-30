// RewardsView.jsx
import React, { useState, useEffect } from 'react';
import { Award, Zap, BarChart3, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Define the six interactive health games with unified color palette and new descriptions
const unifiedGames = [
  {
    id: 'health-quiz',
    icon: '🧠',
    title: 'Health Knowledge Quiz',
    description: 'Multiple choice questions about health topics. Questions cover water intake, vitamins, first aid.',
    difficulty: 'Easy',
    timeLimit: 60,
    xpReward: 100
  },
  {
    id: 'medicine-match',
    icon: '💊',
    title: 'Medicine Matching',
    description: 'Match medicines with their purposes. Learn about Paracetamol, Aspirin, etc.',
    difficulty: 'Medium',
    timeLimit: 90,
    xpReward: 150
  },
  {
    id: 'symptom-detective',
    icon: '🔍',
    title: 'Symptom Detective',
    description: 'Identify symptoms and their causes. Advanced diagnostic challenges.',
    difficulty: 'Hard',
    timeLimit: 120,
    xpReward: 200
  },
  {
    id: 'daily-fitness',
    icon: '💪',
    title: 'Daily Fitness Challenge',
    description: 'Complete simple exercises. Physical activity integration.',
    difficulty: 'Easy',
    timeLimit: 300,
    xpReward: 75
  },
  {
    id: 'nutrition-puzzle',
    icon: '🥗',
    title: 'Nutrition Puzzle',
    description: 'Build balanced meals. Learn about healthy eating.',
    difficulty: 'Medium',
    timeLimit: 100,
    xpReward: 125
  },
  {
    id: 'first-aid-sim',
    icon: '🚑',
    title: 'First Aid Simulator',
    description: 'Practice emergency response steps. Critical emergency skills.',
    difficulty: 'Hard',
    timeLimit: 180,
    xpReward: 250
  }
];

export const challengeQuestions = {
  "health-quiz": [
    {
      question: "What is the recommended daily water intake?",
      options: ["4 glasses", "6 glasses", "8 glasses", "10 glasses"],
      answer: 2,
      xp: 25
    },
    {
      question: "Which vitamin is produced when skin is exposed to sunlight?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      answer: 3,
      xp: 25
    },
    {
      question: "What should you do first for a minor cut?",
      options: ["Apply bandage", "Clean the wound", "Apply pressure", "Use antiseptic"],
      answer: 1,
      xp: 30
    }
  ],
  "medicine-match": [
    {
      question: "Match Paracetamol with its primary use:",
      options: ["Antibiotic", "Pain relief", "Vitamin", "Antiseptic"],
      answer: 1,
      xp: 35
    },
    {
      question: "What is Aspirin commonly used for?",
      options: ["Diabetes", "High blood pressure", "Heart protection", "Infections"],
      answer: 2,
      xp: 40
    }
  ],
  "symptom-detective": [
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
  "daily-fitness": [
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
  "nutrition-puzzle": [
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
  "first-aid-sim": [
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
  ]
};

const RewardsView = ({ 
  t, 
  setCurrentPage,
  totalRewards, 
  unlockedBadges, 
  setCurrentGame,
  userXP,
  setUserXP,
  setTotalRewards,
  setUnlockedBadges,
  currentGame
}) => {
  const [activeGame, setActiveGame] = useState(null);
  const [completedGames, setCompletedGames] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Thabo M.', xp: 3250, avatar: '🏆' },
    { rank: 2, name: 'Nomsa K.', xp: 2890, avatar: '🥈' },
    { rank: 3, name: 'You (Sibongile)', xp: 2850, avatar: '🥉', isCurrentUser: true },
    { rank: 4, name: 'Mandla S.', xp: 2420, avatar: '👤' },
    { rank: 5, name: 'Zanele P.', xp: 2180, avatar: '👤' },
  ]);

  const handleGameComplete = (earnedXP, gameId) => {
    // Update user XP
    const newXP = userXP + earnedXP;
    setUserXP(newXP);

    // Update total rewards
    const newTotalRewards = totalRewards + earnedXP;
    setTotalRewards(newTotalRewards);

    // Mark game as completed if not already
    if (!completedGames.includes(gameId)) {
      setCompletedGames(prev => [...prev, gameId]);
    }

    // Update games played count
    setGamesPlayed(prev => prev + 1);

    // Check for badge unlocks based on XP milestones
    const newBadges = [...unlockedBadges];
    if (newTotalRewards >= 3000 && !newBadges[3].unlocked) {
      newBadges[3].unlocked = true;
      setUnlockedBadges(newBadges);
    }

    // Update leaderboard with new XP and sort
    setLeaderboard(prev => {
      const updated = prev.map(entry =>
        entry.isCurrentUser
          ? { ...entry, xp: entry.xp + earnedXP, gamesPlayed: (entry.gamesPlayed || 0) + 1 }
          : entry
      );
      // Sort by XP descending
      return updated.sort((a, b) => b.xp - a.xp).map((entry, index) => ({
        ...entry,
        rank: index + 1,
        avatar: index === 0 ? '🏆' :
               index === 1 ? '🥈' :
               index === 2 ? '🥉' : '👤'
      }));
    });

    setCurrentGame(null);
  };

  const handleGamePlayed = (gameId) => {
    setGamesPlayed(prev => prev + 1);
    if (!completedGames.includes(gameId)) {
      setCompletedGames(prev => [...prev, gameId]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar currentPage="rewards" setCurrentPage={setCurrentPage} />
      <div
        style={{
          flex: 1,
          padding: '2rem 2.5vw',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.2s, transform 0.2s',
          position: 'relative',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(59,130,246,0.12)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        {/* Rewards Overview */}
        <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #a78bfa 100%)', color: 'white', padding: 32, borderRadius: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center' }}>
            <Award size={32} style={{ marginRight: 12 }} />
            {t.rewards} & {t.playGames}
          </h2>
          <p style={{ opacity: 0.9, marginBottom: 16 }}>{t.earnRewards}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{totalRewards}</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>{t.totalXP}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{unlockedBadges.filter(b => b.unlocked).length}</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>Badges</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>6</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>{t.gamesPlayed}</div>
            </div>
          </div>
        </div>
        {/* Games Grid */}
        <div style={{ background: '#f3f4f6', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #e5e7eb', padding: 24 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#1f2937', marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <Zap size={24} style={{ marginRight: 8, color: '#3b82f6' }} />
            Health Games
          </h3>
          <div
            className="rewards-games-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
              alignItems: 'stretch',
              position: 'relative',
              zIndex: 1
            }}
          >
            {unifiedGames.map((game) => {
              const isCompleted = completedGames.includes(game.id);
              return (
                <div key={game.id} style={{ position: 'relative', zIndex: 1 }}>
                  <GameCard 
                    game={game} 
                    onPlay={() => setCurrentGame(game)} 
                    t={t} 
                    isCompleted={isCompleted}
                  />
                  {isCompleted && (
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#10b981',
                      color: 'white',
                      borderRadius: 8,
                      padding: '2px 10px',
                      fontWeight: 600,
                      fontSize: 13,
                      zIndex: 2
                    }}>Completed</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Badges Section */}
        <div style={{ background: '#f3f4f6', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #e5e7eb', padding: 24 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#1f2937', marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <Award size={24} style={{ marginRight: 8, color: '#a78bfa' }} />
            {t.yourBadges}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {unlockedBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} t={t} />
            ))}
          </div>
        </div>
        {/* Leaderboard */}
        <div style={{ background: '#f3f4f6', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #e5e7eb', padding: 24 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#1f2937', marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <BarChart3 size={24} style={{ marginRight: 8, color: '#059669' }} />
            Community Leaderboard
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {leaderboard.map((entry, idx) => (
              <LeaderboardItem 
                key={entry.name} 
                rank={entry.rank} 
                name={entry.name} 
                xp={entry.xp} 
                avatar={entry.avatar} 
                isCurrentUser={entry.isCurrentUser} 
                gamesPlayed={entry.isCurrentUser ? 6 : entry.gamesPlayed}
              />
            ))}
          </div>
        </div>
        {currentGame && (
          <GameModal 
            game={currentGame} 
            onClose={() => setCurrentGame(null)} 
            onComplete={(xp) => handleGameComplete(xp, currentGame.id)} 
            onGamePlayed={() => handleGamePlayed(currentGame.id)}
            challengeQuestions={challengeQuestions} 
          />
        )}
      </div>
    </div>
  );
};

const GameModal = ({ game, onClose, onComplete, onGamePlayed, challengeQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(game.timeLimit);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // playing, completed, paused

  const questions = challengeQuestions[game.id] || challengeQuestions['health-quiz'];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('completed');
    }
  }, [timeLeft, gameState]);

  const handleAnswer = (selectedIndex) => {
    const question = questions[currentQuestion];
    const isCorrect = selectedIndex === question.answer;
    if (isCorrect) {
      setScore(score + question.xp);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('completed');
      onComplete(score + (isCorrect ? question.xp : 0));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'completed') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Game Complete!</h3>
          <p className="text-gray-600 mb-4">You earned {score} XP!</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="text-yellow-800 font-semibold">Rewards Earned:</div>
            <div className="text-sm text-yellow-700">
              • {score} Health XP
              • Progress towards badges
              • Leaderboard points
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Collect Rewards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <span>Score: {score} XP</span>
              <span className={`font-semibold ${timeLeft < 30 ? 'text-red-600' : 'text-green-600'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        {/* Question */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            {questions[currentQuestion]?.question}
          </h4>
          <div className="space-y-3">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-gray-700 hover:text-blue-700"
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>
        {/* Game Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setGameState(gameState === 'playing' ? 'paused' : 'playing')}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {gameState === 'playing' ? 'Pause' : 'Resume'}
          </button>
          <div className="text-sm text-gray-500">
            XP for this question: {questions[currentQuestion]?.xp}
          </div>
        </div>
      </div>
    </div>
  );
};

const GameCard = ({ game, onPlay, t, isCompleted }) => (
  <div 
    className="rewards-game-card"
    style={{ 
      background: 'linear-gradient(135deg, #fff 0%, #f3f4f6 100%)',
      borderRadius: 16, 
      border: '2px solid #f3f4f6', 
      padding: 24, 
      transition: 'box-shadow 0.2s, border 0.2s, transform 0.18s', 
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)', 
      cursor: isCompleted ? 'not-allowed' : 'pointer',
      opacity: isCompleted ? 0.7 : 1,
      filter: isCompleted ? 'saturate(0.8)' : 'none',
      position: 'relative',
      zIndex: 1,
      willChange: 'transform, box-shadow',
      overflow: 'visible',
      minHeight: 220,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} 
    onClick={!isCompleted ? onPlay : undefined}
  >
    <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{game.icon}</div>
      <h4 style={{ fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>{game.title}</h4>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>{game.description}</p>
    </div>
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
        <span style={{ color: '#64748b' }}>{t.difficulty}:</span>
        <span style={{ fontWeight: 500, color: game.difficulty === 'Easy' ? '#10b981' : game.difficulty === 'Medium' ? '#f59e42' : '#ef4444' }}>{game.difficulty}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
        <span style={{ color: '#64748b' }}>{t.timeLimit}:</span>
        <span style={{ fontWeight: 500, color: '#1e293b' }}>{Math.floor(game.timeLimit / 60)}m {game.timeLimit % 60}s</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <span style={{ color: '#64748b' }}>{t.xpReward}:</span>
        <span style={{ fontWeight: 500, color: '#3b82f6' }}>{game.xpReward} XP</span>
      </div>
    </div>
    <button style={{ width: '100%', background: 'linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)', color: 'white', padding: '12px 0', borderRadius: 10, fontWeight: 600, fontSize: 16, border: 'none', marginTop: 8, cursor: isCompleted ? 'not-allowed' : 'pointer', transition: 'background 0.2s, transform 0.2s' }} disabled={isCompleted}>
      {t.playNow}
    </button>
    {isCompleted && (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255,255,255,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        zIndex: 2
      }}>
        <span style={{
          background: '#10b981',
          color: 'white',
          padding: '4px 12px',
          borderRadius: 20,
          fontWeight: 600
        }}>Completed</span>
      </div>
    )}
    <style>{`
      .rewards-game-card:hover {
        box-shadow: 0 8px 32px 0 rgba(59,130,246,0.18), 0 1.5px 8px 0 rgba(59,130,246,0.10);
        border: 2px solid #3b82f6;
        transform: translateY(-8px) scale(1.045);
        z-index: 10;
        will-change: transform, box-shadow;
        overflow: visible;
      }
      .rewards-game-card:active {
        transform: scale(0.98);
      }
    `}</style>
  </div>
);

const BadgeCard = ({ badge, t }) => (
  <div style={{ textAlign: 'center', padding: 16, borderRadius: 16, border: '2px solid', borderColor: badge.unlocked ? '#fde68a' : '#e5e7eb', background: badge.unlocked ? 'linear-gradient(135deg, #fef9c3 0%, #fdba74 100%)' : '#f9fafb', boxShadow: badge.unlocked ? '0 2px 8px 0 rgba(251, 191, 36, 0.08)' : 'none', opacity: badge.unlocked ? 1 : 0.6, transition: 'all 0.2s' }}>
    <div style={{ fontSize: 28, marginBottom: 8 }}>{badge.unlocked ? badge.icon : '🔒'}</div>
    <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: badge.unlocked ? '#1e293b' : '#64748b' }}>{badge.name}</h4>
    <p style={{ fontSize: 13, color: badge.unlocked ? '#64748b' : '#9ca3af', marginBottom: 0 }}>{badge.description}</p>
    <div style={{ fontSize: 12, marginTop: 8, fontWeight: 500, color: badge.unlocked ? '#10b981' : '#9ca3af' }}>{badge.unlocked ? t.unlocked : t.locked}</div>
  </div>
);

const LeaderboardItem = ({ rank, name, xp, avatar, isCurrentUser, gamesPlayed }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 12, border: '2px solid', borderColor: isCurrentUser ? '#bfdbfe' : '#e5e7eb', background: isCurrentUser ? '#dbeafe' : '#f9fafb', boxShadow: isCurrentUser ? '0 2px 8px 0 rgba(59, 130, 246, 0.08)' : 'none', transition: 'all 0.2s' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, background: rank === 1 ? '#fef9c3' : rank === 2 ? '#f3f4f6' : rank === 3 ? '#fed7aa' : '#dbeafe', color: rank === 1 ? '#b45309' : rank === 2 ? '#64748b' : rank === 3 ? '#b45309' : '#1e40af' }}>
        {rank <= 3 ? avatar : rank}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: isCurrentUser ? '#1e40af' : '#1e293b' }}>{name}</div>
        <div style={{ fontSize: 14, color: '#64748b' }}>{xp} XP</div>
        {isCurrentUser && gamesPlayed !== undefined && (
          <div style={{ fontSize: 13, color: '#059669', fontWeight: 500 }}>Games Played: {gamesPlayed}</div>
        )}
      </div>
    </div>
    {isCurrentUser && (
      <div style={{ fontSize: 12, background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: 8, fontWeight: 500 }}>
        You
      </div>
    )}
  </div>
);

export default RewardsView;