class ToDo {
    constructor(location) {
        this.tasks = []
        this.location = document.querySelector(location) || document.body
        this.render()
    }

    addTask(text) {
        this.tasks.push(new Task(text))

        this.render()
    }

    render() {
        this.location.innerHTML = ''
        const ul = document.createElement('ul')

        this.makeUI()

        this.tasks.forEach((task, index) => {
            const li = document.createElement('li')
            const button = document.createElement('button')

            li.innerText = task.text
            button.innerText = 'Usuń'
            button.style.marginLeft = '10px'

            li.addEventListener('click', function () {
                if (task.isComplited === true) {
                    task.toggleTask()
                    this.style.textDecoration = "none"
                } else {
                    task.toggleTask()
                    this.style.textDecoration = "line-through"
                }
            })

            button.addEventListener('click', (e) => this.deleteClickHandler(e, index))

            li.appendChild(button)
            ul.appendChild(li)
        })

        this.location.appendChild(ul)
    }

    makeUI() {
        const addTaskInput = document.createElement('input')
        const addTaskButton = document.createElement('button')
        const searchTaskInput = document.createElement('input')
        const searchTaskButton = document.createElement('button')

        addTaskButton.innerText = 'Dodaj zadanie'
        addTaskButton.style.marginLeft = '5px'

        searchTaskInput.style.marginLeft = '20px'

        searchTaskButton.innerText = 'Wyszukaj'
        searchTaskButton.style.marginLeft = '5px'

        addTaskButton.addEventListener('click', () => this.addTask(addTaskInput.value))
        searchTaskButton.addEventListener('click', this.findTask(searchTaskInput.value))

        document.body.appendChild(addTaskInput)
        document.body.appendChild(addTaskButton)
        document.body.appendChild(searchTaskInput)
        document.body.appendChild(searchTaskButton)
    }

    deleteClickHandler(e, index) {
        e.stopPropagation()
        this.tasks = this.tasks.slice(0, index).concat(this.tasks.slice(index + 1))
        this.render()
    }

    findTask(input) {
        return this.tasks.filter(task => {
            task.text.replace(/\s/g, '').toLowerCase() === input.replace(/\s/g, '').toLowerCase()
        })
    }

}

class Task {
    constructor(text) {
        this.text = text
        this.isComplited = false
    }

    toggleTask() {
        this.isComplited = !this.isComplited
    }

}

const ToDo1 = new ToDo()

ToDo1.addTask('wynieś śmieci')