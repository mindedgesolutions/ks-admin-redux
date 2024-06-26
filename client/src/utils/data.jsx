import { nanoid } from "nanoid";

export const notifications = [
  {
    title: "Test title 1",
    name: "Payal Karmakar",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic animi odit asperiores! Perspiciatis, voluptatibus vero repudiandae sit tempora laudantium incidunt officiis animi laboriosam. Assumenda quasi nisi quidem? Natus, nisi aut.",
    date: "2023-01-12 15:30:56",
    avatar: true,
  },
  {
    title: "Test title 2",
    name: "Arko Banerjee",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic animi odit asperiores! Perspiciatis, voluptatibus vero repudiandae sit tempora laudantium incidunt officiis animi laboriosam. Assumenda quasi nisi quidem? Natus, nisi aut.",
    date: "2023-01-12 15:30:56",
    avatar: true,
  },
  {
    title: "Test title 3",
    name: "Jyoti Bag",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic animi odit asperiores! Perspiciatis, voluptatibus vero repudiandae sit tempora laudantium incidunt officiis animi laboriosam. Assumenda quasi nisi quidem? Natus, nisi aut.",
    date: "2023-01-12 15:30:56",
    avatar: false,
  },
  {
    title: "Test title 4",
    name: "Moumita Chatterjee",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic animi odit asperiores! Perspiciatis, voluptatibus vero repudiandae sit tempora laudantium incidunt officiis animi laboriosam. Assumenda quasi nisi quidem? Natus, nisi aut.",
    date: "2023-01-12 15:30:56",
    avatar: false,
  },
];

export const reports = [
  {
    id: 1,
    title: "Duare Sarkar VII Reports",
    children: [
      {
        title: "Application status report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ds/application-status/7",
      },
      {
        title: "Static cumulative 5pm report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ds/static/7",
      },
      {
        title: "DEO report for DS-VII",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ds/deo/7",
      },
    ],
  },
  {
    id: 2,
    title: "Duare Sarkar VIII Reports",
    children: [
      {
        title: "Static cumulative 5pm report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ds/static/8",
      },
      {
        title: "DEO report for DS-VIII",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ds/deo/8",
      },
    ],
  },
  {
    id: 3,
    title: "BSK Reports",
    children: [
      {
        title: "Application status report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/bsk/application-status",
      },
    ],
  },
  {
    id: 4,
    title: "Karmasathi Reports",
    children: [
      {
        title: "Origination report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ks/origination",
      },
      {
        title: "Application status report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ks/application-status",
      },
    ],
  },
  {
    id: 5,
    title: "Special Drive Reports",
    children: [
      // {
      //   title: "Static cumulative report at 5pm - (Annexure II)",
      //   description:
      //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
      //   url: "/admin/reports/sd/static",
      // },
      {
        title: "Special Drive : Total Digitised",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/sd/digitised",
      },
      {
        title: "DEO report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/sd/deo",
      },
    ],
  },
  {
    id: 6,
    title: "Analysis",
    children: [
      {
        title: "Social category",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/analysis/social-category",
      },
      {
        title: "Religion",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/analysis/religion",
      },
      {
        title: "Gender",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/analysis/gender",
      },
      {
        title: "Rural-Urban",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/analysis/rural-urban",
      },
      {
        title: "Destination",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/analysis/destination",
      },
    ],
  },
  {
    id: 7,
    title: "SSJS Reports",
    children: [
      {
        title: "Application Status Report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ssjs/application-status",
      },
      {
        title: "DEO Report",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde ratione numquam",
        url: "/admin/reports/ssjs/deo",
      },
    ],
  },
];

export const applicationMenus = [
  { id: nanoid(), title: `Personal`, pathname: "/user/personal-info" },
  { id: nanoid(), title: `Worksite`, pathname: "/user/worksite-info" },
  { id: nanoid(), title: `Agency / Employer`, pathname: "/user/agency-info" },
  { id: nanoid(), title: `Bank & Nominee`, pathname: "/user/nominee-info" },
  { id: nanoid(), title: `Family details`, pathname: "/user/family-info" },
  { id: nanoid(), title: `Documents`, pathname: "/user/documents" },
];

