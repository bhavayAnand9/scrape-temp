$('document').ready(function () {
  let url = "https://play.google.com/store/apps/collection/topselling_free?clp=ChcKFQoPdG9wc2VsbGluZ19mcmVlEAcYAw%3D%3D:S:ANO1ljLwMrI&gsr=ChkKFwoVCg90b3BzZWxsaW5nX2ZyZWUQBxgD:S:ANO1ljIxP20";
  $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', function(data){
    let dataset = [];
    let t = $(data.contents).find('div.Vpfmgd');
     for(let i=0; i<t.length; i++){
       let item = {
         link: $(t[i]).find('a.poRVub').attr('href'),
         img: $(t[i]).find('img.T75of').attr('data-src'),
         title: $(t[i]).find('div.WsMG1c').text(),
       };
       dataset.push(item);
     }

     for(let i=0; i<dataset.length; i++){
      //  let card = `
      //   <div class="card" style="width: 18rem;">
      //     <img src="${dataset[i].img}" class="card-img-top" alt="...">
      //     <div class="card-body">
      //       <p class="card-text">${dataset[i].title}</p>
      //     </div>
      //   </div>
      // `;
       let card = `
       <div class="col-auto mb-3">
            <div class="card" style="width: 15rem;">
                <div class="card-body">
                    <img src="${dataset[i].img}" class="card-img-top" alt="...">
                    <h5 class="card-title">${dataset[i].title}</h5>
                    <a href=${dataset[i].link} class="card-link">More Details</a>
                </div>
            </div>
        </div>
      `;
       $("div.prnt").append(card);
     }

  });



});
