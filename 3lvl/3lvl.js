const maze = document.getElementById('maze')
const player = document.getElementById('player')
const start = document.getElementById('start')
const finish = document.getElementById('finish')
const audio = document.getElementById('audio')
const image = document.getElementById('image')

const initialX = 750
const initialY = 650

let isGameOver = false
let initialPosition = { x: start.offsetLeft, y: start.offsetTop }

function checkCollision(element) {
	const playerRect = player.getBoundingClientRect()
	const elementRect = element.getBoundingClientRect()
	return !(
		playerRect.right < elementRect.left ||
		playerRect.left > elementRect.right ||
		playerRect.bottom < elementRect.top ||
		playerRect.top > elementRect.bottom
	)
}

function movePlayer(e) {
	if (isGameOver) return

	const { top, left } = maze.getBoundingClientRect()
	let x = e.clientX - left - player.clientWidth / 2
	let y = e.clientY - top - player.clientHeight / 2

	if (x < 0) x = 0
	if (y < 0) y = 0
	if (x > maze.clientWidth - player.clientWidth)
		x = maze.clientWidth - player.clientWidth
	if (y > maze.clientHeight - player.clientHeight)
		y = maze.clientHeight - player.clientHeight

	player.style.left = `${x}px`
	player.style.top = `${y}px`

	const walls = document.querySelectorAll('.wall')
	walls.forEach(wall => {
		if (checkCollision(wall)) {
			player.style.left = `${initialPosition.x}px`
			player.style.top = `${initialPosition.y}px`
			e.clientX = player.style.left
			e.clientY = player.style.top
			
			audio.play() // Воспроизвести музыку
			image.style.display = 'block' // Показать изображение
			
			setTimeout(() => {
				audio.pause() // Приостановить музыку через 3 секунды
				audio.currentTime = 0 // Сбросить воспроизведение музыки
				image.style.display = 'none' // Скрыть изображение
			}, 3000)
      window.location.href = '/Project_Labyrinth_of_Fright/1lvl/1lvl.html'
		}
	})

	if (checkCollision(finish)) {
		isGameOver = true
		audio.play() // Воспроизвести музыку
		window.location.href = '/Project_Labyrinth_of_Fright/1lvl/1lvl.html'
		image.style.display = 'block' // Показать изображение
		setTimeout(() => {
			audio.pause() // Приостановить музыку через 3 секунды
			audio.currentTime = 0 // Сбросить воспроизведение музыки
			image.style.display = 'none' // Скрыть изображение
			
		}, 3000)
    
	}
}

maze.addEventListener('mousemove', movePlayer)
