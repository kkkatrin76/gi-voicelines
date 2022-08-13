var version = 1.2;
var chars = [];
var char = null;
var vlTitle = "";
var vlContent = "";
var name = "${name}";

function appendVersion() {
    document.getElementById('version').innerHTML = "v" + version;
}

function getName() {
    name = localStorage.getItem("name");
    if (!name || name == undefined || name === "null") {
        name = prompt("Please enter your name", "${name}");
        if (!name || name == undefined || name === "null") {
            name = "${name}";
        }
        localStorage.setItem("name", name);
    }

    if(window.innerHeight > window.innerWidth) {
        alertOrientation();
    }

    initChars();
    constructVoicelinesList();
}

function initChars() {

    const voicelines = {
        "kazuha": [{
            "title": `About ${name}`,
            "content": `Ah... Yes. Aren't they endearing?

            Hm? I look... upset? My apologies. Please don't worry, as long as you don't harbor any... <i>foul intent</i> towards them, my blade will remain sheathed. You must have known by this point that I don't care for needless confrontations.`
        }, {
            "title": `Your Relationship`,
            "content": `The protector and the protected would be the best description, I suppose. I try to be the best shelter that I could ever become for the tired dove that they are. A safe space to return to, someone to call home.

            ... Or at least, this is what I wish to become. My sweet ${name} tells me that my protection suffocates them sometimes, but in this ruthless world where the gods will not hesitate to strike their subjects down, can you truly fault someone's desire to protect what is most important to them?`
        }, {
            "title": `Competitors`,
            "content": `If there is anything I've learned from my life of wandering, it's that obstacles will always present themselves in one's journey. And to move forward, we must eradicate them, lest they ambush us in the future. Don't you agree?`
        }, {
            "title": `Would you ever let go?`,
            "content": `I'm sure you, who have experienced losses in your journeys, will be able to relate to me when I say that... At a certain point, one will slowly become accustomed to separation and rejections. But do you know what lies past the grief and the numbness when you think it couldn't possibly get worse?

            *chuckles* I'm afraid... I have gotten past that point.`
        }],
        "tartaglia": [{
            "title": `About ${name}`,
            "content": `Mm? Yes, what about my darling ${name}?

            Tread carefully now, comrade~ *chuckle*`
        }, {
            "title": `Your Relationship`,
            "content": `Utterly head over heels, madly invested in each other, completely in love, and is in a loving relationship! Ahaha, don't give me that look! You were the one who asked!

            Alright, alright, since you asked nicely... ${name} has been with me for as long as I remember, actually. We were neighbors, and we kept in touch even after I joined the Fatui. They stuck by me through thick and thin, always smiling when they greeted me back at the village, despite knowing what I do for a living...

            Tell me, how can one not fall in love with someone like that? Such a pure, untainted soul... Being around them feels like I've committed an unforgivable sin in itself, but alas, I've been utterly smitten and I can't exactly remember how to get out of this maze called love anymore. So I guess I'm staying for good, haha!`
        }, {
            "title": `Competitors`,
            "content": `Ah, of course, there were many, many insects swarming around such beauty... The only irritating thing about it is that none of them - not even a single one - was a fun hunt! Can you believe it?? I've probably gone through a hundred of them by this point, but none makes a worthy opponent! *sigh* Life's hard when you're just too strong...

            *grin* Speaking of which, how about it, Traveler? If you're free, why don't we do some sparring~?`
        }, {
            "title": `Would you ever let go?`,
            "content": `Ahahaha! Comrade, you sure like to joke around...

            Perhaps. If you can pry them off my dead body.`
        }],
        "ayato": [{
            "title": `About ${name}`,
            "content": `${name}? Yes, of course I know them. What do you think about them, Traveler?

            Oh? My smile looks scary? I'm not sure what you mean by that, this is my usual smile. *chuckles* Why, have you done something that will potentially incur my wrath? Something like... taking a romantic interest towards my dear fiancé, perhaps?

            That's not the case? Well, then, I believe there's nothing you should worry about!`
        }, {
            "title": `Your Relationship`,
            "content": `${name} has stayed with me throughout my darkest hours. They... gave me much-needed comfort, when I had to take the mantle of the head of the clan. Though it is something I have prepared for my whole life, it was a rather sudden change, and the transition was abrupt. Coupled with the fact that there was no room for mistakes... Yes, I could never thank them enough.

            I believe we've developed a deep bond because of it all. So, it's only natural that I repay them by providing them with the best luxuries and the safest shelter to call home. And as the spouse of the head of the Kamisato clan, they won't ever lack anything!`
        }, {
            "title": `Competitors`,
            "content": `-and make sure to do it without any trace, as usual. You are dismissed.

            ... Hm? Oh, Traveler. To what do I owe the pleasure?`
        }, {
            "title": `Would you ever let go?`,
            "content": `My, I'm afraid I'll need context on this one. If this is about my position as the head of my household clan, I would rather not, but I believe Ayaka will become a fine head in my place. If you're talking about the Shuumatsuban, it will undoubtedly cause a few issues. Still, I should manage to hire some elite private mercenaries in their stead, though it would not be preferable.

            And if this is concerning ${name}, then the answer is rather simple:

            No.`
        }],
        "zhongli": [{
            "title": `About ${name}`,
            "content": `*smiles* ${name} is my greatest treasure. I'm quite sure you've noticed the fondness I hold towards them. I can talk about them all day.

            They are a kind one, for starters. always wishing and striving to please everyone, sometimes to the point that they forgot about themselves. No matter in whichever lives, no matter their position... This aspect of them never changed. It worries me so. Yet, forcibly stripping this away from them would mean that I am rejecting who they are as a person. And that is not what I wish to do.

            I'd like to think that I'm protecting them, by making sure that no one tries to take advantage of their kind nature. After all, is it not the job of a lover to make sure their beloved is safe and sound?`
        }, {
            "title": `Your Relationship`,
            "content": `Would you believe me when I say that I have been in love with them for thousands of years? *chuckles*

            Be it Rex Lapis, Morax, or Zhongli... They have a firm hold of my heart. So it's only fair that I do so in return, don't you think?`
        }, {
            "title": `Competitors`,
            "content": `As much as I would find it liberating to subdue those who do not deserve their attention, let alone be allowed to lay sight on them... I cannot.

            We would not want the seas of Liyue Harbor to turn red from all the blood. It would be unhygienic.`
        }, {
            "title": `Would you ever let go?`,
            "content": `..... All I wish for is for ${name} to be safe.

            And the safest place in all Teyvat is by my side.`
        }],
        "thoma": [{
            "title": `About ${name}`,
            "content": `Oh, did you meet ${name}? I suppose you've been frequenting the Kamisato residence lately... What did you think about them?

            Hmm, I see, I see! The young miss introduced the two of you! <span style="font-size: 0.8em">... That's fine then.</span>

            Aren't they really nice? Did they talk about me? I have some time to spare, so we can sit down for some tea! Why don't you tell me all about it over some tea time snacks?`
        }, {
            "title": `Your Relationship`,
            "content": `"The perfect couple"? R-Really? Do people really say that? Aw, geez, that's kinda embarrassing, but it makes me happy that people recognize how well we get along with each other, haha!

            ${name} could be a little stubborn sometimes, but they're just the sweetest! *giggle* Oh, and don't worry, when we get married one day, I'll be sure to invite you as one of the guests!`
        }, {
            "title": `Competitors`,
            "content": `*strained laugh* Uhm, well, I can't deny that there are a lot of people around us, and with me being busy tending to the Kamisato siblings' needs, there isn't enough time for me to regularly check on them...

            B-But, the young master has been really kind, so I really have nothing to worry about! Huh? What kind of help did he provide? Well, there are numerous things, really. For example... He's provided me with an adequate living section in the Kamisato residence, since I'm the young miss' retainer, and he allowed ${name} to reside there! Just normal things, you know? Man, I sure am glad I work for a really accommodating boss!`
        }, {
            "title": `Would you ever let go?`,
            "content": `You know, my mom used to say, if you truly love someone, you should always keep them close to your heart... And I agree wholeheartedly with her! Plus, ${name} enjoys my company very much, why would I <i>'let them go'</i>?`
        }]
    }

    chars = [{
        key: "kazuha",
        name: "Kazuha",
        bg: "kazuha2.mp4",
        idx: 0,
        voicelines: voicelines.kazuha
    }, {
        key: "tartaglia",
        name: "Tartaglia",
        bg: "tartaglia2.mp4",
        idx: 1,
        voicelines: voicelines.tartaglia
    }, {
        key: "ayato",
        name: "Ayato",
        bg: "ayato.mp4",
        idx: 2,
        voicelines: voicelines.ayato
    }, {
        key: "zhongli",
        name: "Zhongli",
        bg: "zhongli2.mp4",
        idx: 3,
        voicelines: voicelines.zhongli
    }, {
        key: "thoma",
        name: "Thoma",
        bg: "thoma.mp4",
        idx: 4,
        voicelines: voicelines.thoma
    }];

    getChar();
}

function getChar() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let charKey = urlParams.get('char');
    charKey = charKey ? charKey : "kazuha"

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
