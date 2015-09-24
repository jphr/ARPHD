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
  var age = document.score.age.value;
  var color = document.score.color.value;
  var opinion = document.score.opinion.value;
  document.getElementById('result').textContent = 'Le capitaine a '+age+' ans, aime le '+color+' et c\'est '+opinion+' !';
}
