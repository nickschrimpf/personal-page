const html = document.documentElement

const dynamicTitleOne = document.querySelector('.dynamic-title__description');
const dynamicTitleTwo = document.querySelector('.dynamic-title__second-line').firstElementChild;
const curserOne = document.querySelector('.dynamic-title__curser-one');
const curserTwo = document.querySelector('.dynamic-title__curser-two');

const viewHeight = window.innerHeight;
const viewWidth = window.innerWidth;

let cardsVisable = false;
let intoInView = true;
let skillStillHidden = true;

const dynamicTitleOneArray = [
  '....hmmm','Customer Focused','creative','critical', 'taco','packer'
];
const dynamicTitleTwoArray = [
  'this is so hard','Software Developer','problem solver','thinker','lover','fan'
]

// INTRO
async function typeDescription(description,ele,delay = 200){
  const letters = description.split("");
  let i = 0;
  while(i < letters.length) {
    await createWait(delay);
    (ele).append(letters[i]);
    i++
  }
  return;
}
async function deleteSentence(eleRef) {
  const sentence = (eleRef).textContent;
  const letters = sentence.split("");
  while(letters.length > 0) {
    await createWait(100);
    letters.pop();
    eleRef.textContent = letters.join("");
  }
}
async function continuedTyping(){
  let i = 0;
  while(true){
   
    curserOne.style.display = 'inline-block';
    await typeDescription(dynamicTitleOneArray[i],dynamicTitleOne);
          curserOne.style.display = 'none'
    await createWait(dynamicTitleOneArray[i].length * 200);
          curserTwo.style.display = 'inline-block'
    await typeDescription(dynamicTitleTwoArray[i],dynamicTitleTwo);
          
    await createWait(dynamicTitleTwoArray[i].length * 200);
    await deleteSentence(dynamicTitleTwo)
          curserTwo.style.display = 'none'
    await createWait(dynamicTitleTwoArray[i].length * 100);
    curserOne.style.display = 'inline-block';
    await deleteSentence(dynamicTitleOne)
    i++
    if(i >= dynamicTitleOneArray.length){
      i = 0;
    };
  };
};
function createWait(ms){
  return new Promise(resolve => setTimeout(resolve,ms))
}

// SKILLS
function showSkillsParagraph(scrollTop){
  const skillsPargraph = document.querySelector('.skills__paragraph');

  if(scrollTop > 425 && skillStillHidden === true){
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
 const cssCardAnimation = cssCard.animate([
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

window.addEventListener('load',() => {
  console.log('loaded')
  setTimeout(()=>{
   continuedTyping();
  },1500);
});
window.addEventListener('resize',()=>{
  location.reload();
});

window.addEventListener('scroll',() => {
  const scrollTop = html.scrollTop;
  if(scrollTop >= viewHeight * .75 && cardsVisable === false){
    skillsCardsSlideIn();
    cardsVisable = true;
    setTimeout(()=>{
      rotateSkillCards();
    },2500)
  };
  showSkillsParagraph(scrollTop);
  workHistorySideScroll(scrollTop);
});