const fs = require("fs");
const os = require("os");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.readFile("db.json", "utf-8", (err, data) => {
  if (err) return console.log(err);
  loopQuiz(JSON.parse(data)).then((count) =>
    (rl.close(),console.log(`You got ${count} correct answers!`))
  );
});

async function loopQuiz(questionAnswerObj) {
  let counter = 0;
  for (let i = 0; i < questionAnswerObj.length; i++) {
    await runQuestions(
      `${questionAnswerObj[i].question}${os.EOL}${questionAnswerObj[i].content
        .map((o, i) => `${i}:${o}`)
        .join(os.EOL)}`,
      questionAnswerObj[i]
    )
      .then((res) => (console.log(res), res))
      .then((res) => res === "Correct" && counter++)
      .catch((rej) => console.log(rej));
  }
  return counter;
}

function runQuestions(questionAnswers, question) {
  return new Promise((resolve, reject) => {
    rl.question(questionAnswers, function (answer) {
        if (answer == question.correct) {
            resolve("Correct");
        } else resolve("Incorrect");
    });
  });
}
