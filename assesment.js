/* 
Order of JS file:
start page DOM elements 
classes
Created Objects
listeners
*/
var a = Math.sqrt(-1);

const buttonStartAssesment = document.getElementById("button-assesment"),
  blockQuestionaire = document.getElementById("artical-questionaire");

class startPage {
  constructor(articalID, header, introduction, buttonID, questionaire) {
    this.articalID = articalID;
    this.header = header;
    this.introduction = introduction;
    this.buttonID = buttonID;
    this.questionaire = questionaire;

    this.buttonName = "Start here";
  }

  addStartPage() {
    const header1 = document.createElement("h1");
    header1.innerText = this.header;

    const paragraph1 = document.createElement("p");
    paragraph1.innerText = this.introduction;

    const button = document.createElement("button");
    button.setAttribute("id", this.buttonID);
    button.innerText = this.buttonName;

    document.getElementById(this.articalID).appendChild(header1);
    document.getElementById(this.articalID).appendChild(paragraph1);
    document.getElementById(this.articalID).appendChild(button);
    button.addEventListener("click", () =>
      this.questionaire.injectQuestionaire(this.buttonID)
    );
  }
}

class questionaire {
  constructor(positionID, elemClass) {
    this.positionID = positionID;
    this.elemClass = elemClass;

    this.header;
    this.introduction;
    this.questionList = [];
    this.showButtonID;
  }
  pushQ(q) {
    //ask if i really need this.
    this.questionList.push(q);
  }
  setButtonID(t) {
    this.showButtonID = t;
  }
  injectQuestionaire(buttonID) {
    if (this.showButtonID) {
      document.getElementById(buttonID).setAttribute("display", "none");
      document.getElementById(buttonID).disabled = true;
    }
    for (var i = 0; i < this.questionList.length; i++) {
      var qFieldset = document.createElement("fieldset");
      qFieldset.setAttribute("class", this.questionList[i].fieldSetClass);
      qFieldset.setAttribute(
        "id",
        "fieldset" + this.questionList[i].fieldSetID
      );
      blockQuestionaire.appendChild(qFieldset);

      this.questionList[i].elemsQList().forEach((q) => {
        qFieldset.appendChild(q);
      });
    }
  }
}
class basicQ {
  constructor(fieldSetID, question, answer) {
    this.fieldSetID = fieldSetID;
    this.question = question;
    this.answer = answer;
    this.fieldSetClass = "fieldset--basic-q";

    this.checkButton = document.createElement("button");
    this.checkButton.id = "button-Q--" + this.fieldSetID;
    this.checkButton.innerText = "check if correct";
  }
  get elemsQList() {
    return this.labelCreate();
  }
  labelCreate() {
    var qElement = [];
    var newLabel = document.createElement("label");
    newLabel.setAttribute("class", "label__text-question");
    newLabel.innerText = this.question;
    qElement.push(newLabel);
    return qElement;
  }
}
class textQ extends basicQ {
  constructor(fieldSetID, question, answer, placeHolder) {
    super(fieldSetID, question, answer);

    this.placeHolder = placeHolder;
    this.input;
    this.fieldSetClass = "fieldset__text-question";
  }
  //overridin basicQ
  get elemsQList() {
    return this.elemsCreate;
  }
  elemsCreate() {
    var qElements = this.labelCreate();
    this.input = document.createElement("input");
    this.input.placeholder = this.placeHolder;
    this.input.class = "input__text-question";
    this.input.id = "input__text-question" + this.fieldSetID;

    this.checkButton.id = "button-Q--" + this.fieldSetID;

    this.checkButton.addEventListener("click", () =>
      this.inputCheck(this.fieldSetID, this.answer)
    );

    qElements.push(this.input);
    qElements.push(this.checkButton);

    return qElements;
  }
  inputCheck(fieldSetID, answer) {
    var inputID = "input__text-question" + fieldSetID;
    document.getElementById("button-Q--" + fieldSetID).disabled = true;
    document.getElementById(inputID).disabled = true;

    if (document.getElementById(inputID).value == answer) {
      var grade = document.createElement("div");
      grade.innerText = "Wew that is correct!";
      document.getElementById("fieldset" + fieldSetID).appendChild(grade);
      document.getElementById("fieldset" + fieldSetID).className =
        "input-text__true";
    } else {
      var grade = document.createElement("div");
      grade.innerText = "Sorry not the right answer";
      document.getElementById("fieldset" + fieldSetID).appendChild(grade);
      document.getElementById("fieldset" + fieldSetID).className =
        "input-text__false";
    }
  }
}
class radioQ extends basicQ {
  constructor(fieldSetID, question, answer, name, radioOptions) {
    super(fieldSetID, question, answer);
    this.name = name;
    this.radioOptions = radioOptions;
    this.fieldSetClass = "fieldset__radio-question";
  }
  get elemsQList() {
    return this.elemsCreate;
  }
  elemsCreate() {
    var qElements = this.labelCreate();

    this.checkButton.addEventListener("click", () =>
      this.inputCheck(this.fieldSetID, this.answer)
    );

    this.radioOptions.forEach((elem) => {
      newlabel = null;
      var newlabel = document.createElement("label");
      newlabel.innerText = elem;

      var newInput = document.createElement("input");
      newInput.type = "radio";
      newInput.class = "input__radio-question";
      newInput.name = this.name;
      newInput.value = elem;

      qElements.push(newlabel);
      qElements.push(newInput);
      qElements.push(this.checkButton);
    });
    return qElements;
  }
  inputCheck(fieldSetID, answer) {
    var inputName = "q" + fieldSetID;

    document.getElementById("button-Q--" + fieldSetID).disabled = true;
    document.getElementsByName(inputName).disabled = true;

    var answerTF = false;
    document.getElementsByName(inputName).forEach((thisInput) => {
      thisInput.disabled = true;
      if (thisInput.checked && thisInput.value == answer) {
        answerTF = true;
      }
    });

    if (answerTF) {
      var grade = document.createElement("div");
      grade.innerText = "Wew that is correct!";
      document.getElementById("fieldset" + fieldSetID).appendChild(grade);
      document.getElementById("fieldset" + fieldSetID).className =
        "input-radio__true";
    } else {
      var grade = document.createElement("div");
      grade.innerText = "Sorry not the right answer";
      document.getElementById("fieldset" + fieldSetID).appendChild(grade);
      document.getElementById("fieldset" + fieldSetID).className =
        "input-radio__false";
    }
  }
}

