var version = 1.3;
var chars = [];
var char = null;
var vlTitle = "";
var vlContent = "";
var name = "[name]";
var deityName = "[deityName]";

function appendVersion() {
    document.getElementById('version').innerHTML = "v" + version;
}

function getName() {
    name = localStorage.getItem("name");
    if (!name || name == undefined || name === "null") {
        name = prompt("Please enter your name", "[name]");
        localStorage.setItem("name", name);
    }

    deityName = localStorage.getItem("deityName");
    if (!deityName || deityName == undefined || deityName === "null") {
        deityName = prompt("Please enter your deity name", "[deityName]");
        localStorage.setItem("deityName", deityName);
    }

    if(window.innerHeight > window.innerWidth) {
        alertOrientation();
    }

    initChars();
    constructVoicelinesList();
}

function initChars() {

    const voicelines = {
        "zhongli": [{
            "title": `About ${name}`,
            "content": `Why, of course I know of ${name}. I would hope that I know my spouse quite well, considering the time we've spent together.

            They might look cold at first, but if you continue to observe them for a while, you will see that they are an endearing person. Though their tone and expression might seem indifferent, there are certain ticks one will discover if they have a keen pair of eyes. They are a great joy to be around, I promise you. Why don't you drop by our abode some time, perhaps for dinner?

            Hm, wonderful. I shall relay the good news to ${name}. Ah, before that, just to be sure... you do not eat rocks nor blood, do you?`
        }, {
            "title": `About ${deityName}`,
            "content": ``
        }, {
            "title": `Rex Lapis and ${deityName}`,
            "content": ``
        }, {
            "title": `Xiao and ${deityName}`,
            "content": ``
        }, {
            "title": `The sibling adepti`,
            "content": `Haha, I see you've met the children. They're quite the interesting duo, aren't they? Fiercely loyal to a fault, too. How did your first meeting go? I hope they did not intimidate you - I promise they only mean well.`
        }, {
            "title": `About the God of Sun`,
            "content": ``
        }, {
            "title": `Hungry Ghost Festival`,
            "content": `My apologies, I have a rather urgent business that requires my utmost attention. Could we perhaps reconvene at a later date?`
        }, {
            "title": `About ${name} 2`,
            "content": ``
        }, {
            "title": `About ${deityName} 2`,
            "content": ``
        }],
        "xiao": [{
            "title": `About ${name}`,
            "content": `Ah... Yes, I do know of them. What of it?

            I would advise you to not bother them with your troubles. They have more important matters to attend to. If you need help, call me instead.`
        }, {
            "title": `About ${deityName}`,
            "content": ``
        }, {
            "title": `Rex Lapis and ${deityName}`,
            "content": ``
        }, {
            "title": `Xiao and ${deityName}`,
            "content": ``
        }, {
            "title": `The sibling adepti`,
            "content": ``
        }, {
            "title": `Hungry Ghost Festival`,
            "content": `Tsk. Is it already that time of the year?`
        }]
    }

    chars = [{
        name: "Zhongli",
        bg: "zhongli.mp4",
        idx: 0,
        voicelines: voicelines.zhongli
    }, {
        name: "Xiao",
        bg: "xiao.mp4",
        idx: 1,
        voicelines: voicelines.xiao
    }];

    char = chars[0];
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
    // video.play();

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
}

// Mobile device alert
var warned = false;
var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
    alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
    if (window.orientation === 0 || window.orientation === 180) {
        if (!warned) {
            alertOrientation();
        }
    }
}, false);

function alertOrientation() {
    alert("Attention! Page best viewed in landscape orientation and optimized for PC screens.")
    warned = true;
}
