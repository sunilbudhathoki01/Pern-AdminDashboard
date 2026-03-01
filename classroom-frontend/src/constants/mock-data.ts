import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    name: "Data Structures and Algorithms",
    code: "CS201",
    description:
      "Introduction to core data structures such as arrays, stacks, queues, trees, and graphs, along with algorithm analysis and problem-solving techniques.",
    department: "Computer Science",
    createdAt: "2024-01-10T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Principles of Marketing",
    code: "MKT101",
    description:
      "Covers foundational marketing concepts including branding, consumer behavior, market research, and digital marketing strategies.",
    department: "Business Administration",
    createdAt: "2024-02-15T14:30:00.000Z",
  },
  {
    id: 3,
    name: "Human Anatomy and Physiology",
    code: "BIO150",
    description:
      "Study of the structure and function of major human body systems including skeletal, muscular, circulatory, and nervous systems.",
    department: "Biological Sciences",
    createdAt: "2024-03-05T09:15:00.000Z",
  },
];
