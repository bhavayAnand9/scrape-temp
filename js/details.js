$('document').ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const appDetailsURL = `https://play.google.com/store/apps/details?id=${id}`;

  $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(appDetailsURL) + '&callback=?', function(data){
    page  = $(data)[0].contents;
    $('.title')[0].innerText = $(page).find('h1.AHFaub')[0].innerText;
    $('.dscrptn')[0].innerText = $($($(page).find('div.DWPxHb')[0]).find('span')[0])[0].innerText;
    $('.imgSrc')[0].src = $($($(page).find('div.xSyT2c')[0]).find('.T75of')[0])[0].src;
  });
});
