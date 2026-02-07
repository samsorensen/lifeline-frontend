import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { onboardingQuestions } from '../data/mock';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [textValue, setTextValue] = useState('');

  const question = onboardingQuestions[step];
  const totalSteps = onboardingQuestions.length;
  const progress = ((step + 1) / totalSteps) * 100;

  function handleSelect(value: string) {
    if (question.type === 'multiselect') {
      const current = (answers[question.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [question.id]: updated });
    } else {
      setAnswers({ ...answers, [question.id]: value });
      if (step < totalSteps - 1) {
        setTimeout(() => setStep(step + 1), 200);
      }
    }
  }

  function handleNext() {
    if (question.type === 'text') {
      setAnswers({ ...answers, [question.id]: textValue });
      setTextValue('');
    }
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      navigate('/courses');
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  const isAnswered = question.type === 'text'
    ? textValue.trim().length > 0
    : question.type === 'multiselect'
      ? ((answers[question.id] as string[]) || []).length > 0
      : !!answers[question.id];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoRow}>
            <Sparkles size={18} color="#C8713A" />
            <span style={styles.logoText}>Lifeline</span>
          </div>
          <span style={styles.stepLabel}>{step + 1} of {totalSteps}</span>
        </div>

        {/* Progress */}
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        {/* Question */}
        <div style={styles.body}>
          <h2 style={styles.question}>{question.question}</h2>

          {question.type === 'text' && (
            <input
              style={styles.textInput}
              type="text"
              placeholder={question.placeholder}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && isAnswered && handleNext()}
              autoFocus
            />
          )}

          {(question.type === 'select' || question.type === 'multiselect') && (
            <div style={styles.options}>
              {question.options?.map((opt) => {
                const selected = question.type === 'multiselect'
                  ? ((answers[question.id] as string[]) || []).includes(opt)
                  : answers[question.id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    style={{
                      ...styles.option,
                      ...(selected ? styles.optionSelected : {}),
                    }}
                  >
                    {opt}
                    {selected && <span style={styles.checkmark}>✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          {step > 0 ? (
            <button onClick={handleBack} style={styles.backBtn}>
              <ArrowLeft size={15} />
              Back
            </button>
          ) : <div />}
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            style={{
              ...styles.nextBtn,
              opacity: isAnswered ? 1 : 0.35,
            }}
          >
            {step === totalSteps - 1 ? 'Get Started' : 'Continue'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FDF8F3',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 460,
    background: '#FFFFFF',
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(44,36,24,0.07)',
    padding: '36px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
    border: '1px solid #F3EDE5',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 20,
    fontWeight: 400,
    color: '#2C2418',
  },
  stepLabel: {
    fontSize: 13,
    color: '#B5A898',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  progressTrack: {
    height: 3,
    background: '#F3EDE5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#C8713A',
    borderRadius: 2,
    transition: 'width 0.4s ease',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
    minHeight: 200,
  },
  question: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 26,
    fontWeight: 400,
    color: '#2C2418',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  },
  textInput: {
    padding: '15px 18px',
    fontSize: 15,
    border: '1.5px solid #EDE5DA',
    borderRadius: 14,
    background: '#FDF8F3',
    transition: 'border-color 0.2s',
    outline: 'none',
    color: '#2C2418',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 20px',
    borderRadius: 14,
    border: '1.5px solid #EDE5DA',
    background: '#FFFFFF',
    fontSize: 15,
    fontWeight: 500,
    color: '#2C2418',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  optionSelected: {
    borderColor: '#C8713A',
    background: '#FFF5ED',
    color: '#C8713A',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: 600,
    color: '#C8713A',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 14,
    fontWeight: 500,
    color: '#7A6E5D',
    cursor: 'pointer',
    padding: '8px 4px',
  },
  nextBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '13px 28px',
    background: '#2C2418',
    color: '#FFFAF5',
    borderRadius: 100,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
};
