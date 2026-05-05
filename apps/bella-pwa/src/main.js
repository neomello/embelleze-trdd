import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <header class="header">
    <div class="avatar">B</div>
    <div class="header-info">
      <h1>Bella</h1>
      <div class="status">Online agora</div>
    </div>
  </header>

  <div class="chat-container" id="chat-box">
    <div class="message message-bella">
      Olá! 👋 Eu sou a Bella, consultora virtual do Instituto Embelleze Trindade. Como posso te ajudar a mudar de vida hoje?
      <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  </div>

  <div class="input-area">
    <form class="input-container" id="chat-form">
      <input type="text" id="user-input" placeholder="Digite sua mensagem..." autocomplete="off">
      <button type="submit" class="send-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  </div>
`

const chatBox = document.querySelector('#chat-box')
const chatForm = document.querySelector('#chat-form')
const userInput = document.querySelector('#user-input')

function addMessage(text, isUser = false) {
  const msgDiv = document.createElement('div')
  msgDiv.className = `message ${isUser ? 'message-user' : 'message-bella'}`
  msgDiv.innerHTML = `
    ${text}
    <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
  `
  chatBox.appendChild(msgDiv)
  chatBox.scrollTop = chatBox.scrollHeight
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = userInput.value.trim()
  if (!text) return

  addMessage(text, true)
  userInput.value = ''

  // Mock Bella response
  setTimeout(() => {
    addMessage("Que ótimo! Me conta mais sobre qual área da beleza você mais gosta: Cabelos, Maquiagem ou Unhas?")
  }, 1000)
})
