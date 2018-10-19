// Question Answer 
// var cat = new Answer('Answer text') 
// cat.votes+=1
// etc.


    function answer(text) { 
        this.text = text; //Name of quiz. 
        this.votes = 0;
    }

module.exports=answer;
