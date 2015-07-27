$(document).ready (function() {
  var competitors = [
    new Player("player1", 65),
    new Player("player2", 76),
  ];
  game = new Game(competitors);

  $(document).on("keyup", game.keyup);
});

function Player(name, key) {
  this.name = name;
  this.key = key;
};

Player.prototype.row = function () {
  return "#" + this.name + "_strip";
};

Player.prototype.player_class = function () {
  return this.name;
};

Player.prototype.current_location = function () {
  return "." + this.name;
};

Player.prototype.current_space = function () {
  return $(this.row()).find(this.current_location());
};

function Game(competitors) {
  this.players = [];
  
  for(i = 0; i < competitors.length; i++) {
    this.players.push(competitors[i]);
  };
};

Game.prototype.win_check = function (next_space, player) {
  if(next_space.length === 0){
    alert(player.name + " wins!");
    location.reload();
  };
};

Game.prototype.render = function (next_space, player) {
  player.current_space().removeClass();
  next_space.addClass(player.player_class());
};

Game.prototype.advance = function (player) {
  var next_space = player.current_space().next();
  this.win_check(next_space, player);
  this.render(next_space, player);
};

Game.prototype.keyup = function (event) {
  var key = event.which;
  var player = 0;

  for(i = 0; i < game.players.length; i++) {
    if(game.players[i].key === key) {
      player = game.players[i];
    };
  };

  if(player !== 0) {
    game.advance(player);
  };
};
