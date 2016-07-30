window.onload = function() {
  // Fade in
  var containers = document.getElementsByClassName('container');
  for (var i = 0; i < containers.length; i++) {
    containers[i].classList.add('visible');
  }
  var showcase = document.getElementsByClassName('showcase-wrapper');
  for (var i = 0; i < showcase.length; i++) {
    showcase[i].classList.add('visible');
  }

  // Slide toggle
  var projects = document.getElementsByClassName('project-box');
  for (var i = 0; i < projects.length; i++) {
    projects[i].onclick = function() {
      this.classList.toggle('show');
    }
  }

  var animationListener;
  animationListener = function () {
    this.classList.toggle('collapse');
    this.removeEventListener('animationend', animationListener);
  }

  // button toggle
  var buttons = document.getElementsByClassName('navbar-toggle');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      var target = document.querySelector(this.getAttribute('data-target'));
      target.addEventListener('animationend', animationListener);
      target.style.animation = target.classList.contains('collapse')?'unfold 1s':'fold 1s';
    }
  }
}

function trimNumber(num, digitAfterComma){
  var mult = Math.pow(10, digitAfterComma);
  return Math.round(num * mult) / mult;
}

function calculateAFPScore(){
  var result = document.getElementById('result');
  result.classList.remove('good');
  result.classList.remove('bad');
  var score = 0;
  switch (document.score.size.value){
    case 'mid':
      score += 1;
      break;
    case 'high':
      score += 4;
      break;
    default:
  }
  if(document.score.number.value === 'high') score += 2;
  switch (document.score.protein.value){
    case 'mid':
      score += 2;
      break;
    case 'high':
      score += 3;
      break;
    default:
  }

  result.textContent = score;
  result.classList.add(score <= 2 ? 'good' : 'bad');
}

function calculateMELDScore(){
  var result = document.getElementById('result');
  var score = 0;
  var creat = document.score.creat.value.replace(',', '.') / 88.4;
  var bili = document.score.bilirubin.value.replace(',', '.') / 17.1;
  var inr = document.score.inr.value.replace(',', '.');
  if(document.score.dial.checked) creat = 4;
  if(creat < 1) creat = 1;
  if(bili < 1) bili = 1;

  score = (0.957 * Math.log(creat) + 0.378 * Math.log(bili) + 1.120 * Math.log(inr) + 0.643 ) * 10;

  if(score < 6)
    score = 6;
  else if(score > 40)
    score = 40;

  result.textContent = trimNumber(score, 0);
}

function calculateChildScore(){
  var result = document.getElementById('result');
  var score = 0;
  var inputs = document.querySelectorAll('.score input[type=radio]:checked');
  for (var i = 0; i < inputs.length; i++) {
    switch (inputs[i].value){
      case 'low':
        score += 1
        break;
      case 'mid':
        score += 2;
        break;
      case 'high':
        score += 3;
        break;
      default:
    }
  }

  if(score < 7)
    result.textContent = 'Classe A' + score;
  else if(score < 10)
    result.textContent = 'Classe B' + score;
  else
    result.textContent = 'Classe C' + score;
}

function calculateLilleScore(){
  var result = document.getElementById('result');
  result.classList.remove('good');
  result.classList.remove('bad');
  var score = 0;
  var creat = document.score.creatine.value.replace(',', '.');
  var albu = document.score.albumine.value.replace(',', '.');
  var bili = document.score.bilirubin.value.replace(',', '.');
  var bili7 = document.score.bilirubin7.value.replace(',', '.');
  var pt = document.score.pt.value.replace(',', '.');
  var age = document.score.age.value;

  creat = creat < 115 ? 0 : 1; 

  var r = 3.19 - 0.101 * age + 0.147 * albu + 0.0165 * (bili - bili7) - 0.206 * creat - 0.0065 * bili - 0.0096 * pt;
  score = Math.exp(-r) / (1 + Math.exp(-r));

  result.textContent = trimNumber(score, 2);
  result.classList.add(score <= 0.45 ? 'good' : 'bad');
}

function calculateHERSScore(){
  var result = document.getElementById('result');
  result.classList.remove('good');
  result.classList.remove('bad');
  var score = 0;
  switch (document.score.size.value){
    case 'mid':
      score += 2;
      break;
    case 'high':
      score += 5;
      break;
    default:
  }
  switch (document.score.number.value){
    case 'mid':
      score += 1;
      break;
    case 'high':
      score += 2;
      break;
    default:
  }
  if(document.score.tumor.value == 'bi') score += 2;
  if(document.score.invasion.checked) score += 2;

  var prob = ['3 | 7 | 8', '5 | 10 | 11', '7 | 13 | 15', '9 | 18 | 21', '12 | 24 | 28', '17 | 31 | 35', '22 | 40 | 46', '29 | 52 | 59', '39 | 64 | 71', '49 | 77 | 82', '61 | 87 | 91', '73 | 94 | 96'];
  result.textContent = score + ': ' + prob[score];
  //result.classList.add(score <= 2 ? 'good' : 'bad');
}

function calculateHFScore(){
  var result_clichy = document.getElementById('result_clichy');
  var result_kings = document.getElementById('result_kings');
  var score = document.score;
  var clichy = score.coma.value == 'oui' && (score.facteur.value < 20 && score.age.value < 30 || score.facteur.value < 30 && score.age >= 30 );

  var atLeastThree = 0;
  if(score.inr.value > 3.5) atLeastThree++;
  if(score.bili.value > 300) atLeastThree++;
  if(score.age.value > 40 || score.age.value < 10) atLeastThree++;
  if(score.delai.value == 'mid' ) atLeastThree++;
  if(score.etio.value == 'medoc' || score.etio.value == 'unknown') atLeastThree++;

  var kings = (score.etio.value == 'paracetamol' && score.ph.value < 7.3) || (score.etio.value == 'paracetamol' && score.lactate.value > 3) || (score.etio.value == 'paracetamol' && score.coma.value == 'oui' && score.creat.value > 300 && score.inr.value > 6.5) || (score.etio.value != 'paracetamol' && score.inr.value > 6.5) || (score.etio.value != 'paracetamol' && atLeastThree >= 3);

  result_clichy.textContent = clichy ? 'Oui' : 'Non';
  result_kings.textContent = kings ? 'Oui' : 'Non';
}
