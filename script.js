let API;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
  API = 'http://192.168.1.88:3000/api/'
}else{
  API = 'https://zingmp3nct.tienvu.net/api/'
}
var loading = $('#loading');
$(function () {
 $(".menu-link").click(function () {
  $(".menu-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

$(function () {
 $(".main-header-link").click(function () {
  $(".main-header-link").removeClass("is-active");
  $(this).addClass("is-active");
  if($(this).hasClass('zing')){
    $('.search-box ').hide()
    $('.search-zing').show()
  }
  if($(this).hasClass('nct')){
    $('.search-box ').hide()
    $('.search-nct').show()
  }
  if($(this).hasClass('youtube')){
    $('.search-box ').hide()
    $('.search-youtube').show()
  }
 });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
 dropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdowns.forEach((c) => c.classList.remove("is-active"));
  dropdown.classList.add("is-active");
 });
});

$(".search-bar input")
 .focus(function () {
  $(".header").addClass("wide");
 })
 .blur(function () {
  $(".header").removeClass("wide");
 });

$(document).click(function (e) {
  
  var container = $(".status-button");
  var dd = $(".dropdown");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
  dd.removeClass("is-active");
  }
});

$(function () {
 $(".dropdown").on("click", function (e) {
  $(".content-wrapper").addClass("overlay");
  e.stopPropagation();
 });
 $(document).on("click", function (e) {
  if ($(e.target).is(".dropdown") === false) {
   $(".content-wrapper").removeClass("overlay");
  }
 });
});

// $(function () {
//  $(".status-button:not(.open)").on("click", function (e) {
//   $(".overlay-app").addClass("is-active");
//  });
//  $(".pop-up .close").click(function () {
//   $(".overlay-app").removeClass("is-active");
//  });
// });

// $(".status-button:not(.open)").click(function () {
//  $(".pop-up").addClass("visible");
// });

// $(".pop-up .close").click(function () {
//  $(".pop-up").removeClass("visible");
// });

const toggleButton = document.querySelector('.dark-light');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

var btn_download = $('#btn_download');
var btn_search = $('#btn_search');
var list_song = $('#list_song .apps-card');

var input_search = $('#input_search');
var input_download = $('#input_download');
var input_download_val = $('#input_download').val('https://zingmp3.vn/album/Bai-Ka-Tuoi-Tre-JGKiD-Emcee-L-KraziNoyze-Linh-Cao/ZOU988OA.html');
var input_download_val = $('#input_download').val('https://www.nhaccuatui.com/bai-hat/de-vuong-dinh-dung-ft-acv.w8lmuII1Yn2G.html');

// select all when input
input_download.on("click", function () {
  $(this).select();
});
input_search.on("click", function () {
  $(this).select();
});

btn_download.click(()=>{
  loading.show()
  var input_download_val = $('#input_download').val();
  var url_parts = input_download_val.replace(/([^:]\/)\/+/g, "$1").replace(/\/\s*$/,'').split('/');
  if(url_parts[2].includes('zingmp3.vn')){
    
    var jqxhr = $.get( API+"link?id="+input_download_val, function() {
      
    })
      .done(function(res) {
        var artistsNames = getArtistName(res.data)
        list_song.prepend(`
        <div class="app-card">
          <div class="song">
            <span class="cover">
              <img width="20"
                src="${res.data.thumbnail}"
                alt="">
            </span>
            <div class="info-song"><span data-title="author">${res.data.title}</span>
              <div class="app-card__subtext">${artistsNames}</div>
            </div>
          </div>

          <div class="app-card-buttons">
            
            <button data-source="zing" data-id="${res.data.id}" class="content-button status-button open js_btn_play">Play</button>
            <button data-source="zing" data-id="${res.data.id}" data-title="${res.data.title} - ${artistsNames}" class="js_btn_download content-button status-button">Download</button>
          </div>
        </div>`)
        loading.hide()
      })
      .fail(function() {
      })
      .always(function() {
      });
    
    // Perform other work here ...
    
    // Set another completion function for the request above
    jqxhr.always(function() {
      
    });
  }
  if(url_parts[2].includes('nhaccuatui.com')){
    
    var jqxhr = $.get( API+"link?id="+input_download_val, function() {
      
    })
      .done(function(res) {
        var artistsNames = getArtistName(res.data.song)
        list_song.prepend(`
        <div class="app-card">
          <div class="song">
            <span class="cover">
              <img width="20"
                src="${res.data.song.thumbnail}"
                alt="">
            </span>
            <div class="info-song"><span data-title="author">${res.data.song.title}</span>
              <div class="app-card__subtext">${artistsNames}</div>
            </div>
          </div>

          <div class="app-card-buttons">
            
            <button data-source="nct" data-link="${input_download_val}" data-id="${res.data.song.key}" class="content-button status-button open js_btn_play">Play</button>
            <button data-source="nct" data-link="${input_download_val}" data-id="${res.data.song.key}" data-title="${res.data.song.title} - ${artistsNames}" class="js_btn_download content-button status-button">Download</button>
          </div>
        </div>`)
        loading.hide()
      })
      .fail(function() {
      })
      .always(function() {
      });
    
    // Perform other work here ...
    
    // Set another completion function for the request above
    jqxhr.always(function() {
      
    });
  }

  
  console.log(input_download_val)
})


btn_search.click(()=>{
  loading.show()
  var input_search_val = $('#input_search').val();
  var jqxhr = $.get( API+"search?id="+input_search_val, function() {
    
  })
    .done(function(res) {
      var listSong = res.data.data.songs
      var html = '';
      listSong.forEach(song => {
        var artistsNames = getArtistName(song)
        html +=`
          <div class="app-card">
            <div class="song">
              <span class="cover">
                <img width="20"
                  src="${song.thumbnailM}"
                  alt="">
              </span>
              <div class="info-song"><span data-title="author">${song.title}</span>
                <div class="app-card__subtext">${artistsNames}</div>
              </div>
            </div>

            <div class="app-card-buttons">
              
              <button data-source="zing" data-id="${song.encodeId}" class="content-button status-button open js_btn_play">Play</button>
              <button data-source="zing" data-id="${song.encodeId}" data-title="${song.title} - ${artistsNames}" class="js_btn_download content-button status-button ">Download</button>
            </div>
          </div>`
        // console.log(song.artists[0].name)
      });
      // 
      list_song.prepend(html)
      console.log(res)
      
      loading.hide()
    })
    .fail(function() {
    })
    .always(function() {
    });
   
  // Perform other work here ...
   
  // Set another completion function for the request above
  jqxhr.always(function() {
    
  });
  console.log(input_download_val)
})
$('#list_song').click((e)=>{
  if(e.target.closest('.js_btn_download')){
    var ele = e.target.closest('.js_btn_download')
    if(ele.dataset.source=='zing'){
      downloadURI(ele.dataset.id, ele.dataset.title)
    }
    if(ele.dataset.source=='nct'){
      downloadURINct(ele.dataset.link, ele.dataset.title)
    }

    
    // download(ele.dataset.id, ele.dataset.title)
  }
})
$('#list_song').click((e)=>{
  
  if(e.target.closest('.js_btn_play')){
    document.querySelector('img').classList.remove('active')
    var ele = e.target.closest('.js_btn_play')
    var card = ele.closest('.app-card')
    card.querySelector('img').classList.toggle('active')
    if(ele.dataset.source=='zing'){
      playURI(ele.dataset.id, ele.dataset.title)
    }
    if(ele.dataset.source=='nct'){
      playURINct(ele.dataset.link, ele.dataset.title)
    }
    
  }
})
var audio = new Audio()
function playURI(uri, name) 
{
    var link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = API+'songUrl?id='+uri;
    audio.pause();
    
    if(audio.src!=link.href){
      audio = new Audio(link.href)
      audio.play();
    }else{
      audio.src='';
      
    }
}
function playURINct(uri, name) 
{
    var link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = API+'linkRedirect?id='+uri;
    audio.pause();
    if(audio.src!=link.href){
      audio = new Audio(link.href)
      audio.play();
    }else{
      audio.src='';
    }
}
function downloadURI(uri, name) 
{
    var link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = API+'download?id='+uri
    console.log(link.href)
    document.body.appendChild(link);
    link.click();
    link.remove();
}
function downloadURINct(uri, name) 
{
    var link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = API+'linkRedirect?id='+uri
    console.log(link.href)
    document.body.appendChild(link);
    link.click();
    link.remove();
}
function downloadXHR(uri, name) {
  axios({
        url : API+'songUrl?id='+uri,
        method: 'GET',
        responseType: 'blob'
  })
        .then((response) => {
              const url = window.URL
                    .createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', name+'.mp3');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
        })
}

function getArtistName(song){
  var artistsNames;
  if(song.artists){
    artistsNames = song.artists.reduce(function(previous, current){
      if(previous.name){
        previous = previous.name
      }
      return previous + ', ' + current.name;
    })
    
  }
  else{
    artistsNames = song.artistsNames
  }
  return artistsNames;
}