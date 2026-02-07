export interface Course {
  id: string;
  name: string;
  code: string;
  color: string;
  professor: string;
  schedule: string;
  progress: number;
  nextClass: string;
}

export interface Task {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  dueDate: string;
  type: 'assignment' | 'quiz' | 'reading' | 'project';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  description: string;
}

export interface Module {
  id: string;
  title: string;
  items: ModuleItem[];
}

export interface ModuleItem {
  id: string;
  title: string;
  type: 'lecture' | 'reading' | 'assignment' | 'quiz' | 'discussion';
  dueDate?: string;
  completed: boolean;
  points?: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export const courses: Course[] = [
  {
    id: '1',
    name: 'Data Structures & Algorithms',
    code: 'CS 201',
    color: '#2563EB',
    professor: 'Dr. Sarah Chen',
    schedule: 'MWF 10:00–10:50 AM',
    progress: 68,
    nextClass: 'Tomorrow, 10:00 AM',
  },
  {
    id: '2',
    name: 'Linear Algebra',
    code: 'MATH 270',
    color: '#7C3AED',
    professor: 'Dr. James Park',
    schedule: 'TTh 1:00–2:15 PM',
    progress: 55,
    nextClass: 'Thursday, 1:00 PM',
  },
  {
    id: '3',
    name: 'Intro to Psychology',
    code: 'PSYCH 101',
    color: '#EA580C',
    professor: 'Dr. Maya Johnson',
    schedule: 'MWF 2:00–2:50 PM',
    progress: 72,
    nextClass: 'Monday, 2:00 PM',
  },
  {
    id: '4',
    name: 'Technical Writing',
    code: 'ENG 210',
    color: '#16A34A',
    professor: 'Prof. Alex Rivera',
    schedule: 'TTh 11:00–12:15 PM',
    progress: 80,
    nextClass: 'Tuesday, 11:00 AM',
  },
];

export const tasksByCourse: Record<string, Task[]> = {
  '1': [
    { id: 't1', title: 'Implement Binary Search Tree', course: 'Data Structures & Algorithms', courseCode: 'CS 201', dueDate: 'Today', type: 'assignment', priority: 'high', completed: false, description: 'Implement a BST with insert, delete, and search operations.' },
    { id: 't2', title: 'Read Ch. 7 – Graph Theory', course: 'Data Structures & Algorithms', courseCode: 'CS 201', dueDate: 'Tomorrow', type: 'reading', priority: 'medium', completed: false, description: 'Read chapter 7 and take notes on BFS and DFS.' },
    { id: 't3', title: 'Quiz 4 – Sorting Algorithms', course: 'Data Structures & Algorithms', courseCode: 'CS 201', dueDate: 'Friday', type: 'quiz', priority: 'high', completed: false, description: 'Quiz covering merge sort, quicksort, and heapsort.' },
    { id: 't4', title: 'Lab 5 – Hash Tables', course: 'Data Structures & Algorithms', courseCode: 'CS 201', dueDate: 'Next Monday', type: 'assignment', priority: 'medium', completed: true, description: 'Implement a hash table with chaining.' },
  ],
  '2': [
    { id: 't5', title: 'Problem Set 6 – Eigenvalues', course: 'Linear Algebra', courseCode: 'MATH 270', dueDate: 'Wednesday', type: 'assignment', priority: 'high', completed: false, description: 'Solve problems 1–15 on eigenvalues and eigenvectors.' },
    { id: 't6', title: 'Read Ch. 5 – Orthogonality', course: 'Linear Algebra', courseCode: 'MATH 270', dueDate: 'Thursday', type: 'reading', priority: 'low', completed: false, description: 'Review orthogonal projections and Gram-Schmidt.' },
    { id: 't7', title: 'Midterm 2 Prep', course: 'Linear Algebra', courseCode: 'MATH 270', dueDate: 'Next Friday', type: 'quiz', priority: 'high', completed: false, description: 'Review chapters 3–5 for the second midterm.' },
  ],
  '3': [
    { id: 't8', title: 'Research Paper Outline', course: 'Intro to Psychology', courseCode: 'PSYCH 101', dueDate: 'Thursday', type: 'project', priority: 'medium', completed: false, description: 'Submit a 1-page outline for the research paper on cognitive biases.' },
    { id: 't9', title: 'Discussion Post – Memory', course: 'Intro to Psychology', courseCode: 'PSYCH 101', dueDate: 'Friday', type: 'assignment', priority: 'low', completed: false, description: 'Write a 300-word discussion post on short-term vs long-term memory.' },
  ],
  '4': [
    { id: 't10', title: 'Peer Review Draft', course: 'Technical Writing', courseCode: 'ENG 210', dueDate: 'Tuesday', type: 'assignment', priority: 'medium', completed: false, description: 'Complete a peer review of your partner\'s technical report draft.' },
    { id: 't11', title: 'Final Report Draft', course: 'Technical Writing', courseCode: 'ENG 210', dueDate: 'Next Wednesday', type: 'project', priority: 'high', completed: false, description: 'Submit the full first draft of your technical report.' },
  ],
};

export const modulesByCourse: Record<string, Module[]> = {
  '1': [
    {
      id: 'm1', title: 'Module 7 – Trees',
      items: [
        { id: 'mi1', title: 'Lecture: Binary Trees', type: 'lecture', completed: true },
        { id: 'mi2', title: 'Lecture: BST Operations', type: 'lecture', completed: true },
        { id: 'mi3', title: 'Lab: Implement BST', type: 'assignment', dueDate: 'Today', completed: false, points: 50 },
        { id: 'mi4', title: 'Reading: Ch. 7', type: 'reading', dueDate: 'Tomorrow', completed: false },
      ],
    },
    {
      id: 'm2', title: 'Module 8 – Graphs',
      items: [
        { id: 'mi5', title: 'Lecture: Graph Representations', type: 'lecture', completed: false },
        { id: 'mi6', title: 'Lecture: BFS & DFS', type: 'lecture', completed: false },
        { id: 'mi7', title: 'Quiz 4 – Sorting Review', type: 'quiz', dueDate: 'Friday', completed: false, points: 30 },
      ],
    },
  ],
  '2': [
    {
      id: 'm3', title: 'Module 5 – Eigenvalues & Eigenvectors',
      items: [
        { id: 'mi8', title: 'Lecture: Introduction to Eigenvalues', type: 'lecture', completed: true },
        { id: 'mi9', title: 'Lecture: Diagonalization', type: 'lecture', completed: false },
        { id: 'mi10', title: 'Problem Set 6', type: 'assignment', dueDate: 'Wednesday', completed: false, points: 40 },
      ],
    },
  ],
  '3': [
    {
      id: 'm4', title: 'Module 6 – Memory & Cognition',
      items: [
        { id: 'mi11', title: 'Lecture: Short-term Memory', type: 'lecture', completed: true },
        { id: 'mi12', title: 'Discussion: Memory', type: 'discussion', dueDate: 'Friday', completed: false, points: 10 },
        { id: 'mi13', title: 'Research Paper Outline', type: 'assignment', dueDate: 'Thursday', completed: false, points: 25 },
      ],
    },
  ],
  '4': [
    {
      id: 'm5', title: 'Module 4 – Technical Reports',
      items: [
        { id: 'mi14', title: 'Lecture: Report Structure', type: 'lecture', completed: true },
        { id: 'mi15', title: 'Peer Review', type: 'assignment', dueDate: 'Tuesday', completed: false, points: 20 },
        { id: 'mi16', title: 'Final Report Draft', type: 'assignment', dueDate: 'Next Wednesday', completed: false, points: 100 },
      ],
    },
  ],
};

export const flashcardSets: Record<string, Flashcard[]> = {
  't3': [
    { id: 'f1', front: 'What is the time complexity of merge sort?', back: 'O(n log n) in all cases — best, average, and worst.' },
    { id: 'f2', front: 'What is the worst-case time complexity of quicksort?', back: 'O(n²), which occurs when the pivot is always the smallest or largest element.' },
    { id: 'f3', front: 'Is heapsort stable?', back: 'No. Heapsort is not a stable sorting algorithm.' },
    { id: 'f4', front: 'What is the space complexity of merge sort?', back: 'O(n) — it requires additional space for merging.' },
    { id: 'f5', front: 'What data structure does heapsort use?', back: 'A binary heap (max-heap or min-heap).' },
    { id: 'f6', front: 'Describe the divide-and-conquer approach in merge sort.', back: 'Split the array in half recursively until single elements, then merge sorted halves back together.' },
  ],
  't5': [
    { id: 'f7', front: 'What is an eigenvalue?', back: 'A scalar λ such that Av = λv for some nonzero vector v.' },
    { id: 'f8', front: 'What is an eigenvector?', back: 'A nonzero vector v that satisfies Av = λv for eigenvalue λ.' },
    { id: 'f9', front: 'How do you find eigenvalues?', back: 'Solve det(A − λI) = 0, the characteristic equation.' },
    { id: 'f10', front: 'What does it mean for a matrix to be diagonalizable?', back: 'It can be written as A = PDP⁻¹ where D is diagonal and P contains eigenvectors.' },
  ],
  't7': [
    { id: 'f11', front: 'What is the rank of a matrix?', back: 'The dimension of the column space (number of linearly independent columns).' },
    { id: 'f12', front: 'What is the null space?', back: 'The set of all vectors x such that Ax = 0.' },
    { id: 'f13', front: 'State the Rank-Nullity Theorem.', back: 'rank(A) + nullity(A) = number of columns of A.' },
  ],
};

export const courseSummaries: Record<string, string> = {
  '1': "You're in Week 7 of Data Structures. Current focus is on tree structures and upcoming graph theory. You have a BST implementation due today and a sorting quiz on Friday. Stay on top of the graph reading — it builds directly on trees.",
  '2': "Linear Algebra is entering eigenvalue territory. Problem Set 6 is the priority this week, and the second midterm is approaching. Focus on the connection between eigenvalues and diagonalization.",
  '3': "Psychology is moving into memory and cognition. Your research paper outline is due Thursday — start narrowing your topic on cognitive biases. The discussion post is a quick win for Friday.",
  '4': "Technical Writing is in the final stretch. Peer review is due Tuesday, and your full report draft is the big deliverable coming up. Use the peer review to improve your own draft.",
};

export const onboardingQuestions = [
  {
    id: 'major',
    question: "What's your major?",
    placeholder: 'e.g. Computer Science',
    type: 'text' as const,
  },
  {
    id: 'year',
    question: "What year are you?",
    options: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'],
    type: 'select' as const,
  },
  {
    id: 'courseCount',
    question: "How many courses are you taking this semester?",
    options: ['1–2', '3–4', '5–6', '7+'],
    type: 'select' as const,
  },
  {
    id: 'priorities',
    question: "What matters most to you?",
    options: ['Staying organized', 'Improving grades', 'Reducing stress', 'Time management'],
    type: 'multiselect' as const,
  },
  {
    id: 'style',
    question: "How do you prefer to study?",
    options: ['Flashcards', 'Summaries', 'Practice problems', 'Group study'],
    type: 'multiselect' as const,
  },
];
