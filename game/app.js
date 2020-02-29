// 재료 준비
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

// 기본 값 
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 아무것도 채우지 않은 상태에서 저장하면 배경값이 투명이 되기때문에 디폴트 처럼 초기값을 준다.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

// 함수 시작

function stopPainting() { // 마우스를 땠을때
    painting = false;
}


function startPainting() { // 마우스를 눌렀을때
    painting = true;
}


function onMouseMove(event) { // 마우스가 캔버스안에서 움직일때 
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { // 마우스를 땟다면
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else { // 마우스를 눌렀다면 라인을 그리고 그 선을 연결시켜라.
      ctx.lineTo(x, y);
      ctx.stroke();
    }
}

function handleColorClick(event) { // 컬러를 클릭하면 그에 따른 색깔이 바뀐다.
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) { // 브러쉬 사이즈 크기
    const size = event.target.value;
    ctx.lineWidth = size;
}
  
function handleModeClick() {
    // 필 = 캔버스를 색으로 채운다 / 페인드 = 캔버스를 볼펜으로 그린다.
    if (filling === true) { // 필상태에서 버튼을 누른다면,
      filling = false; //필은 지속되지 않고 
      mode.innerText = "Fill"; // 버튼도 필로 바뀐다.
    } else { // 필상태 아닌데 버튼을 눌렀다면
      filling = true; // 필을 시작할 준비가되고
      mode.innerText = "Paint"; // 버튼에는 페인트로 바뀜
    }
}
  
  function handleCanvasClick() {
    if (filling) { // 캔버스의 크기만큼 채워라.
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) { // 우 클릭 막는 함수.
    event.preventDefault();
}
  
function handleSaveClick() { // 저장버튼을 누른다면
    const image = canvas.toDataURL(); // 데이터 url을 받아서
    const link = document.createElement("a"); // 링크로 담는다.
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 캔버스 안에서 움직일때
    canvas.addEventListener("mousedown", startPainting); // 마우스를 누르기 시작했을때 
    canvas.addEventListener("mouseup", stopPainting); // 마우스를 땟을때
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 떠났을때
    canvas.addEventListener("click", handleCanvasClick); // 캔버스를 눌렀을때
    canvas.addEventListener("contextmenu", handleCM); // 우클릭 금지
}
  

colors.forEach(color => { // 팔레트에 클릭이벤트를 건다.
    color.addEventListener("click", handleColorClick)
});
  
if (range) { //인풋 레인지에 이벤트를 건다.
    range.addEventListener("input", handleRangeChange);
}
  
if (mode) { // 모드를 눌렀을때
    mode.addEventListener("click", handleModeClick);
}
  
if (saveBtn) { // 저장버튼을 눌렀을때
    saveBtn.addEventListener("click", handleSaveClick);
}
  




















