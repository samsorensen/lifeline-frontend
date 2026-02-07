import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { tasksByCourse } from '../data/mock';

export default function StudyGuide() {
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
              <FileText size={24} color="#5E8C61" />
            </div>
            <div>
              <h1 style={styles.title}>Study Guide</h1>
              <p style={styles.subtitle}>{task.title}</p>
            </div>
          </div>

          <div style={styles.aiTag}>
            <Sparkles size={14} color="#C8713A" />
            <span>AI-Generated Content</span>
          </div>

          {/* Study Guide Content */}
          <div style={styles.content}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Overview</h2>
              <p style={styles.text}>{task.description}</p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Key Concepts</h2>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <strong>Core Concept 1:</strong> Understanding the fundamental principles
                </li>
                <li style={styles.listItem}>
                  <strong>Core Concept 2:</strong> Applying theoretical knowledge to practical scenarios
                </li>
                <li style={styles.listItem}>
                  <strong>Core Concept 3:</strong> Analyzing complex relationships and dependencies
                </li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Study Tips</h2>
              <div style={styles.tipBox}>
                <p style={styles.text}>
                  💡 Focus on understanding the core concepts rather than memorizing facts
                </p>
                <p style={styles.text}>
                  📝 Create your own examples to reinforce learning
                </p>
                <p style={styles.text}>
                  🔄 Review regularly using spaced repetition
                </p>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Practice Questions</h2>
              <div style={styles.questionBox}>
                <p style={styles.question}>1. What are the main objectives of this assignment?</p>
                <p style={styles.question}>2. How do the concepts relate to previous material?</p>
                <p style={styles.question}>3. What are potential pitfalls to avoid?</p>
              </div>
            </section>
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
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: '#F2F7F0',
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
  aiTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: '#FFF5ED',
    border: '1px solid #FFE4CC',
    borderRadius: 100,
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 600,
    color: '#C8713A',
    marginBottom: 32,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#2C2418',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#5C4F3C',
    lineHeight: 1.7,
    margin: 0,
  },
  list: {
    margin: 0,
    paddingLeft: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  listItem: {
    fontSize: 15,
    color: '#5C4F3C',
    lineHeight: 1.7,
  },
  tipBox: {
    background: '#FFFCF8',
    border: '1px solid #EDE5DA',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  questionBox: {
    background: '#F2F7F0',
    border: '1px solid #D8E6DA',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  question: {
    fontSize: 15,
    color: '#2C2418',
    fontWeight: 500,
    margin: 0,
  },
};
