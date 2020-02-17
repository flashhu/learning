var selected = '1';

$('body').on('click', '.u-tab', (e)=>{
  slideDoor(e);
})

function slideDoor(e) {
  let t = e.currentTarget;
  let next = $(t).attr('data_id');
  // tab 颜色变换
  $(t).parent().find('.focus').removeClass('focus');
  $(t).addClass('focus');
  // 对应内容切换
  let contentList = $(t).parent().next().children();
  contentList.map((index,item)=>{
  	let id = $(item).attr('data_id');
  	console.log(id);
  	if ( id === selected) {
  	  $(item).addClass('hide'); 
  	}
  	if ( id === next) {
  	  $(item).removeClass('hide'); 
  	}
  })
  // 当前所处位置变化
  selected = next;
}