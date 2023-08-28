// Please copy and paste your GitHub Repo on line 2 (optional)
// <GitHub Repo>

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)
// step 1 : กำหนดขอบเขตของสนาม
// step 2 : ทำการ Set postion ให้กับ หมวก และตัวละคร
// step 3 : สร้างเงื่อนไขการทำงานของเกม
// step 4 : คอยแก้ดูว่าถ้าหากตัวละครนั้นทำเกินขอบเขตที่กำหนดจะทำอย่างไร

// JS Assessment: Find your hat //

const prompt = require("prompt-sync")({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clearTerminal = require("clear-screen"); //every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = "🍌";
const hole = "🌳";
const fieldCharacter = "⬜";
const pathCharacter = "🐒";

class Field {
  constructor(field = []) {
    this.field = field;
    this.start = {
      x: 0,
      y: 0,
    };
    this.hatPosition = {
      x: 0,
      y: 0,
    };
    this.locationX = 0;
    this.locationY = 0;
  }
  //   เซ็ทค่า random ให้กับ หมวกและ ตัวละคร

  setPosition(offLimit = { x: 0, y: 0 }) {
    const position = {
      x: 0,
      y: 0,
    };
    do {
      position.x = Math.floor(Math.random() * this.field.length);
      position.y = Math.floor(Math.random() * this.field.length);
    } while (position.x === offLimit.x && position.y === offLimit.y);
    return position;
  }
  //<------------ Set เงื่อนไขและตำแหน่งต่างๆภายในเกม----------->
  setStart() {
    this.start = this.setPosition();
    this.locationX = this.start.x;
    this.locationY = this.start.y;
    this.field[this.start.y][this.start.x] = pathCharacter;
  }

  setHat() {
    this.hatPosition = this.setPosition(this.start);
    this.field[this.hatPosition.y][this.hatPosition.x] = hat;
  }

  foundHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  foundHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  inField() {
    return (
      this.locationX >= 0 &&
      this.locationY >= 0 &&
      this.locationX < this.field.length &&
      this.locationY < this.field.length
    );
  }

  displayGame() {
    clearTerminal();
    this.field.forEach((a) => console.log(a.join("")));
  }
  //<----------สร้างเงื่อนไขการเดินให้กับตัวละคร---------->
  getInput() {
    const input = prompt(
      "Select your key : W:UP A:LEFT S:DOWN D:RIGHT--->"
    ).toLowerCase();
    switch (input) {
      case "w":
        this.locationY -= 1;
        break;
      case "a":
        this.locationX -= 1;
        break;
      case "s":
        this.locationY += 1;
        break;
      case "d":
        this.locationX += 1;
        break;
      default:
        console.log("Your prees a wrong key, Please enter W A S D ");
        this.getInput();
        break;
    }
  }
  //<----------Create function ADDHOLE ----------->
  addHole() {
    const numHoles = Math.floor(Math.random() * 10) + 1;
    for (let i = 1; i <= numHoles; i++) {
      let holePosition = {
        x: 0,
        y: 0,
      };
      do {
        holePosition = this.setPosition(this.holePosition);
      } while (
        holePosition.x === this.locationX &&
        holePosition.y === this.locationY
      );
      this.field[holePosition.y][holePosition.x] = hole;
    }
  }
  static createField(height, width, percent = 0.15) {
    const field = new Array(height).fill(0).map((a) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percent ? fieldCharacter : hole;
      }
    }
    return field;
  }
  startGame() {
    // Set the starting position
    const mode = prompt(`Select Mode
        Enter hard play Mode 1 or Enter any Key play Normal Mode : `);
    this.setStart();

    //<-----------Set Position HAT--------------->
    this.setHat();

    let playing = true;
    while (playing) {
      this.displayGame();
      this.getInput();

      if (!this.inField()) {
        console.log("You walk out of the designated field.");
        playing = false;
        break;
      } else if (this.foundHole()) {
        console.log("Monkey crash a tree");
        playing = false;
        break;
      } else if (this.foundHat()) {
        console.log("Monkey found a banana, Congrats");
        playing = false;
        break;
      }
      //<----------Create HARD MODE------------------->
      switch (mode) {
        case "1":
          if (Math.random() > 0.2) {
            this.addHole();
          }
          break;
      }
      // Update current location on map
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }
}
//<------------------กำหนดขอบเขตของบริเวณของเกม------------------>
const myGame = new Field(Field.createField(12, 12));
myGame.startGame();
