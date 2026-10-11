// Participant welcome and local personalization. Details stay in this browser only.
const participantStorageKey = "digitalSaathiParticipant";
let participant = null;
try {
  participant = JSON.parse(
    localStorage.getItem(participantStorageKey) || "null",
  );
} catch (_) {}
const participantGate = document.getElementById("participantGate");
const participantForm = document.getElementById("participantForm");
function applyParticipant(person) {
  participant = person;
  document.body.classList.remove("onboarding-active");
  participantGate.hidden = true;
  const welcome = document.getElementById("personalWelcome");
  welcome.hidden = false;
  welcome.textContent = `Hey, ${person.name}! Welcome to Digital Saathi 👋`;
  try {
    localStorage.setItem(participantStorageKey, JSON.stringify(person));
  } catch (_) {}
}
function updatePersonalizedModuleText() {
  const name = participant && participant.name ? participant.name : "there";
  const label = document.getElementById("guideLabel");
  if (label && currentModule)
    label.textContent = `${moduleContent[currentModule].label} · LET'S LEARN, ${name.toUpperCase()}`;
}
if (
  participant &&
  participant.name &&
  participant.age &&
  participant.education
) {
  applyParticipant(participant);
} else {
  document.body.classList.add("onboarding-active");
  participantGate.hidden = false;
}
participantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document
    .getElementById("participantName")
    .value.trim()
    .replace(/\s+/g, " ");
  const age = Number(document.getElementById("participantAge").value);
  const education = document.getElementById("participantEducation").value;
  if (!name || !Number.isInteger(age) || age < 5 || age > 120 || !education)
    return;
  applyParticipant({ name, age, education });
  if (typeof currentModule !== "undefined") renderModule(currentModule);
});

const moduleContent = {
  digilocker: {
    label: "MODULE 01 / DIGITAL DOCUMENTS",
    title: "Your documents, available digitally.",
    description:
      "DigiLocker is a platform for accessing and storing digital documents issued by participating organisations. Issued documents can be accessed through your account.",
    steps: [
      [
        "Open the official portal",
        "Use the DigiLocker link in Resources. Check that the address is digilocker.gov.in before entering any information.",
      ],
      [
        "Understand what DigiLocker does",
        "DigiLocker helps people access digital documents issued by participating organisations. Availability depends on the issuer and the document.",
      ],
      [
        "Sign in or create an account",
        "Follow the current instructions on the official service. Use your own account and never share your password or OTP with another person.",
      ],
      [
        "Explore the dashboard",
        "After signing in on the official site, look for the available sections for issued documents, uploaded files and services. Labels may change as the portal is updated.",
      ],
      [
        "Find an issued document",
        "Choose the relevant issuer or document category and follow the on-screen search steps. Not every document is available for every user.",
      ],
      [
        "Check the document details",
        "Review the name, issuer and other visible details. If something looks incorrect, use the official issuer's correction or support process.",
      ],
      [
        "Share or present documents carefully",
        "Use only the sharing or verification options provided by DigiLocker when needed. Check who is receiving access and avoid sharing links publicly.",
      ],
      [
        "Sign out on shared devices",
        "If you used a public or shared computer, sign out when finished and close the browser window. Never save credentials on a device you do not control.",
      ],
    ],
    official: "https://www.digilocker.gov.in/",
  },
  aadhaar: {
    label: "MODULE 02 / IDENTITY SERVICES",
    title: "Understand Aadhaar services with confidence.",
    description:
      "UIDAI provides official information and online services related to Aadhaar. The available options may depend on the service, verification method and current rules.",
    steps: [
      [
        "Visit the UIDAI website",
        "Start from uidai.gov.in, linked in Resources. Check the web address carefully before following a service link.",
      ],
      [
        "Identify the service you need",
        "Aadhaar-related tasks can include downloading e-Aadhaar, checking update guidance or learning about authentication. Choose the option that matches your need.",
      ],
      [
        "Check whether the task is online",
        "Read the current instructions to see whether the service can be completed online or requires an authorised Aadhaar centre.",
      ],
      [
        "Prepare only the required information",
        "Use the official checklist for the selected service. This learning portal does not need your Aadhaar number, document copies or OTP.",
      ],
      [
        "Use secure verification",
        "Complete verification only on the genuine official service and only when you initiated the action. Never tell an OTP to a caller or agent.",
      ],
      [
        "Review details before submitting",
        "Check the information you enter on the official portal for mistakes. Follow the portal's instructions if a correction is needed.",
      ],
      [
        "Keep the acknowledgement safely",
        "If the official process gives you a receipt or request number, store it privately so you can check status later.",
      ],
      [
        "Know when to get help",
        "For unclear instructions or a failed request, use contact details published by UIDAI or visit an authorised centre. Avoid unofficial agents promising guaranteed results.",
      ],
    ],
    official: "https://uidai.gov.in/",
  },
  pan: {
    label: "MODULE 03 / TAX IDENTITY",
    title: "Get familiar with PAN-related services.",
    description:
      "A Permanent Account Number (PAN) is used for tax-related identification in India. Official portals provide guidance for PAN applications, corrections and related services.",
    steps: [
      [
        "Understand what PAN is for",
        "PAN means Permanent Account Number. It is used for tax-related identification and certain financial or official processes in India.",
      ],
      [
        "Choose a verified provider",
        "Start from the Income Tax e-Filing portal or an authorised PAN service provider linked in Resources. Avoid sponsored or forwarded links you cannot verify.",
      ],
      [
        "Identify the right service",
        "Check whether you need a new PAN application, a correction, a status check or another PAN-related service. Read the service description before proceeding.",
      ],
      [
        "Check eligibility and requirements",
        "Review the current eligibility rules, required documents and accepted submission methods on the provider's official website.",
      ],
      [
        "Review fees before applying",
        "Charges and processes can change. Confirm the current fee and payment instructions on the official provider's page before paying.",
      ],
      [
        "Enter information carefully on the official portal",
        "Check spelling and other details before submitting. This educational website does not collect or process PAN applications.",
      ],
      [
        "Keep acknowledgement details private",
        "If you receive an application or acknowledgement number, store it securely for tracking. Do not post it publicly or send it to unknown contacts.",
      ],
      [
        "Track status and seek official help",
        "Use the provider's official tracking feature. If something goes wrong, return to the official site for support rather than trusting unsolicited calls or messages.",
      ],
    ],
    official: "https://www.incometax.gov.in/iec/foportal/",
  },
};

