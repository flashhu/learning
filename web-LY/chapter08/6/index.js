$('body').on('mouseover','.u-pic', (e)=>{
  const current = $(e.currentTarget);
  const index = current.index();
  $('.u-pic').removeClass('normal');
  for(let i = 1;i < 5;i ++) {
  	if(i <= index) {
  	  let before = 50 * i;
  	  $('.u-pic').eq(i).css('left', before + 'px');
  	}else {
  	  let after = 50 * i + 450;
      $('.u-pic').eq(i).css('left', after + 'px');
  	}
  }
})

$('body').on('mouseout','.u-pic', (e)=>{
  for(let i = 1;i < 5;i ++) {
    let left = 140 * i;
    $('.u-pic').eq(i).css('left', left + 'px');
  }
})