import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  BookOpen,
  FileText,
  HelpCircle,
  MessageSquare,
  GraduationCap,
  Check,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  courses,
  tasksByCourse,
  modulesByCourse,
  courseSummaries,
  flashcardSets,
  type Task,
  type ModuleItem,
} from '../data/mock';

const DAILY_GOAL = 5;

function getTypeIcon(type: ModuleItem['type']) {
  switch (type) {
    case 'lecture': return GraduationCap;
    case 'reading': return BookOpen;
    case 'assignment': return FileText;
    case 'quiz': return HelpCircle;
    case 'discussion': return MessageSquare;
    default: return FileText;
  }
}

function getPriorityStyle(priority: Task['priority']) {
  switch (priority) {
    case 'high': return { bg: '#FDF0ED', color: '#C0513F', label: 'High' };
    case 'medium': return { bg: '#FFF5ED', color: '#C8713A', label: 'Med' };
    case 'low': return { bg: '#F3EDE5', color: '#7A6E5D', label: 'Low' };
  }
}

export default function CourseBreakdown() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ m1: true, m3: true, m4: true, m5: true });
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const course = courses.find((c) => c.id === courseId);
  if (!course) return <div>Course not found</div>;

  const tasks = tasksByCourse[course.id] || [];
  const modules = modulesByCourse[course.id] || [];
  const summary = courseSummaries[course.id] || '';
  const pendingTasks = tasks.filter((t) => !t.completed);

  function toggleModule(id: string) {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleItem(id: string) {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function canStudy(task: Task) {
    return flashcardSets[task.id] !== undefined;
  }

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        {/* Course Header with Progress */}
        <div style={styles.courseHeaderContainer}>
          <div>
            <div style={styles.courseHeader}>
              <div style={{ ...styles.colorBar, background: course.color }} />
              <div style={styles.headerContent}>
                <span style={styles.courseCode}>{course.code}</span>
                <h1 style={styles.courseTitle}>{course.name}</h1>
                <p style={styles.courseMeta}>{course.professor} · {course.schedule}</p>
              </div>
            </div>
          </div>

          {/* Progress tracker */}
          <div style={styles.dailyCard}>
            <div style={styles.dailyRow}>
              <span style={styles.dailyLabel}>Progress</span>
              <span style={styles.dailyCount}>{tasks.filter(t => t.completed).length}/{tasks.length}</span>
            </div>
            {/* Pipeline: line through circles */}
            <div style={styles.pipeline}>
              <div style={styles.pipelineLine}>
                <div style={{
                  ...styles.pipelineLineFill,
                  width: DAILY_GOAL <= 1
                    ? (tasks.filter(t => t.completed).length >= 1 ? '100%' : '0%')
                    : `${(Math.max(0, tasks.filter(t => t.completed).length - 1) / (DAILY_GOAL - 1)) * 100}%`,
                }} />
              </div>
              {Array.from({ length: Math.min(DAILY_GOAL, tasks.length) }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.dot,
                    background: i < tasks.filter(t => t.completed).length ? '#C8713A' : '#FFFFFF',
                    borderColor: i < tasks.filter(t => t.completed).length ? '#C8713A' : '#DDD3C6',
                  }}
                >
                  {i < tasks.filter(t => t.completed).length && <Check size={9} color="#FFF" strokeWidth={3} />}
                </div>
              ))}
            </div>
            <div style={styles.dailyBottom}>
              <span style={styles.dailyHint}>
                {tasks.filter(t => !t.completed).length} tasks pending
              </span>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryHeader}>
            <Sparkles size={15} color="#C8713A" />
            <span style={styles.summaryLabel}>AI Summary</span>
          </div>
          <p style={styles.summaryText}>{summary}</p>
        </div>

        {/* Two-column layout */}
        <div style={styles.columns}>
          {/* Tasks */}
          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>To-Do ({pendingTasks.length})</h3>
            <div style={styles.taskList}>
              {tasks.map((task) => {
                const p = getPriorityStyle(task.priority);
                const done = task.completed || completedItems[task.id];
                return (
                  <div
                    key={task.id}
                    style={{
                      ...styles.taskCard,
                      opacity: done ? 0.45 : 1,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => navigate(`/task/${task.id}`)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#FFFBF7';
                      e.currentTarget.style.borderColor = '#DDD3C6';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#EDE5DA';
                    }}
                  >
                    <div style={styles.taskTop}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(task.id);
                        }} 
                        style={styles.checkBtn}
                      >
                        {done
                          ? <CheckCircle2 size={20} color="#5E8C61" />
                          : <Circle size={20} color="#D6CCBF" />}
                      </button>
                      <div style={styles.taskInfo}>
                        <span style={{
                          ...styles.taskTitle,
                          textDecoration: done ? 'line-through' : 'none',
                        }}>
                          {task.title}
                        </span>
                        <span style={styles.taskDue}>{task.dueDate}</span>
                      </div>
                      <span style={{
                        ...styles.badge,
                        background: p.bg,
                        color: p.color,
                      }}>
                        {p.label}
                      </span>
                    </div>
                    <p style={styles.taskDesc}>{task.description}</p>
                    {canStudy(task) && !done && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/study/${task.id}`);
                        }}
                        style={styles.studyBtn}
                      >
                        <BookOpen size={13} />
                        Study
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modules */}
          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>Study Modules</h3>
            <div style={styles.moduleList}>
              {modules.map((mod) => {
                const expanded = expandedModules[mod.id] ?? false;
                return (
                  <div key={mod.id} style={styles.moduleCard}>
                    <button
                      onClick={() => toggleModule(mod.id)}
                      style={styles.moduleHeader}
                    >
                      {expanded
                        ? <ChevronDown size={15} color="#7A6E5D" />
                        : <ChevronRight size={15} color="#7A6E5D" />}
                      <span style={styles.moduleTitle}>{mod.title}</span>
                    </button>
                    {expanded && (
                      <div style={styles.moduleItems}>
                        {mod.items.map((item) => {
                          const done = item.completed || completedItems[item.id];
                          const Icon = getTypeIcon(item.type);
                          return (
                            <div key={item.id} style={styles.moduleItem}>
                              <button onClick={() => toggleItem(item.id)} style={styles.checkBtn}>
                                {done
                                  ? <CheckCircle2 size={16} color="#5E8C61" />
                                  : <Circle size={16} color="#D6CCBF" />}
                              </button>
                              <Icon size={14} color="#B5A898" />
                              <span style={{
                                ...styles.moduleItemText,
                                textDecoration: done ? 'line-through' : 'none',
                                color: done ? '#B5A898' : '#2C2418',
                              }}>
                                {item.title}
                              </span>
                              {item.dueDate && (
                                <span style={styles.moduleItemDue}>{item.dueDate}</span>
                              )}
                              {item.points !== undefined && (
                                <span style={styles.moduleItemPts}>{item.points} pts</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
    maxWidth: 980,
  },
  courseHeader: {
    display: 'flex',
    alignItems: 'stretch',
    gap: 16,
    marginBottom: 28,
  },
  courseHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
    marginBottom: 24,
  },
  colorBar: {
    width: 4,
    borderRadius: 2,
    flexShrink: 0,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  courseCode: {
    fontSize: 11,
    fontWeight: 600,
    color: '#B5A898',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },
  courseTitle: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 28,
    fontWeight: 400,
    color: '#2C2418',
    letterSpacing: '-0.01em',
  },
  courseMeta: {
    fontSize: 14,
    color: '#7A6E5D',
  },
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
  dailyHint: {
    fontSize: 11,
    color: '#B5A898',
    fontWeight: 500,
  },
  summaryCard: {
    background: '#FFFCF8',
    border: '1px solid #EDE5DA',
    borderRadius: 18,
    padding: 22,
    marginBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  summaryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#C8713A',
    letterSpacing: '0.01em',
  },
  summaryText: {
    fontSize: 14,
    color: '#5C4F3C',
    lineHeight: 1.65,
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 28,
    alignItems: 'start',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  sectionTitle: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 16,
    fontWeight: 400,
    color: '#2C2418',
    marginBottom: 2,
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  taskCard: {
    background: '#FFFFFF',
    border: '1px solid #F3EDE5',
    borderRadius: 16,
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    transition: 'opacity 0.2s',
  },
  taskTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  checkBtn: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  taskInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: '#2C2418',
  },
  taskDue: {
    fontSize: 12,
    color: '#B5A898',
  },
  badge: {
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 100,
    flexShrink: 0,
  },
  taskDesc: {
    fontSize: 13,
    color: '#7A6E5D',
    lineHeight: 1.55,
    paddingLeft: 30,
  },
  studyBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginLeft: 30,
    padding: '7px 16px',
    background: '#FFF0E4',
    color: '#C8713A',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  moduleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  moduleCard: {
    background: '#FFFFFF',
    border: '1px solid #F3EDE5',
    borderRadius: 16,
    overflow: 'hidden',
  },
  moduleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '15px 18px',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'left' as const,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#2C2418',
  },
  moduleItems: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #F3EDE5',
  },
  moduleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '11px 18px 11px 42px',
    borderBottom: '1px solid #FAF3EB',
  },
  moduleItemText: {
    flex: 1,
    fontSize: 13,
    fontWeight: 400,
  },
  moduleItemDue: {
    fontSize: 11,
    color: '#B5A898',
    flexShrink: 0,
  },
  moduleItemPts: {
    fontSize: 11,
    color: '#7A6E5D',
    fontWeight: 600,
    flexShrink: 0,
  },
};
