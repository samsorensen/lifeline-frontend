import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, CheckCircle2, XCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { tasksByCourse } from '../data/mock';
import { useState } from 'react';

export default function Quiz() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const allTasks = Object.values(tasksByCourse).flat();
  const task = allTasks.find((t) => t.id === taskId);

  // Sample quiz questions
  const questions = [
    {
      question: 'What is the main objective of this assignment?',
      options: [
        'To understand core concepts',
        'To memorize facts',
        'To complete quickly',
        'To avoid reading',
      ],
      correct: 0,
    },
    {
      question: 'Which approach is most effective for this topic?',
      options: [
        'Last-minute cramming',
        'Consistent practice and review',
        'Copying notes',
        'Skipping examples',
      ],
      correct: 1,
    },
    {
      question: 'What should you prioritize when studying?',
      options: [
        'Speed over accuracy',
        'Quantity over quality',
        'Understanding over memorization',
        'Shortcuts over fundamentals',
      ],
      correct: 2,
    },
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

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const question = questions[currentQuestion];

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
              <GraduationCap size={24} color="#6B5B95" />
            </div>
            <div>
              <h1 style={styles.title}>Practice Quiz</h1>
              <p style={styles.subtitle}>{task.title}</p>
            </div>
          </div>

          {/* Progress */}
          <div style={styles.progress}>
            <span style={styles.progressText}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div style={styles.questionCard}>
            <h2 style={styles.question}>{question.question}</h2>
            <div style={styles.options}>
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    style={{
                      ...styles.option,
                      background: showCorrect
                        ? '#F2F7F0'
                        : showIncorrect
                        ? '#FDF0ED'
                        : isSelected
                        ? '#F5F3F8'
                        : '#FFFFFF',
                      borderColor: showCorrect
                        ? '#5E8C61'
                        : showIncorrect
                        ? '#C0513F'
                        : isSelected
                        ? '#6B5B95'
                        : '#EDE5DA',
                      cursor: showResult ? 'default' : 'pointer',
                    }}
                    disabled={showResult}
                  >
                    <span style={styles.optionText}>{option}</span>
                    {showCorrect && <CheckCircle2 size={20} color="#5E8C61" />}
                    {showIncorrect && <XCircle size={20} color="#C0513F" />}
                  </button>
                );
              })}
            </div>

            {showResult && currentQuestion < questions.length - 1 && (
              <button onClick={nextQuestion} style={styles.nextBtn}>
                Next Question
              </button>
            )}

            {showResult && currentQuestion === questions.length - 1 && (
              <div style={styles.complete}>
                <CheckCircle2 size={32} color="#5E8C61" />
                <p style={styles.completeText}>Quiz Complete!</p>
              </div>
            )}
          </div>
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
    maxWidth: 780,
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
    marginBottom: 32,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: '#F5F3F8',
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
  progress: {
    marginBottom: 32,
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
    background: '#6B5B95',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  questionCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  question: {
    fontSize: 20,
    fontWeight: 500,
    color: '#2C2418',
    lineHeight: 1.5,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    border: '2px solid',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'left' as const,
    transition: 'all 0.2s ease',
  },
  optionText: {
    color: '#2C2418',
  },
  nextBtn: {
    alignSelf: 'flex-end',
    background: '#6B5B95',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 12,
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  complete: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    padding: 32,
  },
  completeText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#5E8C61',
  },
};