export const genders = [
  { id: nanoid(), value: "M", text: "Male" },
  { id: nanoid(), value: "F", text: "Female" },
  { id: nanoid(), value: "O", text: "Other" },
];

export const casteList = [
  { id: nanoid(), value: "ur", text: "UR" },
  { id: nanoid(), value: "sc", text: "SC" },
  { id: nanoid(), value: "st", text: "ST" },
  { id: nanoid(), value: "obc", text: "OBC" },
  { id: nanoid(), value: "other", text: "Other" },
];

export const religions = [
  { id: nanoid(), value: 1, text: "Buddhism" },
  { id: nanoid(), value: 2, text: "Christianity" },
  { id: nanoid(), value: 3, text: "Hinduism" },
  { id: nanoid(), value: 4, text: "Islam" },
  { id: nanoid(), value: 5, text: "Jainism" },
  { id: nanoid(), value: 6, text: "Judaism" },
  { id: nanoid(), value: 7, text: "Sikhism" },
  { id: nanoid(), value: 8, text: "Zoroastrianism" },
  { id: nanoid(), value: 9, text: "Other" },
];

export const blockType = [
  { id: nanoid(), value: "M", text: "Municipality" },
  { id: nanoid(), value: "C", text: "Corporation" },
  { id: nanoid(), value: "B", text: "Block" },
];

export const qualificationList = [
  { id: nanoid(), value: "UM", text: "Under Matric (8th Pass)" },
  { id: nanoid(), value: "SS", text: "Matriculation/ 10th Pass" },
  { id: nanoid(), value: "HS", text: "Higher Secondary" },
  { id: nanoid(), value: "G", text: "Graduation" },
  { id: nanoid(), value: "PG", text: "Post Graduation" },
];

export const techSkills = [
  { id: nanoid(), value: "yes", text: "Yes" },
  { id: nanoid(), value: "no", text: "No" },
];

export const countries = [
  { id: nanoid(), value: 1, text: "India" },
  { id: nanoid(), value: 2, text: "Other" },
  { id: nanoid(), value: 3, text: "Nepal" },
  { id: nanoid(), value: 4, text: "Bhutan" },
];

export const workTypes = [
  { id: nanoid(), value: "Self-employed", text: "Self Employed" },
  { id: nanoid(), value: "Agency", text: "Engaged Through Agent/Others" },
  { id: nanoid(), value: "Without-agency", text: "Engaged Without Agent" },
];

export const cardTypes = [
  { id: nanoid(), value: "AAY", text: "AAY" },
  { id: nanoid(), value: "THH", text: "THH" },
  { id: nanoid(), value: "STHH", text: "SPHH" },
  { id: nanoid(), value: "RKSY-I", text: "RKSY-I" },
  { id: nanoid(), value: "RKSY-II", text: "RKSY-II" },
];

export const jobs = [
  { id: nanoid(), value: 1, text: "Construction" },
  { id: nanoid(), value: 2, text: "Transport" },
  { id: nanoid(), value: 3, text: "Healthcare" },
  { id: nanoid(), value: 4, text: "Garments" },
  { id: nanoid(), value: 5, text: "Stone Cutting & Polishing" },
  { id: nanoid(), value: 6, text: "Jewellery" },
  { id: nanoid(), value: 7, text: "Hospitality" },
  { id: nanoid(), value: 8, text: "Manufacturing" },
  { id: nanoid(), value: 9, text: "Self-employed" },
  { id: nanoid(), value: 10, text: "Miscellaneous" },
  { id: nanoid(), value: 11, text: "Agriculture" },
  { id: nanoid(), value: 12, text: "Mason" },
  { id: nanoid(), value: 13, text: "Carpenter" },
  { id: nanoid(), value: 14, text: "Electrician" },
  { id: nanoid(), value: 15, text: "Plumber" },
];

