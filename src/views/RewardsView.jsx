// RewardsView.jsx
import React, { useState, useEffect } from 'react';
import { Award, Zap, BarChart3, X, Phone, Wifi, Clock, Gift } from 'lucide-react';
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
    momoReward: { type: 'airtime', amount: 'R10' }
  },
  {
    id: 'medicine-match',
    icon: '💊',
    title: 'Medicine Matching',
    description: 'Match medicines with their purposes. Learn about Paracetamol, Aspirin, etc.',
    difficulty: 'Medium',
    timeLimit: 90,
    momoReward: { type: 'data', amount: '100MB' }
  },
  {
    id: 'symptom-detective',
    icon: '🔍',
    title: 'Symptom Detective',
    description: 'Identify symptoms and their causes. Advanced diagnostic challenges.',
    difficulty: 'Hard',
    timeLimit: 120,
    momoReward: { type: 'data', amount: '500MB' }
  },
  {
    id: 'daily-fitness',
    icon: '💪',
    title: 'Daily Fitness Challenge',
    description: 'Complete simple exercises. Physical activity integration.',
    difficulty: 'Easy',
    timeLimit: 300,
    momoReward: { type: 'minutes', amount: '30 mins' }
  },
  {
    id: 'nutrition-puzzle',
    icon: '🥗',
    title: 'Nutrition Puzzle',
    description: 'Build balanced meals. Learn about healthy eating.',
    difficulty: 'Medium',
    timeLimit: 100,
    momoReward: { type: 'airtime', amount: 'R20' }
  },
  {
    id: 'first-aid-sim',
    icon: '🚑',
    title: 'First Aid Simulator',
    description: 'Practice emergency response steps. Critical emergency skills.',
    difficulty: 'Hard',
    timeLimit: 180,
    momoReward: { type: 'premium', amount: 'MoMo Premium Bundle' }
  }
];

// MoMo reward badges based on health achievements
const momoBadges = [
  {
    id: 1,
    name: 'Data Champion',
    icon: '📶',
    description: 'Complete 3 health games',
    requirement: 3,
    reward: { type: 'data', amount: '1GB' },
    unlocked: false
  },
  {
    id: 2,
    name: 'Airtime Hero',
    icon: '📱',
    description: 'Score 500+ total points',
    requirement: 500,
    reward: { type: 'airtime', amount: 'R50' },
    unlocked: false
  },
  {
    id: 3,
    name: 'Talk Time Master',
    icon: '☎️',
    description: 'Complete all 6 games',
    requirement: 6,
    reward: { type: 'minutes', amount: '200 mins' },
    unlocked: false
  },
  {
    id: 4,
    name: 'MoMo Health Pro',
    icon: '🏆',
    description: 'Earn 1000+ health points',
    requirement: 1000,
    reward: { type: 'premium', amount: 'Monthly Health Package' },
    unlocked: false
  }
];

