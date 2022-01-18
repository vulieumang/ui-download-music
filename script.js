let API;
let API_NCT;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
  API = 'http://192.168.1.88:3000/api/'
  API_NCT = 'http://192.168.1.88:3000/api/'
}else{
  API = 'https://musicapi.versionofyou.com/api/'
  API_NCT = 'https://musicapivercel.versionofyou.com/api/'
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
    $('#input_download').val('https://zingmp3.vn/album/Bai-Ka-Tuoi-Tre-JGKiD-Emcee-L-KraziNoyze-Linh-Cao/ZOU988OA.html');

    $('.search-zing').show()
  }
  if($(this).hasClass('nct')){
    $('.search-box ').hide()
    $('.search-nct').show()
    $('#input_download').val('https://www.nhaccuatui.com/bai-hat/de-vuong-dinh-dung-ft-acv.w8lmuII1Yn2G.html');

  }
  if($(this).hasClass('youtube')){
    $('.search-box ').hide()
    $('.search-youtube').show()
    $('#input_download').val('https://www.youtube.com');
  }
 });
});

// const dropdowns = document.querySelectorAll(".dropdown");
// dropdowns.forEach((dropdown) => {
//  dropdown.addEventListener("click", (e) => {
//   e.stopPropagation();
//   dropdowns.forEach((c) => c.classList.remove("is-active"));
//   dropdown.classList.add("is-active");
//  });
// });

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
    var jqxhr = $.get( API+"link?id="+input_download_val, function() {})
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
        alert('Có lỗi, thử tải lại trang')
      })
      .always(function() {
      });
    jqxhr.always(function() {});
  }
  if(url_parts[2].includes('nhaccuatui.com')){
    var jqxhr = $.get( API_NCT+"link?id="+input_download_val, function() {})
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
        alert('Có lỗi, thử tải lại trang')
      })
      .always(function() {
      });
  jqxhr.always(function() {});}
})


btn_search.click(()=>{
  loading.show()
  var input_search_val = $('#input_search').val();
  var jqxhr = $.get( API+"search?id="+input_search_val, function() {})
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
          </div>`});
      list_song.prepend(html)
      loading.hide()})
    .fail(function() {
    })
    .always(function() {
    });
  jqxhr.always(function() {});
})
$('#list_song').click((e)=>{
  if(e.target.closest('.js_btn_download')){
    var ele = e.target.closest('.js_btn_download')
    if(ele.dataset.source=='zing'){
      downloadURI(ele.dataset.id, ele.dataset.title)
    }
    if(ele.dataset.source=='nct'){
      downloadURINct(ele.dataset.link, ele.dataset.title)
    }}
})
var statusPlay = false;
$('#list_song').click((e)=>{
  if(e.target.closest('.js_btn_play')){
    var ele = e.target.closest('.js_btn_play')
    var card = ele.closest('.app-card')
    setAllPauseToPlay()
    toggleText(ele, 'Play', 'Pause')
    playURI(ele.dataset.id, ele.dataset.source, ele.dataset.link)
    // remove active all, if current play stop, if current pause play and add active class
    if(statusPlay){
      card.querySelector('img').classList.add('active')
    }else{
      document.querySelector('img').classList.remove('active')
      toggleText(ele, 'Play', 'Pause')
    }}
})
function setAllPauseToPlay(){
  var listEle = document.querySelectorAll('.js_btn_play')
  listEle.forEach(element => {
    element.innerHTML = 'Play';
  });
}
var audio = new Audio()
function playURI(uri, source, link) 
{
  var streamURL;
  if(source=='zing'){
    streamURL = API+'songUrl?id='+uri;
  }
  if(source=='nct'){
    streamURL = API_NCT+'linkRedirect?id='+link;
  }
  audio.pause();
  if(document.querySelector('img.active'))
    document.querySelector('img.active').classList.remove('active')
  if(audio.src!=streamURL){
    audio = new Audio(streamURL)
    audio.play();
    statusPlay = true;
  }else{
    audio.src='';
    statusPlay = false;
  }
}
function downloadURI(uri, name) 
{
  var link = document.createElement("a");
  link.setAttribute('download', name);
  link.href = API+'download?id='+uri
  document.body.appendChild(link);
  link.click();
  link.remove();
}
function downloadURINct(uri, name) 
{
  var link = document.createElement("a");
  link.setAttribute('download', name);
  link.href = API_NCT+'linkRedirect?id='+uri
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
  if(typeof artistsNames=='object'){
    artistsNames = artistsNames.name
  }
  return artistsNames;
}

function toggleText(ele, oldStr, newStr){
  ele.innerHTML==oldStr? ele.innerHTML =newStr : ele.innerHTML= oldStr
}