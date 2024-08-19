//fetching the sons from the folder
let currentsong = new Audio();
let image = document.getElementById("playimage");
let songs;
let folderigot
let songsname = document
.querySelector("#playlist")
.getElementsByClassName("songname");
async function getsongs(folder) {
  let response = await fetch((`http://127.0.0.1:5500/Music/${folder}`).trim());
  let songs = await response.text();
  let div = document.createElement("div");
  div.innerHTML = songs;
  let as = div.getElementsByTagName("a");
  let songslist = [];
  for (let i = 0; i < as.length; i++) {
    let el = as[i];
    if (el.href.endsWith(".mp3")) {
      songslist.push(el);
    }
  }
  return songslist;
}
async function main(folder) {
  songs = await getsongs(folder);
  new Promise((resolve, reject) => {
    Array.from(songs).forEach((element) => {
      playlist.innerHTML =
        playlist.innerHTML +
        `<section><img class ="invert" src="svgs/music.svg"><li class="songname">${element
          .toString()
          .replaceAll("%20", " ")
          .replaceAll(
            `http://127.0.0.1:5500/Music/${folder}/`,
            ""
          )}</li><img class ="invert playbutton" src="svgs/play.svg" alt="playicon"> </section>`;
      resolve("Songs are loaded successfully.");
    });
  }).then((val) => {
    console.log("Songs are loaded");

    leftbutton.addEventListener("click", (el) => {
      //trying to get left button functionlity
    //   console.log(currentsong.src);
      let songsweget=[];
     Array.from(songs).forEach((el)=>{
        songsweget.push(el.href)
    })
     let index=songsweget.indexOf(currentsong.src);
     if(index>=0){
      console.log(songsname)
      console.log("foldername ",folder)
        currentsong.src=`/Music/${folder}/${songsname[index-1].innerHTML}`.trim();
        console.log(currentsong.src)
        currentsong.play();
        image.src = "svgs/pause.svg";
        let songinfo = document.getElementById("songinfo");
        index=index-1;
        songinfo.innerHTML = songsname[index].innerHTML;
     }
    });
    //till yet for left button
    //from now it is for right button

    rightbutton.addEventListener("click", (el) => {
        console.log(currentsong.src);
        let songsweget=[];
       Array.from(songs).forEach((el)=>{
          songsweget.push(el.href)
      })
       let index=songsweget.indexOf(currentsong.src);
       console.log("Index of current song ", index)
       if(index<songsweget.length){
          currentsong.src= `/Music/${folder}/${songsname[index+1].innerHTML}`.trim();
          console.log(currentsong.src)
          currentsong.play();
          image.src = "svgs/pause.svg";
          index=index+1;
          let songinfo = document.getElementById("songinfo");
          songinfo.innerHTML = songsname[index].innerHTML;
       }
    });
    //Till yet for right button

    hamburger.addEventListener("click", () => {
      let leftportion = document.getElementById("left");
      leftportion.style.left = "0%";
      leftportion.style.width = "80%";
      hamburger.style.display="none"
      let cross=document.getElementById("cross")
      cross.style.display="block"
      cross.addEventListener("click",()=>{
        leftportion.style.left="-110%"
        hamburger.style.display="block"
          cross.style.display="none"
      })
      cross.style.zIndex="3"
      let leftfooterul = document
        .getElementById("leftfooter")
        .getElementsByTagName("ul")[0];
      leftfooterul.style.width = "100%";
      leftfooterul.style.height = "10vh";
      // leftfooterul.style.backgroundColor="red"
      leftfooterul.style.margin = "0";
      //   hamburger.style.backgroundColor="red"
    });

    console.log(val);
    let foldersongs = document
      .querySelector("#playlist")
      .getElementsByClassName("playbutton");
    for (let i = 0; i < foldersongs.length; i++) {
      foldersongs[i].addEventListener("click", () => {
       
        currentsong.src = `/Music/${folder}/${songsname[i].innerHTML}`.trim();

        currentsong.play();
        image.src = "svgs/pause.svg";

        let songinfo = document.getElementById("songinfo");
        songinfo.innerHTML = songsname[i].innerHTML;
        currentsong.addEventListener("timeupdate", () => {
          //yha se
          function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
              2,
              "0"
            )}`;
          }

          function convertSongTime(currentTime, songDuration) {
            const Time = formatTime(currentTime);
            const duration = formatTime(songDuration);

            return { Time, duration };
          }

          // YHA TAK SAMAJHNA HAI

          const { Time, duration } = convertSongTime(
            currentsong.currentTime,
            currentsong.duration
          );

          let songtiminginfo = document.getElementById("songtiminginfo");
          songtiminginfo.innerHTML = `${Time}/${duration}`;
          let circle = document.getElementById("circle");
          let seekbar = document.getElementById("seekbar");

          currentsong.addEventListener("timeupdate", (e) => {
            circle.style.left =
              (currentsong.currentTime / currentsong.duration) * 100 + "%";
          });

          seekbar.addEventListener("click", (e) => {
            let percent =
              (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            circle.style.left = percent + "%";

            currentsong.currentTime = (currentsong.duration * percent) / 100;
          });
        });
        image.addEventListener("click", () => {
            if (currentsong.paused) {
              image.src = "svgs/pause.svg";
              // image.style.backgroundColor="red"
              currentsong.play();
            } else {
              image.src = "svgs/play.svg";
              currentsong.pause();
            }
          });


      });
    }

    
  });
}


//Temporary


//firtst I have to fetch folders from my computer
(async function fethingfolders(){
  let folders= await fetch("http://127.0.0.1:5500/Music/")
 let response = await folders.text()

 
//  console.log(response)
 let div=document.createElement("div")
 div.innerHTML=response;
 async function needed(){
  let arraydiv= Array.from(div.getElementsByTagName("a"))
  for(let i=0;i<arraydiv.length;i++){
let el=arraydiv[i];
if((el.href).includes("/Music/")){
   folderigot=(el.href).split("/").slice(-1).toString()
  let infomation=await fetch(`http://127.0.0.1:5500/Music/${folderigot}/info.json`)
  let info=await infomation.json();
  // console.log(info.title);
 spotifyfolders.innerHTML+=` <div class="card" data-foldername=${folderigot}>
              <img src="Music/${folderigot}/image.jpeg">
              <h2>
                  ${info.title}
              </h2>
              <p>${info.description}</p>
          </div>`
}



  }

 
 }
 await needed()
 console.log("Cards loaded successfully")

 let cards = document.getElementsByClassName("card");
 // console.log(cards)
 Array.from(cards).forEach((el) => {
   el.addEventListener("click", async (e) => {
     playlist.innerHTML = "";
     console.log(e.currentTarget.dataset.foldername)
     await main(e.currentTarget.dataset.foldername);
   });
 });
})()

//function for the volume button
let volume=document.getElementById("volume");
volume.addEventListener("change",(el)=>{
  currentsong.volume=(el.target.value)/100
})



let volimage=document.getElementById("volimage");
volimage.addEventListener("click",(el)=>{
  if((el.target.src).includes("svgs/volume.svg")){
   let newsrc= (el.target.src).replace("svgs/volume.svg","svgs/mute.svg")
    el.target.src=newsrc;
    currentsong.volume="0"
    el.target.value="0"
  }else{
    let newsrc= (el.target.src).replace("svgs/mute.svg","svgs/volume.svg")
    el.target.src=newsrc;
    currentsong.volume="0.10"
     el.target.value="10"
  }
})


// so here we can get src of the song that user has clicked on as
//First there is a chull in my mind of first making dynamic albums and then I would add some simple other functionalities in my app but first let do this.
