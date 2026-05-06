import './style.css'
import bellaImg from './assets/bela_transp.png'

const app = document.querySelector('#app')

// Lógica de Persistência
const STORAGE_KEY = 'bella_chat_history'
let chatHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { text: "Olá! 👋 Eu sou a Bella, consultora virtual do Instituto Embelleze Trindade. Como posso te ajudar a mudar de vida hoje?", isUser: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
]

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory))
}

app.innerHTML = `
  <header class="header">
    <div class="header-top">
      <img src="/brand/logo_cor_horizontal.png" alt="Instituto Embelleze" class="client-logo">
    </div>
    <div class="header-bottom">
      <div class="avatar-container">
        <img src="${bellaImg}" alt="Bella" class="avatar-img">
      </div>
      <div class="header-info">
        <h1>Bella</h1>
        <div class="status">Consultora SDR</div>
      </div>
    </div>
  </header>

  <div class="chat-container" id="chat-box"></div>

  <div class="input-area">
    <form class="input-container" id="chat-form">
      <input type="text" id="user-input" placeholder="Pergunte sobre cursos ou carreira..." autocomplete="off">
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

function renderMessage(msg) {
  const msgDiv = document.createElement('div')
  msgDiv.className = `message ${msg.isUser ? 'message-user' : 'message-bella'}`
  msgDiv.innerHTML = `
    ${msg.text}
    <span class="time">${msg.time}</span>
  `
  chatBox.appendChild(msgDiv)
  chatBox.scrollTop = chatBox.scrollHeight
}

function addMessage(text, isUser = false) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const newMsg = { text, isUser, time }
  chatHistory.push(newMsg)
  renderMessage(newMsg)
  saveHistory()
}

// Carregar histórico inicial
chatHistory.forEach(renderMessage)

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = userInput.value.trim()
  if (!text) return

  addMessage(text, true)
  userInput.value = ''

  // Mock Bella response (Futura integração Azure)
  setTimeout(() => {
    addMessage("Que ótimo! Me conta mais sobre qual área da beleza você mais gosta: Cabelos, Maquiagem ou Unhas?")
  }, 1000)
})

