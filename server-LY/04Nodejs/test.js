const fs = require('fs');
const FILE = 'study.txt';
//文件的列名
const [ST_NAME, ST_TIME, ST_TYPE, ST_MONEY] = [0, 1, 2, 3];
const arg = process.argv.splice(2);


//文件数据包初始化
const InitData = (res=[]) => {
	fs.readFileSync(FILE).toString().split(/\n/).forEach((val) => {
    res = [val.split(/\s+/),...res]
  });
  return res;
}

//筛选信息 -n 或 -l
const GetSumInfo = (data, name, res=[]) => {
  if(name === undefined){ //-l
    return data;
  } else { // -n
    data.forEach((item) => {
      if( item[ST_NAME] === name){
        res = [item, ...res];
      }     
    })
    return res;    
  }
}

//计算全部的钱
const GetSumMoney = (data, list={}) => {
  data.forEach((item) => {
    if(list[item[ST_NAME]] === undefined) {
      list[item[ST_NAME]] = parseInt(item[ST_MONEY]);
    } else {
      list[item[ST_NAME]] += parseInt(item[ST_MONEY]);
    }
  })
  return Object.entries(list)
}

//统计
const GetMaxMin = (data) => {
  let sum = GetSumMoney(data).sort((pre, cur) => {
    return pre[1] - cur[1];
  })
  console.log(`赚钱最少的学生： ${sum[0][ST_NAME]}`);
  console.log(`赚钱最多的学生： ${sum[sum.length - 1][ST_NAME]}`);

  data.sort((pre, cur) => {
    return parseInt(pre[ST_MONEY]) > parseInt(cur[ST_MONEY]);
  })
  console.log(`赚钱最少的一天： ${data[0][ST_TIME]}`);
  console.log(`赚钱最多的一天： ${data[data.length - 1][ST_TIME]}`);
}

//打印信息
const PrintList = (data) => {
  data.forEach((item) => {
    if(item.length === 2) {  //-n or -l
      console.log(`${item[0].padEnd(10, ' ')} ${item[1].toString().padStart(5, ' ')}`);
    }else{ //-n + -l
      console.log(`${item[0].padEnd(10, ' ')} ${item[1].padEnd(13, ' ')} ${item[2].padEnd(10, ' ')} ${item[3].padStart(5, ' ')}`);
    }
  })
}

const data = InitData();

switch(arg.length){
  case 1:
    if (arg[0] === '-l') {
      PrintList(GetSumMoney(data));
      break;
    }else if (arg[0] === '-a') {
      GetMaxMin(data);
      break;
    }
  case 2:
    if (arg[0] === '-n') {
      PrintList(GetSumMoney(GetSumInfo(data, arg[1])));
      break;
    }
  case 3:
    if ((arg[0] === '-n' && arg[2] === '-l') || (arg[0] === '-l' && arg[2] === '-n')) {
      PrintList(GetSumInfo(data, arg[1]));
      break;
    }
  default:
    console.error('synax error');
    break;
}

// console.log(arg.length);