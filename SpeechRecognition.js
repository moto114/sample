const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');
const logDiv = document.querySelector('#log-div');

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = ''; // 確定した(黒の)認識結果
let logTranscript = '';

recognition.onresult = (event) => {
	let interimTranscript = ''; // 暫定(灰色)の認識結果
	for (let i = event.resultIndex; i < event.results.length; i++) {
	  let transcript = event.results[i][0].transcript;
	  if (event.results[i].isFinal) {
	    //finalTranscript += transcript;
	    finalTranscript = transcript;
		logTranscript += "<br>" + transcript;

	  } else {
	    interimTranscript = transcript;

	  }
	}
	resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';
	logDiv.innerHTML = logTranscript;
}

startBtn.onclick = () =>{
    recognition.start();
}
stopBtn.onclick = () =>{
    recognition.stop();
}
