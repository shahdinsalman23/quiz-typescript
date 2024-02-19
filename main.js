import chalk from 'chalk';
import inquirer from 'inquirer';
const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchquiz = await fetch(data);
    let res = await fetchquiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    /// for username
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "What's your name? "
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.green.bold("Correct"));
        }
        else {
            console.log(`Correct answer is ${chalk.red.bold(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold(name.fname)}, your score is ${chalk.red.bold(score)} out of ${chalk.red.bold('5')}`);
};
startQuiz();
