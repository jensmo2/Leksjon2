window.onload =initialize;
//Array with comleted Todos
const toDoCards = [{title:"Title", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", author:"Author"},
{title:"Title", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", author:"Author"},
{title:"Title", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", author:"Author"}];

let completedList = [{title:"Title", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", author: "Author author", date: "01.01.2020"}
,{title:"Title", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", author: "Author author", date: "10.01.2018"},
{title:"Title", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", author: "Author author", date: "10.03.2019"}];

////////////////////////MOST RECENT CARD METHODS///////////////////////////////

function createNewCardElements (card, id){    
    const cardsWrapper = document.getElementById("toDoCards");
    let thisCard = 
        "<article class='latestToDo' id='card" + id +  "'>" +
        "<h4>" + card.title + "</h4>" +
        "<p>" + card.description + "</p>" +
        "<button class='deleteButton'  id='d" + id + "'" + " onclick='delClick(this)'" + ">" + "Delete" + "</button>" +
        "<button class='completeButton' id='c" + id + "'" + " onclick='complClick(this)" + "'" + ">" + "Complete" + "</button>" +
        "</article>"
    cardsWrapper.innerHTML += thisCard;
}

////////////////////////////////////////////////////////////////////////////////////////////

function updateCards(){
    document.getElementById("toDoCards").innerHTML = "";
    for(i = 0; i<toDoCards.length; i++){
        createNewCardElements(toDoCards[i],i)
    }
}

function delClick (btn) {
    let elem = btn.id[btn.id.length-1];
    toDoCards.splice(elem,1);
    updateCards();
}

function complClick(btn){
    let elem = btn.id[btn.id.length-1]; 
    let card = toDoCards[elem];
    let todaysDate = new Date().toLocaleDateString();
    let completed = {title: card.title, description:card.description, author: card.author, date:todaysDate };
    completedList.unshift(completed);
    
    toDoCards.splice(elem,1);
    updateCards();
    updCompleted();
}

//////////////////////////////////////////////////////////////////////////////////////////////

function createCompletedElements(card){
    let completedWrapper = document.getElementById("completedTodoCardsWrapper");

    let completedElements =
     "<li>" +
     "<h4>"+card.title+"</h4>" +
     "<h4>" +card.author + "</h4>" +
     "<h4>" + card.description + "</h4>" +
     "<h4>" + card.date + "</h4>" +
     "</li>";

    completedWrapper.innerHTML += completedElements;
}

function updCompleted(){
    completedWrapper.innerHTML="";
    for(i = 0; i < completedList.length; i++){
        createCompletedElements(completedList[i]);
    }
}

////////////////////initialize///////////////////////

function initialize(){

    //FORM VARIBLES
    const addTodoButton = document.getElementById("toDoButton");// 
    const formWrap = document.getElementById("formWrapper");// 
    const exitFormButton = document.getElementById("exitFormButton");//
    const form = document.getElementById("form");//
    const inptTitle = document.getElementById("title");//
    const inptDescription = document.getElementById("description");//
    const descriptionLabel = document.getElementById("descriptionLabel");//
    const inputAuthor = document.getElementById("author");//


///////////////////////////////////////FORM METHODS///////////////////////////////////////
    //addTodoButton is clickd form is displayed
    addTodoButton.onclick = () =>{
        formWrap.style.display="block";
    }

    exitFormButton.onclick = () =>{
        hideForm();
    }

    window.onclick = (event) =>{
        if(event.target == formWrap)
        formWrap.style.display = "none";
    }

    //adding a eventlistener
    form.addEventListener("submit",(event) =>{
      
        event.preventDefault();
        //creating cards
        let toDo = {title: inptTitle.value,
            description: inptDescription.value,
            author:inputAuthor.value};
        if(toDoCards.length < 3){
            toDoCards.unshift(toDo);

            
        }
        else{  
            toDoCards.splice(2,1); 
            toDoCards.unshift(toDo);
        }

        
        document.getElementById("cards").innerHTML ="";
        updateCards();
        form.reset();   
        hideForm();     
    });
    
    inptDescription.addEventListener("input",updateCharLeft);
    function updateCharLeft(event){
        descriptionLabel.innerHTML="Description (" + (30-event.target.value.length) + " char left)"
    }

    //Method to hide a form
    function hideForm(){
        formWrap.style.display = "none";
    }


    //////////////////////////////COMPLETEDLIST METHOD/////////////////////////////
const filterCheckbox = document.getElementById("checkbox");

//sorting the list
filterCheckbox.addEventListener("change",(event) => {
    if(event.target.checked){
        completedList.sort((a,b)=>{
            dato1 = a.date;
            dato2 = b.date;
            if(dato1<dato2){
                return 1;
            }
            if(dato1>dato2){
                return -1;  
            }
            else{
                return 0;
            }
        });
        updCompleted();
    }
    else{
        completedList.sort(sortOnTitle);
        updCompleted();
    }
});
//method to sort an elemts on title
function sortOnTitle(i,j){

    let titleA = i.title.toUpperCase();
    let titleB = j.title.toUpperCase();

    if(titleA<titleB){
        return -1;
    }
    if(titleA>titleB){
        return 1;
    }
    else {
        return 0;
    }
}

    updateCards();
    updCompleted();
}