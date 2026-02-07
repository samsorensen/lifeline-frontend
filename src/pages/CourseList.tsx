import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, TrendingUp, Check, Sparkles, Zap } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { courses, tasksByCourse } from '../data/mock';

const DAILY_GOAL = 5;

const dailySummary =
  "Focus on your BST implementation for CS 201 first — it's due today. After that, knock out the Linear Algebra problem set (Wednesday). Leave the lighter readings and discussion posts for the evening. Your quiz prep for Friday can wait until Thursday.";

const dailyLoadEstimate = '~3.5 hrs';

export default function CourseList() {
  const navigate = useNavigate();
  const [completed] = useState(2);

  const allTasks = Object.values(tasksByCourse).flat();
  const pendingCount = allTasks.filter((t) => !t.completed).length;
  const dueToday = allTasks.filter((t) => t.dueDate === 'Today' && !t.completed);

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        {/* Header row */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.greeting}>Good morning</h1>
            <p style={styles.subtitle}>
              You have <strong>{pendingCount} tasks</strong> pending across {courses.length} courses
            </p>
          </div>

          {/* Daily progress tracker */}
          <div style={styles.dailyCard}>
            <div style={styles.dailyRow}>
              <span style={styles.dailyLabel}>Today</span>
              <span style={styles.dailyCount}>{completed}/{DAILY_GOAL}</span>
            </div>
            {/* Pipeline: line through circles */}
            <div style={styles.pipeline}>
              <div style={styles.pipelineLine}>
                <div style={{
                  ...styles.pipelineLineFill,
                  width: DAILY_GOAL <= 1
                    ? (completed >= 1 ? '100%' : '0%')
                    : `${(Math.max(0, completed - 1) / (DAILY_GOAL - 1)) * 100}%`,
                }} />
              </div>
              {Array.from({ length: DAILY_GOAL }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.dot,
                    background: i < completed ? '#C8713A' : '#FFFFFF',
                    borderColor: i < completed ? '#C8713A' : '#DDD3C6',
                  }}
                >
                  {i < completed && <Check size={9} color="#FFF" strokeWidth={3} />}
                </div>
              ))}
            </div>
            <div style={styles.dailyBottom}>
              <div style={styles.loadChip}>
                <Zap size={11} color="#C8713A" />
                <span style={styles.loadText}>{dailyLoadEstimate}</span>
              </div>
              <span style={styles.dailyHint}>
                {completed >= DAILY_GOAL ? 'Done!' : `${DAILY_GOAL - completed} left`}
              </span>
            </div>
          </div>
        </div>

        {/* AI Daily Summary */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryRow}>
            <Sparkles size={14} color="#C8713A" />
            <span style={styles.summaryLabel}>Your Day at a Glance</span>
          </div>
          <p style={styles.summaryText}>{dailySummary}</p>
        </div>

        {/* Quick stats */}
        {dueToday.length > 0 && (
          <div style={styles.alertBar}>
            <Clock size={15} color="#C8713A" />
            <span style={styles.alertText}>
              <strong>{dueToday.length} task{dueToday.length > 1 ? 's' : ''}</strong> due today
            </span>
          </div>
        )}

        {/* Courses */}
        <div style={styles.sectionLabel}>Your Courses</div>
        <div style={styles.grid}>
          {courses.map((course) => {
            const tasks = tasksByCourse[course.id] || [];
            const pending = tasks.filter((t) => !t.completed).length;
            return (
              <button
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                style={styles.card}
              >
                <div style={styles.cardTop}>
                  <div style={{ ...styles.colorDot, background: course.color }} />
                  <ArrowRight size={15} color="#B5A898" />
                </div>
                <div style={styles.cardBody}>
                  <span style={styles.courseCode}>{course.code}</span>
                  <h3 style={styles.courseName}>{course.name}</h3>
                  <p style={styles.professor}>{course.professor}</p>
                </div>
                <div style={styles.cardFooter}>
                  <div style={styles.progressRow}>
                    <TrendingUp size={13} color="#7A6E5D" />
                    <div style={styles.progressTrack}>
                      <div style={{
                        ...styles.progressFill,
                        width: `${course.progress}%`,
                        background: course.color,
                      }} />
                    </div>
                    <span style={styles.progressText}>{course.progress}%</span>
                  </div>
                  <span style={styles.taskCount}>
                    {pending} task{pending !== 1 ? 's' : ''} pending
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Upcoming */}
        <div style={styles.sectionLabel}>Due Soon</div>
        <div style={styles.taskList}>
          {allTasks
            .filter((t) => !t.completed)
            .slice(0, 5)
            .map((task) => (
              <div key={task.id} style={styles.taskRow}>
                <div style={{
                  ...styles.priorityDot,
                  background: task.priority === 'high' ? '#C0513F' : task.priority === 'medium' ? '#C8713A' : '#B5A898',
                }} />
                <div style={styles.taskInfo}>
                  <span style={styles.taskTitle}>{task.title}</span>
                  <span style={styles.taskMeta}>{task.courseCode} · {task.dueDate}</span>
                </div>
                <span style={{
                  ...styles.typeBadge,
                  background: task.type === 'quiz' ? '#FDF0ED' : task.type === 'assignment' ? '#FFF0E4' : task.type === 'project' ? '#F2F7F0' : '#FAF3EB',
                  color: task.type === 'quiz' ? '#C0513F' : task.type === 'assignment' ? '#C8713A' : task.type === 'project' ? '#5E8C61' : '#7A6E5D',
                }}>
                  {task.type}
                </span>
              </div>
            ))}
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
    marginBottom: 24,
  },
  greeting: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 32,
    fontWeight: 400,
    color: '#2C2418',
    marginBottom: 6,
    letterSpacing: '-0.01em',
  },
  subtitle: {
    fontSize: 15,
    color: '#7A6E5D',
    fontWeight: 400,
  },

  /* ── Daily progress tracker ── */
  dailyCard: {
    background: '#FFFFFF',
    border: '1px solid #EDE5DA',
    borderRadius: 16,
    padding: '12px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    minWidth: 220,
    flexShrink: 0,
  },
  dailyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#B5A898',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  dailyCount: {
    fontSize: 14,
    fontWeight: 700,
    color: '#2C2418',
  },
  pipeline: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
  },
  pipelineLine: {
    position: 'absolute' as const,
    left: 10,
    right: 10,
    top: '50%',
    height: 2,
    background: '#EDE5DA',
    transform: 'translateY(-50%)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  pipelineLineFill: {
    height: '100%',
    background: '#C8713A',
    borderRadius: 1,
    transition: 'width 0.4s ease',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    zIndex: 1,
  },
  dailyBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    background: '#FFF5ED',
    padding: '3px 8px',
    borderRadius: 100,
  },
  loadText: {
    fontSize: 11,
    fontWeight: 600,
    color: '#C8713A',
  },
  dailyHint: {
    fontSize: 11,
    color: '#B5A898',
    fontWeight: 500,
  },

  /* ── AI Summary ── */
  summaryCard: {
    background: '#FFFCF8',
    border: '1px solid #EDE5DA',
    borderRadius: 16,
    padding: '16px 20px',
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  summaryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#C8713A',
    letterSpacing: '0.01em',
  },
  summaryText: {
    fontSize: 14,
    color: '#5C4F3C',
    lineHeight: 1.6,
  },

  /* ── Alert bar ── */
  alertBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '13px 18px',
    background: '#FFF5ED',
    border: '1px solid #F5DCC8',
    borderRadius: 14,
    marginBottom: 28,
  },
  alertText: {
    fontSize: 14,
    color: '#C8713A',
  },

  /* ── Section label ── */
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#B5A898',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    marginBottom: 16,
  },

  /* ── Course grid ── */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 18,
    marginBottom: 40,
  },
  card: {
    background: '#FFFFFF',
    border: '1px solid #EDE5DA',
    borderRadius: 20,
    padding: 22,
    cursor: 'pointer',
    transition: 'box-shadow 0.25s, transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    textAlign: 'left' as const,
    width: '100%',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  courseCode: {
    fontSize: 11,
    fontWeight: 600,
    color: '#B5A898',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  },
  courseName: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 17,
    fontWeight: 400,
    color: '#2C2418',
    lineHeight: 1.3,
  },
  professor: {
    fontSize: 13,
    color: '#7A6E5D',
  },
  cardFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingTop: 4,
  },
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    background: '#F3EDE5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.4s',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#7A6E5D',
    minWidth: 32,
    textAlign: 'right' as const,
  },
  taskCount: {
    fontSize: 12,
    color: '#B5A898',
  },

  /* ── Due soon list ── */
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 18px',
    background: '#FFFFFF',
    borderRadius: 14,
    border: '1px solid #F3EDE5',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },
  taskInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: '#2C2418',
  },
  taskMeta: {
    fontSize: 12,
    color: '#B5A898',
  },
  typeBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 12px',
    borderRadius: 100,
    textTransform: 'capitalize' as const,
  },
};
