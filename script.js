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
                if (this.style.textDecoration === "line-through") {
                    this.style.textDecoration = "none"
                } else {
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
        const input = document.createElement('input')
        const addTaskButton = document.createElement('button')
        addTaskButton.innerText = 'Dodaj zadanie'
        addTaskButton.style.marginLeft = '10px'

        addTaskButton.addEventListener('click', () => this.addTask(input.value))

        document.body.appendChild(input)
        document.body.appendChild(addTaskButton)
    }

    deleteClickHandler(e, index) {
        e.stopPropagation()
        this.tasks = this.tasks.slice(0, index).concat(this.tasks.slice(index + 1))
        this.render()
    }

}

class Task {
    constructor(text) {
        this.text = text
    }

}

const ToDo1 = new ToDo()

ToDo1.addTask('wynieś śmieci')