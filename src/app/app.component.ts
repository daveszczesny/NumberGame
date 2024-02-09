import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'numgame';
  numberToGuess: string = '';
  numberOfGuesses: number = 0;

  guessNum1: string = '';
  guessNum2: string = '';
  guessNum3: string = '';
  guessNum4: string = '';

  previousGuesses: [string, string][] = [];
  
  constructor(){
    this.numberToGuess = this.generateRandomNumber();
    console.log(this.numberToGuess)
  }
  
  /*
    Generates a random 4 digit number,
    with leading 0s,
    i.e. 0032
  */
  generateRandomNumber(): string {
    const randomNumber = Math.floor(Math.random() * 10_000);
    const formattedNumber = randomNumber.toString().padStart(4, '0');
    return formattedNumber;
  }

  guess(): void{
    let guessNumbers: string[] = [
      this.guessNum1,
      this.guessNum2,
      this.guessNum3,
      this.guessNum4,
    ]
    // validating guess
    let invalidGuess: boolean = false;
    guessNumbers.forEach(num => {
      if(num.length <= 0){
        invalidGuess = true;
      }
    })

    if(invalidGuess){
      alert("The guess you're trying to make is invalid!");
      return;
    }

    this.numberOfGuesses++;

    // checking if guess is correct
    let correct: number = 0;
    guessNumbers.forEach((num, index) => {
      if(this.numberToGuess[index] == num){
        correct++;
      }
    })

    if(correct == this.numberToGuess.length){
      alert(`Well done! You guessed the correct number in ${this.numberOfGuesses} guesses!`)
    }else{
      this.previousGuesses.unshift([
        guessNumbers.join(""), correct + ' correct'
      ]);
    }
    

  }

  /* Clears the input on focus */
  clearInput(inputField: string): void {
    (this as any)[inputField] = '';
  }


}
