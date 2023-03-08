const html = document.documentElement
const viewHeight = window.innerHeight
const viewWidth = window.innerWidth

let skillStillHidden = true;


class HtmlDocument{
  constructor(){
    this.element = document.documentElement;
    this.viewHeight = window.innerHeight;
    this.viewWidth = window.innerWidth;
  }
}
//NAV
const navIcons = document.querySelectorAll('.nav-icon');
for(let i = 0;i < navIcons.length;i++){
  navIcons[i].addEventListener('click',()=> {
      window.scrollTo(0,window.innerHeight * (i+1))
    });
};


// INTRO
const dynamicTitleOneArray = [
  'Adventurer',
  'Problem Solver',
  'Software Engineer',
  'UI/UX Designer',
  'Graphic Designer',
  'Husband',
  'Cat Dad',
  'Taco Lover',
  'Packer Fan'
];

class TypingEffect {
  constructor(textElement,delay){
    this.textElement = textElement;
    this.delay = delay;
    this.letters = [];
    this.letterIndex = 0;
    this.isDeleting = false;
    this.curserOne = document.querySelector('.dynamic-title__curser-one');
  }

  setText(text){  
    this.letters = text.split("");
    this.textElement.textContent= "";
  }

  async type(dynamicTitle) {
    const currentText = this.letters.slice(0, this.letterIndex +1).join("");
    this.textElement.textContent = currentText;
    this.curserOne.style.display = 'inline-block';


    if(!this.isDeleting){
      this.letterIndex++;
    }
    
  
    if (this.letterIndex === this.letters.length) {
      this.isDeleting = true;
      await createWait(this.delay * 3);
    }

    if (this.letterIndex === 0 && this.isDeleting) {
        this.isDeleting = false;
        this.curserOne.style.display = 'none'
        dynamicTitle.currentIndex = (dynamicTitle.currentIndex + 1) % dynamicTitle.strings.length
    }

    const nextDelay = this.isDeleting ? this.delay / 2 : this.delay;
    await createWait(nextDelay);
    
    if (this.isDeleting) {
      this.textElement.textContent = currentText.slice(0, -1);
      this.letterIndex--;
    }

    if (!this.isDeleting && this.letterIndex === this.letters.length) {
      await createWait(this.delay * 3);
      this.isDeleting = true;
    }
  }
}

class DynamicTitle{
  constructor(titleElement,typist,strings){
    this.titleElement = titleElement;
    this.typist = typist; 
    this.strings = strings;
    this.currentIndex = 0;
  }
  
  async typeLoop(){
    while(true){
      await this.typist.setText(this.strings[this.currentIndex])
      await this.typist.type(this)
    }
  }
}
function createWait(ms){
  return new Promise((resolve) => setTimeout(resolve,ms))
}

// SKILLS
class SkillsSection{
  constructor(){

  }
}

