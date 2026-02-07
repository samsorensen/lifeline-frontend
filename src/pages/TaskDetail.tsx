import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Gamepad2, GraduationCap, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { tasksByCourse } from '../data/mock';

export default function TaskDetail() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const allTasks = Object.values(tasksByCourse).flat();
  const task = allTasks.find((t) => t.id === taskId);

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

  const priorityStyle = {
    high: { bg: '#FDF0ED', color: '#C0513F', label: 'High Priority' },
    medium: { bg: '#FFF5ED', color: '#C8713A', label: 'Medium Priority' },
    low: { bg: '#F3EDE5', color: '#7A6E5D', label: 'Low Priority' },
  }[task.priority] || { bg: '#F3EDE5', color: '#7A6E5D', label: 'Low Priority' };

  const learningTools = [
    {
      id: 'flashcards',
      name: 'Flashcards',
      description: 'Review key concepts with interactive flashcards',
      icon: BookOpen,
      color: '#C8713A',
      bgColor: '#FFF5ED',
      available: true,
      route: `/study/${task.id}`,
    },
    {
      id: 'study-guide',
      name: 'Study Guide',
      description: 'AI-generated comprehensive study guide',
      icon: FileText,
      color: '#5E8C61',
      bgColor: '#F2F7F0',
      available: true,
      route: `/study-guide/${task.id}`,
    },
    {
      id: 'quiz',
      name: 'Practice Quiz',
      description: 'Test your knowledge with practice questions',
      icon: GraduationCap,
      color: '#6B5B95',
      bgColor: '#F5F3F8',
      available: true,
      route: `/quiz/${task.id}`,
    },
    {
      id: 'game',
      name: 'Learning Game',
      description: 'Gamified learning experience',
      icon: Gamepad2,
      color: '#D4A574',
      bgColor: '#FFF8F0',
      available: true,
      route: `/learning-game/${task.id}`,
    },
  ];

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeft size={18} color="#7A6E5D" />
          <span>Back</span>
        </button>

        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>{task.title}</h1>
              <p style={styles.meta}>
                {task.courseCode} • {task.dueDate} • {task.type}
              </p>
            </div>
            <span
              style={{
                ...styles.badge,
                background: priorityStyle.bg,
                color: priorityStyle.color,
              }}
            >
              {priorityStyle.label}
            </span>
          </div>

          {/* Description */}
          <div style={styles.descriptionSection}>
            <p style={styles.description}>{task.description}</p>
          </div>

          <div style={styles.divider} />

          {/* Learning Tools */}
          <div style={styles.section}>
            <div style={styles.toolsHeader}>
              <Sparkles size={18} color="#C8713A" />
              <h2 style={styles.sectionTitle}>AI-Powered Learning Tools</h2>
            </div>
            <p style={styles.toolsSubtitle}>
              Choose how you want to study this material
            </p>
            <div style={styles.toolsGrid}>
              {learningTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => navigate(tool.route)}
                    style={{
                      ...styles.toolCard,
                      opacity: tool.available ? 1 : 0.5,
                      cursor: tool.available ? 'pointer' : 'not-allowed',
                    }}
                    disabled={!tool.available}
                    onMouseOver={(e) => {
                      if (tool.available) {
                        e.currentTarget.style.background = '#FFF8F0';
                        e.currentTarget.style.borderColor = '#DDD3C6';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#FFFCF8';
                      e.currentTarget.style.borderColor = '#EDE5DA';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      style={{
                        ...styles.toolIcon,
                        background: tool.bgColor,
                      }}
                    >
                      <Icon size={24} color={tool.color} />
                    </div>
                    <div style={styles.toolContent}>
                      <h3 style={styles.toolName}>{tool.name}</h3>
                      <p style={styles.toolDescription}>{tool.description}</p>
                    </div>
                  </button>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
    marginBottom: 24,
  },
  title: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 32,
    fontWeight: 400,
    color: '#2C2418',
    marginBottom: 8,
    letterSpacing: '-0.01em',
  },
  meta: {
    fontSize: 14,
    color: '#7A6E5D',
  },
  badge: {
    fontSize: 12,
    fontWeight: 600,
    padding: '8px 16px',
    borderRadius: 100,
    whiteSpace: 'nowrap' as const,
  },
  divider: {
    height: 1,
    background: '#EDE5DA',
    marginBottom: 32,
    marginTop: 24,
  },
  descriptionSection: {
    marginBottom: 0,
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#2C2418',
    margin: 0,
    letterSpacing: '0.01em',
  },
  description: {
    fontSize: 15,
    color: '#5C4F3C',
    lineHeight: 1.7,
    whiteSpace: 'pre-wrap' as const,
  },
  toolsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  toolsSubtitle: {
    fontSize: 14,
    color: '#7A6E5D',
    marginBottom: 24,
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
  },
  toolCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    background: '#FFFCF8',
    border: '1px solid #EDE5DA',
    borderRadius: 14,
    padding: 20,
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  toolContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  toolName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#2C2418',
    margin: 0,
  },
  toolDescription: {
    fontSize: 13,
    color: '#7A6E5D',
    lineHeight: 1.5,
    margin: 0,
  },
};
