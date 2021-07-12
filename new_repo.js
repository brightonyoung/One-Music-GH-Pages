git.push(https://github.com/brightonyoung/one-music-gh-pages.git, 'gh-pages');

const path = require('path');
const inquirer = require('inquirer');

async function newRepo(octokit){
    //create questions array, ask for name, description and visibility
    const questions = [
        {
            name: 'name',
            type: 'input',
            message: 'Enter new repo name.',
            default: path.basename(process.cwd()), //set default to basename
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter a valid input.';
                }
            }
        },
        {
            name: 'description',
            type: 'input',
            message: 'Enter new repo description (optional).',
            default: null
        },
        {
            name: 'visibility',
            type: 'input',
            message: 'Set repo to public or private?',
            choices: ['public', 'private'],
            default: 'private'
        }
    ];
    //prompt the questions
    const answers = await inquirer.prompt(questions);

    //create the data argument object from user's answers
    const data = {
        name: answers.name,
        description: answers.description,
        private: (answers.visibility === 'private')
    };

    try {
        //create the remote repo and return the clone_url
        const response = await octokit.repos.createForAuthenticatedUser(data)
        return response.data.clone_url;  
    } catch (error) {
        console.log(error)
    }
}

//final step, export function to use in index.js
module.exports = {newRepo}