const quizQuestions = [
  {
    q: "What is the main purpose of DigiLocker?",
    a: [
      "To access eligible digital documents",
      "To create social media accounts",
      "To replace every physical identity check",
      "To provide private email hosting",
    ],
    correct: 0,
    explanation:
      "DigiLocker helps users access digital documents issued by participating organisations.",
  },
  {
    q: "Which organisation is responsible for Aadhaar in India?",
    a: [
      "Reserve Bank of India",
      "Unique Identification Authority of India (UIDAI)",
      "Election Commission of India",
      "National Payments Corporation of India",
    ],
    correct: 1,
    explanation: "UIDAI is the statutory authority responsible for Aadhaar.",
  },
  {
    q: "What should you do with an OTP received during an online service process?",
    a: [
      "Share it with anyone claiming to be support",
      "Post it in a public chat for help",
      "Keep it private and enter it only in the verified process you initiated",
      "Save it as your permanent password",
    ],
    correct: 2,
    explanation:
      "An OTP is sensitive authentication information. Never share it with another person.",
  },
  {
    q: "What does PAN stand for in Indian tax services?",
    a: [
      "Personal Access Number",
      "Permanent Account Number",
      "Public Aadhaar Network",
      "Personal Application Name",
    ],
    correct: 1,
    explanation: "PAN stands for Permanent Account Number.",
  },
  {
    q: "Where should you check the latest service requirements and fees?",
    a: [
      "An unknown message link",
      "A random social media comment",
      "An unofficial site that promises instant approval",
      "The relevant official portal or authorised provider",
    ],
    correct: 3,
    explanation:
      "Official portals and authorised providers are the right place to verify current requirements and fees.",
  },
];

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
document.querySelectorAll(".main-nav a").forEach((link) =>
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }),
);
document.getElementById("year").textContent = new Date().getFullYear();

let currentModule = "digilocker";
let currentStepIndex = 0;
const completed = new Set();
try {
  const saved = JSON.parse(
    localStorage.getItem("digitalSaathiCompleted") || "[]",
  );
  saved
    .filter((key) => moduleContent[key])
    .forEach((key) => completed.add(key));
} catch (_) {}

