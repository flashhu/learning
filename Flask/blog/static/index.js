$(init)

function init() {

  var rendererMD = new marked.Renderer();
  marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  $('.m-code').each( (i,item)=>{
    html = marked($(item).text())
    $(item).prev().html(html)
  })

  $('body').on('click','.m-more', doShowMore);
  $('body').on('click','.m-close',doClose);
}

function doClose() {
  $('.g-show').remove()
}

function doShowMore(e) {
  $('body').append('<div class="g-show"><div class="m-wrap"><div class="m-data m-data-w"></div><div class="m-body-w"><h3 class="m-title-w"></h3><pre class="m-html m-html-w"></pre></div><div class="m-close"></div> </div></div>')

  date = $(e.currentTarget).parent().parent().prev().text()
  title = $(e.currentTarget).parent().find('em').text()
  html = $(e.currentTarget).parent().next().html()

  $('.m-data-w').text(date)
  $('.m-title-w').text(title)
  $('.m-html-w').html(html)
}