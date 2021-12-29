class Game {
  constructor() {}

  getState() {
    var state = database.ref('gameState');

    state.on("value", (data) => {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  start() {
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage(car1Img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage(car2Img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.class("gameTitleAfterEffects");
    form.titleImg.position(40, 50);
  }

  play() {
    this.handleElements();
    
    Player.getPlayerInfo();

    if (allPlayerInfo != undefined) {
      image(trackImg, 0, -height * 5, width, height * 6);
      var a = 0;
      for (var b in allPlayerInfo) {
        a = a + 1;

        var x = allPlayerInfo[b].positionX;
        var y = height - allPlayerInfo[b].positionY;
        cars[a - 1].position.x = x;
        cars[a - 1].position.y = y;

        if (a == player.index) {
          stroke(0);
          fill(255);
          ellipse(x, y, 60, 60);
          
          camera.position.x = cars[a - 1].position.x;
          camera.position.y = cars[a - 1].position.y;
        }
      }
      this.handlePlayerControls();

      drawSprites();
    }
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10
      player.update();
    }
  }
}