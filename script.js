
//source code exist and prooved, all rights receved to the main creater known as "@solimani"

// Array of all the questions and choices 
// keep the question in this pattren of dotts cuma Breaks
//etc

var all_questions = [{
  question_string: " I was totally _______ (borred) last night. That film we watched was awful.",
  choices: {
    correct: "bored ",
    wrong: ["boring", "boredy", "not boring"]
  }
}, {
  question_string: "In contrast, the action film we saw over the weekend was so _______(excite)",
  choices: {
    correct: "exciting",
    wrong: ["was excited", "excited", "was exciting"]
  }
}, {
  question_string: "The man thought the audience would find his jokes _______ (amuse)but they didn't laugh",
  choices: {
    correct: "amusing",
    wrong: ["amused", "was amused ", "good"]
  }
}, {
  question_string: " That book is very _______ (stimulate). It really makes you think",
  choices: {
    correct: "stimulating",
    wrong: ["stimulated", " a good stimulator", "was stimulating"]
  }
}, {
  question_string: "The baby was _______ (fascinate) all morning by the toy ",
  choices: {
    correct: "fascinated",
    wrong: ["fascinating", "fascinate", "was fasting"]
  }
}, {
  question_string: "Some people think winter is _______ (depresse). but Dave doesn't because he likes to snowboard.",
  choices: {
    correct: "depressing",
    wrong: ["depressed", "depresse", "fine"]
  }
}, {
  question_string: "Bill said he'd email us as soon as he got to his hotel. _______ (get/ worry) because I still haven't heard from him?",
  choices: {
    correct: "I'm getting worried ",
    wrong: ["I were getting worried ", "I'm getting worry ", "got worry"]
  }
}, {
  question_string: "It's starting to _______ (get/ hot) We should definitely head to the beach where it's cooler",
  choices: {
    correct: "get hot ",
    wrong: ["got hot ", "get hoted ", "got hoted "]
  }
}, {
  question_string: "We're _______ (get/ excite) about our trip to Italy this summer. We can't wait to go!",
  choices: {
    correct: "getting excited",
    wrong: ["got excited", "getting exercized", "got excite"]
  }
}, {
  question_string: "My uncle hopes to _______ (get/ rich) by winning the lottery the same day",
  choices: {
    correct: "get rich",
    wrong: ["got rich", "gets rich", "got rich"]
  }
}, {
  question_string: "Last night, Brian _______ (get/ irritate) by all the noise",
  choices: {
    correct: " got irritated",
    wrong: [" get irritated", " gets irritated", " geting irritated"]
  }
}, {
  question_string: 'neighbors were making fun if us, We _______ (get/ confuse) driving to the airport, and took the wrong road',
  choices: {
    correct: "got confused",
    wrong: ["get confused", "geting confused", "had got confused"]
  }
}];



//real code starts here pls do not mess with it 
var Quiz = function (quiz_name) {
  this.quiz_name = quiz_name;

  this.questions = [];
}

Quiz.prototype.add_question = function (question) {

  var index_to_add_question = Math.floor(Math.random() * this.questions.length);
  this.questions.splice(index_to_add_question, 0, question);
}

Quiz.prototype.render = function (container) {

  var self = this;

  $('#quiz-results').hide();

  $('#quiz-name').text(this.quiz_name);

  var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');

  function change_question() {
    self.questions[current_question_index].render(question_container);
    $('#prev-question-button').prop('disabled', current_question_index === 0);
    $('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);

    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  }

  var current_question_index = 0;
  change_question();

  $('#prev-question-button').click(function () {
    if (current_question_index > 0) {
      current_question_index--;
      change_question();
    }
  });

  $('#next-question-button').click(function () {
    if (current_question_index < self.questions.length - 1) {
      current_question_index++;
      change_question();
    }
  });

  $('#submit-button').click(function () {
    var score = 0;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
        score++;
      }
    }

    var percentage = score / self.questions.length;
    console.log(percentage);
    var message;
    if (percentage === 1) {
      message = 'Great job!'
    } else if (percentage >= .75) {
      message = 'You did alright.'
    } else if (percentage >= .5) {
      message = 'Better luck next time.'
    } else {
      message = 'Maybe you should try a little harder.'
    }
    $('#quiz-results-message').text(message);
    $('#quiz-results-score').html('You got <b>' + score + '/' + self.questions.length + '</b> questions correct.');
    $('#quiz-results').slideDown();
    $('#quiz button').slideUp();
  });

  question_container.bind('user-select-change', function () {
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  });
}

var Question = function (question_string, correct_choice, wrong_choices) {

  this.question_string = question_string;
  this.choices = [];
  this.user_choice_index = null;

  this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);

  var number_of_choices = wrong_choices.length + 1;
  for (var i = 0; i < number_of_choices; i++) {
    if (i === this.correct_choice_index) {
      this.choices[i] = correct_choice;
    } else {

      var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
      this.choices[i] = wrong_choices[wrong_choice_index];

      wrong_choices.splice(wrong_choice_index, 1);
    }
  }
}

Question.prototype.render = function (container) {

  var self = this;

  var question_string_h2;
  if (container.children('h2').length === 0) {
    question_string_h2 = $('<h2>').appendTo(container);
  } else {
    question_string_h2 = container.children('h2').first();
  }
  question_string_h2.text(this.question_string);

  if (container.children('input[type=radio]').length > 0) {
    container.children('input[type=radio]').each(function () {
      var radio_button_id = $(this).attr('id');
      $(this).remove();
      container.children('label[for=' + radio_button_id + ']').remove();
    });
  }
  for (var i = 0; i < this.choices.length; i++) {
    var choice_radio_button = $('<input>')
      .attr('id', 'choices-' + i)
      .attr('type', 'radio')
      .attr('name', 'choices')
      .attr('value', 'choices-' + i)
      .attr('checked', i === this.user_choice_index)
      .appendTo(container);

    var choice_label = $('<label>')
      .text(this.choices[i])
      .attr('for', 'choices-' + i)
      .appendTo(container);
  }


  $('input[name=choices]').change(function (index) {
    var selected_radio_button_value = $('input[name=choices]:checked').val();

    self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));

    container.trigger('user-select-change');
  });
}


$(document).ready(function () {
  // Create an instance of the Quiz object
  var quiz = new Quiz('My Quiz');


  for (var i = 0; i < all_questions.length; i++) {
    var question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);

    quiz.add_question(question);
  }


  var quiz_container = $('#quiz');
  quiz.render(quiz_container);
});
