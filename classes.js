class Sprite {
	constructor({ position, velocity, image, hframes = {max : 1}, vframes = {max : 1} }) {
		this.position = position
		this.image = image
		this.hframes = hframes
		this.vframes = vframes

		this.image.onload = () =>{
			this.width = this.image.width/this.hframes.max
			this.height =this.image.height/this.vframes.max
		}
		
	}

	draw() {
		c.drawImage(
		this.image,
		0,
		0,
		this.width,
		this.height,
		this.position.x,
		this.position.y,
		this.width, 
		this.height
	)
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
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}