function showSkillsParagraph(scrollTop){
  const skillsPargraph = document.querySelector('.skills__paragraph');
  if(scrollTop > viewHeight*.90 && skillStillHidden === true){
    skillsCardsSlideIn();
    setTimeout(()=>{
      rotateSkillCards();
    },2500)
    skillsPargraph.style.opacity = '1';
    skillsPargraph.style.transition = 'opcacity 2s ease-in'
    skillsPargraph.style.animation = 'skillsParagraphSlideUp 2s ease-in';
    skillStillHidden = false;
  }
}
function skillsCardsSlideIn(){
  const heroCards = document.querySelector('.hero-cards');
  heroCardsAnimation = heroCards.animate([
      {
        transform:'translateX(-100%)',
        opacity:'0'
      },
      {
        transform:'translateX(0%)',
        opacity:'1'
      }
  ],{ 
    duration: 2000,
    iterations: 1,
  })
  heroCards.style.opacity = 1;
}
function rotateSkillCards(){
  const htmlCard = document.querySelector('.hero-cards__top');
  const cssCard = document.querySelector('.hero-cards__bottom');
  cssCard.animate([
    {
      transform:'translateX(0%)',
    },
    {
      transform:'translateX(-200%)',
    },
    {
      transform:'translateX(-200%) translateY(-200%)',
    },
    {
      transform:'translateX(0%) translateY(-200%)',
    },
    {
      transform:'translateX(0%) translateY(0%)',

    }
  ],{
    duration:4000,
    iterations:1,
  })

 const htlmCardAnimaton = htmlCard.animate([
    {
      transform:'translateX(0%)',
    },
    {
      transform:'translateX(200%)',
    },
    {
      transform:'translateX(200%) translateY(200%)',
    },
    {
      transform:'translateX(0%) translateY(200%)',
    },
    {
      transform:'translateX(0%) translateY(0%)',

    }
  ],{ 
    duration: 4000,
    iterations: 1,
  })
  if(htlmCardAnimaton.finished){
    const icons = document.getElementsByClassName('icon');
      icons[0].style.opacity = 1;
      icons[0].style.transition = 'opacity 1s 2.5s'

      icons[1].style.opacity = 1;
      icons[1].style.transition = 'opacity 1s 2.75s'

      icons[2].style.opacity = 1;
      icons[2].style.transition = 'opacity 1s 3.75s'

      icons[3].style.opacity = 1;
      icons[3].style.transition = 'opacity 1s 3.5s'

      icons[4].style.opacity = 1;
      icons[4].style.transition = 'opacity 1s 3s'

      icons[5].style.opacity = 1;
      icons[5].style.transition = 'opacity 1s 2.75s'
  }
}

// PROJECTS
function onProjectinView(scrollTop){
  const projectPictures = document.querySelectorAll('.project--picture');
  const projectDescriptions = document.querySelectorAll('.project--description');
  
  const projectsInViewPort = viewHeight + (viewHeight*.75);
  const projectSectionTop = viewHeight * 2;
  const projectSectionBottom = viewHeight * 3;
  const scrolledProjectsPercent = (scrollTop - projectSectionTop)/ viewHeight; 
  const projectScrollValue = scrolledProjectsPercent * viewHeight
  
  
  if(scrollTop > projectsInViewPort && scrollTop < projectSectionBottom){
    if(projectScrollValue > -90 && projectScrollValue < 100){
      projectPictures.forEach((e)=> {
        e.style.transform =`translate3d(0px,${projectScrollValue}px,0px)`;
        e.style.opacity  = 1;
      });
      projectDescriptions.forEach((e)=>{
        e.style.transform = `rotate3d(0,1,0,${projectScrollValue}deg)`
        e.style.opacity  = 1;
      });
    }else{
      projectPictures.forEach((e)=> {
        e.style.opacity  = 0;
      })
      projectDescriptions.forEach((e)=>{
        e.style.opacity = 0;
      })
    };
  };
}
// WORK HISTORY
function workHistorySideScroll(scrollTop){
  const titles = document.getElementById('titles');// job history titles we move left as the visitor scrolls
  const workHistoryTop = viewHeight * 3;//top of the work history page starts as the 3rd page the vistior scrolls to
  const workHistoryHeight = viewHeight * 2;//total length of the work history page -50vh to make sure items are not fixed to the contact page
  const distFromWorkTop = scrollTop - workHistoryTop;//px visitor scrolled into work history
  const scrolledWorkPercent = distFromWorkTop / workHistoryHeight;
  const scrollValue  = scrolledWorkPercent * workHistoryHeight;
  const maxWorkScrollTop = workHistoryTop + workHistoryHeight;
   titles.firstElementChild.style.opacity = 1;
  if(scrollTop >= workHistoryTop && scrollTop <= maxWorkScrollTop) {
    fixWorkHistory(true);
    showWorkHistoryTitles(scrollValue);
  }else{
    fixWorkHistory(false);
  };
};


