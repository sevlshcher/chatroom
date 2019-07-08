const socket = io('http://localhost:3000')
const messageForm = document.getElementById('input-wrapper')
const messageInput = document.getElementById('message-input')
const chatList = document.querySelector('.chat-list')
const modal = document.querySelector('.modal')
const userForm = document.getElementById('input-wrapper-modal')
const nameInput = document.getElementById('fullname')
const nickInput = document.getElementById('nickname')
const usersOn = document.querySelector('.usersOn')

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    console.log(name)
    appendUser(name)
})

socket.on('user-disconnected', name => {
    appendUser(`${name}`)
})

userForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = nameInput.value
    const nick = nickInput.value
    if (name === '' || nick === '') {
        alert('Незаполненное поле формы')
    } else {
        socket.emit('new-user', name)
        modal.style.display = 'none'
        nameInput.value = ''
        nickInput.value = ''
    }
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const chatElement = document.createElement('div')
    chatElement.innerText = message
    chatList.append(chatElement)
}

function appendUser(name) {
    const user = document.createElement('li')
    usersOn.innerText = name
    usersOn.append(user)
}