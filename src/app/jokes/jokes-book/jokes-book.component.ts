import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-jokes-book',
  templateUrl: './jokes-book.component.html',
  styleUrls: ['./jokes-book.component.css']
})
export class JokesBookComponent implements AfterViewInit {

  @ViewChild('bookFront') bookFront: ElementRef;
  @ViewChild('bookBack') bookBack: ElementRef;
  @ViewChild('bookWrap') bookWrap: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const bookFrontElement=this.bookFront.nativeElement
    bookFrontElement.addEventListener('mouseenter', () => {
      this.bookWrap.nativeElement.classList.add('rotate');
    });
    bookFrontElement.addEventListener('mouseleave', () => {
      this.bookWrap.nativeElement.classList.remove('rotate');
    });
    bookFrontElement.addEventListener('click', () => {
      this.bookWrap.nativeElement.classList.add('flip');
    });
    this.bookBack.nativeElement.addEventListener('click', () => {
      this.bookWrap.nativeElement.classList.remove('flip');
    });
  }
}
