/* ==========================================================================
   Aura Detector — JavaScript Logic
   Created for NexaSoul Web Development Foundation Bootcamp
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. QUESTION DATA
// Array of 10 questions with 4 options each.
// Each option has text and a score value.
// --------------------------------------------------------------------------
const questions = [
    {
        question: "Q1. Your friend says 'Bro, let's go out.' You:",
        options: [
            { text: "A. Already ready 🚀", score: 10 },
            { text: "B. 'Where?' 👀", score: 7 },
            { text: "C. 'I'm broke bro 💀'", score: 5 },
            { text: "D. Leaves the message on seen 🤐", score: 2 }
        ]
    },
    {
        question: "Q2. Your assignment is due tomorrow at 11:59 PM. You:",
        options: [
            { text: "A. Finished it last week 🤓", score: 10 },
            { text: "B. Start today after lunch 💻", score: 7 },
            { text: "C. Start at 11:45 PM with adrenaline ⚡", score: 5 },
            { text: "D. 'Bro, can you send yours?' 💀", score: 2 }
        ]
    },
    {
        question: "Q3. Someone replies to your message with just 'K.' Your reaction:",
        options: [
            { text: "A. Normal, it's just a letter 👍", score: 10 },
            { text: "B. 'Are they angry?' 👀", score: 7 },
            { text: "C. Overthink everything for 3 hours 😭", score: 5 },
            { text: "D. Start a full FBI investigation 🕵️", score: 2 }
        ]
    },
    {
        question: "Q4. An 8:00 AM class/lecture is scheduled. You:",
        options: [
            { text: "A. Sit in the front row fully awake ☕", score: 10 },
            { text: "B. Reach 10 minutes late with iced coffee 🥤", score: 7 },
            { text: "C. Sleep in class with eyes open 😴", score: 5 },
            { text: "D. Turn off the alarm and continue dreaming 🛌", score: 2 }
        ]
    },
    {
        question: "Q5. You walk past a group of people laughing on campus. You think:",
        options: [
            { text: "A. They must have heard a funny joke 😂", score: 10 },
            { text: "B. Probably laughing at a meme 📲", score: 7 },
            { text: "C. 'Are they laughing at my outfit?' 😳", score: 5 },
            { text: "D. Adjust your walk style immediately 🚶‍♂️", score: 2 }
        ]
    },
    {
        question: "Q6. Your phone battery drops to 5%. You:",
        options: [
            { text: "A. Quietly pull out your power bank 🔋", score: 10 },
            { text: "B. Go hunt for a charger around campus 🔌", score: 7 },
            { text: "C. Enter extreme battery saver mode & panic ⚠️", score: 5 },
            { text: "D. Let it die, peace at last ✌️", score: 2 }
        ]
    },
    {
        question: "Q7. Someone asks you to explain a study/code concept. You:",
        options: [
            { text: "A. Explain it clearly like a professor 👨‍🏫", score: 10 },
            { text: "B. 'Bro it's easy, look at this example' 💡", score: 7 },
            { text: "C. 'Honestly, I guessed and it worked' 😅", score: 5 },
            { text: "D. 'Wait, we had a concept for that?' 😵", score: 2 }
        ]
    },
    {
        question: "Q8. How do you handle group project work?",
        options: [
            { text: "A. Carry the whole team single-handedly 🎒", score: 10 },
            { text: "B. Do your assigned part perfectly 🤝", score: 7 },
            { text: "C. Moral support and emotional backing 📢", score: 5 },
            { text: "D. Send thumbs up emojis in the group chat 👍", score: 2 }
        ]
    },
    {
        question: "Q9. You see a photo of yourself taken by a friend. You say:",
        options: [
            { text: "A. 'Damn, I look great!' 😎", score: 10 },
            { text: "B. 'Post it, it's good' 📸", score: 7 },
            { text: "C. 'Delete that right now 🔫'", score: 5 },
            { text: "D. 'Who is that creature?' 👹", score: 2 }
        ]
    },
    {
        question: "Q10. The teacher says 'I'm picking a random student to answer.' You:",
        options: [
            { text: "A. Make eye contact to show dominance 🗿", score: 10 },
            { text: "B. Smile and stay calm 😁", score: 7 },
            { text: "C. Suddenly look very deeply into your notebook 📖", score: 5 },
            { text: "D. Drop your pen on purpose to hide under the desk 🖊️", score: 2 }
        ]
    }
];

// --------------------------------------------------------------------------
// 2. STATE VARIABLES
// Track the state of the quiz as the user answers questions.
// --------------------------------------------------------------------------
let currentQuestionIndex = 0;
let totalScore = 0;
let selectedOptionScore = null;

// --------------------------------------------------------------------------
// 3. DOM ELEMENTS
// Selecting HTML elements to interact with them in JS.
// --------------------------------------------------------------------------
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

const heroSection = document.getElementById("hero");
const aboutSection = document.getElementById("about");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

const questionProgressText = document.getElementById("question-progress");
const progressBarFill = document.getElementById("progress-bar-fill");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const warningMsg = document.getElementById("warning-msg");

const finalScoreElement = document.getElementById("final-score");
const auraLevelTitle = document.getElementById("aura-level-title");
const auraLevelDesc = document.getElementById("aura-level-desc");

// --------------------------------------------------------------------------
// 4. EVENT LISTENERS
// --------------------------------------------------------------------------
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNextQuestion);
retryBtn.addEventListener("click", resetQuiz);

// --------------------------------------------------------------------------
// 5. FUNCTIONS
// --------------------------------------------------------------------------

// Function: Start the Quiz
function startQuiz() {
    // Hide Hero and About sections
    heroSection.style.display = "none";
    aboutSection.style.display = "none";

    // Show Quiz section
    quizContainer.style.display = "block";

    // Reset state variables
    currentQuestionIndex = 0;
    totalScore = 0;

    // Load first question
    loadQuestion();
}

// Function: Load Question & Options
function loadQuestion() {
    // Reset selected option for current question
    selectedOptionScore = null;
    warningMsg.style.display = "none";

    const currentQuestion = questions[currentQuestionIndex];

    // Update Progress Indicator
    questionProgressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarFill.style.width = `${progressPercent}%`;

    // Update Question Title
    questionText.textContent = currentQuestion.question;

    // Clear previous option buttons
    optionsContainer.innerHTML = "";

    // Generate option buttons dynamically
    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option.text;

        // When user clicks an option button
        button.addEventListener("click", () => {
            selectOption(button, option.score);
        });

        optionsContainer.appendChild(button);
    });

    // Update Next button label on last question
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Submit & Reveal Aura 🔮";
    } else {
        nextBtn.textContent = "Next Question →";
    }
}

// Function: Handle Option Selection
function selectOption(selectedBtn, score) {
    // Save selected score
    selectedOptionScore = score;
    warningMsg.style.display = "none";

    // Remove 'selected' class from all buttons
    const allOptions = optionsContainer.querySelectorAll(".option-btn");
    allOptions.forEach((btn) => btn.classList.remove("selected"));

    // Add 'selected' class to clicked button
    selectedBtn.classList.add("selected");
}

// Function: Handle Next Question / Submit
function handleNextQuestion() {
    // Check if an option was selected
    if (selectedOptionScore === null) {
        warningMsg.style.display = "block";
        return;
    }

    // Add score to total
    totalScore += selectedOptionScore;

    // Move to next question or show results
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Function: Calculate Aura Level and Display Results
function showResults() {
    // Hide Quiz container
    quizContainer.style.display = "none";

    // Show Result container
    resultContainer.style.display = "block";

    // Display final score
    finalScoreElement.textContent = totalScore;

    // Determine Aura Level based on score
    let levelTitle = "";
    let levelDesc = "";

    if (totalScore <= 39) {
        levelTitle = "😶 NPC ENERGY";
        levelDesc = "You're living on default settings bro! Time to make some main character choices and get your aura up.";
    } else if (totalScore <= 59) {
        levelTitle = "😐 AVERAGE AURA";
        levelDesc = "Not bad, not crazy. You're holding down the fort, but there's a main character waiting to break free.";
    } else if (totalScore <= 69) {
        levelTitle = "😎 COOL AURA";
        levelDesc = "Chilled out, relaxed, and smooth. You don't try too hard, yet you keep your cool under pressure.";
    } else if (totalScore <= 79) {
        levelTitle = "🔥 PRO AURA";
        levelDesc = "You know what you're doing. You walk into situations with confidence and somehow make it work. That's some serious aura!";
    } else if (totalScore <= 89) {
        levelTitle = "🗿 SAVAGE AURA";
        levelDesc = "Unshakable mindset. You handle campus chaos like a walk in the park. Respect maxed out!";
    } else {
        levelTitle = "👑 UNLIMITED AURA";
        levelDesc = "Absolute Main Character energy! The room shifts when you walk in. You possess unmatched aura!";
    }

    auraLevelTitle.textContent = levelTitle;
    auraLevelDesc.textContent = levelDesc;
}

// Function: Reset Quiz
function resetQuiz() {
    // Hide Result container
    resultContainer.style.display = "none";

    // Show Hero and About sections
    heroSection.style.display = "block";
    aboutSection.style.display = "block";

    // Reset variables
    currentQuestionIndex = 0;
    totalScore = 0;
    selectedOptionScore = null;
}

/* =====================================
   PREMIUM CURSOR EFFECT
===================================== */