class checkBoxQ extends basicQ {
  constructor(fieldSetID, question, answer, name, checkBoxOptions) {
    super(fieldSetID, question, answer);
    this.name = name;
    this.checkBoxOptions = checkBoxOptions;
    this.fieldSetClass = "fieldset__radio-question";
  }
  get elemsQList() {
    return this.elemsCreate;
  }
  elemsCreate() {
    var qElements = this.labelCreate();

    this.checkButton.innerText = "check if correct";
    this.checkButton.addEventListener("click", () =>
      this.inputCheck(this.fieldSetID, this.answer)
    );
    this.checkBoxOptions.forEach((elem) => {
      newlabel = null;
      var newlabel = document.createElement("label");
      newlabel.name = this.name;
      newlabel.innerText = elem;

      var newInput = document.createElement("input");
      newInput.setAttribute("type", "checkbox");
      newInput.class = "input__checkbox-question";
      newInput.name = this.name;
      newInput.value = elem;

      qElements.push(newlabel);
      qElements.push(newInput);
      qElements.push(this.checkButton);
    });

    return qElements;
  }
  inputCheck(fieldSetID, answer) {
    var inputName = "q" + fieldSetID;

    document.getElementById("button-Q--" + fieldSetID).disabled = true;
    document.getElementsByName(inputName).disabled = true;

    var answersCorrect = 0;
    var answersWrong = 0;
    document.getElementsByName(inputName).forEach((thisInput) => {
      thisInput.disabled = true;

      if (thisInput.checked && answer.includes(thisInput.value)) {
        answersCorrect++;
      }
      if (thisInput.checked && !answer.includes(thisInput.value)) {
        answersWrong++;
      }
    });
    var grade = document.createElement("div");
    grade.innerText = "Not all your answers were right.";
    document.getElementById("fieldset" + fieldSetID).className =
      "input-checkbox__false";
    if (!(answersCorrect == 0)) {
      var grade = document.createElement("div");
      grade.innerText = "Sorry, not a single selection was right.";
      document.getElementById("fieldset" + fieldSetID).className =
        "input-checkbox__false";
    }
    if (answersCorrect > 0) {
      grade.innerText = "You got at least one right.";
      document.getElementById("fieldset" + fieldSetID).className =
        "input-checkbox__false";
    }
    if (answersCorrect == answer.length && answersWrong == 0) {
      grade.innerText = "Wew that is correct!";
      document.getElementById("fieldset" + fieldSetID).className =
        "input-checkbox__true";
    }
    document.getElementById("fieldset" + fieldSetID).appendChild(grade);
  }
}

const qA1 = new questionaire(
  "artical-questionaire",
  "article-questionaire--ordinary"
);
qA1.setButtonID("button-assesment");

const q1 = new textQ(
  "1",
  "In what year did Steve Jobs announce that Macworld had developed it's own browser? (please use 4 digits to represent the year)",
  "2003",
  "1999"
);
const q2 = new radioQ(
  "2",
  "What virtual assistant does Microsoft edge use?",
  "Cortana",
  "q2",
  ["Siri", "Bert", "Alexa", "Cortana"]
);
const q3 = new checkBoxQ(
  "3",
  "What quick keys can you use to save all your tabs in file on google chrome?",
  ["Ctrl-Shift-T", "Cmd-Shift-D"],
  "q3",
  ["Ctrl-Shift-T", "Ctrl-Shift-P", "Cmd-Shift-D", "Ctrl-Shift-D"]
);

qA1.questionList.push(q1, q2, q3);
const startPage1 = new startPage(
  "artical-questionaire",
  "Do you know your websites?",
  "There are lots of different snippets of information you could have learned on this website, let us see if you have retained any of this information by way of asking you some ridicuolous questions.",
  "button-assesment",
  qA1
);
console.log(startPage1);

startPage1.addStartPage();
//buttonStartAssesment.addEventListener("click", () => qA1.injectQuestionaire());


