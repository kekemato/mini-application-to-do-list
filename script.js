(function () {
    class ToDo {
    constructor(location) {
        this.tasks = JSON.parse(localStorage.getItem('toDoList')) || []
        this.location = location || document.body
        this.init()
    }

    init() {
        this.render()
    }

    makeUI() {
        const addTaskInput = document.createElement('input')
        const addTaskButton = document.createElement('button')
        const searchTaskInput = document.createElement('input')
        const searchTaskButton = document.createElement('button')
        const filterButtonsContainer = document.createElement('p')
        const showAllButton = document.createElement('button')
        const showCompletedButton = document.createElement('button')
        const showUncompletedButton = document.createElement('button')

        addTaskButton.innerText = 'Dodaj zadanie'
        addTaskButton.style.marginLeft = '5px'

        searchTaskInput.style.marginLeft = '20px'

        searchTaskButton.innerText = 'Wyszukaj'
        searchTaskButton.style.marginLeft = '5px'

        addTaskButton.addEventListener('click', () => this.addTask(addTaskInput.value))
        searchTaskButton.addEventListener('click', () => this.findTask(searchTaskInput.value))

        showAllButton.innerText = "Pokaż wszystkie"
        showUncompletedButton.innerText = "Pokaż nieukończone"
        showCompletedButton.innerText = "Pokaż ukończone"

        showUncompletedButton.style.marginLeft = "15px"
        showCompletedButton.style.marginLeft = "15px"

        showAllButton.addEventListener('click', () => this.render())
        showCompletedButton.addEventListener('click', () => this.findCompletedTasks())
        showUncompletedButton.addEventListener('click', () => this.findUncompletedTasks())

        this.location.appendChild(addTaskInput)
        this.location.appendChild(addTaskButton)
        this.location.appendChild(searchTaskInput)
        this.location.appendChild(searchTaskButton)
        filterButtonsContainer.appendChild(showAllButton)
        filterButtonsContainer.appendChild(showCompletedButton)
        filterButtonsContainer.appendChild(showUncompletedButton)
        this.location.appendChild(filterButtonsContainer)

    }

    render(arr) {
        this.location.innerHTML = ''
        const ul = document.createElement('ul')
        const array = arr || this.tasks

        this.makeUI()

        array.forEach((task, index) => {
            const li = document.createElement('li')
            const button = document.createElement('button')

            li.innerText = task.text
            button.innerText = 'Usuń'
            button.style.marginLeft = '10px'

            li.addEventListener('click', () => this.toggleTask(task))

            button.addEventListener('click', (e) => this.deleteClickHandler(e, index))

            this.taskIsCompletedStyle(task, li)

            li.appendChild(button)
            ul.appendChild(li)
        })

        this.location.appendChild(ul)
    }

    addTask(text) {
        this.tasks.push(new Task(text))

        this.updateListInLocalStorage()
        this.render()
    }

    deleteClickHandler(e, index) {
        e.stopPropagation()
        this.tasks = this.tasks.slice(0, index).concat(this.tasks.slice(index + 1))

        this.updateListInLocalStorage()
        this.render()
    }

    toggleTask(task) {
        if (task.isCompleted === true) {
            task.isCompleted = false
        } else {
            task.isCompleted = true
        }

        this.updateListInLocalStorage()
        this.render()
    }

    taskIsCompletedStyle(task, taskContainer) {
        if (task.isCompleted === false) {
            taskContainer.style.textDecoration = "none"
        } else {
            taskContainer.style.textDecoration = "line-through"
        }
    }

    findTask(input) {
        const tasksFiltered = this.tasks.filter(task => task.text.replace(/\s/g, '').toLowerCase().includes(input.replace(/\s/g, '').toLowerCase()))
        this.render(tasksFiltered)
    }

    findCompletedTasks() {
        const completedTasks = this.tasks.filter(task => task.isCompleted === true)
        this.render(completedTasks)
    }

    findUncompletedTasks() {
        const uncompletedTasks = this.tasks.filter(task => task.isCompleted === false)
        this.render(uncompletedTasks)
    }

    updateListInLocalStorage() {
        localStorage.setItem('toDoList', `${JSON.stringify(this.tasks)}`)
    }

}

class Task {
    constructor(text) {
        this.text = text
        this.isCompleted = false
    }
}

window.ToDo = ToDo
})()
