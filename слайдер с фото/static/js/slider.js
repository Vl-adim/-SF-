let sliderData = [{
  title: 'Rostov-on-Don, Admiral',
  city: 'Rostov-on-Don<br>LCD admiral',
  area: '81 m2',
  time: '3.5 months',
  cost: 'Upon request',
  image: '../static/images/image_2.1.png'
}, {
  title: 'Sochi Thieves',
  city: 'Sochi<br>Thieves',
  area: '105 m2',
  time: '4 months',
  cost: 'Upon request',
  image: '../static/images/image_2.png'
}, {
  title: 'Rostov-on-Don Patriotic',
  city: 'Rostov-on-Don<br>Patriotic',
  area: '93 m2',
  time: '3 months',
  cost: 'Upon request',
  image: '../static/images/image_3.png'
}];

function initSlider() {
  let projectsContent = document.querySelector('.projects-content');
  let projectImageArea = projectsContent.querySelector('.project-image-area');

  if (typeof sliderData === 'undefined' || !sliderData.length) {
    projectImageArea.innerHTML += '<p style="margin: 0px; font-size: 36px; color: #959595; text-transform: uppercase; text-align: center;">sorry, something goes wrong</p>';
    return;
  }

  let projectsToggleArea = projectsContent.querySelector('.projects-toggle-area');
  let infoBlocks = projectsContent.querySelectorAll('.projects-info-text');
  let projectsSwitchArea = projectsContent.querySelector('.projects-switch-area');

  initToggles();
  initText();
  initImages();
  initSwitch();

  function initToggles() {
    sliderData.forEach((item, index) => {
      projectsToggleArea.innerHTML += `<button class="project-toggle number-${index} ${index === 0 ? "active" : ""}" data-index="${index}">${sliderData[index].title}</button>`;
    });
    projectsToggleArea.querySelectorAll('.project-toggle').forEach(projectToggle => {
      projectToggle.addEventListener('click', function() {
        moveSlider(this.dataset.index);
      });
    });
  }

  function initText() {
    infoBlocks[0].innerHTML = sliderData[0].city;
    infoBlocks[1].innerHTML = sliderData[0].area;
    infoBlocks[2].innerHTML = sliderData[0].time;
    infoBlocks[3].innerHTML = sliderData[0].cost;
  }

  function changeText(objNumber) {
    infoBlocks[0].innerHTML = sliderData[objNumber].city;
    infoBlocks[1].innerHTML = sliderData[objNumber].area;
    infoBlocks[2].innerHTML = sliderData[objNumber].time;
    infoBlocks[3].innerHTML = sliderData[objNumber].cost;
  }

  function initImages() {
    projectImageArea.style.backgroundImage = `url(${sliderData[0].image})`;
  }

  function changeImage(objNumber) {
    projectImageArea.style.backgroundImage = `url(${sliderData[objNumber].image})`;
  }

  function initSwitch() {
    projectsSwitchArea.innerHTML += '<button class="arrow-button arrow-button_left"></button>';
    sliderData.forEach((item, index) => {
      projectsSwitchArea.innerHTML += `<button class="dot-button number-${index} ${index === 0 ? "active" : ""}" data-index="${index}"></button>`;
    });
    projectsSwitchArea.innerHTML += '<button class="arrow-button arrow-button_right"></button>';

    projectsSwitchArea.querySelectorAll('.arrow-button').forEach(arrowButton => {
      arrowButton.addEventListener('click', function() {
        let currentProject = +projectsToggleArea.querySelector('.active').dataset.index;
        let nextProject;
        if (arrowButton.classList.contains('arrow-button_left')) {
          nextProject = currentProject === 0 ? sliderData.length - 1 : currentProject - 1;
        } else {
          nextProject = currentProject === sliderData.length - 1 ? 0 : currentProject + 1;
        }
        moveSlider(nextProject);
      });
    });

    projectsSwitchArea.querySelectorAll('.dot-button').forEach(dotButton => {
      dotButton.addEventListener('click', function() {
        moveSlider(this.dataset.index);
      });
    });
  }

  function moveSlider(objNumber) {
    projectsContent.querySelectorAll('.active').forEach(active => active.classList.remove('active'));
    projectsContent.querySelectorAll('.number-' + objNumber).forEach(nonActive => nonActive.classList.add('active'));
    changeText(objNumber);
    changeImage(objNumber);
  }
}

document.addEventListener('DOMContentLoaded', initSlider);