import './style.css'
import bellaImg from './assets/bela_transp.png'

const app = document.querySelector('#app')

// Lógica de Persistência
const STORAGE_KEY = 'bella_chat_history'
let chatHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { text: "Olá! 👋 Eu sou a Bella. Estou aqui para te ajudar a encontrar o curso ideal e transformar sua carreira na beleza. Como posso te ajudar hoje?", isUser: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
]

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory))
}

app.innerHTML = `
  <header class="header">
    <div class="header-bottom">
      <div class="avatar-container">
        <img src="${bellaImg}" alt="Bella" class="avatar-img">
      </div>
      <div class="header-info">
        <h1>Bella</h1>
        <div class="status">Consultora de Carreira</div>
      </div>
    </div>
  </header>

  <div class="chat-container" id="chat-box"></div>

  <div class="input-area">
    <form class="input-container" id="chat-form">
      <input type="text" id="user-input" placeholder="Escreva sua mensagem..." autocomplete="off">
      <button type="submit" class="send-btn">
        <iconify-icon icon="ph:paper-plane-right-fill"></iconify-icon>
      </button>
    </form>
    <footer class="footer">
      <img src="/brand/logo_cor_horizontal.png" alt="Instituto Embelleze" class="footer-logo">
      <div class="footer-info">
        <p>Instituto da Beleza Goiana de Ensino e Serviços LTDA</p>
        <p>CNPJ: 19.367.067/0001-97</p>
      </div>
    </footer>
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

