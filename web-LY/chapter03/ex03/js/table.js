// 点击单元格11,使表格的背景颜色变成红色;
function changeBackColor() {
  let obj = document.getElementById('tbl');
  let currentClass = obj.className;
  if(currentClass === 'tbl') {
  	obj.className = '';
  }else {
  	obj.className = 'tbl';
  }
}

// 点击单元格12,将单元格的内容变成当前的日期,其格式为(yyyy-mm-dd);
function changeText() {
  let obj = document.getElementById('t-12');
  obj.innerHTML = moment().format('YYYY-MM-DD');
}

//点击单元格21,将在现有单元格后面插入一行;
function addRow() {
  let obj = document.getElementById('tbl');
  obj.innerHTML = obj.innerHTML + '<tr><td>new</td><td>new</td></tr>';
}

//点击单元格22,将删除表格的第2行;
function delRow(obj) {
  obj.parentNode.remove();
}

//点击单元格31,显示当前的鼠标坐标;
function showLoation() {
  let x = event.clientX;
  let y = event.clientY;
  console.log(x, y);
}

//点击单元格32,打开一个新窗口,里面显示主页;
function newPage() {
  window.open('https://blog.csdn.net/qq_44537414');
}