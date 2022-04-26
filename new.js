let text = [
  'ParmTree',
  'banana',
  'apple',
  'orange',
  'pineapple',
  'macBook',
  'javascript',
  'location',
  'python',
  'technology',
  "swift",
  'alert',
  'correct',
  'console.log',
  'neonstep',
  'Drive',
  'Fly',
  'chill',
  'smoke',
  'Goodboy',
  'Butterfly',
  'therapy',
  'Goodness',
  'Sundays',
  'skyline'
];




window.addEventListener("keydown", push_Keydown);


let randomText = Math.floor(Math.random() * text.length);
let text_length = text[randomText].length;
let typeCount = 0;
let miss = 0;
let correct = 0;
let text_i = 0;

const totalTime = 10000;
const oldTime = Date.now();
const start = document.getElementById("start");
const array = [];


// タイピングをカウント


function push_Keydown(Event) {
  // // キーを押したら、カウントダウンスタートして、問題を書き出す
  let keyCode = Event.key;
  start.innerHTML = text[randomText].substring(text_i, text_length);


  //問題とタイプがあっているか判定
  if (text[randomText].charAt(text_i) == keyCode) {
    text_i++;
    correct++;
  } else {
    miss++;
    correct++;
  }

  // 問題を打ち終えたら、新しい問題を書き出す挙動
  if (text_length - text_i === 0) {
    new Audio('/決定、ボタン押下17.mp3').play(); // 正解の音声再生;
    randomText = Math.floor(Math.random() * text.length);
    text_i = 0;
    text_length = text[randomText].length;
    start.innerHTML = text[randomText].substring(text_i, text_length);
  }

  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const diff = currentTime - oldTime;
    const remainMSec = totalTime - diff;
    const remainSec = Math.ceil(remainMSec / 1000);
    let label = ` ${remainSec} `;
    $('#log').html(label);
    // タイマーが０になった時の挙動
    if (remainMSec <= 0) {
      clearInterval(timerId);
      label = '終了!ミスは' + (miss - 1) + 'タイプ数は' + correct + 'です';
      $('#start').text('');
      $('#log').html(label);
    }
  }, 1000);
  start.innerHTML = text[randomText].substring(text_i, text_length)
}

// ---------------------------------------------------localStorage---------------------------------------

// セーブボタン押した時
$('#save').on('click', function () {
  const corrects = correct;
  const misses = miss;

  const data = {
    corrects: corrects,
    misses: misses,
  };
  const JsonData = JSON.stringify(data);
  localStorage.setItem('result', JsonData);
});

// clearボタン押した時
$('#clear').on('click', function () {
  localStorage.removeItem('result');
  $('#correctCount').val('');
  $('#missCount').val('');
});

// localStorageにデータがある時
if (localStorage.getItem('result')) {
  const JsonData = localStorage.getItem('result');
  const data = JSON.parse(JsonData);
  $('#correctCount').text(data.corrects);
  $('#missCount').text(data.misses);
}


//----------------------------------------------------- 画面ロケーションの設定-----------------------------------
$('#start').on('click', function () {
  window.location.href = './index.html';
});

$('#top').on('click', function () {
  window.location.href = './top.html';
});
