const path = require('path')
const fs = require('fs')


const getPostTitle = function() {
	let title = ''
	if (process.argv[2] === 'new') {
		let args = process.argv.slice(3)
		title = args.join('_')
	}
	return title
}


const getPostPath = function() {
	let d = new Date()
	let year = d.getFullYear()
	let month = d.getMonth()
	let day = d.getDate()
	let file_path = path.resolve(__dirname, `${year}/${month}/${day}`)
	if (!fs.existsSync(file_path)) {
		fs.mkdirSync(file_path, {recursive: true})
	}
	return file_path
}


const createPost = function(title, content='new post') {
	if (!title) {
		console.log('缺少文章名称')
		return
	}
	let file_path = getPostPath()
	let post = path.resolve(file_path, `${title}.md`)
	fs.writeFileSync(post, content)
}


const __main = function() {
	let title = getPostTitle()
	createPost(title, '## 这是测试文章的内容')
}

// __main()


class Post {
	constructor (title, content) {
		this.title = title
		this.content = content
	}
	create () {
		let file_path = getPostPath()
		let title = this.title ? this.title.replace(' ', '_') : `Default_Post_${Date.now()}`
		let post = path.resolve(file_path, `${title}.md`)
		fs.writeFileSync(post, this.content || 'default')
	}
}

let p = new Post()
p.create()