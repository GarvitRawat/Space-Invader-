var explosionSound, backgroundSound, laserSound
var player, playerImg
var bullet, bulletImg
var asteroid, asteroidImg
var bulletGroup
var enemy, enemyImg, random, enemyGroup, asteroidGroup, enemyGroup
var score = 0,
  lives = 3
var speed
var gameState
var PLAY = 1
var END = 0
// use get() for reference
//and use it to fix the error


function preload() {
  playerImg = loadImage("spaceship.png")
  bulletImg = loadImage("bullet.png")
  enemyImg = loadImage("enemy.png")
  asteroidImg = loadImage("asteroid.png")
  explosionSound = loadSound("explosion.wav")
  backgroundSound = loadSound("background.wav")
  laserSound = loadSound("laser.wav")


}

function setup() {
  createCanvas(400, 400)

  bulletGroup = new Group()
  enemyGroup = new Group()
  asteroidGroup = new Group()

  player = createSprite(250, 350, 20, 20)
  player.addImage(playerImg)

  gameState = PLAY
  backgroundSound.loop()
}

function draw() {
  background(0)
  textSize(28)
  reset()
  text("Score: " + score, 270, 30)
  text("Lives: " + lives, 30, 30)

  if (gameState === PLAY) {

    playerMovement()

    if (keyWentDown("space")) {
      bullet = createSprite(250, 310, 20, 20)
      bullet.addImage(bulletImg)
      bullet.visible = true
      bullet.x = player.x
      bullet.velocityY = -6
      bullet.lifetime = 90
      bulletGroup.add(bullet)
      laserSound.play()

    }

    spawnEnemies()

    spawnAsteroids()

    if (bulletGroup.isTouching(enemyGroup)) {
      enemyGroup.destroyEach()
      bulletGroup.destroyEach()
      score = score + 1
      explosionSound.play()
    }

    if (player.isTouching(asteroidGroup) && lives > -1) {
      lives = lives - 1
      asteroidGroup.destroyEach()
      explosionSound.play()
    }

    if (lives === 0) {
      gameState = END
    }
  }

  if (gameState === END) {

    textSize(32)
    text("GAME OVER", 110, 200)
    text("Press R to restart", 90, 250)
    enemyGroup.setVelocityYEach(0)
    bulletGroup.setVelocityYEach(0)
    asteroidGroup.setVelocityYEach(0)

    enemy.lifetime = -1
    bulletGroup.lifetime = -1
    asteroidGroup.lifetime = -1

  }

  drawSprites()

}

function playerMovement() {
  if (keyDown("a")) {
    player.x = player.x - 6
  }

  if (keyDown("d")) {
    player.x = player.x + 6
  }
}

function spawnEnemies() {

  if (frameCount % 60 === 0) {
    enemy = createSprite(Math.round(random(10, 350)), 0, 20, 20)
    enemy.addImage(enemyImg)
    enemy.lifetime = 100
    enemy.scale = 0.8
    enemy.velocityY = 5 + score/5
    console.log(enemy.velocityY)
    enemyGroup.add(enemy)
    //enemyGroup.setVelocityYEach(5 + score/10)
  }
}

function spawnAsteroids() {
  if (frameCount % 80 === 0) {
    asteroid = createSprite(Math.round(random(10, 350)), 0, 20, 20)
    asteroid.addImage(asteroidImg)
    asteroid.lifetime = 100
    asteroid.scale = 0.8
    asteroid.velocityY = 5 + score/5
    asteroidGroup.add(asteroid)
    asteroid.collide(player)
    //asteroidGroup.setVelocityYEach(6 + score/10)
  }
}

function reset() {
  if (keyDown("r") && gameState === END) {
    gameState = PLAY
    score = 0
    lives = 3
    enemyGroup.destroyEach()
    bulletGroup.destroyEach()
    asteroidGroup.destroyEach()
  }

}