import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, ScrollDetail } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import Typed from 'typed.js';



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
  scrollSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private animationCTRL:AnimationController
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
        break;
      case 'tools':
        this.tools.nativeElement.scrollIntoView({behavior:'smooth'});
        break;
      case 'myWork':
        this.MyWork.nativeElement.scrollIntoView({behavior:'smooth'});
        break;
    }
  }
  handleScrollStart() {
    // console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    this.scrollSubject.next(ev.detail);
  }

  handleScrollEnd() {
    // console.log('scroll end');
  }

}


