// script.js

$(function() {
    // 1. Створіть три набори слів для різних рівнів
    const wordSets = {
        easy: [
            { en: "light", uk: "світло" },
            { en: "sun", uk: "сонце" },
            { en: "water", uk: "вода" },
            { en: "apple", uk: "яблуко" },
            { en: "time", uk: "час" },
            { en: "music", uk: "музика" },
            { en: "run", uk: "бігти" },
            { en: "walk", uk: "гуляти" },
            { en: "book", uk: "книга" },
            { en: "chair", uk: "стілець" }
        ],
        medium: [
            { en: "always", uk: "завжди" },
            { en: "however", uk: "проте" },
            { en: "believe", uk: "вірити" },
            { en: "knowledge", uk: "знання" },
            { en: "system", uk: "система" },
            { en: "development", uk: "розвиток" },
            { en: "important", uk: "важливий" },
            { en: "process", uk: "процес" },
            { en: "create", uk: "створювати" },
            { en: "modify", uk: "змінювати" }
        ],
        hard: [
            { en: "ubiquitous", uk: "повсюдний" },
            { en: "ephemeral", uk: "ефемерний" },
            { en: "juxtaposition", uk: "зіставлення" },
            { en: "paradigm", uk: "парадигма" },
            { en: "ameliorate", uk: "покращувати" },
            { en: "serendipity", uk: "інтуїтивна удача" },
            { en: "obfuscate", uk: "заплутувати" },
            { en: "concise", uk: "стислий" },
            { en: "resilience", uk: "стійкість" },
            { en: "articulate", uk: "чітко висловлювати" }
        ]
    };
    
  
    let currentWords = []; 
    let current = 0;
    let correct = 0;
    let incorrect = 0;
    let order = [];

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    
    function startGame() {
        
        const difficulty = $("input[name='difficulty']:checked").val();
        currentWords = [...wordSets[difficulty]]; 
        current = 0;
        correct = 0;
        incorrect = 0;
        $("#correct").text(0);
        $("#incorrect").text(0);
        
        order = shuffle(currentWords);
        nextCard();

        $("#answer").prop('disabled', false).focus();
        $("#card").off("click").on("click", checkAnswer); 
    }

    function nextCard() {
        
        if (current >= currentWords.length) {
            showResult();
            return;
        }
        $("#card").text(order[current].en);
        $("#progress").text((current + 1) + "/" + currentWords.length);
        $("#answer").val("");
    }

    function showResult() {
    
        $("#resultText").text(`Ваш рівень: ${(correct / currentWords.length * 100).toFixed(0)}%`);
        $("#resultModal").fadeIn();
        $("#answer").prop('disabled', true); 
    }
    
    function checkAnswer() {

        const userAnswer = $("#answer").val().trim().toLowerCase();
        const correctAnswer = order[current]?.uk?.toLowerCase();

        if (!userAnswer) {
            alert("Будь ласка, введіть переклад!");
            return;
        }

        if (userAnswer === correctAnswer) {
            correct++;
            $("#correct").text(correct);
        } else {
            incorrect++;
            $("#incorrect").text(incorrect);
        }

        current++;
        nextCard();
    }

    $("#card").on("click", function() {
        if (currentWords.length === 0) {
            startGame();
        } else {
            checkAnswer();
        }
    });

    $("#restart").on("click", function() {
        $("#resultModal").fadeOut();
        startGame(); 
    });
    
    $("input[name='difficulty']").on("change", function() {
        if (current > 0) {
            if (confirm("Зміна рівня складності призведе до початку нової гри. Продовжити?")) {
                startGame();
            } else {

            }
        }
    });


    $("#resultModal").hide();
    
    $("#card").text("Натисніть тут або введіть переклад, щоб розпочати!");
    $("#progress").text("0/10");
    $("#answer").prop('disabled', true);
    
    currentWords = [...wordSets[$("input[name='difficulty']:checked").val()]];
    $("#card").off("click").on("click", function() {
        startGame();
    });

});