function renderModule(key) {
  currentModule = key;
  currentStepIndex = 0;
  const data = moduleContent[key];
  document.getElementById("guideLabel").textContent = data.label;
  updatePersonalizedModuleText();
  document.getElementById("guideTitle").textContent =
    participant ? `Hey, ${participant.name}! ${data.title}` : data.title;
  document.getElementById("guideDescription").textContent = data.description;
  renderTrainingStep();
  document.querySelectorAll(".module-tab").forEach((tab) => {
    const active = tab.dataset.tab === key;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  document.getElementById("markComplete").innerHTML =
    completed.has(key) ? "Module completed ✓" : (
      "Mark module as complete <span>✓</span>"
    );
  document
    .getElementById("markComplete")
    .classList.toggle("btn-secondary", completed.has(key));
  document
    .getElementById("markComplete")
    .classList.toggle("btn-primary", !completed.has(key));
}
function renderTrainingStep() {
  const steps = moduleContent[currentModule].steps;
  const step = steps[currentStepIndex];
  document.getElementById("guideSteps").innerHTML =
    `<li><span>${String(currentStepIndex + 1).padStart(2, "0")}</span><div><strong>${step[0]}</strong><p>${step[1]}</p></div></li>`;
  document.getElementById("stepCounter").textContent =
    `STEP ${currentStepIndex + 1} OF ${steps.length}`;
  document.getElementById("prevStep").disabled = currentStepIndex === 0;
  document.getElementById("nextStep").disabled =
    currentStepIndex === steps.length - 1;
  document.getElementById("stepDots").innerHTML = steps
    .map(
      (_, i) =>
        `<span class="step-dot${i === currentStepIndex ? " active" : ""}"></span>`,
    )
    .join("");
}
function updateProgress() {
  const count = completed.size;
  const percent = Math.round((count / 3) * 100);
  document.getElementById("progressCount").textContent =
    `${count} of 3 modules`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressBar").style.width = `${percent}%`;
  try {
    localStorage.setItem(
      "digitalSaathiCompleted",
      JSON.stringify([...completed]),
    );
  } catch (_) {}
}
document
  .querySelectorAll("[data-tab]")
  .forEach((tab) =>
    tab.addEventListener("click", () => renderModule(tab.dataset.tab)),
  );
document.getElementById("prevStep").addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderTrainingStep();
  }
});
document.getElementById("nextStep").addEventListener("click", () => {
  if (currentStepIndex < moduleContent[currentModule].steps.length - 1) {
    currentStepIndex++;
    renderTrainingStep();
  }
});
document.querySelectorAll("[data-open-module]").forEach((button) =>
  button.addEventListener("click", () => {
    renderModule(button.dataset.openModule);
    document
      .getElementById("moduleDetails")
      .scrollIntoView({ behavior: "smooth" });
  }),
);
document.getElementById("markComplete").addEventListener("click", () => {
  if (completed.has(currentModule)) completed.delete(currentModule);
  else completed.add(currentModule);
  renderModule(currentModule);
  updateProgress();
});
renderModule(currentModule);
updateProgress();

// Knowledge quiz: answers are checked locally in the browser; nothing is submitted.
let questionIndex = 0;
let score = 0;
let answered = false;
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const nextQuestion = document.getElementById("nextQuestion");
const quizFeedback = document.getElementById("quizFeedback");
const questionCounter = document.getElementById("questionCounter");
const quizProgressBar = document.getElementById("quizProgressBar");

function renderQuestion() {
  const item = quizQuestions[questionIndex];
  answered = false;
  questionCounter.textContent = `QUESTION ${questionIndex + 1} OF ${quizQuestions.length}`;
  quizProgressBar.style.width = `${(questionIndex / quizQuestions.length) * 100}%`;
  questionText.textContent = item.q;
  quizFeedback.textContent = "";
  nextQuestion.disabled = true;
  nextQuestion.textContent =
    questionIndex === quizQuestions.length - 1 ?
      "See results →"
    : "Next question →";
  answerList.innerHTML = item.a
    .map(
      (answer, index) =>
        `<button class="answer-option" type="button" data-answer="${index}"><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${answer}</span></button>`,
    )
    .join("");
  answerList
    .querySelectorAll(".answer-option")
    .forEach((button) =>
      button.addEventListener("click", () =>
        chooseAnswer(Number(button.dataset.answer)),
      ),
    );
}
function chooseAnswer(selected) {
  if (answered) return;
  answered = true;
  const item = quizQuestions[questionIndex];
  const options = [...answerList.querySelectorAll(".answer-option")];
  options.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    else if (index === selected) button.classList.add("wrong");
  });
  if (selected === item.correct) {
    score++;
    quizFeedback.textContent = "That's right! " + item.explanation;
  } else {
    quizFeedback.textContent = item.explanation;
  }
  nextQuestion.disabled = false;
  quizProgressBar.style.width = `${((questionIndex + 1) / quizQuestions.length) * 100}%`;
}
nextQuestion.addEventListener("click", () => {
  if (!answered) return;
  questionIndex++;
  if (questionIndex >= quizQuestions.length) showResults();
  else renderQuestion();
});
function showResults() {
  document.getElementById("quizContent").classList.add("hidden");
  document.getElementById("quizResult").classList.remove("hidden");
  document.getElementById("questionCounter").textContent = "COMPLETED";
  quizProgressBar.style.width = "100%";
  document.getElementById("finalScore").textContent =
    `${score}/${quizQuestions.length}`;
  document.getElementById("resultTitle").textContent =
    score === quizQuestions.length ?
      `Excellent work${participant ? ", " + participant.name : ""}!`
    : score >= 3 ? `Good progress${participant ? ", " + participant.name : ""}!`
    : `Keep learning${participant ? ", " + participant.name : ""}!`;
  document.getElementById("resultText").textContent =
    score === quizQuestions.length ?
      "You answered every question correctly."
    : "Review the training modules and try again to strengthen your digital-service knowledge.";
}
document.getElementById("restartQuiz").addEventListener("click", () => {
  questionIndex = 0;
  score = 0;
  document.getElementById("quizContent").classList.remove("hidden");
  document.getElementById("quizResult").classList.add("hidden");
  renderQuestion();
});
renderQuestion();

// Keep the first FAQ open only initially; native details elements handle interaction accessibly.
