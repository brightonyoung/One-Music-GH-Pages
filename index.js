const repo = require('./new_repo');
//Add this line at the top of index.js
const auth = require('./creds');
const app = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

app.command('init')
    .description('Run CLI tool')
    .action(async() => {
        //welcome message - see step3
        //prompt question - see step3

        if(answer.proceed == "Yes"){
            console.log(chalk.gray("Authenticating..."))
            const octokit = await auth.authenticate(); //add this line
        }else{
            console.log(chalk.gray("Okay, bye."))
        }
    })


app.command('init')
  .description('Run CLI tool')
  .action(async() => {
      //show welcome message
     console.log("Welcome to the GitHub initializer tool");
})

app.command('init')
    .description('Run CLI tool')
    .action(async() => {
        //welcome message - see part1
        //prompt question - see part1

        if(answer.proceed == "Yes"){
            console.log(chalk.gray("Authenticating...")) //from part1
            const octokit = await auth.authenticate(); //from part1
            //add these 2 lines below
            console.log(chalk.gray("Initializing new remote repo..."));
            const url = await repo.newRepo(octokit);
        }else{
            console.log(chalk.gray("Okay, bye."))
        }
    })


app.parse(process.argv); //get the arg (i.e. init)

//show help if no arg is passed
if (!app.args.length) {
    app.help(); 
}

clear(); //clears the terminal

//display app title
console.log(chalk.magentaBright(
figlet.textSync('CLI App Tutorial', { horizontalLayout: 'full' })));

//show welcome message
console.log("Welcome to the GitHub initializer tool.\nThis tool is built for a tutorial at "
    + chalk.yellow("https://lo-victoria.com")+ ". Do check out her blog! ^^");

const question = [{
    name: 'proceed',
    type: 'input',
    message: 'Proceed to push this project to a Github remote repo?',
    choices: ['Yes', 'No'],
    default: 'Yes'
}];

const answer = await inquirer.prompt(question);

if(answer.proceed == "Yes"){
   //proceed with Github authentication, creating the repo, etc.
    console.log(chalk.gray("Authenticating..."))
}else{
    //show exit message
    console.log(chalk.gray("Okay, bye."))
}
