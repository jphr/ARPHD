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
}

function calculateScore(){
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
