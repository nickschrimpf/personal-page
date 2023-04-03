import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, ScrollDetail } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import Typed from 'typed.js';
import { ScrollService } from './services/scroll.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit {
  
  @ViewChild('greeting',{read:ElementRef,static:true})greeting!: ElementRef;
  @ViewChild('dynamicTitle',{read:ElementRef,static:true})dynamicTitle!: ElementRef;
  @ViewChild('home',{read:ElementRef,static:true})home!: ElementRef;
  @ViewChild('tools',{read:ElementRef,static:true})tools!: ElementRef;
  @ViewChild('myWork',{read:ElementRef,static:true})MyWork!: ElementRef;
  @ViewChild('workHistory',{read:ElementRef,static:true})workHistory!: ElementRef;
  @ViewChild('nav',{read:ElementRef,static:true})nav!: ElementRef;
  @ViewChild('pageIcon',{read:ElementRef,static:true})pageIcon!: ElementRef;

  scrollSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  pageIconURL:string = '/assets/navigation-icons/Tent.svg';
  activePage:string = 'home';

  constructor(
    private animationCTRL:AnimationController,
    public scrollService:ScrollService
  ) {}

  ngOnInit(){

  }

  ngAfterViewInit(): void {
    const greetingAnimation = this.animationCTRL.create()
    .addElement(this.greeting.nativeElement)
    .duration(300)
    .easing('ease-in')
    .iterations(1)
    .keyframes([
       {offset:.0,transform:'scale(2) translateY(-1000%)'},
       {offset:.70,transform:' scale(1.25) translateY(50%)'},
       {offset:1,transform:'scale(1.5) translate(0)'}
    ]);
      greetingAnimation.play();

    const options ={
      strings: [
      'Adventurer',
      'Problem Solver',
      'Software Engineer',
      'Technical Engineer',
      'Web Developer',
      'UI/UX Designer',
      'Graphic Designer',
      'Husband',
      'Cat Dad',
      'Taco Lover',
      'Packer Fan'
    ],
      typeSpeed: 125,
      backSpeed: 100,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      backDelay: 1000,
      startDelay: 1000
    }
    new Typed(this.dynamicTitle.nativeElement,options);

  };

  scrollTo(page:string){
    switch(page){
      case 'home':
        this.home.nativeElement.scrollIntoView({behavior:'smooth'});
        this.pageIconURL = '/assets/navigation-icons/Tent.svg';
        this.activePage = 'home';
        break;
      case 'tools':
        this.tools.nativeElement.scrollIntoView({behavior:'smooth'});
        this.pageIconURL = '/assets/navigation-icons/Wrench.svg';
        this.activePage = 'tools';
        break;
      case 'myWork':
        this.MyWork.nativeElement.scrollIntoView({behavior:'smooth'});
        this.pageIconURL = '/assets/navigation-icons/Path.svg';
        this.activePage = 'myWork';
        break;
      case 'work-history':
        this.workHistory.nativeElement.scrollIntoView({behavior:'smooth'});
        this.pageIconURL = '/assets/navigation-icons/Map.svg';
        this.activePage = 'work-history';
        break;
    }
  }
  handleScrollStart() {
    this.nav.nativeElement.style.opacity = '0';
    this.pageIcon.nativeElement.style.opacity = '0';
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    this.scrollService.setScrollDetails(ev.detail);
    if(
        ev.detail.scrollTop < this.home.nativeElement.offsetHeight &&
        ev.detail.scrollTop < this.tools.nativeElement.offsetTop
      ){
        this.pageIconURL = '/assets/navigation-icons/Tent.svg';
        this.activePage = 'home';
    }else if(
        ev.detail.scrollTop > this.home.nativeElement.offsetHeight &&
        ev.detail.scrollTop < this.MyWork.nativeElement.offsetTop
    ){
      this.pageIconURL = '/assets/navigation-icons/Wrench.svg';
      this.activePage = 'tools';
    }else if(ev.detail.scrollTop <  this.workHistory.nativeElement.offsetTop){
      this.pageIconURL = '/assets/navigation-icons/Path.svg';
      this.activePage = 'myWork';
    }else{
      this.pageIconURL = '/assets/navigation-icons/Map.svg';
      this.activePage = 'work-history';
    }
  }

  handleScrollEnd() {
    this.nav.nativeElement.style.opacity = '1';
    this.pageIcon.nativeElement.style.opacity = '1';

  }


}


