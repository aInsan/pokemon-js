const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (var i = 0; i < collisions.length; i+=70) {
	collisionsMap.push(collisions.slice(i,i+70))	
}



const boundaries = []
const offset = {
	x: -2016,
	y: -364
}

collisionsMap.forEach((row, i)  => {
	row.forEach((symbol,j) => {
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

const image = new Image()
image.src = './img/StarterTown.png'

const playerImage = new Image()
playerImage.src = './img/MayCharacter.png'
	

const player = new Sprite({
	position: {
		x: canvas.width / 2 - 32,
		y: canvas.height / 2 - 48
	},
	image: playerImage,
	hframes: {
		max:3
	},
	vframes: {
		max:4
	}
})

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y
	},
	image: image
})

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
const movables = [background, ...boundaries]

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
	
	
	let moving = true;
	if (keys.w.pressed && lastKey === 'w'){
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
