const questions = [
    {
        question: "What is the main purpose of Bitcoin Ordinals?",
        options: ["To increase Bitcoin transaction speed", "To create a fungible token on Bitcoin", "To track and trade individual satoshis", "To enhance Bitcoin's privacy features"],
        answer: 2
    },
    {
        question: "What is the BRC-20 standard used for?",
        options: ["Non-fungible tokens on Bitcoin", "Fungible tokens on Bitcoin", "Smart contracts on Bitcoin", "Privacy transactions on Bitcoin"],
        answer: 1
    },
    {
        question: "What does WAGMI stand for?",
        options: ["Whales Are Generously Manipulating Investments", "Wise Assets, Great Monetary Investments", "We're All Gonna Make It", "We’re Actually Gambling, Maybe Ignorantly"],
        answer: 2
    },
    {
        question: "What does DMT-NAT stand for?",
        options: ["Digital Magic Tokens - Nobody Actually Trades", "Drastically Misunderstood Technology - Never Admits Truth", "Digital Matter Theory - Non-Arbitrary Tokens ", "Decentralized Monetary Transactions - Non-Arbitrary Trades"],
        answer: 2
    },
    {
        question: "Who introduced the concept of Bitcoin Ordinals?",
        options: ["Satoshi Nakamoto", "Vitalik Buterin", "Casey Rodarmor", "Gavin Andresen"],
        answer: 2
    },
    {
        question: "What was the first country to adopt Bitcoin as legal tender?",
        options: ["Argentina", "San Marino", "Luxembourg", "El Salvador"],
        answer: 3
    },
    {
        question: "What is the supply of Bitmap?",
        options: ["As much as there are Ordinal Inscriptions.", "As much as there are Bitcoin Blocks.", "As much as the Bitcoin in circulation.", "As much as the Satoshis in Circulation."],
        answer: 1
    },
    {
        question: "When was Inscription 0 created?",
        options: ["December 9th 2022", "December 14th 2022", "January 21st 2023", "February 14th 2023"],
        answer: 1
    },
    {
        question: "How many confirmations are generally recommended to consider a Bitcoin transaction final and irreversible?",
        options: ["1 confirmation", "3 confirmations", "6 confirmations", "10 confirmations"],
        answer: 2
    },
    {
        question: "Who was the first person to receive a Bitcoin transaction from Satoshi Nakamoto?",
        options: ["Hal Finney", "Nick Szabo", "Adam Back", "Wei Dai"],
        answer: 0
    },
    {
        question: "What does the term “whale” refer to in the Bitcoin world?",
        options: ["A large sea mammal with a Bitcoin logo", "A person who holds a large amount of Bitcoin", "An underwater Bitcoin mining operation", "A crypto-themed aquatic park"],
        answer: 1
    },
    {
        question: "What is the purpose of Bitmap according to the Bitmap Theory?",
        options: ["To speed up Bitcoin transactions", "To create a decentralized virtual world on the Bitcoin blockchain", "To enhance Bitcoin's privacy features", "To develop new Bitcoin-based tokens"],
        answer: 1
    },
    {
        question: "What was the text of the message that Satoshi Nakamoto embedded in the first ever Bitcoin block?",
        options: ["The Times 03/Jan/2009 Bitcoin: A Peer-to-Peer Electronic Cash System", "The Times 03/Jan/2009 If you don’t believe it or don’t get it, I don’t have the time to try to convince you, sorry.", "The Times 03/Jan/2009 The beginning of the decentralization of finance", "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."],
        answer: 3
    },
    {
        question: "Which Bitcoin feature ensures only 21 million coins will ever exist?",
        options: ["Proof of Work", "Halving events", "Mining difficulty adjustment", "Blockchain immutability"],
        answer: 1
    },
    {
        question: "What is the main function of Bitcoin's mempool?",
        options: ["To store Bitcoin permanently", "To generate new Bitcoin addresses", "To hold unconfirmed transactions", "To track Bitcoin price movements"],
        answer: 2
    },
    {
        question: "Who first managed to inscribe on a Rare Sat?",
        options: ["Mystic Pepe (@Mystic_Pepe)", "CTRL (@SeizeCTRL)", "BTC Machine (@btcordinal)", "wizardz (@wizardzBTC)"],
        answer: 1
    },
];

let currentQuestion = 0;
let score = 0;

