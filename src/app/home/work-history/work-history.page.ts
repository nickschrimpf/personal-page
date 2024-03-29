import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { Swiper } from 'swiper';
import { BehaviorSubject } from 'rxjs';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.page.html',
  styleUrls: ['./work-history.page.scss'],
})
export class WorkHistoryPage implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef;
  @ViewChild('bgworkHistory') bgworkHistory!: ElementRef;
  @Input() scrollSubject!: BehaviorSubject<ScrollDetail|undefined>;

  public swiperController: Swiper | undefined;
  public slideHeight = window.innerHeight;
  public slideWidth = window.innerWidth * 0.8;
  public mousewheel: any = {
    sensitivity: 0,
    releaseOnEdges: true,
    eventsTarget: '.swiper-container',
    invert: false,
  };

  public creativeEffect = {
    limitProgress: 2,
    shadow: true,
    prev: {
      translate: ['-100%', 0, 0],
      opacity: 0,
    },
    next: {
      translate: ['110%', 0, 0],
      opacity: 0.2,
    },
  };

  constructor(public scrollService:ScrollService) {}

  ngOnInit() {
    this.scrollSubject = this.scrollService.scrollSubject;
  }

  ngAfterViewInit(): void {
    this.swiperController = new Swiper(this.swiper.nativeElement, {
      slidesPerView: 1,
      spaceBetween: 0,
      effect: 'creative',
      creativeEffect: this.creativeEffect,
      speed: 1000,
      parallax: true,
      on: {
        init: () => {
          if (this.swiperController) {
            this.swiperController.update();
          }
        },
      },
    });

    this.scrollSubject.subscribe((scrollDetail: ScrollDetail | undefined) => {
      if (
        scrollDetail &&
        scrollDetail.currentY >= this.bgworkHistory.nativeElement.offsetTop
      ) {
        this.swiper.nativeElement.swiper.mousewheel.enable();
        this.swiper.nativeElement.swiper.mousewheel.releaseOnEdges = true;
      } else if (
        (scrollDetail &&
          scrollDetail.currentY < this.bgworkHistory.nativeElement.offsetTop) ||
        (scrollDetail &&
          scrollDetail.currentY >
            this.bgworkHistory.nativeElement.offsetTop +
              this.bgworkHistory.nativeElement.offsetHeight)
      ) {
        if (this.swiper.nativeElement.swiper.mousewheel.enabled) {
          this.swiper.nativeElement.swiper.mousewheel.disable();
        }
      }
    });
  }
}
