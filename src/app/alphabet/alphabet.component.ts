import { Component, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {

  alphabet: string[] = [
    'A', 'B', 'C', 'Č', 'Ć', 'D', 'Dž', 'Đ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','LJ', 'M', 'N', 'Nj', 'O', 'P', 'R', 'S', 'Š', 'T', 'U', 'V', 'Z', 'Ž'
  ];

  linkList: string[] = [
    'pzMA3mwwl7g',
    '6hyrgHVqGQ4',
    '6qeTTPjFwEk',
    'qAUtEdJcU0E',
    'G5kij9eowIY',
    'QJ527RfroQM',
    'Ndp1QP6S6b8',
    '4GqoXTiQu0Y',
    'hZANSqqPy30',
    'OQ4yCHOcTbw',
    '8zdgt9i90cE',
    'RjEL6yknQX4',
    'nYaXBwcLcwQ',
    '0EZdNTlpp6E',
    'jrWEWeAwM5s',
    'SAfcoI8att4',
    'fOy9ff7WhYI',
    'zlsywmLFLkY',
    'sxcb6ZT717c',
    'RsQvEH7N3kY',
    'XOLDozPCTSQ',
    'qck0hYEorD0',
    'v3R69JoOADQ',
    'dL9htnF5vIg',
    'crTzW3Gf85k',
    'bN0513Wiq24',
    'a6d91tCJ7OQ',
    'xefp3l1Hveg',
    'd0IuZUPFZ3g',
    'lJPBPSHBe5s'
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectLetter(chip: MatChip) {
    console.log(chip.value);
  }

}
