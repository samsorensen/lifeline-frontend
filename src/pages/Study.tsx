import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { flashcardSets, tasksByCourse } from '../data/mock';

export default function Study() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  const allTasks = Object.values(tasksByCourse).flat();
  const task = allTasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <BookOpen size={32} color="#B5A898" />
          <p>Task not found.</p>
          <button onClick={() => navigate(-1)} style={styles.backLink}>Go back</button>
        </div>
      </div>
    );
  }

  const baseCards = flashcardSets[taskId || ''] || [];
  const isMock = baseCards.length === 0;
  const cards = isMock
    ? [
        {
          id: 'mock-1',
          front: `What is the primary goal of ${task.title}?`,
          back: 'Describe the core objective in one clear sentence.',
        },
        {
          id: 'mock-2',
          front: 'Which concept from the course connects most to this task?',
          back: 'Identify the key topic and how it applies to the deliverable.',
        },
        {
          id: 'mock-3',
          front: 'What is a common mistake to avoid here?',
          back: 'Name one pitfall and how you will prevent it.',
        },
        {
          id: 'mock-4',
          front: 'How will you validate your final output?',
          back: 'List one check to confirm the work meets requirements.',
        },
      ]
    : baseCards;

  const card = cards[currentIndex];
  const masteredCount = mastered.size;
  const progress = ((masteredCount) / cards.length) * 100;

  function next() {
    setFlipped(false);
    setCurrentIndex((i) => (i + 1) % cards.length);
  }

  function prev() {
    setFlipped(false);
    setCurrentIndex((i) => (i - 1 + cards.length) % cards.length);
  }

  function markMastered() {
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(card.id)) {
        next.delete(card.id);
      } else {
        next.add(card.id);
      }
      return next;
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <ArrowLeft size={17} />
            <span>Back</span>
          </button>
          <div style={styles.headerCenter}>
            <h2 style={styles.title}>{task?.title || 'Study Session'}</h2>
            <span style={styles.subtitle}>{task?.courseCode}</span>
            {isMock && <span style={styles.previewTag}>Preview Deck</span>}
          </div>
          <div style={{ width: 80 }} />
        </div>

        {/* Progress bar */}
        <div style={styles.progressSection}>
          <div style={styles.progressRow}>
            <span style={styles.progressLabel}>{masteredCount} of {cards.length} mastered</span>
            <span style={styles.progressPct}>{Math.round(progress)}%</span>
          </div>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
        </div>

        {/* Flashcard */}
        <div style={styles.cardArea}>
          <button onClick={prev} style={styles.navArrow}>
            <ChevronLeft size={22} color="#B5A898" />
          </button>

          <button
            onClick={() => setFlipped(!flipped)}
            style={{
              ...styles.flashcard,
              background: flipped ? '#FFFCF8' : '#FFFFFF',
              borderColor: flipped ? '#E8D5C0' : '#EDE5DA',
            }}
          >
            <span style={styles.cardLabel}>
              {flipped ? 'Answer' : 'Question'} · {currentIndex + 1}/{cards.length}
            </span>
            <p style={styles.cardText}>
              {flipped ? card.back : card.front}
            </p>
            <span style={styles.flipHint}>
              {flipped ? '' : 'Tap to reveal answer'}
            </span>
          </button>

          <button onClick={next} style={styles.navArrow}>
            <ChevronRight size={22} color="#B5A898" />
          </button>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button onClick={() => { setFlipped(false); setCurrentIndex(0); setMastered(new Set()); }} style={styles.resetBtn}>
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={markMastered}
            style={{
              ...styles.masteredBtn,
              background: mastered.has(card.id) ? '#5E8C61' : '#F2F7F0',
              color: mastered.has(card.id) ? '#FFFFFF' : '#5E8C61',
              borderColor: mastered.has(card.id) ? '#5E8C61' : '#D4E8D1',
            }}
          >
            {mastered.has(card.id) ? '✓ Mastered' : 'Mark as Mastered'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: '#FDF8F3',
    display: 'flex',
    justifyContent: 'center',
    padding: '36px 24px',
  },
  page: {
    width: '100%',
    maxWidth: 640,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    paddingTop: 120,
    color: '#7A6E5D',
    fontSize: 15,
  },
  backLink: {
    color: '#C8713A',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 14,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: '#7A6E5D',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    padding: '8px 4px',
    width: 80,
  },
  headerCenter: {
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  title: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 20,
    fontWeight: 400,
    color: '#2C2418',
  },
  subtitle: {
    fontSize: 13,
    color: '#B5A898',
  },
  previewTag: {
    alignSelf: 'center',
    background: '#FFF5ED',
    border: '1px solid #FFE4CC',
    borderRadius: 999,
    color: '#C8713A',
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  },
  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  progressRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 13,
    color: '#7A6E5D',
  },
  progressPct: {
    fontSize: 13,
    fontWeight: 600,
    color: '#5E8C61',
  },
  progressTrack: {
    height: 5,
    background: '#F3EDE5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#5E8C61',
    borderRadius: 3,
    transition: 'width 0.4s ease',
  },
  cardArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  navArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: 14,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background 0.15s',
    border: '1px solid #F3EDE5',
    background: '#FFFFFF',
  },
  flashcard: {
    flex: 1,
    minHeight: 300,
    borderRadius: 24,
    border: '1.5px solid',
    padding: '36px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    textAlign: 'center' as const,
    boxShadow: '0 4px 16px rgba(44,36,24,0.05)',
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#B5A898',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  cardText: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 20,
    fontWeight: 400,
    color: '#2C2418',
    lineHeight: 1.45,
  },
  flipHint: {
    fontSize: 12,
    color: '#D6CCBF',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
  },
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '11px 22px',
    borderRadius: 100,
    border: '1px solid #EDE5DA',
    fontSize: 14,
    fontWeight: 500,
    color: '#7A6E5D',
    cursor: 'pointer',
    background: '#FFFFFF',
  },
  masteredBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '11px 22px',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid',
  },
};
