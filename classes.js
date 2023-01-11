class Sprite {
	constructor({ position, velocity, image, hframes = {max : 1}, vframes = {max : 1}, sprites}) {
		this.position = position
		this.image = image
		this.hframes = {...hframes, val: 0, elapsed: 0}
		this.vframes = {...vframes, val: 0, elapsed: 0}

		this.image.onload = () =>{
			this.width = this.image.width/this.hframes.max
			this.height =this.image.height/this.vframes.max
		}
		this.moving = false
		this.sprites = sprites
		
	}

	draw() {
		c.drawImage(
		this.image,
		this.hframes.val * this.width,
		0,
		this.width,
		this.height,
		this.position.x,
		this.position.y,
		this.width, 
		this.height
		)

		if(!this.moving) return

		if(this.hframes.max > 1){
			this.hframes.elapsed++
		}
		if(this.hframes.elapsed % 10 === 0){
			if(this.hframes.val < this.hframes.max - 1) this.hframes.val++
			else this.hframes.val = 0
		}
		if(this.vframes.max > 1){
			this.vframes.elapsed++
		}
		if(this.vframes.elapsed % 10 === 0){
			if(this.vframes.val < this.vframes.max - 1) this.vframes.val++
			else this.vframes.val = 0
		}	
	}

}

class Boundary {
	static width = 64
	static height = 64
	constructor({position}) {
		this.position = position
		this.width = 64
		this.height = 64
	}

	draw(){
		c.fillStyle = 'rgba(255,0,0,0.0)'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}