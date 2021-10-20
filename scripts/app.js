const DOMKeyDisplay = document.getElementById('keyDisplay');
const DOMUserInput = document.getElementById('userInput');
const DOMResultTxt = document.getElementById('resultTxt');
const USP = new URLSearchParams(location.search);
const ENDC = USP.has('key') ? new EncryptDecrypt(USP.get('key')) : new EncryptDecrypt();
DOMUserInput.value = USP.has('txt') ? USP.get('txt') : null;

DOMKeyDisplay.value = ENDC.KEY;
let TxT = "", ProTxt = "";

DOMKeyDisplay.addEventListener('keyup', () => ENDC.changeKEY(DOMKeyDisplay.value))

function encrypt() { DOMResultTxt.innerText = ENDC.encrypt(DOMUserInput.value) }
function decrypt() { DOMResultTxt.innerText = ENDC.decrypt(DOMUserInput.value) }

function clipboard(con) {
    let value = String(con).toUpperCase() === 'KEY' ? ENDC.KEY : DOMResultTxt.innerText;
    navigator.clipboard.writeText(value);
}