export const engageTypes = [
  { id: nanoid(), value: "Self-employed", text: "Self employed" },
  { id: nanoid(), value: "Agency", text: "Engaged through agent/others" },
  { id: nanoid(), value: "Without-agency", text: "Engaged without agent" },
];

export const relationships = [
  { id: nanoid(), value: "Father", text: "Father", isActive: true },
  { id: nanoid(), value: "Mother", text: "Mother", isActive: true },
  { id: nanoid(), value: "Daughter", text: "Daughter", isActive: true },
  { id: nanoid(), value: "Son", text: "Son", isActive: true },
  { id: nanoid(), value: "Brother", text: "Brother", isActive: true },
  { id: nanoid(), value: "Sister", text: "Sister", isActive: true },
  { id: nanoid(), value: "Grandfather", text: "Grandfather", isActive: true },
  { id: nanoid(), value: "Grandmother", text: "Grandmother", isActive: true },
  { id: nanoid(), value: "Grandson", text: "Grandson", isActive: true },
  { id: nanoid(), value: "Uncle", text: "Uncle", isActive: true },
  { id: nanoid(), value: "Aunt", text: "Aunt", isActive: true },
  { id: nanoid(), value: "Nephew", text: "Nephew", isActive: true },
  { id: nanoid(), value: "Niece", text: "Niece", isActive: true },
  {
    id: nanoid(),
    value: "Sister-in-law",
    text: "Sister-in-law",
    isActive: true,
  },
  {
    id: nanoid(),
    value: "Brother-in-law",
    text: "Brother-in-law",
    isActive: true,
  },
  {
    id: nanoid(),
    value: "Mother-in-law",
    text: "Mother-in-law",
    isActive: true,
  },
  {
    id: nanoid(),
    value: "Father-in-law",
    text: "Father-in-law",
    isActive: true,
  },
];

export const blockLabel = (value) => {
  let label = "";
  switch (value) {
    case "M":
      label = "Municipality";
      break;
    case "C":
      label = "Corporation";
      break;
    case "B":
      label = "Block";
      break;
  }
  return label;
};

export const migrationTypes = [
  { id: nanoid(), value: 0, label: "All" },
  { id: nanoid(), value: 1, label: "Inside India" },
  { id: nanoid(), value: 2, label: "Outside India" },
];

export const reportNames = [
  { id: nanoid(), name: "ds application status" },
  { id: nanoid(), name: "ds migration status" },
];

export const originationTypes = [
  { id: nanoid(), value: "A", text: "App" },
  { id: nanoid(), value: "W", text: "Website" },
  { id: nanoid(), value: "ALL", text: "All" },
];

export const originationNames = [
  { id: nanoid(), value: "BSK", text: "Bangla Sahayata Kendra" },
  { id: nanoid(), value: "DS", text: "Duare Sarkar" },
  { id: nanoid(), value: "SD", text: "Special Drive" },
  { id: nanoid(), value: "ALL", text: "All" },
];

export const applicationStatus = [
  { id: nanoid(), value: "P", text: "Provisional" },
  { id: nanoid(), value: "A", text: "Submitted" },
  { id: nanoid(), value: "B", text: "Back for Correction/ Inprocess" },
  { id: nanoid(), value: "R", text: "Rejected" },
  { id: nanoid(), value: "C", text: "Approved" },
  { id: nanoid(), value: "ALL", text: "All" },
];

// Add application access to local storage starts ------
export const addAccessToLocalStorage = (access) => {
  localStorage.setItem("access", JSON.stringify(access));
};

export const removeAccessFromLocalStorage = () => {
  localStorage.removeItem("access");
};

export const getAccessFromLocalStorage = () => {
  const result = localStorage.getItem("access");
  const access = result ? JSON.parse(result) : null;
  return access;
};
// Add application access to local storage ends ------
