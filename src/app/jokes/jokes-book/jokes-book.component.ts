import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jokes-book',
  templateUrl: './jokes-book.component.html',
  styleUrls: ['./jokes-book.component.css']
})
export class JokesBookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

//   $(".book").mouseenter(function() {
//     $(this).parent(".book-wrap").addClass("rotate");
//   });

//   $(".book").mouseleave(function() {
//     $(this).parent(".book-wrap").removeClass("rotate");
//   });

//   $(".book").click(function() {
//     $(this).parent(".book-wrap").addClass("flip");
//   });

//   $(".book-back").click(function() {
//     $(this).parent(".book-wrap").removeClass("flip");
//   });
}
