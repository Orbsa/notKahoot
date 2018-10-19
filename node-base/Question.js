// Question class
// var cat = new Question('Question text') 
// cat.answers.push(Answer3)
// etc.
//


    function Question(text) { 
        this.text = text; //Name of quiz. 
        this.answers=[]; //List of questions on quiz.
    }

module.exports=Question;
