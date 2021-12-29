class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.fuel = 185;
    this.life = 185;
  }

  getCount() {
    var pc = database.ref('playerCount');

    pc.on("value", (data) => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref('/').update({
      playerCount: count
    });
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;
    
    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

  static getPlayerInfo() {
    var playerInfo = database.ref('players');

    playerInfo.on("value", (data) => {
      allPlayersInfo = data.val();
    });
  }

  getDistance() {
    var playerDistance = database.ref('players/player' + this.index);

    playerDistance.on("value", (data) => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY
    });
  }

  update() {
    database.ref('players/player' + this.index).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    });
  }
}