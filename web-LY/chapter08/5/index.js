//solution-1
$('body').on('mouseover','.u-first', (e)=>{
  $(e.currentTarget).parent().find('.u-second').removeClass('hide');
})

$('body').on('mouseout','.u-first', (e)=>{
  $(e.currentTarget).parent().find('.u-second').addClass('hide');
})

//solution-2
// $(function() {
//   $('.u-first').bind('mouseover', function() {
//     $(this).parent().find('.u-second').removeClass('hide');
//     $(this).next().slideDown();
//   }).bind('mouseout', function() {
//     $(this).next().slideUp();
//   });
// });