const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
});


/* =====================================
   3D CARD TILT
===================================== */

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;

        card.style.transition = "transform .08s linear";
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        card.style.transition =
            "transform .5s ease";
    });

});


/* =====================================
   BUTTON MAGNETIC EFFECT
===================================== */

document.querySelectorAll(".btn").forEach((button) => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * .08}px, ${y * .08}px) scale(1.02)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "";
    });

});

/* =========================================
   PREMIUM CURSOR EFFECT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const glow = document.createElement("div");
    glow.className = "cursor-glow";

    const dot = document.createElement("div");
    dot.className = "cursor-dot";

    document.body.appendChild(glow);
    document.body.appendChild(dot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";

        createParticle(mouseX, mouseY);
    });

    function animateCursor() {

        glowX += (mouseX - glowX) * 0.09;
        glowY += (mouseY - glowY) * 0.09;

        glow.style.left = glowX + "px";
        glow.style.top = glowY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    /* tiny aura particles */

    let particleCounter = 0;

    function createParticle(x, y) {

        particleCounter++;

        if (particleCounter % 4 !== 0) return;

        const particle = document.createElement("span");

        particle.style.position = "fixed";
        particle.style.left = x + (Math.random() * 16 - 8) + "px";
        particle.style.top = y + (Math.random() * 16 - 8) + "px";
        particle.style.width = Math.random() * 4 + 2 + "px";
        particle.style.height = particle.style.width;
        particle.style.borderRadius = "50%";
        particle.style.background =
            Math.random() > 0.5 ? "#7358ff" : "#36b8ff";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "9998";
        particle.style.opacity = "0.65";
        particle.style.boxShadow = "0 0 12px rgba(118,87,255,.4)";
        particle.style.transition =
            "transform .7s ease, opacity .7s ease";

        document.body.appendChild(particle);

        requestAnimationFrame(() => {

            particle.style.transform =
                `translate(${Math.random() * 30 - 15}px,
                 ${Math.random() * 30 - 15}px) scale(0)`;

            particle.style.opacity = "0";
        });

        setTimeout(() => {
            particle.remove();
        }, 750);
    }

    /* =====================================
       MAGNETIC BUTTON EFFECT
    ===================================== */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });

    /* =====================================
       3D CARD TILT
    ===================================== */

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            if (window.innerWidth < 700) return;

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -3;

            const rotateY =
                ((x / rect.width) - 0.5) * 3;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-2px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

});