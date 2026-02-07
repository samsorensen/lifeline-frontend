import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, ChevronDown, Check } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { courses, tasksByCourse } from '../data/mock';

const COURSE_GOAL = 5;

const dailySummary =
  "Focus on your BST implementation for CS 201 first — it's due today. After that, knock out the Linear Algebra problem set (Wednesday). Leave the lighter readings and discussion posts for the evening. Your quiz prep for Friday can wait until Thursday.";

export default function CourseList() {
  const navigate = useNavigate();
  const [dueSoonOpen, setDueSoonOpen] = useState(true);

  const allTasks = Object.values(tasksByCourse).flat();
  const pendingCount = allTasks.filter((t) => !t.completed).length;
  
  // Calculate overall completion
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const completionPercentage = allTasks.length > 0 
    ? Math.round((completedTasks / allTasks.length) * 100)
    : 0;

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        {/* Title */}
        <h1 style={styles.greeting}>Good morning</h1>

        {/* Body row: AI Summary on left, pie chart on right */}
        <div style={styles.contentRow}>
          {/* AI Daily Summary */}
          <div style={styles.summaryCard}>
            <div style={styles.summaryRow}>
              <Sparkles size={14} color="#C8713A" />
              <span style={styles.summaryLabel}>Your Day at a Glance</span>
            </div>
            <p style={styles.summaryText}>{dailySummary}</p>
            <p style={styles.summaryText}>
              <strong>You have {pendingCount} tasks pending across {courses.length} courses.</strong>
            </p>
          </div>

          {/* Completion pie chart */}
          <div style={styles.dailyCard}>
            <div style={styles.dailyRow}>
              <span style={styles.dailyLabel}>Overall</span>
              <span style={styles.dailyCount}>{completionPercentage}%</span>
            </div>
            <div style={styles.pieChartContainer}>
              <svg width={120} height={120} style={styles.pieChart}>
                <circle
                  cx={60}
                  cy={60}
                  r={50}
                  fill="none"
                  stroke="#EDE5DA"
                  strokeWidth={8}
                />
                <circle
                  cx={60}
                  cy={60}
                  r={50}
                  fill="none"
                  stroke="#C8713A"
                  strokeWidth={8}
                  strokeDasharray={`${(completionPercentage / 100) * 314.159} 314.159`}
                  strokeLinecap="round"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '60px 60px',
                    transition: 'stroke-dasharray 0.4s ease',
                  }}
                />
              </svg>
              <div style={styles.pieChartCenter}>
                <span style={styles.pieChartText}>{completedTasks}/{allTasks.length}</span>
              </div>
            </div>
            <div style={styles.dailyBottom}>
              <div style={styles.loadChip}>
                <Zap size={11} color="#C8713A" />
                <span style={styles.loadText}>Great progress!</span>
              </div>
              <span style={styles.dailyHint}>
                {allTasks.length - completedTasks} tasks left
              </span>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div style={styles.sectionLabel}>Your Courses</div>
        <div style={styles.grid}>
          {courses.map((course) => {
            const tasks = tasksByCourse[course.id] || [];
            const completed = tasks.filter((t) => t.completed).length;
            const pending = tasks.filter((t) => !t.completed).length;
            const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
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
                  <div style={styles.cardPipeline}>
                    <div style={styles.cardPipelineLine}>
                      <div style={{
                        ...styles.cardPipelineLineFill,
                        width: `${(completed / Math.min(COURSE_GOAL, tasks.length)) * 100}%`,
                        background: course.color,
                      }} />
                    </div>
                    {Array.from({ length: Math.min(COURSE_GOAL, tasks.length) }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.cardPipelineDot,
                          background: i < completed ? course.color : '#FFFFFF',
                          borderColor: i < completed ? course.color : '#DDD3C6',
                        }}
                      >
                        {i < completed && <Check size={9} color="#FFF" strokeWidth={3} />}
                      </div>
                    ))}
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
        <button
          onClick={() => setDueSoonOpen(!dueSoonOpen)}
          style={styles.dropdownHeader}
        >
          <span style={styles.sectionLabel}>Due Soon</span>
          <ChevronDown
            size={18}
            color="#7A6E5D"
            style={{
              transform: dueSoonOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        </button>
        {dueSoonOpen && (
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
        )}
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
  greeting: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 32,
    fontWeight: 400,
    color: '#2C2418',
    marginBottom: 24,
    letterSpacing: '-0.01em',
  },
  contentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
    marginBottom: 30,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
    marginBottom: 24,
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
  pieChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as const,
    height: 120,
  },
  pieChart: {
    position: 'absolute' as const,
  },
  pieChartCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#7A6E5D',
  },

  /* ── AI Summary ── */
  summaryCard: {
    flex: 1,
    background: '#FFFCF8',
    border: '1px solid #EDE5DA',
    borderRadius: 16,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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
    fontSize: 16,
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
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    width: '100%',
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
  cardPipeline: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
  },
  cardPipelineLine: {
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
  cardPipelineLineFill: {
    height: '100%',
    borderRadius: 1,
    transition: 'width 0.4s ease',
  },
  cardPipelineDot: {
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
