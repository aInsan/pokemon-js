const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

//create an empty array called collisionsMap
const collisionsMap = []
//iterating over the collisions array
for (var i = 0; i < collisions.length; i+=70) {
    //slicing the collisions array by 70 items and adding each slice to the collisionsMap array
	collisionsMap.push(collisions.slice(i,i+70))	
}

//Create an empty array called boundaries
const boundaries = []
//An object that has two properties x and y which are used for offsetting the drawing position.
const offset = {
	x: -2016,
	y: -364
}

//iterating over the collisionsMap array
collisionsMap.forEach((row, i)  => {
	//iterating over each sub array of the collisionsMap
    row.forEach((symbol,j) => {
        //If the symbol is 5504, a new boundary object is created with the positions
		if(symbol === 5504)
		boundaries.push(
			new Boundary({
				position: {
					x: j * Boundary.width + offset.x,
					y: i * Boundary.height + offset.y
				}
			})
		)
	})
})

//create new Image elements
const backgroundImage = new Image()
backgroundImage.src = './img/StarterTown.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const playerUpImage = new Image()
playerUpImage.src = './img/mayUp.png'

const playerDownImage = new Image()
playerDownImage.src = './img/mayDown.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/mayLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/mayRight.png'

// Create a new player sprite object
const player = new Sprite({
	position: {
		x: canvas.width / 2 - 32,
		y: canvas.height / 2 - 48
	},
	// assign playerDownImage to the image property
	image: playerDownImage,
	// create hframes object with max property
	hframes: {
		max:4
	},
	// create sprites object with four properties
	sprites: {
		up: playerUpImage,
		down: playerDownImage,
		left: playerLeftImage,
		right: playerRightImage
	}
})

// Create new sprite object for background
const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y
	},
	// assign backgroundImage to the image property
	image: backgroundImage
})

// Create new sprite object for foreground
const foreground = new Sprite({
	position: {
		x: offset.x,
		y: offset.y
	},
	// assign foregroundImage to the image property
	image: foregroundImage
})

//Create an object called keys
const keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	}
}
// create a movables array containing background,boundaries and foreground
const movables = [background, ...boundaries, foreground]



function rectCollision({rect1, rect2}){
	if(rect1 == player){
		return(
		rect1.position.x + rect1.width - 4 >= rect2.position.x &&
		rect1.position.x + 4 <= rect2.position.x + rect2.width &&
		rect1.position.y + 56 <= rect2.position.y + rect2.height &&
		rect1.position.y + rect1.height - 8 >= rect2.position.y

		)
	}
	else {
		return(
		rect1.position.x + rect1.width >= rect2.position.x &&
		rect1.position.x <= rect2.position.x + rect2.width &&
		rect1.position.y <= rect2.position.y + rect2.height &&
		rect1.position.y + rect1.height >= rect2.position.y
		)
	}
}
function animate() {
	window.requestAnimationFrame(animate)
	background.draw()
	boundaries.forEach(boundary => {
		boundary.draw()
	})
	player.draw()
	foreground.draw()
	
	let moving = true
	player.moving = false
	if (keys.w.pressed && lastKey === 'w'){
		player.moving = true
		player.image = player.sprites.up
		for (var i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if(
				rectCollision({
					rect1:player,
					rect2:{...boundary, position: {
						x:boundary.position.x,
						y:boundary.position.y + 5
					}}
				})
			){
			console.log('colliding')
			moving = false;
			break
			}
		}
		if(moving)
			movables.forEach((movable) => {
				movable.position.y += 5
		})
	}
	else if (keys.a.pressed && lastKey === 'a'){
		player.moving = true
		player.image = player.sprites.left
		for (var i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if(
				rectCollision({
					rect1:player,
					rect2:{...boundary, position: {
						x:boundary.position.x + 5,
						y:boundary.position.y 
					}}
				})
			){
			console.log('colliding')
			moving = false;
			break
			}
		}
		if(moving)
			movables.forEach((movable) => {
				movable.position.x += 5
		})
	}
	else if (keys.s.pressed && lastKey === 's'){
		player.moving = true
		player.image = player.sprites.down
		for (var i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if(
				rectCollision({
					rect1:player,
					rect2:{...boundary, position: {
						x:boundary.position.x,
						y:boundary.position.y - 5
					}}
				})
			){
			console.log('colliding')
			moving = false;
			break
			}
		}
		if(moving)
			movables.forEach((movable) => {
				movable.position.y -= 5
		})
	}
	else if (keys.d.pressed && lastKey === 'd'){
		player.moving = true
		player.image = player.sprites.right
		for (var i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if(
				rectCollision({
					rect1:player,
					rect2:{...boundary, position: {
						x:boundary.position.x - 5,
						y:boundary.position.y 
					}}
				})
			){
			console.log('colliding')
			moving = false;
			break
			}
		}
		if(moving)
			movables.forEach((movable) => {
				movable.position.x -= 5
		})
	}
}
animate();

let lastKey = ''
window.addEventListener('keydown', (e) => {
	switch(e.key){
	case 'w':
		keys.w.pressed = true
		lastKey = 'w'
		break
	case 'a':
		keys.a.pressed = true
		lastKey = 'a'
		break
	case 's':
		keys.s.pressed = true
		lastKey = 's'
		break
	case 'd':
		keys.d.pressed = true
		lastKey = 'd'
		break
	}
})

window.addEventListener('keyup', (e) => {
	switch(e.key){
	case 'w':
		keys.w.pressed = false
		break
	case 'a':
		keys.a.pressed = false
		break
	case 's':
		keys.s.pressed = false
		break
	case 'd':
		keys.d.pressed = false
		break
	}
})
