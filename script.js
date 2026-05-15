document.addEventListener("DOMContentLoaded", () => {
const pages = {
home: document.getElementById("homeSection"),
reward: document.getElementById("rewardSection"),
market: document.getElementById("marketSection"),
profile: document.getElementById("profileSection")
};

const navButtons = {
home: document.getElementById("homeBtn"),
reward: document.getElementById("rewardBtn"),
market: document.getElementById("marketBtn"),
profile: document.getElementById("profileBtn")
};

function showPage(page){
Object.values(pages).forEach(section => section.classList.remove("active-page"));
pages.classList.add("active-page");
Object.values(navButtons).forEach(btn => btn.classList.remove("active-nav"));
navButtons.classList.add("active-nav");
window.scrollTo({top:0,behavior:"smooth"});
}

navButtons.home.onclick = () => showPage("home");
navButtons.reward.onclick = () => showPage("reward");
navButtons.market.onclick = () => showPage("market");
navButtons.profile.onclick = () => showPage("profile");

const popup = document.getElementById("popup");
function showPopup(msg){
popup.innerText = msg;
popup.classList.add("show");
setTimeout(() => popup.classList.remove("show"), 2000);
}

document.querySelectorAll(".popup-btn").forEach(button => {
button.addEventListener("click", () => showPopup("Service disponible bientôt"));
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("change", () => {
document.body.classList.toggle("light");
});

const rankBadge = document.getElementById("rankBadge");
const levelText = document.getElementById("levelText");
const levelPercent = document.getElementById("levelPercent");
const rankModal = document.getElementById("rankModal");
const closeRank = document.getElementById("closeRank");

let userLevel = 1;
let userXP = 1;
let userId = "BCC9876543";

function updateRank(){
let rank = "🥉 Bronze";
if(userLevel >= 16 && userLevel <= 30) rank = "🥈 Silver";
else if(userLevel >= 31 && userLevel <= 45) rank = "🥇 Gold";
else if(userLevel >= 50) rank = "💎 Diamond";
rankBadge.innerText = rank;
levelText.innerText = `Niveau ${userLevel}`;
levelPercent.innerText = `${userXP}%`;
}

rankBadge.addEventListener("click", () => rankModal.classList.remove("hidden"));
closeRank.addEventListener("click", () => rankModal.classList.add("hidden"));

document.getElementById("notifBtn").addEventListener("click", () => {
showPopup("Aucune notification");
});

const balanceText = document.getElementById("balanceText");
const cfaText = document.getElementById("cfaText");
const toggleBalance = document.getElementById("toggleBalance");
let visible = true;
let realBalance = 0;

toggleBalance.addEventListener("click", () => {
visible =!visible;
if(visible){
balanceText.innerText = realBalance;
cfaText.innerText = `≈ ${realBalance * 5} CFA`;
toggleBalance.innerHTML = '<i class="fa-regular fa-eye"></i>';
}else{
balanceText.innerText = "••••";
cfaText.innerText = "≈ ••••";
toggleBalance.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
}
});

const contactBtn = document.getElementById("contactBtn");
const contactInfo = document.getElementById("contactInfo");
contactBtn.addEventListener("click", () => {
contactInfo.classList.toggle("show");
});

const actionModal = document.getElementById("actionModal");
const actionTitle = document.getElementById("actionTitle");
const actionContent = document.getElementById("actionContent");
const closeAction = document.getElementById("closeAction");
const sendBtn = document.getElementById("sendBtn");

document.querySelectorAll(".action-btn").forEach(btn => {
btn.addEventListener("click", (e) => {
let action = e.currentTarget.dataset.action;
openActionModal(action);
});
});

closeAction.addEventListener("click", () => actionModal.classList.add("hidden"));

function openActionModal(action, prefillId = ""){
actionModal.classList.remove("hidden");
if(action === "send"){
actionTitle.innerText = "Envoyer BCC";
actionContent.innerHTML = `
<div class="action-form">
<label>ID BCC</label>
<input type="text" id="sendId" placeholder="BCC123456" value="${prefillId}">
<label>Montant</label>
<input type="number" id="sendAmount" placeholder="0">
<label>Montant reçu</label>
<input type="text" id="receivedAmount" readonly>
<p class="fee-text">Frais BCC 1%</p>
<button id="confirmSend">Envoyer</button>
</div>`;
document.getElementById("sendAmount").addEventListener("input", (e) => {
let amt = parseFloat(e.target.value) || 0;
let fee = amt * 0.01;
document.getElementById("receivedAmount").value = (amt - fee).toFixed(2);
});
document.getElementById("confirmSend").addEventListener("click", () => {
showPopup("Transfert envoyé");
actionModal.classList.add("hidden");
sendBtn.classList.add("shrink");
setTimeout(() => sendBtn.classList.remove("shrink"), 300);
});
}

if(action === "receive"){
actionTitle.innerText = "Votre ID BCC";
actionContent.innerHTML = `<div class="id-display">${userId}</div>`;
}

if(action === "scan"){
actionTitle.innerText = "Scanner & Envoyer";
actionContent.innerHTML = `
<div class="action-form">
<p>Activation de la caméra...</p>
<video id="video" width="100%" height="200" style="border-radius:15px;background:#000;"></video>
<button id="scanBtn">Démarrer le scan</button>
</div>`;
navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}})
.then(stream => {
document.getElementById("video").srcObject = stream;
showPopup("Caméra activée");
})
.catch(() => showPopup("Caméra non disponible"));
document.getElementById("scanBtn").addEventListener("click", () => {
actionModal.classList.add("hidden");
openActionModal("send", "BCC123456");
showPopup("ID scanné: BCC123456");
});
}

if(action === "convert"){
actionTitle.innerText = "Convertir BCC";
actionContent.innerHTML = `
<div class="action-form">
<label>Choisis le mode de paiement</label>
<select id="paymentMethod">
<option value="">-- Sélectionner --</option>
<option value="wave">Wave</option>
<option value="orange">Orange Money</option>
<option value="mtn">MTN Money</option>
<option value="moov">Moov Money</option>
</select>
<div id="paymentDetails"></div>
</div>`;
document.getElementById("paymentMethod").addEventListener("change", (e) => {
let method = e.target.value;
if(method){
document.getElementById("paymentDetails").innerHTML = `
<label>Numéro utilisé à l'inscription</label>
<input type="text" placeholder="07 00 00 00 00">
<button id="convertBtn">Valider</button>`;
document.getElementById("convertBtn").addEventListener("click", () => showPopup("Demande envoyée"));
}
});
}
}

const quotes = [
"Le succès appartient à ceux qui n'abandonnent jamais.",
"Chaque jour est une nouvelle opportunité.",
"La persévérance mène au succès."
];
const quotePopup = document.getElementById("quotePopup");
const quoteText = document.getElementById("quoteText");
const closeQuote = document.getElementById("closeQuote");

if(document.getElementById("centerBtn")){
document.getElementById("centerBtn").addEventListener("click", () => {
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
quoteText.innerText = randomQuote;
quotePopup.classList.remove("hidden");
});
}

if(closeQuote){
closeQuote.addEventListener("click", () => quotePopup.classList.add("hidden"));
}

updateRank();
});
