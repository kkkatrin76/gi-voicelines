var version = 1.2;
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
        if (!name || name == undefined || name === "null") {
            name = "[name]";
        }
        localStorage.setItem("name", name);
    }

    deityName = localStorage.getItem("deityName");
    if (!deityName || deityName == undefined || deityName === "null") {
        deityName = prompt("Please enter your deity name", "[deityName]");
        if (!deityName || deityName == undefined || deityName === "null") {
            deityName = "[deityName]";
        }
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
            "content": `You speak of the god of war, yes? I see you have done your research. Diligent as always, Traveler.

            To answer your curiosity - yes, my dearest held this name prior to the rite of descension. They knew of my plan to step down as an archon, and agreed to spend the rest of our lives walking among mortals. So far, it seems like they are adjusting to it and enjoying it quite well. The other day, they enthused me about this new aromatic drink imported from Sumeru. It seems like the drink gave them a boost of energy and a rush of adrenaline just from a few sips-

            Oh? You can't imagine them being enthusiastic about something? *chuckle* You see, it is quite simple. Their eyes will widen for about three to five millimeters. Their posture will hunch slightly, and their arms are likely to be moving in one way or another. Their voice pitch with increase, and their speech pattern will usually...

            Ah... Dear me, my apologies. You look just like my companions whenever they feel that I have talked a little too much about my dearest. I suppose whenever it comes to them, I tend to go a little too... <i>passionate</i>, for most people's tastes.`
        }, {
            "title": `Rex Lapis and ${deityName}`,
            "content": `*laugh* Well, that brings back memories. I suppose you heard of those tales while you were watching Miss Yun Jin's opera? Or perhaps it was the storytellers?

            I cannot say that they are completely wrong - though some details have been quite... romanticized, or read into for a little too much.

            For example, about giving pebbles to show a romantic interest in someone. I had not given it because I desired for them to 'have a piece of me to always be by their side'. I simply thought they were lovely to look at, and I wished to make them smile.

            Although, their theory about how knives being exchanged upon a couple's union in marriage was almost accurate. To be completely precise, on our one thousand year anniversary, ${name} gifted me with a crafted and personally blessed knife that can cut down a god. This was a gesture of faith and conviction. As the god of war, this was the best present they could have given me. I treasure the weapon to this day.... Ah, how nostalgic...

            Hm? Are you interested in this weapon, Traveler? Haha, I'm afraid I cannot abide by your request this time. However, I can certainly ask ${name} to perhaps bless a weapon of your preference. In their hands, even a dull blade can become a deadly weapon. I trust you will look after it with the utmost care and will refrain from using it for nefarious purposes.`
        }, {
            "title": `Xiao and ${deityName}`,
            "content": `The young adepti certainly seems to look up to ${name}, does he not? I think there are certain things that make them connect on a spiritual level. For this, I couldn't be anything less than overjoyed. Though he might deny the notion of needing any sort of social interaction and personal interrelationship, I believe it is good for him to interact more with others, be it with mortals or adepti. Would you be so kind as to tell me about how he's doing, if you had the chance to visit Wangshu Inn recently?`
        }, {
            "title": `The sibling adepti`,
            "content": `I see you've met the children. They're quite the interesting duo, aren't they? Fiercely loyal to a fault, too. How did your first meeting go? I hope they did not intimidate you - I promise they only mean well.

            Oh? They told you to tell me that? Dear me, no matter how many centuries pass, it seems like I will never gain their complete trust. *laugh* I suppose they are feeling a little lonely. It is true that it has been a while since we last visited. I should plan for it with ${name}, then. Thank you for relaying their message.`
        }, {
            "title": `Hungry Ghost Festival`,
            "content": `My apologies, I have a rather urgent business that requires my utmost attention. Could we perhaps reconvene at a later date?`
        }, {
            "title": `About the God of Sun`,
            "content": `Ah... Where did you hear about them?

            I see. You visited Qingyun Peak, then... *sigh*

            ... Yes, as you surmised. The god of sun was ${deityName}'s closest companion, back when they were much younger. I'm afraid it is not my place to tell this story, however. The God of Sun, Invictus... This is quite a heavy topic for my dearest. Please, take great care in approaching them and when you ask about it, do not push them if they refuse to tell you. Perhaps in due time, they will recount the tale to you.`
        }, {
            "title": `About ${name} 2`,
            "content": `Speaking of ${name}, they have been subtly hinting to me that you are welcome to visit our abode anytime. It seems like you've helped them greatly the last time you met them. From the bottom of my heart, I thank you for your kindness. They tend to overexert themselves sometimes, despite knowing that doing so isn't good for them. *sigh* It is truly worrying.

            Hm? You will help in watching over ${name} whenever you see them, you say? *chuckle* Why, thank you. You are quite the kind soul, Traveler.

            If you need some help on your commissions, please do not hesitate to ask for my help. I am quite confident I should be able to assist you in your quests.`
        }, {
            "title": `About ${deityName} 2`,
            "content": `Their god form? Hm, it is truly a magnificent sight to witness. They command attention and exude power on the battlefield. Most of the time, their enemies do not dare to lock eyes with them, for they will only see the fierce glare of a tiger, and they will despair knowing that their life will end in vain.

            Their beast form is such a wonder to behold, too. Though they do not use it as often, because of this fact also, it strikes the utmost mental damage whenever it is released upon the battleground. The way their white and black striped fur are tainted with blood strikes fear to the opposing soldiers yet raises the fighting spirit of their own army.

            Oh, does your traveling companion find these descriptions too scary? My apologies, little one. But you do not need to worry; they are all but stories of the past. I do not foresee you will bear witness to such sights, unless danger threatens to destroy Liyue and the Qixing are unable to stop it.`
        }],
        "xiao": [{
            "title": `About ${name}`,
            "content": `Ah... Yes, I do know of them. What of it?

            I would advise you to not bother them with your troubles. They have more important matters to attend to. If you truly need help, call me instead.`
        }, {
            "title": `About ${deityName}`,
            "content": `Do not speak of their name so casually. They are the spouse of Rex Lapis, so in Liyue you must refer to them as the Deity of Peace.

            That expression... You do not think that the designation suits them, do you? You must have heard about the rumors. I assure you, while not all of them were lies, if you would just spend some time with them, you will realize that they are nothing as the malicious whispers of the mortals designed them to be.

            One's past... might not be able to be erased, but one should not be defined by it. This is what they used to tell me. I would like to ask you to consider this when talking to them.`
        }, {
            "title": `Rex Lapis and ${deityName}`,
            "content": `I believe the mortals have a specific phrase for this.... 'Match made in Celestia', or something to that line? It certainly resembles their relationship.

            Huh? How so? *sigh* Just go around Liyue Harbor and ask the people there. You will understand soon enough.`
        }, {
            "title": `The sibling adepti`,
            "content": `Ah, those kids. Are they still obstinately hovering over their former master, even now? Foolish ones who cannot even hold their promise... How impudent. They're a pair of overzealous troublemakers, that's what they are.`
        }, {
            "title": `Hungry Ghost Festival`,
            "content": `Tsk. Is it already that time of the year?

            You wish to know what the festival is about? Hm. I suppose you wouldn't know since it is a unique event of Liyue...

            It is said that in the seventh month of the year, the connection between the realm of the living and the realm of the spirits wavers, so the spirit of the undead will rise up upon the lands. In order for the mortals to continue living without being disturbed, they would provide countless offerings and try to scare the ghosts away by organizing festivals that span for days.

            <span style="font-size:0.9em">... Although, in the end, the gifts and festivities itself does nothing to quell the wrath of the slaughtered.</span>`
        }, {
            "title": `About the God of Sun`,
            "content": `I have heard about that name, but I believe they passed away a long time ago. Why the sudden interest?`
        }, {
            "title": `About ${name} 2`,
            "content": `Huh? What is this?

            *cough* ... Haah. Eons have passed and still they insist on treating and referring to me as a "child". I assume they told you to make sure I ate all these mortal food, too? Hmph. Of course they would.

            Wha- I did not say that I would not eat them! Hey- Traveler! Stop that floating companion of yours from stealing <i>my</i> food!`
        }, {
            "title": `About ${deityName} 2`,
            "content": `It was my honor to be able to serve under Rex Lapis and ${deityName} in the Archon War, until now. Though they have... rescinded their titles, it does not change what they have done to help me in the past. I will continue to fulfill my promise and my duty until my last breath, just as I will not take other masters aside from them for as long as the karmic debt has not consumed me entirely.`
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
