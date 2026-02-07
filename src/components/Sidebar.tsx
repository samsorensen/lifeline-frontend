import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  LayoutGrid,
  User,
  Settings,
  LogOut,
  BookOpen,
} from 'lucide-react';
import { courses } from '../data/mock';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/courses' },
  ];

  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logo} onClick={() => navigate('/courses')}>
        <Sparkles size={18} color="#C8713A" />
        <span style={styles.logoText}>Lifeline</span>
      </div>

      {/* Main nav */}
      <nav style={styles.nav}>
        {navItems.map((item) => {
          const active = path === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.navItem,
                ...(active ? styles.navItemActive : {}),
              }}
            >
              <item.icon size={17} color={active ? '#C8713A' : '#7A6E5D'} />
              <span style={{ color: active ? '#C8713A' : '#7A6E5D', fontWeight: active ? 600 : 500 }}>{item.label}</span>
            </button>
          );
        })}

        {/* Course links */}
        <div style={styles.sectionLabel}>Courses</div>
        {courses.map((c) => {
          const active = path === `/course/${c.id}`;
          return (
            <button
              key={c.id}
              onClick={() => navigate(`/course/${c.id}`)}
              style={{
                ...styles.navItem,
                ...(active ? styles.navItemActive : {}),
              }}
            >
              <BookOpen size={15} color={active ? c.color : '#B5A898'} />
              <span style={{
                color: active ? '#2C2418' : '#7A6E5D',
                fontWeight: active ? 600 : 400,
                fontSize: 13,
              }}>
                {c.code}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div style={styles.bottom}>
        <button style={styles.navItem} onClick={() => {}}>
          <User size={17} color="#7A6E5D" />
          <span style={{ color: '#7A6E5D' }}>Profile</span>
        </button>
        <button style={styles.navItem} onClick={() => {}}>
          <Settings size={17} color="#7A6E5D" />
          <span style={{ color: '#7A6E5D' }}>Settings</span>
        </button>
        <button style={styles.navItem} onClick={() => navigate('/')}>
          <LogOut size={17} color="#7A6E5D" />
          <span style={{ color: '#7A6E5D' }}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 230,
    minHeight: '100vh',
    background: '#FFFCF8',
    borderRight: '1px solid #EDE5DA',
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 14px',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 14px 24px',
    cursor: 'pointer',
  },
  logoText: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 20,
    fontWeight: 400,
    color: '#2C2418',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#B5A898',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    padding: '20px 14px 8px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.15s',
    width: '100%',
    textAlign: 'left' as const,
  },
  navItemActive: {
    background: '#FFF0E4',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderTop: '1px solid #F3EDE5',
    paddingTop: 14,
  },
};
