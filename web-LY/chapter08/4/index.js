const auto = true;
const intervalTime = 3000;
let slideInterval;
let index = 0;

// 自动翻页
const nextSlide = () => {
  const currentPage = $('.m-slider').find('.current');
	const currentIndex = $('.m-rank').find('.current');
  currentPage.removeClass('current');
  currentIndex.removeClass('current');
  if(currentPage.next().length) {
    currentPage.next().addClass('current');
    currentIndex.next().addClass('current');
    index ++;
  }else {
    $('.u-slide').eq(0).addClass('current');
    $('.u-circle').eq(0).addClass('current');
    index = 0;
  }
  setTimeout(() => current.classList.remove('current'));
}

if(auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
}

//点击箭头翻页
$('body').on('mouseover', '.m-arrow', (e) => {
  $(e.currentTarget).removeClass('hide');
})

$('body').on('mouseout', '.m-arrow', (e) => {
  $(e.currentTarget).addClass('hide');
})

$('body').on('click', '.left', (e) => {
  $('.m-slider').find('.current').removeClass('current');
  $('.m-rank').find('.current').removeClass('current');
  if(index !== 0) {
    $('.u-slide').eq(--index).addClass('current');
    $('.u-circle').eq(index).addClass('current');
  }else {
    $('.u-slide').eq(2).addClass('current');
    $('.u-circle').eq(2).addClass('current');
    index = 2; 
  }
})

$('body').on('click', '.right', (e) => {
  $('.m-slider').find('.current').removeClass('current');
  $('.m-rank').find('.current').removeClass('current');
  if(index !== 2) {
    $('.u-slide').eq(++index).addClass('current');
    $('.u-circle').eq(index).addClass('current');
  }else {
    $('.u-slide').eq(0).addClass('current');
    $('.u-circle').eq(0).addClass('current');
    index = 0; 
  }
})