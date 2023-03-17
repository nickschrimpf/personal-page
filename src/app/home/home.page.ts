import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('greeting',{read:ElementRef,static:true})greeting!: ElementRef;
  @ViewChild('dynamicTitle',{read:ElementRef,static:true})dynamicTitle!: ElementRef;


  constructor(
    private animationCTRL:AnimationController
  ) {}


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
      strings: ['Web Developer','Mobile Developer','UI/UX Designer'],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      backDelay: 1000,
      startDelay: 1000
    }
    new Typed(this.dynamicTitle.nativeElement,options);
  };

}


