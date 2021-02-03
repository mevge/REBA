
var questions2 = [{
  question: "Neck Position",
  choices: [
    { choi: "If neck is twisted", puan: 2 },
    { choi: "If neck is side bending", puan: 2 },
  ],
  resim: [
    { choi: "imgs/1.jpg", puan: 3 },
    { choi: "imgs/2.jpg", puan: 1 },
    { choi: "imgs/3.jpg", puan: -2 },
  ]
},

{
  question: "Trunk Position",
  choices: [
    { choi: "If trunk is twisted", puan: 2 },
    { choi: "If trunk is side bending", puan: 1 },
  ],
  resim: [
    { choi: "imgs/4.jpg", puan: 4 },
    { choi: "imgs/5.jpg", puan: 3 },
    { choi: "imgs/6.jpg", puan: 1 },
    { choi: "imgs/7.jpg", puan: -2 },
    { choi: "imgs/8.jpg", puan: -5 },

  ]
},
{
  question: "Legs Position",
  choices: [

  ],
  resim: [
    { choi: "imgs/9.jpg", puan: 5 },
    { choi: "imgs/10.jpg", puan: 3 },
    { choi: "imgs/11.jpg", puan: -2 },
    { choi: "imgs/12.jpg", puan: -5 },

  ]
},
{
  question: "Force / Load",
  choices: [
    { choi: "If load < 5 kgs.", puan: 3 },
    { choi: "If load 5 to 10 kgs.", puan: 2 },
    { choi: "If load > 10 kgs.", puan: -2 },

  ],
  resim: [

  ]
},
{
  question: "Upper Arm Position",
  choices: [
    { choi: "If shoulder is raised", puan: 2 },
    { choi: "If upper arm is abducted", puan: 2 },
    { choi: "If arm is supported or person is leaning", puan: 2 },

  ],
  resim: [
    { choi: "imgs/13.jpg", puan: 5 },
    { choi: "imgs/14.jpg", puan: 4 },
    { choi: "imgs/15.jpg", puan: 2 },
    { choi: "imgs/16.jpg", puan: -3 },
    { choi: "imgs/17.jpg", puan: -5 },

  ]
},
{
  question: "Lower Arm Position",
  choices: [

  ],
  resim: [
    { choi: "imgs/18.jpg", puan: -1 },
    { choi: "imgs/19.jpg", puan: -3 },


  ]
},
{
  question: "Wrist Position",
  choices: [
    { choi: "If wrist is bend from midline", puan: 2 },
    { choi: "If wrist is twisted", puan: 2 },
  ],
  resim: [
    { choi: "imgs/20.jpg", puan: 2 },
    { choi: "imgs/21.jpg", puan: -1 },


  ]
},
{
  question: "Add Coupling Score",
  choices: [
    { choi: "Well fitting Handle and mid rang power grip", puan: 4 },
    { choi: "Acceptable but not ideal hand hold or coupling acceptable with another body part", puan: 3 },
    { choi: "Hand hold not acceptable but possible", puan: -2 },
    { choi: "No handles, awkward, unsafe with any body part", puan: -5 },

  ],
  resim: [


  ]
},
{
  question: "Activity Score",
  choices: [
    { choi: "1 or more body parts are held for longer than 1 minute (static)", puan: 3 },
    { choi: "Repeated small range actions (more than 4x per minute", puan: 1 },
    { choi: "Action causes rapid large range changes in postures or unstable base", puan: -2 },

  ],
  resim: [

  ]
},


];



var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
// $(document).find(".modaldeneme").remove();
$(document).find(".ModalGoruntuleme").hide();



$(document).ready(function () {
  var resimPuanToplam = 0;
  var value = 0;
  displayCurrentQuestion();
  $(this).find(".quizMessage").hide();
  $(document).find(".ModalGoruntuleme2").hide();


  $(this).find(".nextButton").on("click", function () {
    if (!quizOver) {

      var counterValue = $('input:checkbox[class="checkbox"]:checked').length;
      var counterResim = $('input:checkbox[class="image"]:checked').length;

      if (counterValue == 0 && counterResim == 0) {
        $(document).find(".quizMessage").text("Please select an answer");
        $(document).find(".quizMessage").show();
      }
      else {
        $(document).find(".quizMessage").hide();
        $('input:checkbox[class="image"]').each(function () {
          if ($(this).is(':checked')) {
            resimPuanToplam += parseInt($(this).data().puan);

          }
        });

        $('input:checkbox[class="checkbox"]').each(function () {
          if ($(this).is(':checked')) {
            value += parseInt($(this).data().puan);

          }
        });
      }


      if (currentQuestion < questions2.length - 1) {
        currentQuestion++;
        displayCurrentQuestion();
      } else {
        sonuc(resimPuanToplam + value);
        $(document).find(".nextButton").hide();
        $(document).find(".ModalGoruntuleme").show();
        $(document).find(".ModalGoruntuleme2").show();

        quizOver = true;
      }


    }
  }

  );

});

function scorePoint(score) {
  var iconStatus = "";
  var text = "";
  if (score <= 3) {
    iconStatus = 'error';
    text = "You have failed, please be more careful!";
  }

  else if (score > 3 && score < 10) {
    iconStatus = 'warning';
    text = "You have to be a little bit more careful!";
  }
  else {
    iconStatus = 'success';
    text = "You have been successful, Congratulations!";
  }
  Swal.fire({
    icon: iconStatus,
    title: 'Test Result',
    text: " Your Score " + score + " , " + text,
    footer: '<a href="quiz.html">Would you like to try again?</a>'
  })
}
function sonuc(score) {
  $(".ModalGoruntuleme").click(function () {
    scorePoint(score);
  });
}



function displayCurrentQuestion() {

  console.log("In display current Question");

  var question = questions2[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var photoList = $(document).find(".quizContainer > .photoList");

  var numChoices = questions2[currentQuestion].choices.length;
  var numPhoto = questions2[currentQuestion].resim.length;



  $(questionClass).text(question);

  $(choiceList).find("li").remove();
  $(photoList).find("li").remove();



  for (i = 0; i < numPhoto; i++) {

    photo = questions2[currentQuestion].resim[i];


    $('<li><input type="checkbox" class="image" id="s' + i + '" value=' + i + '  data-puan="' + photo.puan + '" /> <img src="' + photo.choi + '" class="resim" data-puan="' + photo.puan + '" data-value=' + i + ' width="160" height="160"/> </li>').appendTo(photoList);

  }


  var choice;
  for (i = 0; i < numChoices; i++) {
    choice = questions2[currentQuestion].choices[i];

    $('<li><input type="checkbox" class="checkbox" id="h' + i + '" value=' + i + '  data-puan="' + choice.puan + '" /> <label class="checkbox2"  data-value=' + i + ' > ' + choice.choi + '  </label> </li>').appendTo(choiceList);
  }



  $(".resim").click(function (e) {
    var i = e.currentTarget.dataset.value;
    var idCreator = "#s" + i;
    console.log(idCreator);
    if ($(idCreator).prop("checked")) {
      $(idCreator).prop("checked", false);
    }
    else {
      $(idCreator).prop("checked", true);
    }

  });

  $(".checkbox2").click(function (e) {
    var i = e.currentTarget.dataset.value;
    var idCreator = "#h" + i;
    console.log(idCreator);
    if ($(idCreator).prop("checked")) {
      $(idCreator).prop("checked", false);
    }
    else {
      $(idCreator).prop("checked", true);
    }

  });


}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}



function hideScore() {
  $(document).find(".result").hide();
}