export const challengeQuestions = {
  "health-quiz": [
    {
      question: "What is the recommended daily water intake?",
      options: ["4 glasses", "6 glasses", "8 glasses", "10 glasses"],
      answer: 2,
      points: 25
    },
    {
      question: "Which vitamin is produced when skin is exposed to sunlight?",
      options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      answer: 3,
      points: 25
    },
    {
      question: "What should you do first for a minor cut?",
      options: ["Apply bandage", "Clean the wound", "Apply pressure", "Use antiseptic"],
      answer: 1,
      points: 30
    }
  ],
  "medicine-match": [
    {
      question: "Match Paracetamol with its primary use:",
      options: ["Antibiotic", "Pain relief", "Vitamin", "Antiseptic"],
      answer: 1,
      points: 35
    },
    {
      question: "What is Aspirin commonly used for?",
      options: ["Diabetes", "High blood pressure", "Heart protection", "Infections"],
      answer: 2,
      points: 40
    }
  ],
  "symptom-detective": [
    {
      question: "A patient has fever, headache, and muscle pain. What condition is most likely?",
      options: ["Common cold", "Influenza (flu)", "Food poisoning", "Broken bone"],
      answer: 1,
      points: 30
    },
    {
      question: "Which symptoms suggest a possible heart attack?",
      options: ["Chest pain and shortness of breath", "Itchy skin", "Sore throat", "Runny nose"],
      answer: 0,
      points: 40
    },
    {
      question: "What condition might cause yellowing of skin and eyes?",
      options: ["Jaundice", "Sunburn", "Allergies", "Dehydration"],
      answer: 0,
      points: 30
    },
    {
      question: "A patient has sudden numbness on one side of the body. What should you suspect?",
      options: ["Stroke", "Headache", "Muscle strain", "Allergic reaction"],
      answer: 0,
      points: 40
    }
  ],
  "daily-fitness": [
    {
      question: "What is the recommended minimum daily steps for good health?",
      options: ["1,000 steps", "5,000 steps", "10,000 steps", "20,000 steps"],
      answer: 2,
      points: 25
    },
    {
      question: "Which exercise is best for improving cardiovascular health?",
      options: ["Bicep curls", "Running or brisk walking", "Leg lifts", "Neck stretches"],
      answer: 1,
      points: 30
    },
    {
      question: "How often should adults do muscle-strengthening activities?",
      options: ["Never", "Once a month", "2+ times per week", "Only in winter"],
      answer: 2,
      points: 25
    },
    {
      question: "What is a benefit of regular stretching?",
      options: ["Improved flexibility", "Better eyesight", "Stronger teeth", "Louder voice"],
      answer: 0,
      points: 20
    }
  ],
  "nutrition-puzzle": [
    {
      question: "Which nutrient is most important for muscle repair?",
      options: ["Protein", "Sugar", "Salt", "Water"],
      answer: 0,
      points: 25
    },
    {
      question: "What percentage of your plate should be fruits and vegetables?",
      options: ["10%", "25%", "50%", "75%"],
      answer: 2,
      points: 30
    },
    {
      question: "Which is a good source of complex carbohydrates?",
      options: ["White bread", "Whole grain bread", "Candy", "Soda"],
      answer: 1,
      points: 25
    },
    {
      question: "What's the recommended daily limit for added sugars?",
      options: ["No limit", "25g (6 teaspoons) for women, 36g (9 teaspoons) for men", "100g", "200g"],
      answer: 1,
      points: 30
    }
  ],
  "first-aid-sim": [
    {
      question: "What should you do first for a severe burn?",
      options: ["Apply butter", "Cool with running water", "Pop blisters", "Rub with ice"],
      answer: 1,
      points: 35
    },
    {
      question: "How should you position someone in shock?",
      options: ["Standing up", "Lying down with legs elevated", "Sitting in a chair", "On their stomach"],
      answer: 1,
      points: 30
    },
    {
      question: "What's the correct hand position for CPR compressions?",
      options: ["On the stomach", "Center of the chest", "On the neck", "On the forehead"],
      answer: 1,
      points: 40
    },
    {
      question: "How do you help someone having a seizure?",
      options: ["Hold them down", "Put something in their mouth", "Clear area and cushion head", "Pour water on them"],
      answer: 2,
      points: 35
    }
  ]
};

