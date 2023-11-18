var version = 1.2;
var chars = [];
var char = null;
var vlTitle = "";
var vlContent = "";
var name = "[name]";

function appendVersion() {
    document.getElementById('version').innerHTML = "v" + version;
}

function getName() {
    // name = localStorage.getItem("name");
    // if (!name || name == undefined || name === "null") {
    //     name = prompt("Please enter your name", "${name}");
    //     if (!name || name == undefined || name === "null") {
    //         name = "${name}";
    //     }
    //     localStorage.setItem("name", name);
    // }

    if(window.innerHeight > window.innerWidth) {
        alertOrientation();
    }

    initChars();
    constructVoicelinesList();
}

function initChars() {

    const voicelines = {
        "tartaglia": [{
            "title": `About Holly I: Appearances can be deceiving`,
            "content": `I thought I’d be bored out of my mind when I was ordered to tail someone. That woman wasn’t involved with the Fatui at all if my intel was correct, so why did I have to follow her around? But, by the Tsaritsa, am I glad I went through with it because the second I passed her in the street, I could tell she wasn’t an ordinary person.
            
            When I confronted her outside of Liyue Harbour she didn’t seem surprised at all that she was being followed and she agreed easily enough to a fight. Even though I was going all out, I could tell she was still holding back… and what a sight to behold that was. I thought to myself, I have to meet this woman again and find out the full scope of her powers.`
        }]
    }

    chars = [{
        key: "tartaglia",
        name: "Tartaglia",
        bg: "tartaglia2.mp4",
        idx: 1,
        voicelines: voicelines.tartaglia
    }];

    getChar();
}

function getChar() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let charKey = urlParams.get('char');
    charKey = charKey ? charKey : "tartaglia"

    chars.forEach((c) => {
        if (charKey === c.key) {
            char = c;
        }
    });

    onChangeCharacter();
}

function changeCharacter(dir) {
    if (dir === "next") {
        let nextIdx = char.idx + 1;
        if (nextIdx >= chars.length) {
            nextIdx = 0;
        }
        char = chars[nextIdx];
    } else if (dir === "prev") {
        let prevIdx = char.idx - 1;
        if (prevIdx < 0) {
            prevIdx = chars.length - 1;
        }
        char = chars[prevIdx];
    }

    onChangeCharacter();
}

function onChangeCharacter() {
    document.getElementById('char-name').innerHTML = char.name;

    changeVideoSource(char.bg);
    constructVoicelinesList();
}

function changeVideoSource(bg) {
    var video = document.getElementById('video-bg');
    var source = document.getElementById('video-src');
    video.pause();

    source.setAttribute('src', bg);
    source.setAttribute('type', 'video/mp4');

    video.load();

    vlTitle = "";
    vlContent = "";
    constructVoicelineContent();
}

function constructVoicelinesList() {
    let innerHTML = "";

    char.voicelines.forEach((vl) => {
        innerHTML += `
            <div class="vl-title-outer">
                <button class="vl-title-inner" onclick="selectVl('${vl.title}')">${vl.title}</button>
            </div>
        `;
    });

    document.getElementById('vl-list').innerHTML = innerHTML;
}

function selectVl(title) {
    vlTitle = title;
    char.voicelines.forEach((vl) => {
        if (vl.title === title) {
            vlContent = vl.content;
        }
    });

    constructVoicelineContent();
}

function constructVoicelineContent() {
    vlContent = vlContent.replace(/\n/g, "<br>");
    document.getElementById('vl-title').innerHTML = vlTitle;
    document.getElementById('vl-content').innerHTML = vlContent;
    document.getElementById('vl-content').scrollTop = 0;
}

// Mobile device alert
var warned = false;
var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
    // alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
    if (window.orientation === 0 || window.orientation === 180) {
        if (!warned) {
            alertOrientation();
        }
    }
}, false);

function alertOrientation() {
    alert("Attention! Page best viewed in landscape orientation and optimized for PC 2560 × 1600 and iPhone 13 Pro screens.")
    warned = true;
}
