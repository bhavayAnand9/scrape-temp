
//to deal with cors
const topAppsurl = "https://play.google.com/store/apps/collection/topselling_free?clp=ChcKFQoPdG9wc2VsbGluZ19mcmVlEAcYAw%3D%3D:S:ANO1ljLwMrI&gsr=ChkKFwoVCg90b3BzZWxsaW5nX2ZyZWUQBxgD:S:ANO1ljIxP20";

//set because all elements will always be unique and helps in checking of new items in o(1) complexity
let dataset = new Set();

//to keep track of new items
let titleDataSet = new Set();

//runs when document is ready and loaded into DOM
function ready() {
  $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(topAppsurl) + '&callback=?', function(data){
    let t = $(data.contents).find('div.Vpfmgd');
     for(let i=0; i<t.length; i++){
       let item = {
         link: $(t[i]).find('a.poRVub').attr('href'),
         img: $(t[i]).find('img.T75of').attr('data-src'),
         title: $(t[i]).find('div.WsMG1c').text(),
       };
       titleDataSet.add(item.title);
       dataset.add(item);
     }
     buildUpWebPage(dataset);
  });
}

//a one timer function to load all children into DOM
function buildUpWebPage(){
  let datasetArray = Array.from(dataset);
  for(let i=0; i<datasetArray.length; i++){
    let card = `
       <div class="col-auto mb-3">
            <div class="card" style="width: 15rem;">
                <div class="card-body">
                    <img src="${datasetArray[i].img}" class="card-img-top" alt="...">
                    <h5 class="card-title">${datasetArray[i].title}</h5>
                    <a href=${datasetArray[i].link} class="card-link">More Details</a>
                </div>
            </div>
        </div>
      `;
    $("div.prnt").append(card);
  }
}

/*
  runs only when you have few new apps to append instead of looping through all data and appending it to DOM
  complexity depends number of new items in trending page
*/
function appendNewParticularChildrens(newItems) {
  let newItemsArray = Array.from(newItems);
  for(let i=0; i<newItemsArray.length; i++){
    let card = `
       <div class="col-auto mb-3">
            <div class="card" style="width: 15rem;">
                <div class="card-body">
                    <img src="${newItemsArray[i].img}" class="card-img-top" alt="...">
                    <h5 class="card-title">${newItemsArray[i].title}</h5>
                    <a href=${newItemsArray[i].link} class="card-link">More Details</a>
                </div>
            </div>
        </div>
      `;
    $("div.prnt").append(card);
  }
}

/*
  when data reset => web page scraped => checks if titleDataSet not contains this record => add new item to onlyNewItems set
  => call appendNewParticularChildrens so only new items will be appended
*/
function resetData(){
  $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(topAppsurl) + '&callback=?', function(data){
    let onlyNewItems = new Set();
    let t = $(data.contents).find('div.Vpfmgd');
    for(let i=0; i<t.length; i++){
      let item = {
        link: $(t[i]).find('a.poRVub').attr('href'),
        img: $(t[i]).find('img.T75of').attr('data-src'),
        title: $(t[i]).find('div.WsMG1c').text(),
      };
      if(!titleDataSet.has(item.title)){
        onlyNewItems.add(item);
        titleDataSet.add(item.title);
        dataset.add(item);
      }
    }
    appendNewParticularChildrens(onlyNewItems);

    //clear onlyNewItems because items are no longer new to us, they have been added to DOM
    onlyNewItems.clear();
  });
}

$('document').ready(ready);