const RewardsView = ({ 
  t, 
  setCurrentPage,
  totalRewards, 
  unlockedBadges, 
  setCurrentGame,
  userPoints,
  setUserPoints,
  setTotalRewards,
  setUnlockedBadges,
  currentGame
}) => {
  const [activeGame, setActiveGame] = useState(null);
  const [completedGames, setCompletedGames] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [earnedRewards, setEarnedRewards] = useState([]);
  const [momoBalance, setMomoBalance] = useState({
    airtime: 0,
    data: 0,
    minutes: 0,
    premiumServices: 0
  });
  
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Thabo M.', points: 1250, avatar: '🏆', momoRewards: 'R85 + 2GB' },
    { rank: 2, name: 'Nomsa K.', points: 1180, avatar: '🥈', momoRewards: 'R60 + 1.5GB' },
    { rank: 3, name: 'You (Sibongile)', points: 850, avatar: '🥉', isCurrentUser: true, momoRewards: 'R30 + 600MB' },
    { rank: 4, name: 'Mandla S.', points: 720, avatar: '👤', momoRewards: 'R25 + 500MB' },
    { rank: 5, name: 'Zanele P.', points: 680, avatar: '👤', momoRewards: 'R20 + 300MB' },
  ]);

  const handleGameComplete = (earnedPoints, gameId) => {
    const game = unifiedGames.find(g => g.id === gameId);
    // Update user points
    const newPoints = (userPoints || 0) + earnedPoints;
    setUserPoints(newPoints);

    // Calculate MoMo reward increments based on points scored
    let airtimeInc = 0, dataInc = 0, minutesInc = 0, premiumInc = 0;
    if (game.momoReward.type === 'airtime') {
      // 1 point = R0.10, rounded down
      airtimeInc = Math.floor(earnedPoints * 0.1);
    } else if (game.momoReward.type === 'data') {
      // 1 point = 2MB
      dataInc = earnedPoints * 2;
    } else if (game.momoReward.type === 'minutes') {
      // 1 point = 1 minute
      minutesInc = earnedPoints;
    } else if (game.momoReward.type === 'premium') {
      // 1 premium per game completion
      premiumInc = 1;
    }

    setMomoBalance(prev => ({
      ...prev,
      airtime: prev.airtime + airtimeInc,
      data: prev.data + dataInc,
      minutes: prev.minutes + minutesInc,
      premiumServices: prev.premiumServices + premiumInc
    }));

    // Add MoMo reward (static, for display)
    const newReward = {
      id: Date.now(),
      gameTitle: game.title,
      reward: game.momoReward,
      earnedAt: new Date(),
      claimed: false
    };
    setEarnedRewards(prev => [...prev, newReward]);

    // Mark game as completed if not already
    if (!completedGames.includes(gameId)) {
      setCompletedGames(prev => [...prev, gameId]);
      setGamesPlayed(prev => prev + 1);
    }

    // Check for badge unlocks
    checkBadgeUnlocks(newPoints, completedGames.length + 1);

    // Update leaderboard
    updateLeaderboard(newPoints);

    setCurrentGame(null);
  };

  const checkBadgeUnlocks = (points, gamesCompleted) => {
    const updatedBadges = momoBadges.map(badge => {
      if (!badge.unlocked) {
        if (badge.id === 1 && gamesCompleted >= 3) badge.unlocked = true;
        if (badge.id === 2 && points >= 500) badge.unlocked = true;
        if (badge.id === 3 && gamesCompleted >= 6) badge.unlocked = true;
        if (badge.id === 4 && points >= 1000) badge.unlocked = true;
      }
      return badge;
    });
    setUnlockedBadges(updatedBadges);
  };

  const updateLeaderboard = (newPoints) => {
    setLeaderboard(prev => {
      const updated = prev.map(entry =>
        entry.isCurrentUser
          ? { ...entry, points: newPoints, momoRewards: calculateMomoRewards(newPoints) }
          : entry
      );
      return updated.sort((a, b) => b.points - a.points).map((entry, index) => ({
        ...entry,
        rank: index + 1,
        avatar: index === 0 ? '🏆' :
               index === 1 ? '🥈' :
               index === 2 ? '🥉' : '👤'
      }));
    });
  };

  const calculateMomoRewards = (points) => {
    const airtime = Math.floor(points / 20) * 5;
    const data = Math.floor(points / 100) * 100;
    return `R${airtime} + ${data}MB`;
  };

  const claimReward = (rewardId) => {
    setEarnedRewards(prev =>
      prev.map(reward =>
        reward.id === rewardId ? { ...reward, claimed: true } : reward
      )
    );
  };

  const getMomoIcon = (type) => {
    switch (type) {
      case 'airtime': return <Phone className="w-4 h-4" />;
      case 'data': return <Wifi className="w-4 h-4" />;
      case 'minutes': return <Clock className="w-4 h-4" />;
      case 'premium': return <Gift className="w-4 h-4" />;
      default: return <Phone className="w-4 h-4" />;
    }
  };

  const getMomoColor = (type) => {
    switch (type) {
      case 'airtime': return '#10b981';
      case 'data': return '#3b82f6';
      case 'minutes': return '#f59e0b';
      case 'premium': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#fff' }}>
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
      >
        {/* MoMo Rewards Overview */}
        <div style={{ 
          background: '#e0f2fe',
          color: '#1e293b',
          padding: 32, 
          borderRadius: 24,
          marginBottom: 24,
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', color: '#2563eb' }}>
            <Award size={32} style={{ marginRight: 12, color: '#f59e0b' }} />
            Health Rewards
          </h2>
          <p style={{ color: '#374151', opacity: 0.9, marginBottom: 24 }}>Complete health games to earn MoMo airtime, data, minutes & more!</p>
          
          {/* MoMo Balance Display */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 24 }}>
            {/* Mocked stats from leaderboard current user */}
            {/* Mocked stats: 850 health points, R30 airtime, 600MB data, 85 minutes */}
            <div key="airtime" style={{ textAlign: 'center', background: '#f3f4f6', borderRadius: 12, padding: 16, border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>R30</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>Airtime</div>
            </div>
            <div key="data" style={{ textAlign: 'center', background: '#f3f4f6', borderRadius: 12, padding: 16, border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>600MB</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>Data</div>
            </div>
            <div key="minutes" style={{ textAlign: 'center', background: '#f3f4f6', borderRadius: 12, padding: 16, border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>85</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>Minutes</div>
            </div>
          </div>
            
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>850</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>Health Points</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>3</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>MoMo Badges</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>6</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>Games Played</div>
            </div>
          </div>
        </div>

        {/* Health Games Grid */}
        <div style={{ background: '#f3e8ff', borderRadius: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#1f2937', marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <Zap size={24} style={{ marginRight: 8, color: '#3b82f6' }} />
            Health Games - Earn Rewards
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {unifiedGames.map((game) => {
              const isCompleted = completedGames.includes(game.id);
              return (
                <TelkomGameCard 
                  key={game.id}
                  game={game} 
                  onPlay={() => setCurrentGame(game)} 
                  t={t} 
                  isCompleted={isCompleted}
                  getMomoIcon={getMomoIcon}
                  getMomoColor={getMomoColor}
                />
              );
            })}
          </div>
        </div>

        {/* MoMo Badges Section */}
        <div style={{ background: '#e0f2fe', borderRadius: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#1f2937', marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <Award size={24} style={{ marginRight: 8, color: '#a78bfa' }} />
            Health Badges
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {momoBadges.map((badge, idx) => {
              // Unlock first three badges for mock display
              const unlockedBadge = { ...badge, unlocked: idx < 3 };
              return (
                <TelkomBadgeCard 
                  key={badge.id} 
                  badge={unlockedBadge} 
                  t={t} 
                  getMomoIcon={getMomoIcon}
                  getMomoColor={getMomoColor}
                />
              );
            })}
          </div>
        </div>

        {/* Recent Rewards */}
        {earnedRewards.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: '#1f2937', marginBottom: 24, display: 'flex', alignItems: 'center' }}>
              <Gift size={24} style={{ marginRight: 8, color: '#10b981' }} />
              Recent Rewards
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {earnedRewards.slice(-5).reverse().map((reward) => (
                <div key={reward.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 16,
                  background: '#fff',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ color: getMomoColor(reward.reward.type) }}>
                      {getMomoIcon(reward.reward.type)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{reward.gameTitle}</div>
                      <div style={{ fontSize: 14, color: '#6b7280' }}>
                        Earned: {reward.reward.amount}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => claimReward(reward.id)}
                    disabled={reward.claimed}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: 'none',
                      background: reward.claimed ? '#9ca3af' : '#10b981',
                      color: '#fff',
                      fontWeight: 600,
                      cursor: reward.claimed ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {reward.claimed ? 'Claimed' : 'Claim'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard */}
          <div style={{ background: '#e0f2fe', borderRadius: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', padding: 24 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#1f2937', marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <BarChart3 size={24} style={{ marginRight: 8, color: '#059669' }} />
            Health Community Leaderboard
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {leaderboard.map((entry, idx) => (
              <TelkomLeaderboardItem 
                key={entry.name} 
                rank={entry.rank} 
                name={entry.name} 
                points={entry.points} 
                avatar={entry.avatar} 
                isCurrentUser={entry.isCurrentUser} 
                momoRewards={entry.momoRewards}
              />
            ))}
          </div>
        </div>

        {currentGame && (
          <GameModal 
            game={currentGame} 
            onClose={() => setCurrentGame(null)} 
            onComplete={(points) => handleGameComplete(points, currentGame.id)} 
            challengeQuestions={challengeQuestions} 
          />
        )}
      </div>
    </div>
  );
};

const GameModal = ({ game, onClose, onComplete, challengeQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(game.timeLimit);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing');

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
      setScore(score + question.points);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('completed');
      onComplete(score + (isCorrect ? question.points : 0));
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
          <p className="text-gray-600 mb-4">You earned {score} points!</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="text-blue-800 font-semibold">MoMo Reward Earned:</div>
            <div className="text-lg font-bold text-blue-900 mt-1">
              {game.momoReward.amount}
            </div>
            <div className="text-sm text-blue-700 capitalize">
              {game.momoReward.type}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Collect MoMo Reward
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <span>Score: {score} points</span>
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
            Points for this question: {questions[currentQuestion]?.points}
          </div>
        </div>
      </div>
    </div>
  );
};

const TelkomGameCard = ({ game, onPlay, t, isCompleted, getMomoIcon, getMomoColor }) => (
  <div 
    style={{ 
      background: '#fff',
      borderRadius: 16, 
      border: '2px solid #e5e7eb', 
      padding: 24, 
      transition: 'box-shadow 0.2s, border 0.2s, transform 0.18s', 
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', 
      cursor: isCompleted ? 'not-allowed' : 'pointer',
      opacity: isCompleted ? 0.7 : 1,
      position: 'relative',
      minHeight: 260,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} 
    onClick={!isCompleted ? onPlay : undefined}
    onMouseEnter={e => {
      if (!isCompleted) {
        e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(59,130,246,0.18)';
        e.currentTarget.style.border = '2px solid #3b82f6';
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      }
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
      e.currentTarget.style.border = '2px solid #f3f4f6';
      e.currentTarget.style.transform = 'none';
    }}
  >
    <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{game.icon}</div>
      <h4 style={{ fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>{game.title}</h4>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>{game.description}</p>
    </div>
    
    {/* MoMo Reward Display */}
    <div style={{ 
      background: '#e0f2fe',
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
      border: '1px solid #bae6fd'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ color: getMomoColor(game.momoReward.type) }}>
          {getMomoIcon(game.momoReward.type)}
        </div>
        <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 15 }}>
          Win: {game.momoReward.amount}
        </span>
      </div>
      <div style={{ textAlign: 'center', fontSize: 12, color: '#64748b', marginTop: 4, textTransform: 'capitalize' }}>
        MoMo {game.momoReward.type}
      </div>
    </div>
    
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
        <span style={{ color: '#64748b' }}>Difficulty:</span>
        <span style={{ fontWeight: 500, color: game.difficulty === 'Easy' ? '#10b981' : game.difficulty === 'Medium' ? '#f59e42' : '#ef4444' }}>
          {game.difficulty}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <span style={{ color: '#64748b' }}>Time Limit:</span>
        <span style={{ fontWeight: 500, color: '#1e293b' }}>
          {Math.floor(game.timeLimit / 60)}m {game.timeLimit % 60}s
        </span>
      </div>
    </div>
    
    <button 
      style={{ 
        width: '100%', 
        background: isCompleted ? '#9ca3af' : '#2563eb',
        color: 'white', 
        padding: '12px 0', 
        borderRadius: 10, 
        fontWeight: 600, 
        fontSize: 16, 
        border: 'none', 
        cursor: isCompleted ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s'
      }} 
      disabled={isCompleted}
    >
      {isCompleted ? 'Completed ✓' : 'Play for MoMo Rewards'}
    </button>
    
    {isCompleted && (
      <div style={{
        position: 'absolute',
        top: 12,
        right: 12,
        background: '#10b981',
        color: 'white',
        borderRadius: 20,
        padding: '4px 12px',
        fontSize: 12,
        fontWeight: 600
      }}>
        ✓ Completed
      </div>
    )}
  </div>
);

const TelkomBadgeCard = ({ badge, t, getMomoIcon, getMomoColor }) => (
  <div style={{ 
    textAlign: 'center', 
    padding: 20, 
    borderRadius: 16, 
    border: '2px solid', 
    borderColor: badge.unlocked ? '#10b981' : '#e5e7eb', 
    background: '#f3f4f6', 
    boxShadow: 'none',
    opacity: badge.unlocked ? 1 : 0.6, 
    transition: 'all 0.3s',
    transform: badge.unlocked ? 'scale(1.02)' : 'scale(1)'
  }}>
    <div style={{ fontSize: 32, marginBottom: 12 }}>
      {badge.unlocked ? badge.icon : '🔒'}
    </div>
    <h4 style={{ 
      fontWeight: 600, 
      fontSize: 16, 
      marginBottom: 8, 
      color: badge.unlocked ? '#1e40af' : '#64748b' 
    }}>
      {badge.name}
    </h4>
    <p style={{ 
      fontSize: 13, 
      color: badge.unlocked ? '#64748b' : '#9ca3af', 
      marginBottom: 12 
    }}>
      {badge.description}
    </p>
    
    {/* MoMo Reward for Badge */}
    <div style={{ 
      background: '#f3f4f6',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
      border: '1px solid',
      borderColor: badge.unlocked ? '#e5e7eb' : '#d1d5db'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
        <div style={{ color: getMomoColor(badge.reward.type) }}>
          {getMomoIcon(badge.reward.type)}
        </div>
        <span style={{ 
          fontSize: 14, 
          fontWeight: 600, 
          color: badge.unlocked ? '#1e293b' : '#9ca3af' 
        }}>
          {badge.reward.amount}
        </span>
      </div>
      <div style={{ 
        fontSize: 11, 
        color: badge.unlocked ? '#64748b' : '#9ca3af',
        textTransform: 'capitalize' 
      }}>
        MoMo {badge.reward.type}
      </div>
    </div>
    
    <div style={{ 
      fontSize: 12, 
      fontWeight: 600, 
      color: badge.unlocked ? '#10b981' : '#9ca3af',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      {badge.unlocked ? 'Unlocked' : 'Locked'}
    </div>
  </div>
);

const TelkomLeaderboardItem = ({ rank, name, points, avatar, isCurrentUser, momoRewards }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    borderRadius: 12, 
    border: '2px solid', 
    borderColor: isCurrentUser ? '#2563eb' : '#e5e7eb', 
    background: isCurrentUser ? '#e0f2fe' : '#fff', 
    boxShadow: isCurrentUser ? '0 1px 2px 0 rgba(59, 130, 246, 0.08)' : 'none', 
    transition: 'all 0.2s' 
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ 
        width: 40, 
        height: 40, 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontWeight: 700, 
        fontSize: 18, 
        background: rank === 1 ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 
                   rank === 2 ? 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)' : 
                   rank === 3 ? 'linear-gradient(135deg, #fed7aa 0%, #fb923c 100%)' : 
                   'linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%)',
        color: rank <= 3 ? '#1f2937' : '#ffffff'
      }}>
        {rank <= 3 ? avatar : rank}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: isCurrentUser ? '#1e40af' : '#1e293b', fontSize: 16 }}>
          {name}
        </div>
        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 2 }}>
          {points} health points
        </div>
        <div style={{ fontSize: 13, color: '#059669', fontWeight: 500 }}>
          Rewards: {momoRewards}
        </div>
      </div>
    </div>
    {isCurrentUser && (
      <div style={{ 
        fontSize: 12, 
        background: '#3b82f6', 
        color: '#ffffff', 
        padding: '4px 12px', 
        borderRadius: 20, 
        fontWeight: 600 
      }}>
        You
      </div>
    )}
  </div>
);

export default RewardsView;