function showWorkHistoryTitles(scrollValue){
  const elWidth  = viewWidth * .80;
  const index = Math.floor(scrollValue/elWidth)
  const elementScrollPercent = scrollValue/elWidth-index;
  scrollTitles(scrollValue)
  hideShowTitles(index,elementScrollPercent);
  hideShowDescriptions(index,elementScrollPercent);
  hideShowLine(index,elementScrollPercent)
}
function scrollTitles(scrollValue){
    // MOVEING TITLES TO THE LEFT ON SCROLL
    const titles = document.getElementById('titles');// job history titles we move left as the visitor scrolls
    titles.style.left = '-'+scrollValue+'px';
};
function fixWorkHistory(status){
  const workHistory = document.getElementById('work-history');//the work history page height is twice the view height
  const workHistoryWrapper = workHistory.firstElementChild;//the wrapper we fix into position
  if(status){
    workHistory.style.overflow = 'visable';
    workHistoryWrapper.style.position = 'fixed';
    workHistoryWrapper.style.boxSizing = 'border-box';
  }else{
    workHistoryWrapper.style.position = null;
    workHistoryWrapper.style.boxSizing = null;
  };
};
function hideShowTitles(index,elementScrollPercent){
  const titleListItems = document.querySelectorAll('.tabs li'); // each job title
  if(index  ===  0){
    titleListItems[index].scrollIntoView(true)
    titleListItems[index].style.opacity = 1 - elementScrollPercent;
    titleListItems[index+1].style.opacity =  elementScrollPercent
  }else if(index === titleListItems.length -1){
    titleListItems[index].scrollIntoView(true)
    titleListItems[index].style.opacity = 1 - elementScrollPercent
    titleListItems[index-1].style.opacity =  elementScrollPercent
  }else if(index < 4){
    titleListItems[index].scrollIntoView(true)
    titleListItems[index].style.opacity = 1 - elementScrollPercent
    titleListItems[index-1].style.opacity =  elementScrollPercent
    titleListItems[index+1].style.opacity =  elementScrollPercent
  };
};
function hideShowDescriptions(index,elementScrollPercent){
  if(index < 5){
    const jobDescriptions = document.querySelectorAll('.work-details');// each job description
    if(elementScrollPercent < .2){
      jobDescriptions[index].style.opacity = 1;
    }else if(elementScrollPercent > .2 && elementScrollPercent < .5){
      jobDescriptions[index].style.opacity = 1 - elementScrollPercent;
    }else if(elementScrollPercent > .5){
      jobDescriptions.forEach((e)=>e.style.opacity = 0)
    };
  }else{
    return;
  }
};

function hideShowLine(index,elementScrollPercent){
  const line = document.querySelector('.line');
  if(index % 2 !== 0){
    line.style.background = '#2793f2'
  }else{
    line.style.background = '#F28F16'
  };
  if(elementScrollPercent > .5 && elementScrollPercent < 1){
    line.style.position = 'fixed';
    line.style.width = elementScrollPercent * viewWidth +'px';
    line.style.display = 'flex';
  }else{
    line.style.position = 'relative';
    line.style.width = '0px';
    line.style.display = 'none';
  };
};



class ScrollHandler{
  constructor(htmlDoc){
    this.html = htmlDoc;
  };

  handleScroll(){
    const scrollTop = this.html.element.scrollTop;
    showSkillsParagraph(scrollTop);
    onProjectinView(scrollTop);
    workHistorySideScroll(scrollTop);
  };
};


class App{
  static init(){
    const htmlDoc = new HtmlDocument();
    const scrollHandler = new ScrollHandler(htmlDoc);

    window.addEventListener('scroll',() => {
      scrollHandler.handleScroll()
    });

    window.addEventListener('resize',()=>{
      window.scrollTo(0,0);
      location.reload();
    });

    window.addEventListener('load',() => {
        const dynamicTitleElement = document.querySelector('.dynamic-title__description');
      setTimeout(()=>{
        const typist = new TypingEffect(dynamicTitleElement, 150);
        const dynamicTitle = new DynamicTitle(dynamicTitleElement, typist, dynamicTitleOneArray);
        dynamicTitle.typeLoop();
      },1500);
    });

  };
};

App.init()