function showQuestion(index) {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <div class="h-2">${index + 1}. ${questions[index].question}</div>
    `;

    const answerContainer = document.getElementById("answer-container");
    answerContainer.innerHTML = questions[index].options.map((option, i) => `
        <div class="answer-option" onclick="selectOption(${i})">
            <div class="radio-button" id="radio-${i}"></div>
            <div class="answer-text">${option}</div>
        </div>
    `).join('');

    updateProgressBar();
    updateButtons();
}

function selectOption(index) {
    document.querySelectorAll('.radio-button').forEach(button => {
        button.style.backgroundColor = "#ffffff";
        button.classList.remove('clicked');
        delete button.dataset.selected;
    });
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('clicked');
    });

    const selectedButton = document.querySelector(`#radio-${index}`);
    const selectedOption = selectedButton.closest('.answer-option');

    selectedButton.style.backgroundColor = "#8d5f5f";
    selectedButton.classList.add('clicked');
    selectedButton.dataset.selected = true;
    selectedButton.dataset.index = index;  // Store the selected option index

    selectedOption.classList.add('clicked'); // Add clicked class to the selected option
}

function nextQuestion() {
    const selectedOption = Array.from(document.querySelectorAll('.radio-button')).find(button => button.dataset.selected);
    if (selectedOption) {
        const selectedAnswerIndex = parseInt(selectedOption.dataset.index);
        console.log(`Selected Answer Index: ${selectedAnswerIndex}, Correct Answer Index: ${questions[currentQuestion].answer}`);
        if (selectedAnswerIndex === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    } else {
        alert("Please select an option!");
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showResults() {
    const totalQuestions = questions.length;
    const scoreLevel = Math.floor((score / totalQuestions) * 6) + 1; // Ensure scoreLevel is 6 when score is 6/6
    const scoreWord = ["Normie", "Noob", "Reply Guy", "Degen", "Ordinals OG", "You are Casey Rodarmor"][scoreLevel - 1];
    const imageUrl = `results-image${scoreLevel}.jpg`;

    console.log(`Score: ${score}, Score Level: ${scoreLevel}, Score Word: ${scoreWord}`); // Debugging log

    localStorage.setItem('scoreLevel', scoreLevel);
    localStorage.setItem('scoreWord', scoreWord);
    localStorage.setItem('imageUrl', imageUrl);

    window.location.href = 'results.html';
}

function startOver() {
    score = 0;
    currentQuestion = 0;
    window.location.href = 'index.html';
}

function shareResults() {
    const scoreLevel = localStorage.getItem('scoreLevel');
    const scoreWord = localStorage.getItem('scoreWord');

    // Define the image URLs for each score level
    const imageUrls = {
        1: "pic.twitter.com/gyAa48dizO", // Replace with the actual tweet URL for image 1
        2: "pic.twitter.com/hijf9Zx6kw", // Replace with the actual tweet URL for image 2
        3: "pic.twitter.com/Az301fVf4D", // Replace with the actual tweet URL for image 3
        4: "pic.twitter.com/vHeefX1nYR", // Replace with the actual tweet URL for image 4
        5: "pic.twitter.com/xt5VJ6cqzg", // Replace with the actual tweet URL for image 5
        6: "pic.twitter.com/MLQR8rWG9x"  // Replace with the actual tweet URL for image 6
    };

    const imageUrl = imageUrls[scoreLevel]; // Get the image URL for the current score level
    const tweetText = `I scored ${scoreLevel}/6 (${scoreWord}) on Bito's Ordinals Quiz! Open @bitoordileone and see if you are Ordinals OG!`;
    const encodedTweetText = encodeURIComponent(tweetText);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedTweetText}%20${encodeURIComponent(imageUrl)}`;
    window.open(tweetUrl, '_blank');
}

function updateButtons() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    if (currentQuestion === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "block";
    }

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finish";
        nextButton.onclick = showResults;
    } else {
        nextButton.textContent = "Next";
        nextButton.onclick = nextQuestion;
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith('results.html')) {
        const scoreLevel = localStorage.getItem('scoreLevel');
        const scoreWord = localStorage.getItem('scoreWord');
        const imageUrl = localStorage.getItem('imageUrl');
        if (scoreLevel && scoreWord && imageUrl) {
            document.getElementById('results-level').innerText = `${scoreLevel}/6`;
            document.getElementById('results-word').innerText = scoreWord;
            document.querySelector('.results-image').src = imageUrl;
        } else {
            // If for some reason the data is missing, redirect to start over
            startOver();
        }
    } else {
        showQuestion(currentQuestion);
    }
});