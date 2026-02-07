import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={styles.logoBadge}>
        <BookOpen size={28} color="#C8713A" strokeWidth={1.5} />
        <span style={styles.logoText}>Lifeline</span>
      </div>

      {/* Decorative star */}
      <div style={styles.decorativeStar}>✦</div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.mainTitle}>Your Study Partner for Success</h1>
        <p style={styles.mainSubtitle}>
          Stay focused, study smarter, and master your courses with AI-powered learning tools designed just for you. From flashcards to personalized quizzes, Lifeline keeps you on top of every assignment.
        </p>
        <button onClick={() => navigate('/onboarding')} style={styles.ctaButton}>
          Get Started
          <span style={styles.ctaArrow}>→</span>
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#FDF8F3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px',
    position: 'relative',
  },
  logoBadge: {
    position: 'absolute' as const,
    top: 60,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#FFFFFF',
    border: '1.5px solid #EDE5DA',
    borderRadius: 16,
    padding: '12px 20px',
    boxShadow: '0 4px 12px rgba(44, 36, 24, 0.08)',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#2C2418',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
    letterSpacing: '-0.01em',
  },
  decorativeStar: {
    position: 'absolute' as const,
    top: 140,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 32,
    color: '#D4A574',
    opacity: 0.6,
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    maxWidth: 720,
    textAlign: 'center',
  },
  mainTitle: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 56,
    fontWeight: 400,
    color: '#2C2418',
    margin: 0,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
  },
  mainSubtitle: {
    fontSize: 18,
    color: '#5C4F3C',
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 600,
  },
  ctaButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#2C2418',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 999,
    padding: '16px 40px',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: 16,
  },
  ctaArrow: {
    fontSize: 18,
    transition: 'transform 0.3s ease',
  },
};
