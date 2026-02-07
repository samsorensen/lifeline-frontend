import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Trophy, Star } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { tasksByCourse } from '../data/mock';
import { useState } from 'react';

export default function LearningGame() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const allTasks = Object.values(tasksByCourse).flat();
  const task = allTasks.find((t) => t.id === taskId);

  // Sample game cards
  const cards = [
    { id: 1, term: 'Algorithm', match: 'Step-by-step procedure', matched: false },
    { id: 2, term: 'Data Structure', match: 'Organization of data', matched: false },
    { id: 3, term: 'Variable', match: 'Storage location', matched: false },
    { id: 4, term: 'Function', match: 'Reusable code block', matched: false },
  ];

  if (!task) {
    return (
      <div style={styles.layout}>
        <Sidebar />
        <main style={styles.main}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <ArrowLeft size={18} color="#7A6E5D" />
            <span>Back</span>
          </button>
          <div style={styles.notFound}>
            <p>Task not found</p>
          </div>
        </main>
      </div>
    );
  }

  const handleCardClick = (index: number) => {
    if (selectedCard === null) {
      setSelectedCard(index);
    } else {
      // Simple matching logic - just increment score for demo
      setScore(score + 10);
      setSelectedCard(null);
      if (currentRound < 4) {
        setCurrentRound(currentRound + 1);
      }
    }
  };

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeft size={18} color="#7A6E5D" />
          <span>Back to Task</span>
        </button>

        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.iconWrapper}>
              <Gamepad2 size={24} color="#D4A574" />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={styles.title}>Learning Game</h1>
              <p style={styles.subtitle}>{task.title}</p>
            </div>
            <div style={styles.scoreCard}>
              <Trophy size={20} color="#D4A574" />
              <span style={styles.score}>{score}</span>
            </div>
          </div>

          {/* Game Instructions */}
          <div style={styles.instructions}>
            <Star size={16} color="#D4A574" />
            <span style={styles.instructionText}>
              Match concepts with their definitions to earn points!
            </span>
          </div>

          {/* Game Area */}
          <div style={styles.gameArea}>
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Terms</h3>
              <div style={styles.cardGrid}>
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    style={{
                      ...styles.gameCard,
                      background: selectedCard === index ? '#FFF8F0' : '#FFFFFF',
                      borderColor: selectedCard === index ? '#D4A574' : '#EDE5DA',
                    }}
                  >
                    {card.term}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Definitions</h3>
              <div style={styles.cardGrid}>
                {cards.map((card, index) => (
                  <button
                    key={card.id + 100}
                    onClick={() => handleCardClick(index + 100)}
                    style={{
                      ...styles.gameCard,
                      background: selectedCard === index + 100 ? '#FFF8F0' : '#FFFFFF',
                      borderColor: selectedCard === index + 100 ? '#D4A574' : '#EDE5DA',
                    }}
                  >
                    {card.match}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div style={styles.progressSection}>
            <span style={styles.progressText}>
              Round {currentRound} of 4
            </span>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${(currentRound / 4) * 100}%`,
                }}
              />
            </div>
          </div>

          {currentRound === 4 && (
            <div style={styles.completeCard}>
              <Trophy size={40} color="#D4A574" />
              <h2 style={styles.completeTitle}>Great Job!</h2>
              <p style={styles.completeText}>
                You've completed all rounds with a score of {score}
              </p>
              <button onClick={() => navigate(-1)} style={styles.finishBtn}>
                Finish
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: '#FDF8F3',
  },
  main: {
    flex: 1,
    marginLeft: 230,
    padding: '36px 44px',
    maxWidth: 980,
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#7A6E5D',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 32,
    padding: 0,
  },
  notFound: {
    textAlign: 'center',
    color: '#7A6E5D',
    fontSize: 16,
  },
  container: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    border: '1px solid #EDE5DA',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: '#FFF8F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 28,
    fontWeight: 400,
    color: '#2C2418',
    marginBottom: 4,
    letterSpacing: '-0.01em',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A6E5D',
  },
  scoreCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FFF8F0',
    border: '1px solid #FFE4CC',
    borderRadius: 12,
    padding: '10px 16px',
  },
  score: {
    fontSize: 18,
    fontWeight: 700,
    color: '#D4A574',
  },
  instructions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FFF8F0',
    border: '1px solid #FFE4CC',
    borderRadius: 12,
    padding: '12px 16px',
    marginBottom: 32,
  },
  instructionText: {
    fontSize: 14,
    color: '#7A6E5D',
  },
  gameArea: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    marginBottom: 32,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#7A6E5D',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  gameCard: {
    background: '#FFFFFF',
    border: '2px solid',
    borderRadius: 12,
    padding: '16px',
    fontSize: 14,
    fontWeight: 500,
    color: '#2C2418',
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  progressSection: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 13,
    fontWeight: 600,
    color: '#7A6E5D',
    marginBottom: 8,
    display: 'block',
  },
  progressBar: {
    height: 6,
    background: '#F3EDE5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#D4A574',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  completeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    padding: 32,
    background: '#FFF8F0',
    borderRadius: 14,
    border: '1px solid #FFE4CC',
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: '#2C2418',
  },
  completeText: {
    fontSize: 15,
    color: '#7A6E5D',
    textAlign: 'center' as const,
  },
  finishBtn: {
    background: '#D4A574',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 12,
    padding: '12px 32px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
};
