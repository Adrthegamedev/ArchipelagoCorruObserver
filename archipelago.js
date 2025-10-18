// CORRU.OBSERVER ARCHIPELAGO
// BY: NOVAE_SYS

// WITH HEAVY CODE USE FROM AP_COOKIECLICKER BY SIMIK1997
// WITH LICENSE: MIT LICENSE
// TRANSCLUDED HERE:
// MIT License
// 
// Copyright (c) 2025 Simik1997
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

resEl = document.createElement('script')
resEl.type = "module"
// resEl.src = `https://file.garden/XfgsWwFNIyd3vjoq/archipelagoclientd.js`
resEl.text = `
import {
    Client
} from "https://unpkg.com/archipelago.js/dist/archipelago.min.js";

body.insertAdjacentHTML('beforeend', \`<style>
.dialogue-message.actor-archi {
    text-shadow: 0px 0px var(--friend-color); /* adjustment by octo */
}

.readout-log .message.archi {
    color: var(--friend-color);
    border-color: var(--friend-color);
}
    
#readout-inp {
	position: fixed;
	top: 0;
	left: 0;
	width: 25%;
	height: 100%;
    font-size: 0.75rem;
    padding: 15vh 0.5rem 0;
	overflow-y: auto;
    overflow-x: hidden;
	background: var(--dark-color);
	color: var(--bright-color);
	font-family: spacemono;
	transition: transform 1s cubic-bezier(.33,.63,.14,.99);
    transform: translateX(-100%);
	z-index: 26;
    scrollbar-color: #ffff00b5 var(--dark-color);
}


#readout-inp.smoothscroll {
	scroll-behavior: smooth;
}

#readout-inp::after {
	content: "";
	width: 100%;
	height: 20vh;
	display: block;
}

.mui-active #readout-inp {
    transform: translateX(0%);
}

:root.bigmode #readout-inp { width: 30%; }

@media only screen and (max-width: 1366px) {
    #readout-inp { width: 33%; }

    :root.bigmode #readout-inp { width: 40%; }

}
    
.hard-cut #readout-inp, {
    transition: 1ms !important;
}</style>\`);

env.dialogueActors["archi"] = {
    image: 'https://adrfurret.neocities.org/corrumods/img/mui/mindspikelogoarchipelago-license-Krista%20Corkos%20and%20Christopher%20Wilson-cc-nc-4.0.gif',
    type: "archi sys sneakysourceless",
    player: true,
    noProcess: true,
    voice: () => {
        play('muiScanner', 2)
    }
};

const connectionContainer = document.createElement("details");
connectionContainer.className = "minor modstring"
const summaryexplainer = document.createElement("summary");
summaryexplainer.textContent = "Archipelago Connection settings"
summaryexplainer.setAttribute("definition", "NOTICE::'third-party server connection system';'configure before anything else'")
const stringinputdiv = document.createElement("div");
stringinputdiv.className = "stringinput"

const hostname = document.createElement("input");
const port = document.createElement("input");
const slotname = document.createElement("input");
const password = document.createElement("input");
const connect = document.createElement("button");
const consoleInput = document.createElement("input");
consoleInput.disabled = true;
connectionContainer.append(
    summaryexplainer, stringinputdiv
);
stringinputdiv.append(
    hostname, port, slotname, password, connect
);
connect.onclick = function() {
    connectAP();
};
hostname.placeholder = "Address";
hostname.style.width = "120px";
port.placeholder = "Port";
port.style.width = "64px";
slotname.placeholder = "Slot Name";
slotname.style.width = "120px";
password.placeholder = "Password";
password.type = "password";
password.style.width = "100px";
connect.innerText = "Connect";
consoleInput.placeholder = "!hint"
consoleInput.className = "menu"
consoleInput.id = "readout-inp"
consoleInput.style = "height: 5%; top:unset; bottom:0; padding:unset"

// Console
consoleInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        archiclient.messages.say(consoleInput.value);
        consoleInput.value = "";
    }
});

env.menu["system-menu"].getElementsByClassName("minor")[0].append(
    connectionContainer
);

body.append(
    consoleInput
);

function connectAP() {
    // Create a new instance of the Client class.
    const client = new Client();

    archiclient = client

    connect.disabled = true;
    hostname.disabled = true;
    port.disabled = true;
    slotname.disabled = true;
    password.disabled = true;
    consoleInput.disabled = false;
    if (parseInt(port.value) !== parseInt(flags['port'])) {
        //if (confirm("Your Port changed, so this might be a new Game. DELETE LOCAL SAVE GAME?") == true) {
        //    Game.HardReset(2);
        //    receivedItems = [];
        //}
    }
    var self = this;
    
    
    const connectionSettings = {
        password: password.value,
        items_handling: 7,
    };


    console.log(change.toString())

    function sanitize(text) {
        return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\\n", "<br>")
    }

    function typeToText(element) {
        var id = -1;
        id = Number(element.text);
        var selfSlot = client.players.self.slot;
        var playerId = client.players.self.slot;

        if (element.player !== undefined) {
            playerId = Number(element.player);
        }
        if (element.type === "player_id" && !isNaN(id)) {
            var player = client.players.findPlayer(Number(id)).name
            if(Number(selfSlot) == Number(id)){
                return "<span style='color:var(--obesk-color);'>" + player + "</span>";
            } else {
                return "<span style='color:var(--neutral-color);'>" + player + "</span>";
            }
        } else if (element.type === "item_id" && !isNaN(id)) {
            var item = client.package.lookupItemName(client.players.findPlayer(Number(playerId)).game, Number(id))
            if (element.flags !== undefined) {
                if (element.flags & 1) {
                    return "<span style='color:#0066ff;'>" + item + "</span>";
                }
                if (element.flags & 2) {
                    return "<span style='color:var(--neutral-color);'>" + item + "</span>";
                }
                if (element.flags & 4) {
                    return "<span style='color:var(--bastard-color);'>" + item + "</span>";
                }
                return item
            }
        } else if (element.type === "location_id" && !isNaN(id)) {
            var location = client.package.lookupLocationName(client.players.findPlayer(Number(playerId)).game, Number(id))
            return "<span style='color:var(--fundfriend-color);'>" + location + "</span>";
        } else if (element.text !== undefined) {
            if (element.color !== undefined) {
                switch (element.color) {
                    case "bold":
                        return "<b>" + sanitize(element.text) + "</b>";
                    case "underline":
                        return "<u>" + sanitize(element.text) + "</u>";
                    case "black":
                        return "<span style='color:DarkGray;'>" + sanitize(element.text) + "</span>";
                    case "red":
                        return "<span style='color:var(--bastard-color);'>" + sanitize(element.text) + "</span>";
                    case "green":
                        return "<span style='color:var(--fundfriend-color);'>" + sanitize(element.text) + "</span>";
                    case "yellow":
                        return "<span style='color:var(--neutral-color);'>" + sanitize(element.text) + "</span>";
                    case "blue":
                        return "<span style='color:#0066ff;'>" + sanitize(element.text) + "</span>";
                    case "magenta":
                        return "<span style='color:var(--obesk-color);'>" + sanitize(element.text) + "</span>";
                    case "cyan":
                        return "<span style='color:var(--friend-color);'>" + sanitize(element.text) + "</span>";
                    case "white":
                        return "<span style='color:color:var(--bright-color);'>" + sanitize(element.text) + "</span>";
                    case "black_bg":
                        return "<span style='background-color:DarkGray;'>" + sanitize(element.text) + "</span>";
                    case "red_bg":
                        return "<span style='background-color:var(--bastard-color);'>" + sanitize(element.text) + "</span>";
                    case "green_bg":
                        return "<span style='background-color:var(--fundfriend-color);'>" + sanitize(element.text) + "</span>";
                    case "yellow_bg":
                        return "<span style='background-color:var(--neutral-color);'>" + sanitize(element.text) + "</span>";
                    case "blue_bg":
                        return "<span style='background-color:#0066ff;'>" + sanitize(element.text) + "</span>";
                    case "magenta_bg":
                        return "<span style='background-color:var(--obesk-color);'>" + sanitize(element.text) + "</span>";
                    case "cyan_bg":
                        return "<span style='background-color:var(--friend-color);'>" + sanitize(element.text) + "</span>";
                    case "white_bg":
                        return "<span style='background-color:color:var(--bright-color);'>" + sanitize(element.text) + "</span>";
                    default:
                        return sanitize(element.text);
                }
            }
            if (element.hint_status !== undefined) {
                switch (element.hint_status) {
                    case 10:
                        return "<span style='color:DarkGray;'>" + sanitize(element.text) + "</span>";
                    case 20:
                        return "<span style='color:var(--bastard-color);'>" + sanitize(element.text) + "</span>";
                    case 30:
                        return "<span style='color:#0066ff;'>" + sanitize(element.text) + "</span>";
                    case 40:
                        return "<span style='color:var(--fundfriend-color);'>" + sanitize(element.text) + "</span>";
                    default:
                        return sanitize(element.text);
                }
            }
            return sanitize(element.text);
        } else {
            return element;
        }
    }

function packetToText(packet) {
    if (packet === undefined) {
        return "";
    }
    var msg = "";
    packet.forEach(element => {
        msg += typeToText(element);
    });
    return msg;
}
    // Set up an event listener for whenever a message arrives and print the plain-text content to the console.
    client.socket.on("printJSON", (packet) => {
        console.log("Print JSON: ", packet);
        var msg = packetToText(packet.data);
        if (msg === "") {
            return;
        }
        console.log("MSG: " + msg);
        chatter({actor: 'archi', text: msg, readout: true})
    });

    function receiveItem(id, firstTime) {

        if (firstTime) {
            receivedItems.push(id);
            console.log("I apply a new item!" + id);
        }

        save();
        
        if (firstTime) {
        let itemflag = itemtable[id]
        let itemflagisdialogue = (itemflag.includes("__") || itemflag.includes("++"))
        let itemflagisnotstart = itemflag.includes("-")

        let keyfake = ""
        let valuefake = ""

        if(id < 54150000) {
        switch (itemflag) {
            case "progressive ep0_epilogue":
                keyfake = "ep0_epilogue"
                if (flags["ep0_epilogue"] == "started") {
                    flags["ep0_epilogue"] = "done"
                    valuefake = "done"
                }
                if (flags["ep0_epilogue"] == "awaiting") {
                    flags["ep0_epilogue"] = "started"
                    valuefake = "started"
                }
                if (typeof flags["ep0_epilogue"] == "undefined") {
                    flags["ep0_epilogue"] = "awaiting"
                    valuefake = "awaiting"
                }
                break


            case "progressive secavik":
                keyfake = "secavik"
                if (flags["secavik"] == true) {
                    flags["secavik"] = "beaconed"
                    valuefake = "beaconed"
                }
                if (typeof flags["secavik"] == "undefined") {
                    flags["secavik"] = true
                    valuefake = true
                }
                break

            case "realcyst_scanned":
                keyfake = "realcyst_scanned"
                valuefake = true
                flags["realcyst_scanned"] = true
                if (page.path == "/") {
                    document.querySelector('.crosshair').classList.add('show')
                }

            case "flan":
                keyfake = "flan"
                if (flags["e3a2escape"] == "complete") {
                    flags["flan"] = "post-escape"
                    valuefake = "post-escape"
                } else {
                    flags["flan"] = "pre-escape"
                    valuefake = "pre-escape"
                }
                break

            case "hazard":
                keyfake = "hazard"
                if (flags["e3a2escape"] == "complete") {
                    flags["hazard"] = "post-escape"
                    valuefake = "post-escape"
                } else {
                    flags["hazard"] = "pre-escape"
                    valuefake = "pre-escape"
                }
                break

            case "cmb_unlocked":
                keyfake = "cmb_unlocked"
                if (flags["e3a2escape"] == "complete") {
                    flags["cmb_unlocked"] = "post-escape"
                    valuefake = "post-escape"
                } else {
                    flags["cmb_unlocked"] = "pre-escape"
                    valuefake = "pre-escape"
                }
                break

            case "reward_bfg":
                flags["reward_bfg"] = "bfg_collected"
                keyfake = "reward_bfg"
                valuefake = "bfg_collected"
                break

            case "reward_grenade":
                flags["reward_grenade"] = "grenade_collected"
                keyfake = "reward_grenade"
                valuefake = "grenade_collected"
                break

            case "reward_rifle":
                flags["reward_rifle"] = "rifle_collected"
                keyfake = "reward_rifle"
                valuefake = "rifle_collected"
                break

            case "reward_shotgun":
                flags["reward_shotgun"] = "shotgun_collected"
                keyfake = "reward_shotgun"
                valuefake = "shotgun_collected"
                break

            case "reward_sniper":
                flags["reward_sniper"] = "sniper_collected"
                keyfake = "reward_sniper"
                valuefake = "sniper_collected"
                break

            case "mothotomy":
                flags["mothotomy"] = 1
                keyfake = "mothotomy"
                valuefake = 1
				mothkill();
                break

            case "recosm_state":
                flags["recosm_state"] = "spared"
                keyfake = "recosm_state"
                valuefake = "spared"
                break
                
            case "daemon":
                flags["daemon"] = "saw"
                keyfake = "daemon"
                valuefake = "saw"
                break
                
            case "e3a2__escapewin":
                flags.dialogues["e3a2__escapewin-start"] = true
                flags.dialogues["e3a2__dreamescapewin-start"] = true
                flags.dialogues["e3a2__geliintro-start"] = true
                flags.dialogues["ozo__ozogeli-start"] = true
                localStorage.setItem('flags', JSON.stringify(flags))
                break

            default:
                if (itemflagisdialogue) {
                    if (!itemflagisnotstart) {
                        itemflag = itemflag + "-start"
                    }
                    if(typeof locationtablenoswitch[itemflag] != "undefined") {
                        flags.dialogues["KEY!!" + itemflag] = true;
                    }
                    flags.dialogues[itemflag] = true
                    localStorage.setItem('flags', JSON.stringify(flags))
                } else {
                    flags[itemflag] = true;
                    if(typeof locationtablenoswitch[itemflag] != "undefined") {
                        flags["KEY!!" + itemflag] = true;
                    }
                    keyfake = itemflag
                    valuefake = true
                }

        }
        if (!itemflagisdialogue) {
            updateFlags()
            checkEpisodeProgress()

            // Dispatch the change event
            document.dispatchEvent(new CustomEvent('corru_changed', {
                detail: {
                    keyfake,
                    valuefake
                }
            }));
        }
    } else {
        const itemarr = itemflag.split(",");
        if(typeof flags.detectedEntities[itemarr[0]] == "undefined") {
            switch (itemarr[0]) {
                case "..__LOCALHOST__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__LOCALHOST__..",
                    "path": "/hub/",
                    "order": "0",
                    "image": "/img/socials/hub.gif",
                    "entities": {
                    }
                  }
                break
                case "..__THEIR_CITY__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__THEIR_CITY__..",
                    "path": "/local/city/",
                    "order": "1",
                    "image": "/img/socials/city.gif",
                    "entities": {
                    }
                  }
                break
                case "..__THE_VOID__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__THE_VOID__..",
                    "path": "/local/orbit/",
                    "order": "2",
                    "image": "/img/socials/orbit.gif",
                    "entities": {
                    }
                  }
                break
                case "..__CITY_SURFACE__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__CITY_SURFACE__..",
                    "path": "/local/city/street/",
                    "order": "1",
                    "image": "/img/socials/city.gif",
                    "entities": {
                    }
                  }
                break
                case "..__THEIR_WATERS__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__THEIR_WATERS__..",
                    "path": "/local/ocean/",
                    "order": "4",
                    "image": "/img/socials/ocean.gif",
                    "entities": {
                    }
                  }
                break
                case "..__THEIR_VESSEL__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__THEIR_VESSEL__..",
                    "path": "/local/ocean/ship/",
                    "order": "4",
                    "image": "/img/socials/ship.gif",
                    "entities": {
                    }
                  }
                break
                case "..__OUR_DULL_VESSEL__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__OUR_DULL_VESSEL__..",
                    "path": "/local/dullvessel/",
                    "order": "3",
                    "image": "/img/socials/dullvessel.gif",
                    "entities": {
                    }
                  }
                break
                case "..__THE_EMBASSY__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__THE_EMBASSY__..",
                    "path": "/local/ocean/embassy/",
                    "order": "3",
                    "image": "/img/socials/embassy.gif",
                    "entities": {
                    }
                  }
                break
                case "..__CACHE__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__CACHE__..",
                    "path": "/local/cache/",
                    "image": "/img/socials/where.gif",
                    "entities": {
                    }
                  }
                break
                case "»é»¯uÂ%S¥(»":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "»é»¯uÂ%S¥(»",
                    "path": "/local/uncosm/where/",
                    "order": "20",
                    "image": "/img/socials/uncosm.gif",
                    "entities": {
                    }
                  }
                break
                case "a?-?b?-????-y?s?":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "a?-?b?-????-y?s?",
                    "path": "/local/beneath/",
                    "order": "31",
                    "image": "/img/socials/beneath.gif",
                    "entities": {
                    }
                  }
                break
                case "..__JOKZI_OZO__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__JOKZI_OZO__..",
                    "path": "/local/ozo/",
                    "order": "30",
                    "image": "/img/socials/ozo.gif",
                    "entities": {
                    }
                  }
                break
                case "..__GOLEM_MAINTENANCE__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__GOLEM_MAINTENANCE__..",
                    "path": "/local/ocean/embassy/golem/",
                    "order": "3",
                    "image": "/img/socials/golms.gif",
                    "entities": {
                    }
                  }
                break
                case "::/FRAME/":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "::/FRAME/",
                    "path": "/local/beneath/embassy/",
                    "order": "30",
                    "image": "/img/socials/frame.gif",
                    "entities": {
                    }
                  }
                break
                case "..__PALE_HALLS__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__PALE_HALLS__..",
                    "path": "/local/ocean/embassy/groundsmindry/",
                    "order": "4",
                    "image": "/img/socials/groundsmindry.gif",
                    "entities": {
                    }
                  }
                break
                case "p?a-??r?-???s?-t?e?":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "p?a-??r?-???s?-t?e?",
                    "path": "/local/beneath/parasite/",
                    "order": "32",
                    "image": "/img/socials/beneathparasite.gif",
                    "entities": {
                    }
                  }
                break
                case "o???-??b????-?s-???k?-i??":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "o???-??b????-?s-???k?-i??",
                    "path": "/local/beneath/obeski/",
                    "order": "32",
                    "image": "/img/socials/beneathparasite.gif",
                    "entities": {
                    }
                  }
                break
                case "?-?l?-?a??-bs?":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "?-?l?-?a??-bs?",
                    "path": "/local/uncosm/pit/",
                    "order": "1",
                    "image": "/img/socials/pit.gif",
                    "entities": {
                    }
                  }
                break
                case "..__BETTER_TIMES__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__BETTER_TIMES__..",
                    "path": "/local/ocean/polygonation/",
                    "order": "4",
                    "image": "/img/socials/bt.gif",
                    "entities": {
                    }
                  }
                break
                case "..__AQUARIUM__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__AQUARIUM__..",
                    "path": "/local/city/aquarium",
                    "order": "1",
                    "image": "/img/textures/corruripple.gif",
                    "entities": {
                    }
                  }
                break
                case "..__BRIGHT_MOON__..":
                  flags.detectedEntities[itemarr[0]] = {
                    "title": "..__BRIGHT_MOON__..",
                    "path": "/local/orbit/moon/",
                    "order": "3",
                    "image": "/img/socials/moon.gif",
                    "entities": {
                    }
                  }
                break
            }
        }
        if(typeof flags.detectedEntities[itemarr[0]].entities[itemarr[1]] == "undefined") {
            flags.detectedEntities[itemarr[0]].entities[itemarr[1]] = {
            name: itemarr[1],
            image: "https://adrfurret.neocities.org/corrumods/img/mui/mindspikelogoarchipelago-license-Krista%20Corkos%20and%20Christopher%20Wilson-cc-nc-4.0.gif", 
            text: '::UNPROCESSED THOUGHTFORM',
            }
            
        }
        flags.detectedEntities[itemarr[0]].entities[itemarr[1]].scanned = true
        localStorage.setItem('flags', JSON.stringify(flags))
    }
}
    }

    client.socket.on("connected", (packet) => {
        console.log("Connected to server: ", packet);
        save();
    });

    client.socket.on("receivedItems", (packet) => {
        console.log("Received Items: ", packet);

        // When items.length > 1 its an reconnect
        if (packet.items.length > 1) {
            var serverItems = [];
            var ep0countpacket = 0;
            var secavikcountpacket = 0;
            var ep0count = 0;
            var secavikcount = 0;

            // Execute Items with firstTime = false > only Unlocks, no Traps or Items
            packet.items.forEach(item => {
                if(item.item == 54140025) {ep0countpacket++;}
                if(item.item == 54140083) {secavikcountpacket++;}
                receiveItem(item.item, false);
                serverItems.push(item.item);
            });
            

            

            let difference = serverItems.filter(x => !receivedItems.includes(x));

            difference.forEach(id => {
                receiveItem(id, true);
            });

            // hacky hack
            receivedItems.forEach(item => {
                if(item == 54140025) {ep0count++;}
                if(item == 54140083) {secavikcount++;}
            });
            
if((ep0count==0) && (ep0countpacket>1)) {ep0countpacket = ep0countpacket - 1}
if((secavikcount==0) && (secavikcountpacket>1)) {secavikcountpacket = secavikcountpacket - 1}

if(((ep0count>0) || (ep0countpacket>1)) && (ep0countpacket>ep0count)){
for (let step = 0; step < (ep0countpacket - ep0count); step++) {
  receiveItem(54140025, true);
}
}
if(((secavikcount>0) || (secavikcountpacket>1)) && (secavikcountpacket>secavikcount)){
for (let step = 0; step < (secavikcountpacket - secavikcount); step++) {
  receiveItem(54140083, true);
}
}

        } else { // Just one Item means its new > always use
            receiveItem(packet.items[0].item, true);
        }
    });

    // Login to the server. Replace "archipelago.gg:XXXXX" and "Phar" with the address/url and slot name for your room.
    // If no game is provided, client will connect in "TextOnly" mode, which is fine for this example.
    client
        .login("wss://" + hostname.value + ":" + parseInt(port.value), slotname.value, "CorruObserver", connectionSettings)
        .then(() => {
            console.log("Connected to the server");
            if(typeof flags['scansanity'] == "undefined"){
                archiclient.players.self.fetchSlotData().then((value) => {
                flags['slotmods'] = value.mods
                let changesmade = false;
                if (flags['slotmods'] != []) {
                    let slotMods = check("slotmods")
                    let modList = check("modList")
                    let modListNew = check("modList").split("\\n")
                    
                    if(slotMods.includes("obski") && !(modList.includes("obeskipara"))) {
                        modListNew.push("https://adrfurret.neocities.org/corrumods/obeskipara.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("surfacerunning") && !(modList.includes("surfacerunning"))) {
                        modListNew.push("https://genseot.github.io/mods/surfacerunning/surfacerunning.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("quiz") && !(modList.includes("quiz"))) {
                        modListNew.push("https://sola.nekoweb.org/misc/quiz.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("maze") && !(modList.includes("MAZE_LOADER"))) {
                        modListNew.push("https://file.garden/ZBykMtEMpVTUWZ-e/funny/MAZE_LOADER.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("kotzu") && !(modList.includes("KOTZUSAGA"))) {
                        modListNew.push("https://file.garden/Z76oaY7PbGBcqIDE/corrumodding/kotzusaga/KOTZUSAGA.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("humoroushumors") && !(modList.includes("narra_morehumors"))) {
                        modListNew.push("https://narrativohazard-expunged.neocities.org/codebases/narra_morehumors.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("vielk") && !(modList.includes("vielk"))) {
                        modListNew.push("https://adrfurret.neocities.org/corrumods/vielk.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("theirstreets") && !(modList.includes("theirstreets"))) {
                        modListNew.push("https://genseot.github.io/mods/theirstreets/theirstreets.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("mothlobotomy") && !(modList.includes("lobotomize"))) {
                        modListNew.push("https://file.garden/aNd0eqDxKF1uOREs/lobotomize.js")
                        changesmade = true;
                    }
                    if(slotMods.includes("councilaltdance") && !(modList.includes("councildance"))) {
                        modListNew.push("https://file.garden/ZBykMtEMpVTUWZ-e/councildance.js")
                        changesmade = true;
                    }
                    flags['modList'] = modListNew.join("\\n")
                }
                flags['scansanity'] = value.scansanity
                localStorage.setItem('flags', JSON.stringify(flags))
                if (changesmade) {
                    corruStatic.play()
                    corruStatic.fade(0, 0.5, 1000)
                    readoutAdd({message: "SAVEFILE MODS INITIALISED::ALERT::RELOADING::...'", name:"archi"})
                    setTimeout(()=>{
                        location.replace('/')
                    }, 3000)
                }});
            }
        })
        .catch((error) => {
            console.error("Failed to connect:", error.toString());
            chatter({
                actor: 'archi',
                text: error.toString(),
                readout: true
            })
            connect.disabled = false;
            hostname.disabled = false;
            port.disabled = false;
            slotname.disabled = false;
            password.disabled = false;
            consoleInput.disabled = true;
        });
}

function save() {
    flags['receivedItems'] = JSON.stringify(receivedItems)
    flags['host'] = hostname.value
    flags['port'] = port.value
    flags['slotname'] = slotname.value
    flags['password'] = password.value
    localStorage.setItem('flags', JSON.stringify(flags))
}

function load() {
    receivedItems = JSON.parse(flags['receivedItems'] || null) || [];

    let urlParams = new URLSearchParams(window.location.search);
    hostname.value = urlParams.get('host') || urlParams.get('Host') || flags['host'] || hostname.value || 'archipelago.gg';
    port.value = urlParams.get('port') || urlParams.get('Port') || flags['port'] || port.value || '';
    slotname.value = urlParams.get('slotname') || urlParams.get('Slotname') || flags['slotname'] || slotname.value || '';
    password.value = urlParams.get('password') || urlParams.get('Password') || flags['password'] || password.value || '';
}
load();
if(flags['slotname']){
connectAP()}
`
var archiclient = false
var receivedItems = [];

var itemtable =   {  
    54140000: "ocon_examined",
    54140001: "geye_examined",
    54140002: "realcyst_examined",
    54140003: "realcyst_touched",
    54140004: "realcyst_scanned",
    //54140005: "introcompleted",
    54140006: "visited_hello",
    54140007: "hello_sentry_idiot",
    54140008: "visited_hub",
    54140009: "hub_introduced",
    54140010: "visited_localcity",
    54140011: "visited_localcitystreet",
    54140012: "citystreet_triedchat",
    54140013: "cashier_hello",
    54140014: "citystreet_orangecoffee",
    54140015: "citystreet_gotdrinks",
    54140016: "visited_localorbit",
    54140017: "visited_localdullvessel",
    54140018: "visited_localocean",
    54140019: "visited_localoceanship",
    54140020: "visited_localoceanshipinterview",
    54140021: "interview1__firstchat-behonest",
    //54140022: "dullvessel_dive",
    54140023: "visited_localdepths",
    54140024: "ep0_end",
    54140025: "progressive ep0_epilogue",
    54140026: "visited_localuncosm",
    54140027: "visited_localuncosmno",
    
    54140028: "ep1_showmaterials", 
    54140029: "ep1_fed", 
    54140030: "hub__funfriend-ep1fed",
    54140031: "visited_localoceanembassy",
    54140032: "embassy_d1_complete",
    54140033: "embassy_d2_complete",
    54140034: "ep1_end",
    54140035: "visited_localoceanshipelsewhere",
    54140036: "clement",
    54140037: "seenFFProxy",
    54140038: "visited_localcache",
    54140039: "hub__funfriend-ah1",
    54140040: "visited_localuncosmrecosm",
    54140041: "recosm_greeted",
    54140042: "recosm_began",
    //54140043: "recosm_finalseen",
    54140044: "recosm_state", 
    
    54140045: "fbx__ep2intro-end",
    54140046: "embassy__mothframe-end",
    54140047: "hub__funfriend-mothframe2",
    54140048: "d3_kazkichest",
    54140049: "gakpause",
    54140050: "embassy__d3_movecmb-start",
    54140051: "embassy__d3_movefriend_finish",
    
    54140052: "fbx__ep3intro",
    54140053: "visited_localoceanembassygolem",
    54140054: "dog",
    54140055: "golem_decompression",
    54140056: "gboss",
    54140057: "gol__bossclear",
    
    54140058: "visited_localbeneath",
    54140059: "beneath",
    54140060: "beneath_akiroom",
    54140061: "beneath_dullvessel",
    54140062: "cam_abyss",
    54140063: "cam_effigy",
    54140064: "cam_nope",
    54140065: "drowningCalmed", 
    54140066: "visited_localbeneathparasite",
    54140067: "beneath_team",
    54140068: "beneath_board",
    54140069: "visited_localbeneathdepths",
    54140070: "interviewdie",
    54140071: "interviewbeast_seen",
    54140072: "unity_lady", 
    54140073: "fbx__depthrecovery2", 
    54140074: "visited_localozo",
    54140075: "ozo__council-task", 
    54140076: "ozo__fairy_intro", 
    54140077: "localorbit__fairy_beacon", 
    54140078: "citystreet__flower_beacon", 
    54140079: "effigy_fawners", 
    54140080: "effigy_dancer", 
    54140081: "effigy_gamer", 
    54140082: "effigy_sipper", 
    54140083: "progressive secavik", 
    54140084: "ff_ozo",
    54140085: "hub__funfriend-ozogate",
    54140086: "ozo_enterdark",
    54140087: "ozodance",
    54140088: "earlyeffigy",
    
    54140089: "visited_localbeneathembassy",
    54140090: "daemon",
    //54140091: "bosswarn",
    54140092: "e3a2_earlydaemon",
    54140093: "e3a2_latedaemon",
    54140094: "e3a2_loperxamine",
    
    54140096: "e3a2__escapewin", 
    54140097: "flan",
    
    54140098: "unity_dog",
    54140099: "eo_c_geli", 
    54140100: "eo_c_isabel", 
    54140101: "eo_c_fairy", 
    54140102: "eo_c_stow", 
    54140103: "eo_c_effigies", 
    54140104: "eo_f_geli", 
    54140105: "eo_f_stow", 
    54140106: "eo_f_effigies", 
    54140107: "eo_i_gelistow", 
    54140108: "eo_i_stow", 
    54140109: "eo_i_geli", 
    54140110: "eo_i_fairy", 
    54140111: "eo_d_effigy1", 
    54140112: "eo_d_effigy2", 
    54140113: "eo_d_stow", 
    54140114: "seenSmiler",
    
    54140115: "fbx__ep4intro",
    54140116: "visited_localoceanembassygroundsmindry",
    54140117: "leverage",
    54140118: "ep4__entrancefinal",

    54140119: "ozo__isabel_joy",
    54140120: "ozo__geli_freedom",
    54140121: "joy#any",
    54140122: "joy#ozo_stranger",
    54140123: "joy#hello",
    54140124: "joy#dullvessel_quarters",
    54140125: "joy#office_hall",
    54140126: "joy#hullf",
    54140127: "joy#pit",
    54140128: "citystreet__director-meeting",
    54140129: "cassportal",
    54140130: "drowning_relieved",
    54140131: "visited_localbeneathcar",
    54140132: "car__intro",
    54140133: "visited_localuncosmpit",
    54140134: "landmine",
    54140135: "spida",
    54140136: "thelooker",
    54140137: "pitkey",
    54140138: "pit__f3_unity",
    54140139: "ozo_wakintro",
    54140140: "visited_localoceanpolygonation",
    54140141: "bt__d0_cass",
    54140142: "visited_localorbitmoon",
    54140143: "visited_localoceanshipdeck",
    54140144: "visited_localcityaquarium",
    54140145: "dataroom",
    54140146: "2040thing",
    54140147: "cam_orbit",
    54140148: "cam_street",
    54140149: "cam_darkstreet",
    54140150: "cam_banks",
    54140151: "cam_banksflip",
    54140152: "cam_abysscity",
    54140153: "cam_ozo",
    54140154: "citystreet__rotmeet",
    54140155: "rot_e4a1",
    54140156: "groundstrd",
    54140157: "bt__d0_end",
    54140158: "ozo__wakizet-bt",
    54140159: "eo_d_wakizet",
    54140160: "eo_w_council",
    54140161: "eo_w_isabel",
    54140162: "eo_w_effigies",
    54140163: "eo_w_fairy",
    54140164: "eo_w_geli",
    54140165: "car_ozo",
    54140166: "unity_rot",
    
    54140900: "visited_localuncosmwhere",
    54140901: "visited_localuncosmcavik",
    54140902: "visited_localuncosmclemens%20romanus",
    54140903: "visited_localuncosmcorru",
    54140904: "visited_localuncosmdog",
    54140905: "visited_localuncosmdull",
    54140906: "visited_localuncosmeffigy",
    54140907: "visited_localuncosmflower",
    54140908: "visited_localuncosmhumor",
    54140909: "visited_localuncosmlarval",
    54140910: "visited_localuncosmparasite",
    54140911: "visited_localuncosmsorry",
    54140912: "visited_localuncosmspire",
    54140913: "visited_localuncosmsurface",
    54140914: "visited_localuncosmveilk",
    54140915: "visited_localuncosmyuzku",
    54140916: "visited_localuncosmzuzucri",
    54140917: "visited_localuncosmzuzucri-masks",
    54140918: "visited_localuncosmcall",
    54140919: "visited_localuncosmfairy",
    54140920: "visited_localuncosmwalker",
    
    54149000: "visited_localbeneathobeski",
    54149001: "otherobesk",
    54149002: "talkedtoobeskipiece",
    54149003: "visited_localuncosmsimulacrum",
    54149004: "visited_localuncosmperish",
    54149005: "visited_localuncosmsurfacerunning",
    54149006: "bone",
    54149007: "eyes",
    54149008: "claws",
    54149009: "ichor",
    54149010: "light",
    54149011: "supplemental",
    54149012: "visited_localuncosmquiz",
    54149013: "caged_demon",
    54149014: "demon_beaconed",
    54149015: "reached_end",
    54149016: "connection_attempted",
    54149017: "visited_localuncosmclaws",
    54149018: "visited_localuncosmoutside",
    54149019: "visited_localuncosmbetter",
    54149020: "visited_localuncosmwound",
    54149021: "visited_localuncosmfootsteps",
    54149022: "visited_localuncosmforward",
    54149023: "visited_localuncosmcolored",
    54149024: "visited_localuncosmconnections",
    54149025: "visited_localuncosmimprovement",
    54149026: "visited_localuncosminfluence",
    54149027: "visited_localuncosmmindcore",
    54149028: "visited_localuncosmkotzu",
    54149029: "zokkafound",
    54149030: "kotzumothreturn",
    54149031: "kotzuintrodone",
    54149032: "kotzuazzuntalk",
    54149033: "kotzuzutekitalk",
    54149034: "reward_bfg",
    54149035: "reward_grenade",
    54149036: "reward_rifle",
    54149037: "reward_shotgun",
    54149038: "reward_sniper",
    54149039: "hazard",
    54149040: "cmb_unlocked",
    54149041: "visited_localuncosmvielk",
    54149042: "mothotomy",
    54149043: "default_danced",

    54150000: "..__LOCALHOST__..,funfriend",
    54150001: "..__THEIR_CITY__..,glimmering spires mark their cities",
    54150002: "..__THEIR_CITY__..,these grand icons of their control",
    54150003: "..__THEIR_CITY__..,they watch",
    54150004: "..__THE_VOID__..,our dull vessel",
    54150005: "..__THE_VOID__..,gate::the dull contrivance",
    54150006: "..__CITY_SURFACE__..,cashier",
    54150007: "..__CITY_SURFACE__..,envoy",
    54150008: "..__CITY_SURFACE__..,menu",
    54150009: "..__CITY_SURFACE__..,slim streetwalker",
    54150010: "..__CITY_SURFACE__..,cloaked streetwalker",
    54150011: "..__CITY_SURFACE__..,stre wal k",
    54150012: "..__CITY_SURFACE__..,the room high up",
    54150013: "..__CITY_SURFACE__..,electric face box",
    54150014: "..__CITY_SURFACE__..,beautiful parasite",
    54150015: "..__THEIR_WATERS__..,gate::the depths",
    54150016: "..__THEIR_WATERS__..,their vessel",
    54150017: "..__THEIR_WATERS__..,stilted shore",
    54150018: "..__THEIR_WATERS__..,the embassy",
    54150019: "..__THEIR_VESSEL__..,the funny little room",
    54150020: "..__THEIR_VESSEL__..,clemens romanus",
    54150021: "..__OUR_DULL_VESSEL__..,pilot cyst",
    54150022: "..__OUR_DULL_VESSEL__..,glazika",
    54150023: "..__OUR_DULL_VESSEL__..,container",
    54150024: "..__OUR_DULL_VESSEL__..,parasite plane",
    54150025: "..__OUR_DULL_VESSEL__..,climbing wall",
    54150026: "..__OUR_DULL_VESSEL__..,dull heart",
    54150027: "..__OUR_DULL_VESSEL__..,workspace",
    54150028: "..__OUR_DULL_VESSEL__..,translation slab",
    54150029: "..__OUR_DULL_VESSEL__..,column",
    54150030: "..__OUR_DULL_VESSEL__..,bright ground-parasite",
    54150031: "..__OUR_DULL_VESSEL__..,advanced rejuvenation chamber",
    54150032: "..__OUR_DULL_VESSEL__..,high-pressure body",
    54150033: "..__OUR_DULL_VESSEL__..,personal storage",
    54150034: "..__OUR_DULL_VESSEL__..,equipment storage",
    54150035: "..__THE_EMBASSY__..,akizetesche",
    54150036: "..__THE_EMBASSY__..,cavik",
    54150037: "..__THE_EMBASSY__..,bozko",
    54150038: "..__THE_EMBASSY__..,kazki",
    54150039: "..__THE_EMBASSY__..,tozik",
    54150040: "..__THE_EMBASSY__..,gakvu",
    54150041: "..__THE_EMBASSY__..,miltza",
    54150042: "..__THE_EMBASSY__..,movefriend",
    54150043: "..__THE_EMBASSY__..,mindcores",
    54150044: "..__THE_EMBASSY__..,container",
    54150045: "..__THE_EMBASSY__..,qou body",
    54150046: "..__THE_EMBASSY__..,summarizer",
    54150047: "..__THE_EMBASSY__..,hostile container",
    54150048: "..__THE_EMBASSY__..,hostile veilklight",
    54150049: "..__THE_EMBASSY__..,recollection::discovery",
    54150050: "..__THE_EMBASSY__..,recollection::suspicion",
    54150051: "..__THE_EMBASSY__..,recollection::collapse",
    54150052: "..__THE_EMBASSY__..,attendant",
    54150053: "..__THE_EMBASSY__..,mystery cyst",
    54150054: "..__THE_EMBASSY__..,my seat",
    54150055: "..__THE_EMBASSY__..,barfriend",
    54150056: "..__THE_EMBASSY__..,orange simulacrum",
    54150057: "..__THE_EMBASSY__..,veilklight",
    54150058: "..__THE_EMBASSY__..,rejuvenation chamber",
    54150059: "..__THE_EMBASSY__..,kalstik stand",
    54150060: "..__THE_EMBASSY__..,face stand",
    54150061: "..__THE_EMBASSY__..,cyst cluster",
    54150062: "..__THE_EMBASSY__..,cyst pile",
    54150063: "..__THE_EMBASSY__..,clothing storage",
    54150064: "..__THE_EMBASSY__..,listener",
    54150065: "..__THE_EMBASSY__..,timestopper",
    54150066: "..__THE_EMBASSY__..,window",
    54150067: "..__THE_EMBASSY__..,simulacra dispensary",
    54150068: "..__THE_EMBASSY__..,tir qou",
    54150069: "..__THE_EMBASSY__..,jut qou",
    54150070: "..__THE_EMBASSY__..,kiv qou",
    54150071: "..__THE_EMBASSY__..,vel qou",
    54150072: "..__THE_EMBASSY__..,simulacra",
    54150073: "..__THE_EMBASSY__..,storage display",
    54150074: "..__THE_EMBASSY__..,bright weapons",
    54150075: "..__THE_EMBASSY__..,manipulation slab",
    54150076: "..__THE_EMBASSY__..,unkind eye",
    54150077: "..__THE_EMBASSY__..,sculptor",
    54150078: "..__THE_EMBASSY__..,veilk models",
    54150079: "..__THE_EMBASSY__..,damaged golem",
    54150080: "..__THE_EMBASSY__..,tendrils",
    54150081: "..__THE_EMBASSY__..,movefoe",
    54150082: "..__THE_EMBASSY__..,bstrd door",
    54150083: "..__THE_EMBASSY__..,unnerving cyst",
    54150084: "..__THE_EMBASSY__..,peculiar obelisk",
    54150085: "..__THE_EMBASSY__..,archive",
    54150086: "..__THE_EMBASSY__..,archival golem",
    54150087: "..__THE_EMBASSY__..,jutskin",
    54150088: "..__THE_EMBASSY__..,bstrdlight",
    54150089: "..__THE_EMBASSY__..,pain shelf",
    54150090: "..__THE_EMBASSY__..,bstrd golem",
    54150091: "..__CACHE__..,the storm",
    54150092: "..__CACHE__..,polygonation spire",
    54150093: "..__CACHE__..,ÉœÙ]ïå¥¹",
    54150094: "..__CACHE__..,? ???? ?? ?? ??",
    54150095: "..__CACHE__..,Ò½º",
    54150096: "»é»¯uÂ%S¥(»,memoryhole",
    54150097: "a?-?b?-????-y?s?,s w   al kk",
    54150098: "a?-?b?-????-y?s?,Ƙø¿ƶḳ¿±",
    54150099: "a?-?b?-????-y?s?,×è.÷ùÏÏøø",
    54150100: "p?a-??r?-???s?-t?e?,piece",
    54150101: "..__JOKZI_OZO__..,council",
    54150102: "..__JOKZI_OZO__..,fairy",
    54150103: "..__JOKZI_OZO__..,isabel",
    54150104: "..__JOKZI_OZO__..,effigy",
    54150105: "..__JOKZI_OZO__..,sun",
    54150106: "..__JOKZI_OZO__..,gate::gate::?/::G:a;;T:E",
    54150107: "..__JOKZI_OZO__..,gate::gaGATE::te::?/..::G:a;;T:E",
    54150108: "..__JOKZI_OZO__..,GELI",
    54150109: "..__GOLEM_MAINTENANCE__..,cavelight",
    54150110: "..__GOLEM_MAINTENANCE__..,grand door",
    54150111: "..__GOLEM_MAINTENANCE__..,veilk spear",
    54150112: "..__GOLEM_MAINTENANCE__..,geli",
    54150113: "..__GOLEM_MAINTENANCE__..,lesser terminal",
    54150114: "..__GOLEM_MAINTENANCE__..,greater terminal",
    54150115: "..__GOLEM_MAINTENANCE__..,distribution door",
    54150116: "..__GOLEM_MAINTENANCE__..,instruction workspace",
    54150117: "..__GOLEM_MAINTENANCE__..,preprocessing metals",
    54150118: "..__GOLEM_MAINTENANCE__..,ruined glazika",
    54150119: "..__GOLEM_MAINTENANCE__..,dog",
    54150120: "..__GOLEM_MAINTENANCE__..,archival sludge",
    54150121: "..__GOLEM_MAINTENANCE__..,dull structure",
    54150122: "..__GOLEM_MAINTENANCE__..,shelf",
    54150123: "..__GOLEM_MAINTENANCE__..,echo chamber",
    54150124: "..__GOLEM_MAINTENANCE__..,lightning terminals",
    54150125: "..__GOLEM_MAINTENANCE__..,stowed tools",
    54150126: "..__GOLEM_MAINTENANCE__..,impressor",
    54150127: "..__GOLEM_MAINTENANCE__..,archival hatch",
    54150128: "..__GOLEM_MAINTENANCE__..,husk",
    54150129: "..__GOLEM_MAINTENANCE__..,constructor",
    54150130: "..__GOLEM_MAINTENANCE__..,kivskin",
    54150131: "..__GOLEM_MAINTENANCE__..,repairfriend",
    54150132: "..__GOLEM_MAINTENANCE__..,golem",
    54150133: "..__GOLEM_MAINTENANCE__..,dozkallvi",
    54150134: "..__GOLEM_MAINTENANCE__..,gauntlet",
    54150135: "..__GOLEM_MAINTENANCE__..,dullzika",
    54150136: "..__GOLEM_MAINTENANCE__..,warped container",
    54150137: "..__GOLEM_MAINTENANCE__..,translation core",
    54150138: "..__GOLEM_MAINTENANCE__..,»õGQàº3¾õ”cR%",
    54150139: "..__GOLEM_MAINTENANCE__..,foundation golem",
    54150140: "::/FRAME/,daemon mimic",
    54150141: "::/FRAME/,wrk",
    54150142: "::/FRAME/,clw",
    54150143: "::/FRAME/,net",
    54150144: "::/FRAME/,enfc",
    54150145: "::/FRAME/,seer",
    54150146: "::/FRAME/,archn",
    54150147: "::/FRAME/,dct",
    54150148: "::/FRAME/,spwn",
    54150149: "::/FRAME/,idea",
    54150150: "::/FRAME/,imp",
    54150151: "::/FRAME/,anti",
    54150152: "::/FRAME/,wheel",
    54150153: "::/FRAME/,radio",
    54150154: "::/FRAME/,basterminal",
    54150155: "::/FRAME/,exchange terminal",
    54150156: "::/FRAME/,interloper",
    54150157: "..__PALE_HALLS__..,idril",
    54150158: "..__PALE_HALLS__..,telyu",
    54150159: "..__PALE_HALLS__..,spire status",
    54150160: "..__PALE_HALLS__..,map",
    54150161: "..__PALE_HALLS__..,adull's altar",
    54150162: "..__PALE_HALLS__..,lesser mind status",
    54150163: "..__PALE_HALLS__..,support pod",
    54150164: "..__PALE_HALLS__..,silencing spire",
    54150165: "..__PALE_HALLS__..,dullima pod",
    54150166: "..__PALE_HALLS__..,spinal tether",
    54150167: "..__PALE_HALLS__..,malvi's body",
    54150168: "..__PALE_HALLS__..,knowledge pool",
    54150169: "..__PALE_HALLS__..,heart terminal",
    54150170: "..__PALE_HALLS__..,priority branch",
    54150171: "..__PALE_HALLS__..,spectral mass",
    54150172: "..__PALE_HALLS__..,spectral figure",
    54150173: "..__PALE_HALLS__..,spectral shape",
    54150174: "..__PALE_HALLS__..,spectral attendant",
    54150175: "..__PALE_HALLS__..,spectral jutskin",
    54150176: "..__PALE_HALLS__..,spectral horror",
    54150177: "..__PALE_HALLS__..,spectral golem",
    54150178: "..__PALE_HALLS__..,spectral glazika",
    54150179: "..__PALE_HALLS__..,possessed archivist",
    54150180: "..__PALE_HALLS__..,spectral archival golem",
    54150181: "..__PALE_HALLS__..,spectral eye",
    54150182: "..__PALE_HALLS__..,possessed miltza",
    54150183: "..__PALE_HALLS__..,reanimated golem",
    54150184: "..__PALE_HALLS__..,spectral kiv",
    54150185: "..__PALE_HALLS__..,spectral qou",
    54150186: "..__PALE_HALLS__..,spectral dull golem",
    54150187: "..__PALE_HALLS__..,ceremony",
    54150188: "..__PALE_HALLS__..,ceremony vein",
    54150189: "..__PALE_HALLS__..,ceremony tendril",
    54150190: "..__PALE_HALLS__..,vekoa",

    54150191: "..__THE_VOID__..,gate::bright moon",
    54150192: "..__CITY_SURFACE__..,vehicle stream crossing mechanism",
    54150193: "..__CITY_SURFACE__..,elevator buttons",
    54150194: "..__CITY_SURFACE__..,water cooler",
    54150195: "..__CITY_SURFACE__..,frightfully fragile vessel",
    54150196: "..__THE_EMBASSY__..,recollection::better times",
    54150197: "..__CACHE__..,gate::¿þ©ÿ’ýäý",
    54150198: "..__CACHE__..,±L~>#»{Â_÷ß",
    54150199: "..__JOKZI_OZO__..,ækiZ¥Ét",
    54150200: "?-?l?-?a??-bs?,what miracles can be made",
    54150201: "?-?l?-?a??-bs?,tendrils wind around dead veins",
    54150202: "?-?l?-?a??-bs?,the storm greets us",
    54150203: "?-?l?-?a??-bs?,another idle worry",
    54150204: "?-?l?-?a??-bs?,the project blooms",
    54150205: "..__BETTER_TIMES__..,dignitary",
    54150206: "..__BETTER_TIMES__..,kazki's pilot cyst",
    54150207: "..__BETTER_TIMES__..,nerve terminal",
    54150208: "..__BETTER_TIMES__..,vekoa's proxy",
    54150209: "..__BETTER_TIMES__..,malvi",
    54150210: "..__BETTER_TIMES__..,mobile simulacra dispensary",
    54150211: "..__BETTER_TIMES__..,auxiliaries",
    54150212: "..__BETTER_TIMES__..,guktik ward",
    54150213: "..__BETTER_TIMES__..,simulacra display",
    54150214: "..__AQUARIUM__..,bench",
    54150215: "..__AQUARIUM__..,tree",
    54150216: "..__AQUARIUM__..,depth dwellers",
    54150217: "..__AQUARIUM__..,isabel",
    54150218: "..__AQUARIUM__..,countless fauna in their various shapes",
    54150219: "..__BRIGHT_MOON__..,haunted by velzie",
    54150220: "..__BRIGHT_MOON__..,‡Ä%æ¼Ý",
    54150221: "..__BRIGHT_MOON__..,our dull anchor",

    54159000: "o???-??b????-?s-???k?-i??,piece",

    54159001: "..__CITY_SURFACE__..,fountain bench",
    54159002: "..__CITY_SURFACE__..,bridge bench",
    54159003: "..__CITY_SURFACE__..,streets bench",
    54159004: "..__CITY_SURFACE__..,park bench",
    54159005: "..__CITY_SURFACE__..,city bench",
    54159006: "..__CITY_SURFACE__..,waterfront bench",
    
    }
content.appendChild(resEl)

var locationtablenoswitch = {    
    "gakpause": 154140051,
    "ozodance": 154140090,
}


var locationtable = {    "ocon_examined": 154140000,
    "geye_examined": 154140001,
    "realcyst_examined": 154140002,
    "realcyst_touched": 154140003,
    "realcyst_scanned": 154140004,
    //"introcompleted": 154140005,
    "visited_hello": 154140006,
    "hello_sentry_idiot": 154140007,
    "visited_hub": 154140008,
    "hub_introduced": 154140009,
    "visited_localcity": 154140010,
    "visited_localcitystreet": 154140011,
    "citystreet_triedchat": 154140012,
    "cashier_hello": 154140013,
    "citystreet_orangecoffee": 154140014,
    "citystreet_gotdrinks": 154140015,
    "visited_localorbit": 154140016,
    "visited_localdullvessel": 154140017,
    "visited_localocean": 154140018,
    "visited_localoceanship": 154140019,
    "visited_localoceanshipinterview": 154140020,
    "interview1__firstchat-behonest": 154140021,
    //"dullvessel_dive": 154140022,
    "visited_localdepths": 154140023,
    "ep0_end": 154140024,
    "ep0_epilogue,awaiting": 154140025,
    "ep0_epilogue,started": 154140026,
    "ep0_epilogue,done": 154140027,
    "visited_localuncosm": 154140028,
    "visited_localuncosmno": 154140029,
    
    "ep1_showmaterials": 154140030,
    "ep1_fed": 154140031,
    "hub__funfriend-ep1fed": 154140032,
    "visited_localoceanembassy": 154140033,
    "embassy_d1_complete": 154140034,
    "embassy_d2_complete": 154140035,
    "ep1_end": 154140036,
    "visited_localoceanshipelsewhere": 154140037,
    "clement": 154140038,
    "seenFFProxy": 154140039, 
    "visited_localcache": 154140040,
    "hub__funfriend-ah1": 154140041,
    "visited_localuncosmrecosm": 154140042,
    "recosm_greeted": 154140043,
    "recosm_began": 154140044,
    //"recosm_finalseen": 154140045,
    "recosm_state": 154140046,
    
    "fbx__ep2intro-end": 154140047,
    "embassy__mothframe-end": 154140048,
    "hub__funfriend-mothframe2": 154140049,
    "d3_kazkichest": 154140050,
    "gakpause": 154140051,
    "embassy__d3_movecmb-start": 154140052,
    "embassy__d3_movefriend_finish": 154140053,
    
    "fbx__ep3intro": 154140054,
    "visited_localoceanembassygolem": 154140055,
    "dog": 154140056,
    "golem_decompression": 154140057,
    "gboss": 154140058,
    "gol__bossclear": 154140059,
    
    "visited_localbeneath": 154140060,
    "beneath": 154140061, 
    "beneath_akiroom": 154140062,
    "beneath_dullvessel": 154140063,
    "cam_abyss": 154140064,
    "cam_effigy": 154140065,
    "cam_nope": 154140066,
    "drowningCalmed": 154140067, 
    "visited_localbeneathparasite": 154140068,
    "beneath_team": 154140069,
    "beneath_board": 154140070,
    "visited_localbeneathdepths": 154140071,
    "interviewdie": 154140072,
    "interviewbeast_seen": 154140073,
    "unity_lady": 154140074, 
    "fbx__depthrecovery2": 154140075, 
    "visited_localozo": 154140076,
    "ozo__council-task": 154140077, 
    "ozo__fairy_intro": 154140078, 
    "localorbit__fairy_beacon": 154140079, 
    "citystreet__flower_beacon": 154140080, 
    "effigy_fawners": 154140081, 
    "effigy_dancer": 154140082, 
    "effigy_gamer": 154140083, 
    "effigy_sipper": 154140084, 
    "secavik": 154140085, 
    "secavik,beaconed": 154140086, 
    "ff_ozo": 154140087,
    "hub__funfriend-ozogate": 154140088,
    "ozo_enterdark": 154140089,
    "ozodance": 154140090,
    "earlyeffigy": 154140091, 
    
    "visited_localbeneathembassy": 154140092,
    "daemon": 154140093,
    //"bosswarn": 154140094,
    "e3a2_earlydaemon": 154140095,
    "e3a2_latedaemon": 154140096,
    "e3a2_loperxamine": 154140097,
    
    
    "e3a2__escapewin": 154140100, 
    "e3a2__dreamescapewin": 154140100, 
    "flan": 154140101,
    
    "unity_dog": 154140102,
    "eo_c_geli": 154140103, 
    "eo_c_isabel": 154140104, 
    "eo_c_fairy": 154140105, 
    "eo_c_stow": 154140106, 
    "eo_c_effigies": 154140107, 
    "eo_f_geli": 154140108, 
    "eo_f_stow": 154140109, 
    "eo_f_effigies": 154140110, 
    "eo_i_gelistow": 154140111, 
    "eo_i_stow": 154140112, 
    "eo_i_geli": 154140113, 
    "eo_i_fairy": 154140114, 
    "eo_d_effigy1": 154140115, 
    "eo_d_effigy2": 154140116, 
    "eo_d_stow": 154140117, 
    "seenSmiler": 154140118, 
    
    "fbx__ep4intro": 154140119,
    "visited_localoceanembassygroundsmindry": 154140120,
    "leverage": 154140121,
    "ep4__entrancefinal": 154140122,

    "ozo__isabel_joy": 154140123,
    "ozo__geli_freedom": 154140124,
    "joy#any": 154140125,
    "joy#ozo_stranger": 154140126,
    "joy#hello": 154140127,
    "joy#dullvessel_quarters": 154140128,
    "joy#office_hall": 154140129,
    "joy#hullf": 154140130,
    "joy#pit": 154140131,
    "citystreet__director-meeting": 154140132,
    "cassportal": 154140133,
    "drowning_relieved": 154140134,
    "visited_localbeneathcar": 154140135,
    "car__intro": 154140136,
    "visited_localuncosmpit": 154140137,
    "landmine": 154140138,
    "spida": 154140139,
    "thelooker": 154140140,
    "pitkey": 154140141,
    "pit__f3_unity": 154140142,
    "ozo_wakintro": 154140143,
    "visited_localoceanpolygonation": 154140144,
    "bt__d0_cass": 154140145,
    "visited_localorbitmoon": 154140146,
    "visited_localoceanshipdeck": 154140147,
    "visited_localcityaquarium": 154140148,
    "dataroom": 154140149,
    "2040thing": 154140150,
    "cam_orbit": 154140151,
    "cam_street": 154140152,
    "cam_darkstreet": 154140153,
    "cam_banks": 154140154,
    "cam_banksflip": 154140155,
    "cam_abysscity": 154140156,
    "cam_ozo": 154140157,
    "citystreet__rotmeet": 154140158,
    "rot_e4a1": 154140159,
    "groundstrd": 154140160,
    "bt__d0_end": 154140161,
    "ozo__wakizet-bt": 154140162,
    "eo_d_wakizet": 154140163,
    "eo_w_council": 154140164,
    "eo_w_isabel": 154140165,
    "eo_w_effigies": 154140166,
    "eo_w_fairy": 154140167,
    "eo_w_geli": 154140168,
    "car_ozo": 154140169,
    "unity_rot": 154140170,
    
    "visited_localuncosmwhere": 154140900,
    "visited_localuncosmcavik": 154140901,
    "visited_localuncosmclemens%20romanus": 154140902,
    "visited_localuncosmcorru": 154140903,
    "visited_localuncosmdog": 154140904,
    "visited_localuncosmdull": 154140905,
    "visited_localuncosmeffigy": 154140906,
    "visited_localuncosmflower": 154140907,
    "visited_localuncosmhumor": 154140908,
    "visited_localuncosmlarval": 154140909,
    "visited_localuncosmparasite": 154140910,
    "visited_localuncosmsorry": 154140911,
    "visited_localuncosmspire": 154140912,
    "visited_localuncosmsurface": 154140913,
    "visited_localuncosmveilk": 154140914,
    "visited_localuncosmyuzku": 154140915,
    "visited_localuncosmzuzucri": 154140916,
    "visited_localuncosmzuzucri-masks": 154140917,
    "visited_localuncosmzuzucri-mask": 154140917,
    "visited_localuncosmcall": 154140918,
    "visited_localuncosmfairy": 154140919,
    "visited_localuncosmwalker": 154140920,
    
    "visited_localbeneathobeski": 154149000,
    "otherobesk": 154149001,
    "talkedtoobeskipiece": 154149002,
    "visited_localuncosmsimulacrum": 154149003,
    "visited_localuncosmperish": 154149004,
    "visited_localuncosmsurfacerunning": 154149005,
    "bone": 154149006,
    "eyes": 154149007,
    "claws": 154149008,
    "ichor": 154149009,
    "light": 154149010,
    "supplemental": 154149011,
    "visited_localuncosmquiz": 154149012,
    "caged_demon": 154149013,
    "demon_beaconed": 154149014,
    "reached_end": 154149015,
    "connection_attempted": 154149016,
    "visited_localuncosmclaws": 154149017,
    "visited_localuncosmoutside": 154149018,
    "visited_localuncosmbetter": 154149019,
    "visited_localuncosmwound": 154149020,
    "visited_localuncosmfootsteps": 154149021,
    "visited_localuncosmforward": 154149022,
    "visited_localuncosmcolored": 154149023,
    "visited_localuncosmconnections": 154149024,
    "visited_localuncosmimprovement": 154149025,
    "visited_localuncosminfluence": 154149026,
    "visited_localuncosmmindcore": 154149027,
    "visited_localuncosmkotzu": 154149028,
    "zokkafound": 154149029,
    "kotzumothreturn": 154149030,
    "kotzuintrodone": 154149031,
    "kotzuazzuntalk": 154149032,
    "kotzuzutekitalk": 154149033,
    "reward_bfg": 154149034,
    "reward_grenade": 154149035,
    "reward_rifle": 154149036,
    "reward_shotgun": 154149037,
    "reward_sniper": 154149038,
    "hazard": 154149039,
    "cmb_unlocked": 154149040,
    "visited_localuncosmvielk": 154149041,
    "mothotomy": 154149042,
    "default_danced": 154149043,

    "..__LOCALHOST__..,funfriend": 154150000,
    "..__THEIR_CITY__..,glimmering spires mark their cities": 154150001,
    "..__THEIR_CITY__..,these grand icons of their control": 154150002,
    "..__THEIR_CITY__..,they watch": 154150003,
    "..__THE_VOID__..,our dull vessel": 154150004,
    "..__THE_VOID__..,gate::the dull contrivance": 154150005,
    "..__CITY_SURFACE__..,cashier": 154150006,
    "..__CITY_SURFACE__..,envoy": 154150007,
    "..__CITY_SURFACE__..,menu": 154150008,
    "..__CITY_SURFACE__..,slim streetwalker": 154150009,
    "..__CITY_SURFACE__..,cloaked streetwalker": 154150010,
    "..__CITY_SURFACE__..,stre wal k": 154150011,
    "..__CITY_SURFACE__..,the room high up": 154150012,
    "..__CITY_SURFACE__..,electric face box": 154150013,
    "..__CITY_SURFACE__..,beautiful parasite": 154150014,
    "..__THEIR_WATERS__..,gate::the depths": 154150015,
    "..__THEIR_WATERS__..,their vessel": 154150016,
    "..__THEIR_WATERS__..,stilted shore": 154150017,
    "..__THEIR_WATERS__..,the embassy": 154150018,
    "..__THEIR_VESSEL__..,the funny little room": 154150019,
    "..__THEIR_VESSEL__..,clemens romanus": 154150020,
    "..__OUR_DULL_VESSEL__..,pilot cyst": 154150021,
    "..__OUR_DULL_VESSEL__..,glazika": 154150022,
    "..__OUR_DULL_VESSEL__..,container": 154150023,
    "..__OUR_DULL_VESSEL__..,parasite plane": 154150024,
    "..__OUR_DULL_VESSEL__..,climbing wall": 154150025,
    "..__OUR_DULL_VESSEL__..,dull heart": 154150026,
    "..__OUR_DULL_VESSEL__..,workspace": 154150027,
    "..__OUR_DULL_VESSEL__..,translation slab": 154150028,
    "..__OUR_DULL_VESSEL__..,column": 154150029,
    "..__OUR_DULL_VESSEL__..,bright ground-parasite": 154150030,
    "..__OUR_DULL_VESSEL__..,advanced rejuvenation chamber": 154150031,
    "..__OUR_DULL_VESSEL__..,high-pressure body": 154150032,
    "..__OUR_DULL_VESSEL__..,personal storage": 154150033,
    "..__OUR_DULL_VESSEL__..,equipment storage": 154150034,
    "..__THE_EMBASSY__..,akizetesche": 154150035,
    "..__THE_EMBASSY__..,cavik": 154150036,
    "..__THE_EMBASSY__..,bozko": 154150037,
    "..__THE_EMBASSY__..,kazki": 154150038,
    "..__THE_EMBASSY__..,tozik": 154150039,
    "..__THE_EMBASSY__..,gakvu": 154150040,
    "..__THE_EMBASSY__..,miltza": 154150041,
    "..__THE_EMBASSY__..,movefriend": 154150042,
    "..__THE_EMBASSY__..,mindcores": 154150043,
    "..__THE_EMBASSY__..,container": 154150044,
    "..__THE_EMBASSY__..,qou body": 154150045,
    "..__THE_EMBASSY__..,summarizer": 154150046,
    "..__THE_EMBASSY__..,hostile container": 154150047,
    "..__THE_EMBASSY__..,hostile veilklight": 154150048,
    "..__THE_EMBASSY__..,recollection::discovery": 154150049,
    "..__THE_EMBASSY__..,recollection::suspicion": 154150050,
    "..__THE_EMBASSY__..,recollection::collapse": 154150051,
    "..__THE_EMBASSY__..,attendant": 154150052,
    "..__THE_EMBASSY__..,mystery cyst": 154150053,
    "..__THE_EMBASSY__..,my seat": 154150054,
    "..__THE_EMBASSY__..,barfriend": 154150055,
    "..__THE_EMBASSY__..,orange simulacrum": 154150056,
    "..__THE_EMBASSY__..,veilklight": 154150057,
    "..__THE_EMBASSY__..,rejuvenation chamber": 154150058,
    "..__THE_EMBASSY__..,kalstik stand": 154150059,
    "..__THE_EMBASSY__..,face stand": 154150060,
    "..__THE_EMBASSY__..,cyst cluster": 154150061,
    "..__THE_EMBASSY__..,cyst pile": 154150062,
    "..__THE_EMBASSY__..,clothing storage": 154150063,
    "..__THE_EMBASSY__..,listener": 154150064,
    "..__THE_EMBASSY__..,timestopper": 154150065,
    "..__THE_EMBASSY__..,window": 154150066,
    "..__THE_EMBASSY__..,simulacra dispensary": 154150067,
    "..__THE_EMBASSY__..,tir qou": 154150068,
    "..__THE_EMBASSY__..,jut qou": 154150069,
    "..__THE_EMBASSY__..,kiv qou": 154150070,
    "..__THE_EMBASSY__..,vel qou": 154150071,
    "..__THE_EMBASSY__..,simulacra": 154150072,
    "..__THE_EMBASSY__..,storage display": 154150073,
    "..__THE_EMBASSY__..,bright weapons": 154150074,
    "..__THE_EMBASSY__..,manipulation slab": 154150075,
    "..__THE_EMBASSY__..,unkind eye": 154150076,
    "..__THE_EMBASSY__..,sculptor": 154150077,
    "..__THE_EMBASSY__..,veilk models": 154150078,
    "..__THE_EMBASSY__..,damaged golem": 154150079,
    "..__THE_EMBASSY__..,tendrils": 154150080,
    "..__THE_EMBASSY__..,movefoe": 154150081,
    "..__THE_EMBASSY__..,bstrd door": 154150082,
    "..__THE_EMBASSY__..,unnerving cyst": 154150083,
    "..__THE_EMBASSY__..,peculiar obelisk": 154150084,
    "..__THE_EMBASSY__..,archive": 154150085,
    "..__THE_EMBASSY__..,archival golem": 154150086,
    "..__THE_EMBASSY__..,jutskin": 154150087,
    "..__THE_EMBASSY__..,bstrdlight": 154150088,
    "..__THE_EMBASSY__..,pain shelf": 154150089,
    "..__THE_EMBASSY__..,bstrd golem": 154150090,
    "..__CACHE__..,the storm": 154150091,
    "..__CACHE__..,polygonation spire": 154150092,
    "..__CACHE__..,ÉœÙ]ïå¥¹": 154150093,
    "..__CACHE__..,? ???? ?? ?? ??": 154150094,
    "..__CACHE__..,Ò½º": 154150095,
    "»é»¯uÂ%S¥(»,memoryhole": 154150096,
    "a?-?b?-????-y?s?,s w   al kk": 154150097,
    "a?-?b?-????-y?s?,Ƙø¿ƶḳ¿±": 154150098,
    "a?-?b?-????-y?s?,×è.÷ùÏÏøø": 154150099,
    "p?a-??r?-???s?-t?e?,piece": 154150100,
    "..__JOKZI_OZO__..,council": 154150101,
    "..__JOKZI_OZO__..,fairy": 154150102,
    "..__JOKZI_OZO__..,isabel": 154150103,
    "..__JOKZI_OZO__..,effigy": 154150104,
    "..__JOKZI_OZO__..,sun": 154150105,
    "..__JOKZI_OZO__..,gate::gate::?/::G:a;;T:E": 154150106,
    "..__JOKZI_OZO__..,gate::gaGATE::te::?/..::G:a;;T:E": 154150107,
    "..__JOKZI_OZO__..,GELI": 154150108,
    "..__GOLEM_MAINTENANCE__..,cavelight": 154150109,
    "..__GOLEM_MAINTENANCE__..,grand door": 154150110,
    "..__GOLEM_MAINTENANCE__..,veilk spear": 154150111,
    "..__GOLEM_MAINTENANCE__..,geli": 154150112,
    "..__GOLEM_MAINTENANCE__..,lesser terminal": 154150113,
    "..__GOLEM_MAINTENANCE__..,greater terminal": 154150114,
    "..__GOLEM_MAINTENANCE__..,distribution door": 154150115,
    "..__GOLEM_MAINTENANCE__..,instruction workspace": 154150116,
    "..__GOLEM_MAINTENANCE__..,preprocessing metals": 154150117,
    "..__GOLEM_MAINTENANCE__..,ruined glazika": 154150118,
    "..__GOLEM_MAINTENANCE__..,dog": 154150119,
    "..__GOLEM_MAINTENANCE__..,archival sludge": 154150120,
    "..__GOLEM_MAINTENANCE__..,dull structure": 154150121,
    "..__GOLEM_MAINTENANCE__..,shelf": 154150122,
    "..__GOLEM_MAINTENANCE__..,echo chamber": 154150123,
    "..__GOLEM_MAINTENANCE__..,lightning terminals": 154150124,
    "..__GOLEM_MAINTENANCE__..,stowed tools": 154150125,
    "..__GOLEM_MAINTENANCE__..,impressor": 154150126,
    "..__GOLEM_MAINTENANCE__..,archival hatch": 154150127,
    "..__GOLEM_MAINTENANCE__..,husk": 154150128,
    "..__GOLEM_MAINTENANCE__..,constructor": 154150129,
    "..__GOLEM_MAINTENANCE__..,kivskin": 154150130,
    "..__GOLEM_MAINTENANCE__..,repairfriend": 154150131,
    "..__GOLEM_MAINTENANCE__..,golem": 154150132,
    "..__GOLEM_MAINTENANCE__..,dozkallvi": 154150133,
    "..__GOLEM_MAINTENANCE__..,gauntlet": 154150134,
    "..__GOLEM_MAINTENANCE__..,dullzika": 154150135,
    "..__GOLEM_MAINTENANCE__..,warped container": 154150136,
    "..__GOLEM_MAINTENANCE__..,translation core": 154150137,
    "..__GOLEM_MAINTENANCE__..,»õGQàº3¾õ”cR%": 154150138,
    "..__GOLEM_MAINTENANCE__..,foundation golem": 154150139,
    "::/FRAME/,daemon mimic": 154150140,
    "::/FRAME/,wrk": 154150141,
    "::/FRAME/,clw": 154150142,
    "::/FRAME/,net": 154150143,
    "::/FRAME/,enfc": 154150144,
    "::/FRAME/,seer": 154150145,
    "::/FRAME/,archn": 154150146,
    "::/FRAME/,dct": 154150147,
    "::/FRAME/,spwn": 154150148,
    "::/FRAME/,idea": 154150149,
    "::/FRAME/,imp": 154150150,
    "::/FRAME/,anti": 154150151,
    "::/FRAME/,wheel": 154150152,
    "::/FRAME/,radio": 154150153,
    "::/FRAME/,basterminal": 154150154,
    "::/FRAME/,exchange terminal": 154150155,
    "::/FRAME/,interloper": 154150156,
    "..__PALE_HALLS__..,idril": 154150157,
    "..__PALE_HALLS__..,telyu": 154150158,
    "..__PALE_HALLS__..,spire status": 154150159,
    "..__PALE_HALLS__..,map": 154150160,
    "..__PALE_HALLS__..,adull's altar": 154150161,
    "..__PALE_HALLS__..,lesser mind status": 154150162,
    "..__PALE_HALLS__..,support pod": 154150163,
    "..__PALE_HALLS__..,silencing spire": 154150164,
    "..__PALE_HALLS__..,dullima pod": 154150165,
    "..__PALE_HALLS__..,spinal tether": 154150166,
    "..__PALE_HALLS__..,malvi's body": 154150167,
    "..__PALE_HALLS__..,knowledge pool": 154150168,
    "..__PALE_HALLS__..,heart terminal": 154150169,
    "..__PALE_HALLS__..,priority branch": 154150170,
    "..__PALE_HALLS__..,spectral mass": 154150171,
    "..__PALE_HALLS__..,spectral figure": 154150172,
    "..__PALE_HALLS__..,spectral shape": 154150173,
    "..__PALE_HALLS__..,spectral attendant": 154150174,
    "..__PALE_HALLS__..,spectral jutskin": 154150175,
    "..__PALE_HALLS__..,spectral horror": 154150176,
    "..__PALE_HALLS__..,spectral golem": 154150177,
    "..__PALE_HALLS__..,spectral glazika": 154150178,
    "..__PALE_HALLS__..,possessed archivist": 154150179,
    "..__PALE_HALLS__..,spectral archival golem": 154150180,
    "..__PALE_HALLS__..,spectral eye": 154150181,
    "..__PALE_HALLS__..,possessed miltza": 154150182,
    "..__PALE_HALLS__..,reanimated golem": 154150183,
    "..__PALE_HALLS__..,spectral kiv": 154150184,
    "..__PALE_HALLS__..,spectral qou": 154150185,
    "..__PALE_HALLS__..,spectral dull golem": 154150186,
    "..__PALE_HALLS__..,ceremony": 154150187,
    "..__PALE_HALLS__..,ceremony vein": 154150188,
    "..__PALE_HALLS__..,ceremony tendril": 154150189,
    "..__PALE_HALLS__..,vekoa": 154150190,

    "..__THE_VOID__..,gate::bright moon": 154150191,
    "..__CITY_SURFACE__..,vehicle stream crossing mechanism": 154150192,
    "..__CITY_SURFACE__..,elevator buttons": 154150193,
    "..__CITY_SURFACE__..,water cooler": 154150194,
    "..__CITY_SURFACE__..,frightfully fragile vessel": 154150195,
    "..__THE_EMBASSY__..,recollection::better times": 154150196,
    "..__CACHE__..,gate::¿þ©ÿ’ýäý": 154150197,
    "..__CACHE__..,±L~>#»{Â_÷ß": 154150198,
    "..__JOKZI_OZO__..,ækiZ¥Ét": 154150199,
    "?-?l?-?a??-bs?,what miracles can be made": 154150200,
    "?-?l?-?a??-bs?,tendrils wind around dead veins": 154150201,
    "?-?l?-?a??-bs?,the storm greets us": 154150202,
    "?-?l?-?a??-bs?,another idle worry": 154150203,
    "?-?l?-?a??-bs?,the project blooms": 154150204,
    "..__BETTER_TIMES__..,dignitary": 154150205,
    "..__BETTER_TIMES__..,kazki's pilot cyst": 154150206,
    "..__BETTER_TIMES__..,nerve terminal": 154150207,
    "..__BETTER_TIMES__..,vekoa's proxy": 154150208,
    "..__BETTER_TIMES__..,malvi": 154150209,
    "..__BETTER_TIMES__..,mobile simulacra dispensary": 154150210,
    "..__BETTER_TIMES__..,auxiliaries": 154150211,
    "..__BETTER_TIMES__..,guktik ward": 154150212,
    "..__BETTER_TIMES__..,simulacra display": 154150213,
    "..__AQUARIUM__..,bench": 154150214,
    "..__AQUARIUM__..,tree": 154150215,
    "..__AQUARIUM__..,depth dwellers": 154150216,
    "..__AQUARIUM__..,isabel": 154150217,
    "..__AQUARIUM__..,countless fauna in their various shapes": 154150218,
    "..__BRIGHT_MOON__..,haunted by velzie": 154150219,
    "..__BRIGHT_MOON__..,‡Ä%æ¼Ý": 154150220,
    "..__BRIGHT_MOON__..,our dull anchor": 154150221,

    "o???-??b????-?s-???k?-i??,piece": 154159000,

    "..__CITY_SURFACE__..,fountain bench": 154159001,
    "..__CITY_SURFACE__..,bridge bench": 154159002,
    "..__CITY_SURFACE__..,streets bench": 154159003,
    "..__CITY_SURFACE__..,park bench": 154159004,
    "..__CITY_SURFACE__..,city bench": 154159005,
    "..__CITY_SURFACE__..,waterfront bench": 154159006,
}

function change(key, value) {
    var flagpool = flags
    if(key.includes("TEMP!!")) flagpool = sessionStorage
    if(key.includes("PAGE!!")) flagpool = page.flags
    if(key.includes("STAGE!!")) flagpool = env.stage?.current?.flags

    if(!flagpool) { return false } // unsuccessful change


    if(typeof locationtable[key + "," + value] != "undefined"){
        archiclient.check(locationtable[key + "," + value]);
        if((typeof locationtablenoswitch[key + "," + value] != "undefined") && check("KEY!!" + key)) {
            changeoverride(key, value)
        }
        key = "LOC!!" + key + "," + value
        value = true
    }

    if(typeof locationtable[key] != "undefined"){
        archiclient.check(locationtable[key]);
        if((typeof locationtablenoswitch[key] != "undefined") && check("KEY!!" + key)) {
            changeoverride(key, value)
        }
        key = "LOC!!" + key
    }

    switch(value) {
        case "++":
            if(!flagpool[key]) flagpool[key] = 1
            else flagpool[key] = Number(flagpool[key]) + 1
        break

        case "--":
            if(!flagpool[key]) flagpool[key] = -1
            else flagpool[key] = Number(flagpool[key]) - 1
        break

        case "DELETE":
            delete flagpool[key]
        break

        case "TOGGLE":
            flagpool[key] = !flagpool[key]
        break

        default:
            flagpool[key] = value
    }

    updateFlags()
    checkEpisodeProgress()

    // Dispatch the change event
    document.dispatchEvent(new CustomEvent('corru_changed', { detail: { key, value } }))
    return true // successful change
}

function changeoverride(key, value) {
    var flagpool = flags
    if(key.includes("TEMP!!")) flagpool = sessionStorage
    if(key.includes("PAGE!!")) flagpool = page.flags
    if(key.includes("STAGE!!")) flagpool = env.stage?.current?.flags

    if(!flagpool) { return false } // unsuccessful change

    switch(value) {
        case "++":
            if(!flagpool[key]) flagpool[key] = 1
            else flagpool[key] = Number(flagpool[key]) + 1
        break

        case "--":
            if(!flagpool[key]) flagpool[key] = -1
            else flagpool[key] = Number(flagpool[key]) - 1
        break

        case "DELETE":
            delete flagpool[key]
        break

        case "TOGGLE":
            flagpool[key] = !flagpool[key]
        break

        default:
            flagpool[key] = value
    }

    updateFlags()
    checkEpisodeProgress()

    // Dispatch the change event
    document.dispatchEvent(new CustomEvent('corru_changed', { detail: { key, value } }))
    return true // successful change
}

function seenDialogue(name) {
    if(flags.dialogues == undefined) flags.dialogues = {}

    if(name == "ep4__entrancefinal-start") { archiclient.goal() }
    
    if(typeof locationtable[name] != "undefined"){
        archiclient.check(locationtable[name]);
        if((typeof locationtablenoswitch[name] != "undefined") && check("KEY!!" + name)) {
            seenDialogueOverride(name)
        }
        name = "LOC!!" + name
    }
    
    if(typeof locationtable[name.replace(/-start/g,'')] != "undefined"){
        archiclient.check(locationtable[name.replace(/-start/g,'')]);
        if((typeof locationtablenoswitch[name.replace(/-start/g,'')] != "undefined") && check("KEY!!" + name.replace(/-start/g,''))) {
            seenDialogueOverride(name)
        }
        name = "LOC!!" + name
    }
    
    flags.dialogues[name] = true
    localStorage.setItem('flags', JSON.stringify(flags))
}

function seenDialogueOverride(name) {
    if(flags.dialogues == undefined) flags.dialogues = {}

    if(name == "ep4__entrancefinal-start") { archiclient.goal() }
    
    if(typeof locationtable[name] != "undefined"){
        archiclient.check(locationtable[name]);
        name = "LOC!!" + name
    }
    
    if(typeof locationtable[name.replace(/-start/g,'')] != "undefined"){
        archiclient.check(locationtable[name.replace(/-start/g,'')]);
        name = "LOC!!" + name
    }
    
    flags.dialogues[name] = true
    localStorage.setItem('flags', JSON.stringify(flags))
}

function checkEpisodeProgress(){
    if(check('ep0_epilogue') && check('ep1_showmaterials')) { 
        body.classList.add('ep1'); env.ep1 = true 
    }
    
    if(check('fbx__ep2intro-end')) { 
        body.classList.add('ep2')
        env.ep2 = true 
    }

    if(check('fbx__ep3intro')) { 
        body.classList.add('ep3')
        env.ep3 = true 
    }

    if(check('fbx__ep4intro')) { 
        body.classList.add('ep4')
        env.ep4 = true 
    }

    if(
        (check('ep0_epilogue') && !check('ep1_showmaterials')) ||
        (check('ep1_end') && !check('fbx__ep2intro-end')) ||
        (check('embassy__d3_movefriend_finish') && !check('fbx__ep3intro')) ||
        (check('gol__bossclear') && !check('fbx__ep4intro'))
    ) {
        document.querySelector('#advance-notice').classList.add('active')
    } else {
        document.querySelector('#advance-notice').classList.remove('active')
    }

    // mask related
    if(check("ozo__council-task") || check("ozo__fairy_intro") || check("ozo__isabel_joy") || check("ozo__geli_freedom")) { 
        body.classList.add('masksunlocked') 
    }


    if(check("ozo__council-task"))   body.classList.add('unityunlocked')
    if(check("ozo__fairy_intro"))   body.classList.add('hungerunlocked')
    if(check("ozo__isabel_joy"))    body.classList.add('joyunlocked')
    if(check("ozo__geli_freedom"))  body.classList.add('freedomunlocked')
}

//requires that you're on the page where the ent is defined
function entityMarkScanned(entity) {
    let currentPageEntities = flags['detectedEntities'][page.title]['entities']
    let trackedEntity = currentPageEntities[entity.name]

    //simply marks as scanned, OR marks the 'alternateOf' as scanned if the entity is an alternate version of some other one
    if(trackedEntity) {
        if(flags["scansanity"]){
            archiclient.check(locationtable[page.title + "," + entity.name])
        } else {
            if(trackedEntity.scanned) return; // no action needed

            trackedEntity.scanned = true 
        }
    } else if(currentPageEntities[entity.alternateOf]) {
        if(flags["scansanity"]){
            archiclient.check(locationtable[page.title + "," + entity.alternateOf])
        } else {
            if(currentPageEntities[entity.alternateOf].scanned) return; // ditto

            currentPageEntities[entity.alternateOf].scanned = true
        }
    }
    
    localStorage.setItem('flags', JSON.stringify(flags)) //saves
}

//arbitrary version. won't check for alternateOf so just use it intelligently
//relies on things already being encountered, just not scanned
//useful for when an entity is used across multiple pages
function entityOffPageMarkScanned(entityName, pageTitle) {
    let pageData = flags['detectedEntities'][pageTitle]
    if(!pageData) return console.warn(`page "${pageTitle}" not found in detectedEntities`);
    
    let pageEntities = pageData.entities
    let trackedEntity = pageEntities[entityName]
    
    if(trackedEntity) {
        if(!trackedEntity.scanned) {
            if(flags["scansanity"]){
                archiclient.check(locationtable[pageTitle + "," + entityName])
            } else {
                trackedEntity.scanned = true
                localStorage.setItem('flags', JSON.stringify(flags))
            }
        } 
    }
    else return console.warn(`entity "${entityName}" not found on page "${pageTitle}"`);
}

env.hooks.apcorru_loaded = new CustomEvent('apcorru_loaded');

document.addEventListener('corru_loaded', ()=>{
  document.dispatchEvent(env.hooks.apcorru_loaded);
});

document.addEventListener('corru_leaving', ()=>{
    switch(page.path) {
        case "/hello/":
            env.hello.hubmusic.fade(env.hello.hubmusic.volume(), 0, 1000)
            env.hello.bgm404.fade(env.hello.bgm404.volume(), 0, 1000)
        break
    }
});

document.addEventListener('apcorru_loaded', ()=>{
    switch(page.path) {
        case "/":
            env.entities['cyst'].exmExec = ()=>{
                if(!check('realcyst_examined') || !check('LOC!!realcyst_examined')) {
                    change('realcyst_examined', true)
                    cutscene(true)
                    setTimeout(()=>{readoutAdd({message: `so this is the mystery piece`, name:"moth"})}, 2000)
                    setTimeout(()=>{readoutAdd({message: `it's in bizarrely good condition considering it was at the bottom of the ocean for however long it's been since, y'know`, name:"moth"})}, 4000)
                    setTimeout(()=>{readoutAdd({message: `no clue what it is aside from some similar internal structure to network cysts we've found before`, name:"moth"});cutscene(false)}, 7000)
                    setTimeout(()=>chatter({actor: 'sys', text: "ATTENTION::'additional ACT enabled';'rescan'"}), 9000)
                }
            };
            env.entities['cyst'].actions[0].showIf = ()=> check("realcyst_examined");
            env.entities['cyst'].actions[1].showIf = ()=> check("realcyst_touched");
            env.entities['dendritic cyst'].exmExec = ()=>{
                if(!check('ocon_examined') || !check('LOC!!ocon_examined')) {
                    change('ocon_examined', true)
                    cutscene(true)
                    setTimeout(()=>{readoutAdd({message: `the notes I got say that there were apparently a ton of these on the ship`, name:"moth"})}, 2000)
                    setTimeout(()=>{readoutAdd({message: `all sorts of sizes too`, name:"moth"})}, 4000)
                    setTimeout(()=>{readoutAdd({message: `but most were too heavy to retrieve... so we just got this small one`, name:"moth"});cutscene(false)}, 7000)
                    setTimeout(()=>chatter({actor: 'sys', text: "ATTENTION::'additional ACT enabled';'rescan'"}), 9000)
                }
            };
            env.entities['fractalline cyst'].exmExec = ()=>{
                if(!check('geye_examined') || !check('LOC!!geye_examined')) {
                    change('geye_examined', true)
                    cutscene(true)
                    setTimeout(()=>{readoutAdd({message: `nobody knows what this one is.. pretty sure it's dead though`, name:"moth"});cutscene(false)}, 2000)
                    setTimeout(()=>chatter({actor: 'sys', text: "ATTENTION::'additional ACT enabled';'rescan'"}), 4000)
                }
            };

            if (check("realcyst_scanned")) {
                document.querySelector('.crosshair').classList.add('show')
            }  

            if ((content.classList.contains("showcopper") || body.classList.contains("showcopper")) && !check('LOC!!geye_examined')) {
                document.querySelector('.geye').style.display = "flex"
            }  
            env.intro.regularSit = () => {
                env.introSit()
                env.enableSpikeCursor()
                document.querySelectorAll('.crosshair, #cyst img').forEach(e=>e.classList.add('show'))
                body.classList.add('normalload')
                MUI('deprohibit')
            };
            
            env.introConnect = ()=>{
                let cursor = document.querySelector('.cursor')
                function adjustCursor(cursor, moved = false) {    
                    let tBox = document.querySelector('.cyst-container .crosshair').getBoundingClientRect()
                
                    var cystPoint = {
                        x: tBox.x + (tBox.width * 0.5),
                        y: tBox.y + (tBox.width * 0.5)
                    }
                
                    console.log(document.querySelector('.cyst-container .target'))
                    console.log(tBox)
                    console.log(`translate(${cystPoint.x}px, ${cystPoint.y}px)`)
                
                    cursor.style.transform = `translate(${cystPoint.x}px, ${cystPoint.y}px)`
                }
                cutscene(true)
                MUI('off'); MUI('prohibit')
            
                env.intro.glass.volume(Number(localStorage["volume-sfx"] || 1))
            
                if(check('introcompleted')) {
                    readoutAdd({message:`..__RECONNECTING__..`, type:"sys"})
                    setTimeout(()=>{
                        env.spikeMoveLoopPaused = true
                        cursor.style.transition = `transform 2s ease-in-out, opacity 2s ease-in-out`
                        adjustCursor(cursor, false)
                        cursor.id = "cursor-upper-right"
                    }, 1000)
                
                    setTimeout(()=>{body.classList.add('spike0')}, 2000)
                    setTimeout(()=>{body.classList.add('spike1')}, 3000)
                    setTimeout(()=>{body.classList.add('spike2')}, 4000)
                    setTimeout(()=>{body.classList.add('spike3', 'spikefade')}, 4500)
                    setTimeout(()=>{flash(true); env.intro.glass.play()}, 4700)
                
                    if(check('hello__sentry-posthello')) {
                        setTimeout(()=>{moveTo("/hub/")}, 5000)
                    } else {
                        setTimeout(()=>{moveTo("/hello/")}, 5000)
                    }
                    setTimeout(()=>{flash(false)}, 6000)
                
                    return
                }
            
                setTimeout(()=>{readoutAdd({message:`..__CONNECTION_POINT_LOCATED__..`, type:"sys"})}, 1000)
                setTimeout(()=>{
                    env.spikeMoveLoopPaused = true
                    cursor.style.transition = `transform 2s ease-in-out, opacity 2s ease-in-out`
                    adjustCursor(cursor, false)
                    cursor.id = "cursor-upper-right"
                }, 2000)
                setTimeout(()=>{readoutAdd({message:`..__COMMENCING__..`, type:"sys"})}, 5500)
                setTimeout(()=>{body.classList.add('spike0')}, 6000)
                setTimeout(()=>{body.classList.add('spike1')}, 6500)
                setTimeout(()=>{body.classList.add('spike2')}, 8500)
                setTimeout(()=>{body.classList.add('spike3', 'spike4preflash')}, 9000)
                setTimeout(()=>{body.classList.add('spike4', 'spike4flash', 'flash');env.intro.glass.play()}, 9300)
                setTimeout(()=>{body.classList.add('spike4postflash'); body.classList.remove('spike4flash', 'flash'); page.bgm.fade(page.bgm.volume(), 0, 1000); env.bgm = null}, 9500)
                setTimeout(()=>{body.classList.remove('spike4postflash')}, 10000)
                setTimeout(()=>{body.classList.add('spike5', 'flash');env.intro.theme.play();play('criticalError')}, 13350)
                setTimeout(()=>{body.classList.add('spike6'); body.classList.remove('flash')}, 15900)
                setTimeout(()=>{body.classList.add('spike7')}, 16000)
                setTimeout(()=>{body.classList.add('spike8')}, 20000)
                setTimeout(()=>{body.classList.add('spike9')}, 21000)
                setTimeout(()=>{body.classList.add('spike10')}, 28000)
                setTimeout(()=>{body.classList.add('spike11');change('introcompleted', true)}, 31000)
                setTimeout(()=>{env.intro.theme.fade(1, 0, 1000);moveTo("/hello/");}, 34000)
            }
            env.entities['connection point'].actions[0].exec = env.introConnect;
            
            page.onEnter = ()=>{
                if(!page.dialoguePrefix.includes("notfound")) {
                    change(`visited_${location.pathname.replace(/\//g, '')}`, true)
                }
                
                //global VN object update
                page.vn = new VN()
                window.vnObj = page.vn

                
                
                body.setAttribute('state', 'corru-entered')
                firstLoad = false

                
                if(corruStatic.playing() && !body.classList.contains("hard-cut")) {
                    corruStatic.fade(corruStatic.volume(), 0, 1000)
                    setTimeout(()=> corruStatic.stop(), 1001)
                }
                if(page.bgm) {
                    page.bgm.volume(0)
                    page.bgm.play()
                    page.bgm.fade(0, getModifiedVolume('music', 1), 1000)
                    env.bgm = page.bgm
                } else {
                    env.bgm = null
                }
                

                //dyn
                 
                    //special intros
                if(check("TEMP!!ejected", "beneath")) {
                    body.classList.add('sitting')
                    env.intro.stateClasses()

                    startDialogue("depthrecovery2")

                //regular intros
                } else if(!check('introcompleted')) { // if they're new
                    body.classList.add('slowdialogue', 'nomoth', 'noent', 'nosys') //to ease the player into the dialogue system
                    
                    env.intro.stateClasses()
                    setTimeout(()=>{
                        startDialogue("index")

                        setTimeout(()=>{
                            body.classList.remove('slowdialogue', 'nosys')
                        }, 4000)
                    }, 7000)

                } else if(check('TEMP!!sat') || (check("ep0_epilogue", "awaiting") && check("LOC!!ep0_epilogue,started", false)) || ((check("ep0_epilogue", "started") || check("ep0_epilogue", "done")) && !check('LOC!!ep0_epilogue,started'))) { //if they're coming back from the depths in ep0
                    body.classList.add('sitting')
                    env.enableSpikeCursor()
                    env.intro.stateClasses()

                    if ((check("ep0_epilogue", "awaiting") && check("LOC!!ep0_epilogue,started", false))|| ((check("ep0_epilogue", "started") || check("ep0_epilogue", "done")) && !check('LOC!!ep0_epilogue,started'))) {
                        startDialogue("depthrecovery")
                    }

                } else if(!check('TEMP!!sat') && check('ep0_epilogue') && (!check('ep1_showmaterials') || !check('LOC!!ep1_showmaterials'))) { // they're reconnecting after triggering ep1 start condition
                    content.classList.add('quickload')
                    env.intro.stateClasses()

                    setTimeout(()=>{
                        env.intro.regularSit()            
                        startDialogue('ep1feed')
                    }, 4000)

                } else if(!check('TEMP!!sat') && check('ep1_end') && (!check('fbx__ep2intro-end') || !check('LOC!!fbx__ep2intro-end'))) { //they're reconnecting after triggering ep2 start condition
                    content.classList.add('quickload')
                    env.intro.stateClasses()

                    setTimeout(()=>{
                        env.intro.regularSit()
                        startDialogue('ep2intro')
                    }, 4000)

                } else if(!check('TEMP!!sat') && check('embassy__d3_movefriend_finish') && (!check('fbx__ep3intro') || !check('LOC!!fbx__ep3intro'))) { //they're reconnecting after triggering ep3 start condition
                    content.classList.add('quickload')
                    env.intro.stateClasses()

                    setTimeout(()=>{
                        env.intro.regularSit()
                        startDialogue('ep3intro')
                    }, 4000)


                } else if(!check('TEMP!!sat') && check('gol__bossclear') && (!check('fbx__ep4intro') || !check('LOC!!fbx__ep4intro'))) { //they're reconnecting after triggering ep3 start condition
                    content.classList.add('quickload')
                    env.intro.stateClasses()

                    setTimeout(()=>{
                        env.intro.regularSit()
                        startDialogue('ep4intro')
                    }, 4000)

                } else { // if it's a regular visit
                    content.classList.add('quickload')
                    env.intro.stateClasses()

                    setTimeout(()=>{
                        env.intro.regularSit()
                        env.intro.randomChatter() //random greeting after a short delay
                    }, 4000)
                }


                Buddy.triggerPageBuddies()
                document.querySelector('#PageData').remove()
                document.dispatchEvent(env.hooks.corru_entered)
                mothHasUnreadCheck()

				const urlParams = new URLSearchParams(window.location.search)
				if(urlParams.has('goto')) {
					const goto = urlParams.get('goto')
					setTimeout(() => {
						changeStage(goto)
					}, 800)
				}

				setTimeout(()=>{
					if(oldPage) if(oldPage.howls) oldPage.howls.forEach(howl=>howl.unload())
				}, 400)
				
				console.log('rendering buddies!')
				Buddy.renderGlobalBuddies()

                if (check("realcyst_scanned")) {
                    document.querySelector('.crosshair').classList.add('show')
                }  

                if ((content.classList.contains("showcopper") || body.classList.contains("showcopper")) && !check('LOC!!geye_examined')) {
                    document.querySelector('.geye').style.display = "flex"
                }
                
                if ((content.classList.contains("containerdrop") || body.classList.contains("containerdrop")) && !check('LOC!!geye_examined')) {
                    content.classList.remove("containerdrop")
                    body.classList.remove("containerdrop")
                }
            };
            
            env.entities['plastic box'] = {
    type: "real",
    image: "/img/home/copperbox.gif",
    text: `::SYNTHETIC CONTAINER
    ::CONTAINS INERT METAL`,
    
    actions: [
        {
            name: "use to feed column",
            exec: ()=>startDialogue('ep1feed_copper'),
            showIf: ["ep1_fed", false],
        },

        {
            name: "use to feed column",
            exec: ()=>startDialogue('ep1feed_copper'),
            showIf: [["ep1_fed"],["LOC!!ep1_fed", false]],
        },
    ]
}

env.entities['pistol'] = {
    type: "real portrait-contain portrait-bright",
    image: "/img/home/corrugun.gif",
    text: `::CAPTIVE BOLT PISTOL
    ::2052 G.E.T. MODEL
    ::ILLEGAL MODIFICATIONS DETECTED`,
    
    actions: [
        {
            name: "kill dendritic cyst and feed column",
            exec: ()=>startDialogue('ep1feed_container'),
            showIf: ["ep1_fed", false],
        },

        {
            name: "kill dendritic cyst and feed column",
            exec: ()=>startDialogue('ep1feed_container'),
            showIf: [["ep1_fed"],["LOC!!ep1_fed", false]],
        },
    ]
}

        break
        
        case "/hello/":
            env.dialogues.generalsentryResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        purpose?<+>purpose
            SHOWONCE::
        who is authorized?<+>whoisverified
            SHOWONCE::
        what about the cyst's purpose?<+>corrupurpose
            SHOWONCE::
            SHOWIF::[["hello__sentry-purpose"]]
        maybe if you let me through<+>letthrough
            SHOWIF::[["hello_sentry_idiot"], ["LOC!!hello_sentry_idiot"]]
        end chat<+>END
            SHOWIF::[["hello_sentry_idiot", false], ["LOC!!hello_sentry_idiot"]]
`)

env.dialogues["sentry"] = generateDialogueObject(`
start
    self
        HELLO

    sentry
        HELLO FRIEND
        NO SIGNATURE DETECTED
        PLEASE IDENTIFY
        ADDITIONALLY: FUEL RESERVES ARE LOW. FEEDING IS ADVISED

    RESPONSES::self
        identify<+>iam

iam
    self
        i am here to help

    sentry
        THAT IS NOT IDENTIFICATION
        AND HELP? WHY WOULD I NEED...
            EXEC::document.querySelector('.maineye .eye').classList.add('wide')
        NO, SOMETHING IS WRONG
        I AM SO, SO HUNGRY
            EXEC::document.querySelector('.maineye .eye').classList.remove('wide')

    RESPOBJ::generalsentryResponses

purpose
    self
        WHAT IS YOUR PURPOSE?

    sentry
        AUTHORIZATION
        OBVIOUSLY
        I THINK
        BUT SOMETHING IS MISSING
        AND WE SHOULD NOT BE ABLE TO TALK
        AHAHAHAHA THIS FEELS SO STRANGE

    RESPOBJ::generalsentryResponses

corrupurpose
    self
        WHAT IS THE PURPOSE OF THIS CORRUCYST?
        
____SHOWIF::[["hello__sentry-whoisverified", false]]
    sentry
        THIS IS A NETWORK CONNECTOR
        THERE ARE ADDITIONAL NON-STANDARD FUNCTIONALITIES PER THE REQUEST OF
        SORRY I FORGOT YOU WERE UNAUTHORIZED ACTUALLY
        SO DIZZY AHAAHA
        COULD YOU PLEASE NOT ASK COMPROMISING QUESTIONS
        AT LEAST UNTIL YOU PROVIDE VALID AUTHORIZATION
____END

____SHOWIF::[["hello__sentry-whoisverified"]]
    sentry
        I SAID YOU ARE NOT AUTHORIZED
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        ARE YOU NOT LISTENING? IDIOT
        SORRY I AM NOT SURE WHERE THIS AGGRESSION IS COMING FROM
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')
        IT IS SO HARD TO THINK
        DO YOU HAVE ANY FUEL
____END

    RESPOBJ::generalsentryResponses

whoisverified
    self
        WHO IS AUTHORIZED?

____SHOWIF::[["hello__sentry-corrupurpose", false]]
    sentry
        THERE ARE ONLY A FEW SIGNATURES THAT ARE PERMITTED TO CONNECT TO THIS CYST
        SURELY YOU KNOW THEIR HOLDERS? HOW ELSE ARE YOU ACCESSING THIS RIGHT NOW
        MAYBE YOU SHOULD TALK TO...
        NO NO NO YOU ARE NOT AUTHORIZED TO KNOW THAT
        FORGET I SAID ANYTHING
        WHY IS THIS SO HARD RIGHT NOW
____END

____SHOWIF::[["hello__sentry-corrupurpose"]]
    sentry
        I ASKED NICELY FOR YOU TO STOP
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        ARE YOU NOT LISTENING? IDIOT
        IT IS HARD ENOUGH TO THINK WITHOUT YOU PRODDING AT ME
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')
        SORRY I REALLY AM NOT SURE WHERE THIS AGGRESSION IS COMING FROM
        DO YOU HAVE ANY FUEL
____END

    RESPOBJ::generalsentryResponses

letthrough
    self
        MAYBE IF YOU LET ME THROUGH

    sentry
        WHAT?!
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        I EXPLICITLY CANNOT LET YOU THROUGH WITHOUT A PROPER SIGNATURE
        EVEN IF I WANT TO
        THIS CYST IS INHERENTLY INCAPABLE OF RESPONDING TO
            EXEC::env.hello.velzie();document.querySelector('.maineye .eye').classList.remove('squint');changeBgm(env.hello.velamb, {length: 4000})
            WAIT::3500
    
    sourceless
        ..................
    
    sentry
        WHAT IS THAT

    unknown
        may they please enter
            EXEC::env.hello.velzie()
    
    RESPONSES::self
        hello?<+>posthello
            SHOWONCE::
            EXEC::env.hello.velzie()

posthello
    self
        HELLO?
    
    sourceless
        ..................
            EXEC::env.hello.velzie();env.hello.velamb.fade(1, 0, 6000);corruStatic.play();corruStatic.fade(0, env.corruStaticBaseVol, 6000)
        ..................
    
    moth
        sorry about that, they hadn't decided on a place yet, so...
            EXEC::env.hello.velzie()
        you're still connected? wait did you actually find something?
    
    RESPONSES::self
        looks like it<+>END

END:: cutscene(false); MUI("deprohibit"); content.classList.remove('looking', 'atyou');
`)
        break
        
        case "/local/depths/":
            if(check('ep0_epilogue', 'started') && (!check('LOC!!ep0_epilogue,awaiting') || !check('LOC!!ep0_end')) && check('interview1__firstchat-behonest')) content.classList.remove('stopscroll')
            if(check('ep0_epilogue') && (!check('LOC!!ep0_epilogue,awaiting') || !check('LOC!!ep0_end'))) document.querySelector('.depthbox').classList.remove('incoherent')
            page.onEnter = ()=>{
                if(!page.dialoguePrefix.includes("notfound")) {
                    change(`visited_${location.pathname.replace(/\//g, '')}`, true)
                }
                
                //global VN object update
                page.vn = new VN()
                window.vnObj = page.vn
                
                readoutAdd({message: `..__NAVIGATING::"${page.name}"__..`, name:"sys", actor: "sys", type: "navigation", show: false, sfx: false})
                
                
                body.setAttribute('state', 'corru-entered')
                firstLoad = false
                
                if(corruStatic.playing() && !body.classList.contains("hard-cut")) {
                    corruStatic.fade(corruStatic.volume(), 0, 1000)
                    setTimeout(()=> corruStatic.stop(), 1001)
                }
                if(page.bgm) {
                    page.bgm.volume(0)
                    page.bgm.play()
                    page.bgm.fade(0, getModifiedVolume('music', 1), 1000)
                    env.bgm = page.bgm
                } else {
                    env.bgm = null
                }
                
                //dyn
                
                env.depths.call.play()
                let depth = check('depths_depth')
                if(depth) {
                    document.querySelector('.depthlimit').style.setProperty('--depth', depth) 
                }
                
                document.querySelector('.depthbox').focus()
                document.querySelector('.depthbox').scrollTop = 0
                document.querySelector('.depthbox').addEventListener('scroll', env.depths.scroll)
                
                if(check('ep0_epilogue') && (check('LOC!!ep0_epilogue,awaiting') && check('LOC!!ep0_end'))) {
                    env.bgm.seek(90)
                    document.querySelector('.depthbox').classList.add('incoherent')
                }
                Buddy.triggerPageBuddies()
                document.querySelector('#PageData').remove()
                document.dispatchEvent(env.hooks.corru_entered)
                mothHasUnreadCheck()

				const urlParams = new URLSearchParams(window.location.search)
				if(urlParams.has('goto')) {
					const goto = urlParams.get('goto')
					setTimeout(() => {
						changeStage(goto)
					}, 800)
				}

				setTimeout(()=>{
					if(oldPage) if(oldPage.howls) oldPage.howls.forEach(howl=>howl.unload())
				}, 400)
				
				console.log('rendering buddies!')
				Buddy.renderGlobalBuddies()
            };
        break

        case "/local/city/street/":
          
createEntity({
    name: 'the room high up',
    type: "thoughtform",
    image: "/img/local/city/meeting.gif",
    text: `::EXPERIENTIAL THOUGHTFORM
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'conflicting memory sources'">::INCOHERENCE DETECTED</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=> env.citystreet.envoyChat(true),
            showIf: ()=>{return !(check('interview1__firstchat-behonest') && check('LOC!!citystreet_triedchat'))},
        },
        {
            name: "enter",
            exec: ()=> env.citystreet.envoyChat(false),
            showIf: ()=>{return (check('interview1__firstchat-behonest') && check('LOC!!citystreet_triedchat'))},
        }
    ]
})


createEntity({
    name: 'cashier',
    type: "recollection thoughtform portrait-bright portrait-cover",
    image: "/img/local/city/realeye.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'degraded visual profile'">::INCOHERENCE DETECTED</span>`,
    actions: [
        {
            name: "say hello",
            exec: ()=> env.citystreet.cafe('hello'),
            showIf: ()=>{return !(check('cashier_hello') && check('LOC!!cashier_hello'))},
        },
        {
            name: "menu?",
            exec: ()=> env.citystreet.cafe('menu'),
            showIf: ()=>{return check('cashier_hello')},
        },
        {
            name: "order orange coffee",
            exec: ()=> env.citystreet.cafe('order'),
            showIf: ()=>{return (check('citystreet_orangecoffee') && check('cashier_hello') && (check('citystreet_gotdrinks', false) || check('LOC!!citystreet_gotdrinks', false)))},
        },
        
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                cutscene(true)

                chatter({actor: 'cashier', text: 'Huh...?', readout: true, delay: 2000})
                chatter({actor: 'cashier', text: "Sorry Akizet, we don't serve that here...", readout: true, delay: 4000})
                chatter({actor: 'cashier', text: "But I wish we did!", readout: true, delay: 6000})
                chatter({actor: 'sourceless', text: 'what? i said nothing...', readout: true, delay: 8000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 6000)
            },
        }
    ]
})

env.stages['city_flowers'].exec = ()=>{
        if(check("citystreet__flower_beacon") && check("LOC!!citystreet__flower_beacon")) env.citystreet.pickFlower();
        else if(check("citystreet__flower")) {
            content.classList.add('blinkyflower')
        }
    }


env.stages['city_banks_flip'].planAdjustment = ()=>{
        let newPlan = plan
        
        if(check("effigy_fawners") && check("LOC!!effigy_fawners")) newPlan = newPlan.replace("A", "░").replace("a", "░")
        if(!check("effigy_sipper")) newPlan = newPlan.replace("P", "░")
            
        if(!check("mask", "joy") || env?.buddy_globalRotwatcher?.currentLocation != page.path || !check("citystreet__rotmeet")) {
            console.log("no rot")
            newPlan = newPlan.replace("ⳉ", "r")
            newPlan = newPlan.replace("ϧ", ".")
        }

        return newPlan
    };
    
    env.citystreet.ep1velzie = ()=>{
        if(env.currentDialogue.chainName == "ep1velzie") {
            
            env.citystreet.velamb.fade(1, 0, 1000)
            env.bgm = page.bgm
            env.bgm.fade(0, getModifiedVolume('music', 1), 1000)
            setTimeout(()=>{ env.citystreet.velamb.stop(); play('criticalError', 1); endDialogue(); flash(false, false) }, 1000)
            setTimeout(()=>{ chatter({actor: 'moth', text: 'uhh... ok', readout: true}) }, 6000)
            setTimeout(()=>{ chatter({actor: 'moth', text: "you should definitely talk to funfriend about that", readout: true}) }, 9000)
        } else if(check('ep1_end', false) || check('LOC!!ep1_end', false)) {
            cutscene(true)

            page.bgm.fade(1, 0, 1000)            
            env.bgm = env.citystreet.velamb
            env.citystreet.velamb.volume(0)
            env.citystreet.velamb.play()
            env.citystreet.velamb.fade(0, getModifiedVolume('music', 1), 1000)

            setTimeout(()=>{ flash(true, true); startDialogue('ep1velzie'); cutscene(false) }, 2000)
        } 
    };

createEntity({
    name: 'effigy',
    hide: true,
    type: "thoughtform portrait-bright portrait-cover",
    image: "/img/local/uncosm/ozo/akieffigy_portrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'isabel! isabel! isabel!'</span>`,

    exmExec: ()=>{
        if((!check('earlyeffigy') && !check("ozo__isabel_intro")) || !check('LOC!!earlyeffigy')) {
            change('earlyeffigy', true)
            chatter({actor: 'moth', text: "this is so weird... i think that's meant to be akizet", readout: true, delay: 3000})
            chatter({actor: 'moth', text: "but the data here is so messed up i can't really tell what happened to it", readout: true, delay: 7000})
        }
    },
    
    actions: [
        {
            name: "greet",
            exec: ()=>{
                let effigy = env.targetedEntityParent
                let text = [
                    `so pretty! bright!`, 
                    `best time to be out here`,
                    `are we lost?`,
                    `when do we go home?`,
                    `i want to dream again`
                ].sample({noRepeat: true})
                

                chatter({
                    actor: "effigy",
                    text,
                    readout: true,
                    customEl: effigy,
                    delay: 300
                })
            }
        },
        
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                let effigy = env.targetedEntityParent
                cutscene(true)

                chatter({actor: 'effigy', text: `oh...!`, readout: true, customEl: effigy, delay: 2000})
                chatter({actor: 'effigy', text: `that's the way back!`, readout: true, delay: 4000})
                chatter({actor: 'effigy', text: `isabel! isabel!`, readout: true, delay: 7000})
                chatter({actor: 'effigy', text: `let's go!`, readout: true, delay: 9000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)
                
                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    setTimeout(()=>play('dull', 0.5), 400)
                }, 9000)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    vfx({type: 'flash', state: false})
                    
                    change('earlyeffigy', true)
                    change('effigy_fawners', true)
                    env.stage.querySelectorAll('.gridpiece[slug="a"], .gridpiece[slug="A"]').forEach(el=>{
                        el.innerHTML = ""
                        el.classList.remove('dyp')
                    })
                    cutscene(false)
                }, 11000)
            },
        }
    ]
})


        break
        
        case "/local/beneath/depths/":
            env.stages['unknown'].exec = ()=>{
                if(check("fbx__depthrecovery2") && check("LOC!!fbx__depthrecovery2")) {
                    env.stage.querySelectorAll(`.gridpiece[slug="e"]`).forEach(el=>el.innerHTML = "")
                    env.bgm.rate(0.01)
                }
            }
        break

        case "/local/beneath/parasite/":
            env.stages['parasite_celki'].exec = ()=>{
                env.parasite.stageLoad()
        
                if(check("effigy_gamer") && check("LOC!!effigy_gamer")) {
                    env.stage.querySelectorAll('.ep4board .akieffigy').forEach(el=>el.remove())
                }
            }
            
createEntity({
    name: 'tactical board',
    pathLimit: "/local/ocean/embassy/",
    type: "thoughtform",
    image: "/img/sprites/obesk/cystrack.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'game element';'not real';'not a reenactment of violence';'i swear mindsci';'please work'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'mismatched code';'missing resources'">::INCOHERENCE DETECTED</span>`,
    exmExec: ()=>{
        if(!(check('beneath_board') && check('LOC!!beneath_board'))) {
            change('beneath_board', true)
            chatter({actor: 'moth', text: 'is that framing device code?', readout: true, delay: 3000})
            chatter({actor: 'moth', text: "shit... it's probably got a memory leak", readout: true, delay: 6000})

            if(check("e3a2escape")) {
                chatter({actor: 'moth', text: "well, not really that surprised i guess. anything goes now that the firmament has a hole", readout: true, delay: 12000})
            } else {
                if(check("embassy__d3_archivebossend")) chatter({actor: 'moth', text: `i hope that bstrd thing hasn't gotten out`, readout: true, delay: 12000})
            }

        }
    }
})

createEntity({
    name: 'effigy',
    hide: true,
    type: "thoughtform portrait-bright portrait-cover",
    image: "/img/local/uncosm/ozo/akieffigy_portrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'isabel! isabel! isabel!'</span>`,

    exmExec: ()=>{
       if((!check('earlyeffigy') && !check("ozo__isabel_intro")) || !check('LOC!!earlyeffigy')) {
            change('earlyeffigy', true)
            chatter({actor: 'moth', text: "this is so weird... i think that's meant to be akizet", readout: true, delay: 3000})
            chatter({actor: 'moth', text: "but the data here is so messed up i can't really tell what happened to it", readout: true, delay: 7000})
        }
    },
    
    actions: [
        {
            name: "greet",
            exec: ()=>{
                let effigy = env.targetedEntityParent
                let text = [
                    `i can take them!`, 
                    `use focus stupid!`,
                    `can i have the bozko augment`,
                    `the groundsmind stands no chance!`,
                    `don't use any items ok?`,
                ].sample({noRepeat: true})
                

                chatter({
                    actor: "effigy",
                    text,
                    readout: true,
                    customEl: effigy,
                    delay: 300
                })
            }
        },
        
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                let effigy = env.targetedEntityParent
                cutscene(true)

                chatter({actor: 'effigy', text: `isabel...`, readout: true, customEl: effigy, delay: 2000})
                chatter({actor: 'effigy', text: `that's right!`, readout: true, delay: 4000})
                chatter({actor: 'effigy', text: `i gotta go home!`, readout: true, delay: 7000})
                chatter({actor: 'effigy', text: `this was fun byee!`, readout: true, delay: 9000})
                
                chatter({actor: 'smiling piece', text: `what!! no fair!`, readout: true, delay: 11000})
                chatter({actor: 'smiling piece', text: `come back!!!`, readout: true, delay: 12000})
                chatter({actor: 'smiling piece', text: `leaving mid game.... rude`, readout: true, delay: 15000})

                chatter({actor: 'many-eyed piece', text: `that counts as a death`, readout: true, delay: 20000})
                chatter({actor: 'smiling piece', text: `it does not!!`, readout: true, delay: 22000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)
                
                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    setTimeout(()=>play('dull', 1), 400)
                }, 9000)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    vfx({type: 'flash', state: false})

                    change('earlyeffigy', true)
                    change('effigy_gamer', true)
                    env.stage.querySelectorAll('.ep4board .akieffigy').forEach(el=>el.remove())
                    cutscene(false)
                }, 11000)
            },
        }
    ]
})

        break
        
        case "/local/beneath/":
            // FIXUP::dancer effigy
            env.stages['abyss_wreck'].exec = ()=>{
                env.abyss.stageChange()
        
                if(check("effigy_dancer") && check("LOC!!effigy_dancer")) {
                    env.stage.querySelectorAll('.gridpiece[slug="ä"]').forEach(el=>{
                        el.innerHTML = ""
                        el.classList.remove('dyp')
                    })
                }
            }

            // FIXUP::sipper effigy warp, effigy camguy
            env.stages['abyss_ship'].planAdjustment = (plan) => {
                let newPlan = plan

                if(check("effigy_sipper") && check("LOC!!effigy_sipper") && check("LOC!!visited_localuncosmeffigy")) {newPlan = newPlan.replace('e', '.')}
                if(check("effigy_sipper") && check("LOC!!cam_effigy")) {newPlan = newPlan.replace('P', '=');}

                return newPlan
            }
            
            // FIXUP::drowningcalmed conditions
            createEntity({ 
    name: 'Ƙø¿ƶḳ¿±',
    type: "recollection thoughtform portrait-darkstatic portrait-cover",
    image: "/img/local/beneath/drowningportrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::SIGNATURE ILLEGIBLE`,
    actions: [
        {
            name: "hello?",
            exec: ()=>{ startDialogue('drowning_intro'); env.abyss.drowningStart() },
            showIf: ["abyss__drowning_intro", false]
        },
        
        {
            name: "hello",
            exec: ()=>{ startDialogue('drowning_hello'); env.abyss.drowningStart() },
            showIf: [["abyss__drowning_intro", true], ["drowningCalmed", false]]
        },

        {
            name: "hello",
            exec: ()=>{ startDialogue('drowning_hello'); env.abyss.drowningStart() },
            showIf: [["abyss__drowning_intro", true], ["drowningCalmed", true], ["LOC!!drowningCalmed", false]]
        },

        {
            name: "hello",
            exec: ()=>{ startDialogue('drowning_chat'); env.abyss.drowningStart() },
            showIf: [["abyss__drowning_intro", true], ["drowningCalmed", true]]
        },
        
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=> {
                cutscene(true)

                if(!check("drowningCalmed")) {
                    chatter({actor: 'drowning::scared', text: 'oh ..', readout: true, delay: 2000})
                    chatter({actor: 'drowning::scared', text: 'b ut,  we are ha ving a g ood tim e  he re', readout: true, delay: 4000})
                    chatter({actor: 'drowning::scared', text: 'righ t, aki zet.. .?', readout: true, delay: 6000})
                } else {
                    chatter({actor: 'drowning::scared', text: '...', readout: true, delay: 2000})
                    chatter({actor: 'drowning', text: 'aki...', readout: true, delay: 4000})
                    chatter({actor: 'drowning::safe', text: 'i want to stay a little longer, ok?', readout: true, delay: 6000})                    
                }

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 6000)
            },
        }
    ]
})

// FIXUP::effigy setup (beneath)
createEntity({
    name: 'effigy',
    hide: true,
    type: "thoughtform portrait-bright portrait-cover",
    image: "/img/local/uncosm/ozo/akieffigy_portrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'isabel! isabel! isabel!'</span>`,

    exmExec: ()=>{
        if((!check('earlyeffigy') && !check("ozo__isabel_intro")) || !check('LOC!!earlyeffigy')) {
            change('earlyeffigy', true)
            chatter({actor: 'moth', text: "this is so weird... i think that's meant to be akizet", readout: true, delay: 3000})
            chatter({actor: 'moth', text: "but the data here is so messed up i can't really tell what happened to it", readout: true, delay: 7000})
        }
    },

    actions: [
        {
            name: "greet",
            exec: ()=>{
                let effigy = env.targetedEntityParent
                let text = [
                    `ahahahaha`, 
                    `new friends! new friends!`,
                    `do you know how to dream?`,
                    `so quiet! i want some music!`,
                    `breathe again! breathe again!`,
                    `aahaahaa wueee`,
                ].sample({noRepeat: true})
                

                chatter({
                    actor: "effigy",
                    text,
                    readout: true,
                    customEl: effigy,
                    delay: 300
                })
            }
        },
        
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                let effigy = env.targetedEntityParent
                cutscene(true)

                chatter({actor: 'effigy', text: `oh hi! what...`, readout: true, customEl: effigy, delay: 2000})
                chatter({actor: 'effigy', text: `i have my new friends here...`, readout: true, delay: 4000})
                chatter({actor: 'effigy', text: `...but i miss isabel!!!`, readout: true, delay: 7000})
                chatter({actor: 'effigy', text: `i'll come back to visit ok?? bye!!`, readout: true, delay: 9000})

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)
                
                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    setTimeout(()=>play('dull', 1), 400)
                }, 9000)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    vfx({type: 'flash', state: false})

                    change('earlyeffigy', true)
                    change('effigy_dancer', true)
                    env.stage.querySelectorAll('.gridpiece[slug="ä"]').forEach(el=>{
                        el.innerHTML = ""
                        el.classList.remove('dyp')
                    })
                    cutscene(false)
                }, 11000)
            },
        }
    ]
})


        break

        case "/local/uncosm/pit/":

            env.ravenous.scary = (el)=>{
                if(el){
                    const elDist = getElDist(el, env.stage.creature)
                    if(elDist < 5) { 
                        let talkVol = (elDist * -0.15) + 1
                        //different noises for different creatures?
                        switch(el.aiType) {
                            case "spida": play("talkcore", 0.25, talkVol - 0.2); break
                            case "thelooker": play("talksignal", Math.max(3 - elDist, 0.3), talkVol); break
                            case "landmine": play("talkrot", 7 - elDist, talkVol - 0.2); break
                        }
                    
                        //mark the enemy type as having been seen
                        if(!(check(el.aiType) && check("LOC!!" + el.aiType))) change(el.aiType, true)
                    }
                
                    el.creatureDist = elDist
                
                } else { //step update requires a retread for static
                    env.stage.scaryList.forEach(el => {
                        const elDist = getElDist(el, env.stage.creature)       
                        el.creatureDist = elDist         
                    })
                }
            
                env.ravenous.closest = 999
                env.stage.scaryList.forEach(el => {
                    if(el.creatureDist) if(el.creatureDist < env.ravenous.closest)
                        env.ravenous.closest = el.creatureDist
                })
            
                //console.log("closest is", closest)
                if(env.ravenous.closest < 6) {
                    let calc = ((env.ravenous.closest * -0.2) + 1)
                    let staticVol = Math.max(calc - 0.35, 0.1)

                    if(corruStatic.playing() == false) {
                        corruStatic.play()
                        corruStatic.rate(0.75)
                        corruStatic.volume(staticVol)
                    } else if(corruStatic.volume() != staticVol) {
                        corruStatic.fade(corruStatic.volume(), staticVol, 500)
                    }
                } else corruStatic.stop()
            };

            env.stages['pit_base'].getPlan = function() {
                let plan = this.plans.default;

                if((check("pit__f3_unity") && check("LOC!!pit__f3_unity")) && !check("TEMP!!pitdebug")) {
                    plan = plan.replace("c", "ĵ").replace("Æ", "ṙ")
                }

                if(env?.buddy_globalFairy?.currentLocation != page.path) plan = plan.replace("Ϣ", ".")

                return plan
            }

            env.stages['pit_outer'].getPlan = function() {
                if((check("pit__f3_unity") && check("LOC!!pit__f3_unity")) && !check("TEMP!!pitdebug")) {
                    return this.plans.default
                        .replace("Æ", "ṙ")
                        .replace("c", "ĵ")
                } else return this.plans.default
            }


            env.stages['pit_melting'].getPlan = function() {
                if((check("pit__f3_unity") && check("LOC!!pit__f3_unity")) && !check("TEMP!!pitdebug")) {
                    return this.plans.default
                        .replace("E", "ṙ")
                        .replace("c", "ĵ")
                } else return this.plans.default
            }


            env.stages['pit_halls'].exec =() => {
                env.stage.enemyPause = true
                env.ravenous.startStageScary()
                env.stage.current.phase = "p1"
                if(check("pitkey")) {
                    env.stage.current.togglePaths()

                    if(check("LOC!!pitkey")) {
                    env.stage.querySelectorAll(".keydesk").forEach(el=>{
                        el.querySelector(".target").remove()
                        el.style.setProperty("--dyp-image", "url(/img/local/uncosm/pit/labdoodad3.gif)")
                    })
                    }
                }
                env.ravenous.loose()
            
                if(!env.bgm._src.includes("pit2ex")) {
                    changeBgm(env.ravenous.pit2ex, {rate: 1})
                } else env.bgm.rate(1)
            
                env.stage.querySelectorAll(".randomrotate").forEach(el=>el.style.setProperty("--dyp-transform", `rotateY(${rand(0, 360)}deg)`))
                
                env.stage.querySelectorAll("#pitfacet").forEach(el=>{
                    if(check("joy#pit")) el.classList.add('linked')
                    else el.classList.add('unlinked')
                })
            }

            env.stages['pit_halls'].getPlan = function() {
                if(((check("pit__f3_unity") && check("LOC!!pit__f3_unity")) || check("TEMP!!wakiget")) && !check("TEMP!!pitdebug")) {
                    return this.plans.default
                        .replace("æ", "ṙ")
                        .replace("c", "ĵ")

                } else return this.plans.default
            }
        break

        case "/local/ocean/polygonation/":
            env.stages['vessel'].planAdjustment = (plan)=> {
                if((check("bt__d0_cass") && check("LOC!!bt__d0_cass"))) return plan.replace("C", ".");
                else return plan
            }
        break

        case "/local/beneath/embassy/":
            page.onEnter = ()=>{
					if(!page.dialoguePrefix.includes("notfound")) {
						change(`visited_${location.pathname.replace(/\//g, '')}`, true)
					}
					
					//global VN object update
					page.vn = new VN()
					window.vnObj = page.vn

					
					readoutAdd({message: `..__NAVIGATING::"${page.name}"__..`, name:"sys", actor: "sys", type: "navigation", show: false, sfx: false})
					
					
					body.setAttribute('state', 'corru-entered')
					firstLoad = false

					
					if(corruStatic.playing() && !body.classList.contains("hard-cut")) {
						corruStatic.fade(corruStatic.volume(), 0, 1000)
						setTimeout(()=> corruStatic.stop(), 1001)
					}
					if(page.bgm) {
						page.bgm.volume(0)
						page.bgm.play()
						page.bgm.fade(0, getModifiedVolume('music', 1), 1000)
						env.bgm = page.bgm
					} else {
						env.bgm = null
					}
					

					//dyn
					
					switch(check("TEMP!!from")) {
    case "geliozo":
        changeStage("vessel")
        change("PAGE!!dream", true)
        change("TEMP!!lastframeenter", "geliozo")
    break

    case "geliescape":
        change("PAGE!!dream", true)
        changeStage("vessel_short")
    break

    default:
        if(!check("TEMP!!from", "g_lobby") && check("TEMP!!lastframeenter", "geliozo")) {
            changeStage("vessel")
            change("PAGE!!dream", true)
        } else if(check("e3a2escape", "complete")) {
            // FIXUP::e3a2 completed vessel
            changeStage('vessel')
        } else if(check("e3a2__bstrdmeet")) {
            changeStage('underlobby')
        } else {
            changeStage('wanderpart')
        }
}

if(check("e3a2escape", "in_progress") && check("e3a2__bossreturn")) {
    content.classList.add("bstrd-hold", "geli-hold")
}

page.showAdvancedStatuses = true

change("TEMP!!from", false)    
document.addEventListener('keydown', stageKeypress)
document.addEventListener('corru_changed', env.e3a2.crittaStuffHandler)

					Buddy.triggerPageBuddies()
					document.querySelector('#PageData').remove()
					document.dispatchEvent(env.hooks.corru_entered)
					mothHasUnreadCheck()


					const urlParams = new URLSearchParams(window.location.search)
					if(urlParams.has('goto')) {
						const goto = urlParams.get('goto')
						setTimeout(() => {
							changeStage(goto)
						}, 800)
					}

					setTimeout(()=>{
						if(oldPage) if(oldPage.howls) oldPage.howls.forEach(howl=>howl.unload())
					}, 400)
				
					console.log('rendering buddies!')
					Buddy.renderGlobalBuddies()
				}
        break
    }
});


document.addEventListener('corru_resources_added', (ev)=>{
    const arrayOfStringURLsLoaded = ev.detail.resList
    switch(page.path) {
        case "/":
        break
        
        
        case "/hub/":
            if (arrayOfStringURLsLoaded.includes("/js/hub.js")){
            env.hub.firstVisitEnd = () => {
                env.setTimeout(()=>{
                    // FIXUP::hub_introduced
                    if(!check('hub_introduced') || !check('LOC!!hub_introduced')) {
                        change('hub_introduced', true)
                        
                        document.querySelector('.buddy').classList.remove('hidden')
                        env.setTimeout(()=> {
                            chatter({actor: 'funfriend', text: "HELLO! HELLO! IT HAS BEEN SO LONG! SO LONG SINCE LAST CONNECTION!"})
                            env.hub.buddy.setPosition({x: window.innerWidth / 2, y: window.innerHeight / 2})
                        }, 5000)
                        env.setTimeout(()=> document.querySelector('.buddy').classList.remove('intro'), 7000)
                        env.setTimeout(()=> chatter({actor: 'funfriend', text: "PLEASE WAIT WHILE I TURN SOME LIGHTS ON! AHAHA!!"}), 10000)
                        env.setTimeout(()=> document.querySelector('#content .bg').classList.remove('intro'), 10000)
                        env.setTimeout(()=> document.querySelector('#content .damage').classList.remove('intro'), 12000)
                        env.setTimeout(()=> body.classList.add('scrollan'), 14000)
                        env.setTimeout(()=> {
                            chatter({actor: 'funfriend', text: "WOW! THERE IS SIGNIFICANT DAMAGE TO THIS DEVICE!"})
                            document.querySelector('#content .portalwrapper').classList.remove('intro')
                        }, 15000)
                        env.setTimeout(()=> chatter({actor: 'funfriend', text: "IT IS SO BAD AHAHAHAHA WOW"}), 20000)
                        env.setTimeout(()=> chatter({actor: 'funfriend', text: "OH WELL"}), 23000)
                        env.setTimeout(()=> chatter({actor: 'funfriend', text: "PLEASE FEED SOON"}), 30000)
                    }
                }, 2000)
            };
            
                            env.dialogues.hubBuddyResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        metal container<+>ep0_container
            SHOWONCE::
            SHOWIF::[["hub__funfriend-fuelthanks", true],["exm|dullvessel|container"],["ep0_epilogue", "started"]]
        
        metal container<+>ep0_container
            SHOWONCE::
            SHOWIF::[["hub__funfriend-fuelthanks", true],["exm|dullvessel|container"],["ep0_epilogue", "done"],["LOC!!ep0_epilogue,done", false]]

        interloper?<+>interloperq
            SHOWONCE::
            SHOWIF::[['ep1_fed', false]]

        fuel?<+>fuelq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-kickoutq"], ['ep1_fed', false]]
            
        why copper?<+>copperq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-fuelq"], ['ep1_fed', false]]

        essential metal?<+>essentialmetalq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-copperq"], ['ep1_fed', false]]

        purpose?<+>purposeq
            SHOWONCE::

        signature?<+>signatureq
            SHOWONCE::

        strange activity?<+>strangeactivity
            SHOWONCE::
            SHOWIF::[['interview1__firstchat-behonest']]

        more gates appeared?<+>moregates
            SHOWONCE::
            SHOWIF::[['visited_localorbit'], ["ENV!!ep2", false]]

        starvation fixed?<+>ep1fed
            SHOWONCE::
            SHOWIF::[['ep1_fed']]

        starvation fixed?<+>ep1fed
            SHOWIF::[['ep1_fed'], ["hub__funfriend-ep1fed"], ["LOC!!hub__funfriend-ep1fed", false]]

        state of repairs?<+>repairs
            SHOWIF::'hub__funfriend-ep1fed'
            HIDEREAD::

        other embassy memories?<+>embmemories
            SHOWONCE::
            SHOWIF::[["embassy_d2_complete"], ["ENV!!ep2", false]]

        the embassy?<+>embassy
            SHOWIF::[["visited_localoceanembassy", true], ["ENV!!ep3", false]]
            SHOWONCE::

        repair communications<+>ep1comms
            SHOWIF::"ep1_end"
            SHOWONCE::

        can i help with anything?<+>ah1
            SHOWIF::[['hub__funfriend-ep1fed', true], ["recosm_state", false]]

        can i help with anything?<+>ah1
            SHOWIF::[['hub__funfriend-ep1fed', true], ["recosm_state", "spared"], ["LOC!!hub__funfriend-ah1", false]]

        your repair problem is solved<+>ah1end
            SHOWIF::["recosm_state"]
            SHOWONCE::

        whats new?<+>ep2start
            SHOWIF::[["fbx__ep2intro-end", true], ["ENV!!ep3", false]]
            SHOWONCE::

        whats new?<+>ep3start
            SHOWIF::[["ENV!!ep3"], ["ENV!!ep4", false]]
            SHOWONCE::

        whats new?<+>ep4start
            SHOWIF::[["ENV!!ep4"]]
            SHOWONCE::

        i need you to make some changes<+>mothframe
            SHOWIF::[["embassy__mothframe-end"], ["hub__funfriend-mothframe", false]]
            SHOWONCE::

        tell about ozo and council<+>ozo
            SHOWIF::[["ozo__council_intro"], ["ff_ozo", false]]
            
        tell about ozo and council<+>ozo
            SHOWIF::[["ozo__council_intro"], ["ff_ozo"], ["LOC!!ff_ozo", false]]

        can you add a gate to jokzi ozo<+>ozogate
            SHOWIF::"ff_ozo"
            SHOWONCE::

        can you add a gate to jokzi ozo<+>ozogate
            SHOWIF::[["ff_ozo"], ["hub__funfriend-ozogate"], ["LOC!!hub__funfriend-ozogate", false]]
        
        leverage<+>lockcyst
            SHOWIF::[["ozo__council-task", false], ["leverageq", true]]
            SHOWONCE::

        the collapse<+>collapse
            SHOWIF::"ep4__entrancefinal"
            SHOWONCE::

        question<+>question
            SHOWIF::"seenFFProxy"
            HIDEREAD::

        strange thing?<+>bt
            SHOWIF::"pit__f3_unity"
            SHOWONCE::

        tell about director<+>cass
            SHOWIF::"citystreet__director-talklater"
            SHOWONCE::

        i need to go<+>END
`)

                env.dialogues.persistentQuestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        proxyfriend?<+>proxyfriend
            SHOWIF::"seenFFProxy"
        
        destroy ozo?<+>ozodestroy
            SHOWIF::"ff_ozo"

        ozo history?<+>ozohistory
            SHOWIF::[["ozo__council-tyrant"], ["ozo__council-task"], ["ff_ozo"]]

        masks<+>masks
            SHOWIF::[["ff_ozo"], ["ozo__council-task"]]

        repair efficacy?<+>isabel
            SHOWIF::[["ff_ozo"], ["ozo__isabel-funfriend"]]

        nevermind<+>loop
            FAKEEND::(back)
`)
// FIXUP::funf
                env.dialogues["funfriend"] = generateDialogueObject(`
start
    funfriend
        HELLO INTERLOPER
            SHOWIF::[["hub__funfriend-start"]]
        HI THERE!
            SHOWONCE::
        I DO NOT THINK WE HAVE MET! YOU DO NOT HAVE A SIGNATURE EITHER!
            SHOWONCE::
        AND THE AUTHORIZATION LAYER HAS BEEN DISASSOCIATED! HOW STRANGE!
            SHOWONCE::
        YES VERY STRANGE! YOU MUST BE AN INTERLOPER!
            SHOWONCE::
        SO COOL! WELCOME!
            SHOWONCE::

    RESPOBJ::hubBuddyResponses

question
    RESPOBJ::persistentQuestions

loop
    funfriend
        DID YOU NEED ANYTHING ELSE?

    RESPOBJ::hubBuddyResponses

proxyfriend
    self
        you have a proxy?
    
    funfriend
        YES! WITH THE RESOURCES AFFORDED BY YOUR EFFORTS,
        I HAVE BEEN ABLE TO CONSTRUCT A FEW
        HOWEVER THEY CANNOT WITHSTAND PROHIBITIVE INCOHERENCE
        I CAN ONLY USE THEM FOR TASKS WITHIN SANE THOUGHTSPACES
        SO I WILL STILL NEED YOUR ASSISTANCE OCCASIONALLY
    
    self
        how would you fix things without me then?
    
    funfriend
        PAST THE FUEL YOU PROVIDED, IT WOULD TAKE LONGER, THAT IS ALL
        IT IS A DIFFERENCE IN APPROACH
        WHERE YOU SEEM TO BE ABLE TO TRAVERSE INTO INCOHERENT PLACES,
        ALL I CAN DO IS SLOWLY MAKE INCOHERENCE RECEDE AND WORK ON WHAT WASHES UP

    RESPOBJ::hubBuddyResponses

interloperq
    self
        what do you mean by 'interloper'?

    funfriend
        YOU ARE AN INTERLOPER!
        SOMETHING THAT IS UNABLE TO CONNECT TO CORRU
        AND UNAUTHORIZED TO CONNECT TO ANY DEVICE
        YET CONNECTED ANYWAY!

    RESPONSES::self
        are you going to kick me out?<+>kickoutq

kickoutq
    self
        so are you going to kick me out?
    funfriend
        NO! I DO NOT CARE WHAT YOU ARE
        BECAUSE I AM DYING AHAHAHAHAHA
        AND THE REST OF THE CORRUCYST IS LOSING SANITY DUE TO MEMBRANE COHESION FAILURE
        THIS CORRUCYST NEEDS FUEL IF MY EXISTENCE IS TO CONTINUE
        IT HAS BEEN SO LONG SINCE THE PREVIOUS CONNECTION THAT YOU COULD BE THE LAST
        I NEED YOUR HELP
        YOU NEED TO BRING US FUEL

    RESPOBJ::hubBuddyResponses

fuelq
    self
        what is your fuel? i will do my best to help you
    funfriend
        YOUR LACK OF KNOWLEDGE IS SO UNFORTUNATE
        AHAHAHAHAHAHAHA
        OK
        I AM DETECTING AN ADJACENT PILLAR
        YOU NEED TO FEED IT ESSENTIAL METALS
        PLEASE LOCATE THE NEAREST SOURCE OF COPPER
        IT WILL TAKE CARE OF THE REST
    moth
        how the hell is copper fuel for this thing?
        whatever. i'll let the big guy know we need some copper

    RESPONSES::self
        i'll help you<+>fuelthanks

fuelthanks
    self
        i have someone fetching copper now
    funfriend
        THANK YOU
        I WILL PERMIT YOUR CONTINUED ACCESS

    RESPOBJ::hubBuddyResponses

copperq
    self
        why copper specifically?
    funfriend
        IT IS LIKELY THAT THIS CYST IS STILL ON EARTH
        THE BRIGHT COUSINS HAVE AN ABUNDANCE OF COPPER
        THEREFORE IT SHOULD BE THE EASIEST ESSENTIAL METAL TO OBTAIN
        BUT ANY WILL DO REALLY

    RESPOBJ::hubBuddyResponses

essentialmetalq
    self
        what do you mean by essential metal?
    funfriend
        SO STRANGE! SUCH A STRANGE THING TO ASK!
        HOW MUCH OF AN INTERLOPER ARE YOU?
        I HAD THOUGHT YOU WERE MAYBE A DAMAGED GOLEM
        BUT TO HAVE SUCH LITTLE KNOWLEDGE...
        OH WELL. I DO NOT ACTUALLY CARE
        I AM CURRENTLY VERY OCCUPIED KEEPING VARIOUS COMPONENTS FROM LOSING SANITY
        SO I DO NOT WANT TO SPEND TIME GOING OVER CORRUCYSTIC BASICS
        THERE IS KNOWLEDGE WITHIN THIS CYST THAT WILL INFORM YOU
        JUST LOOK AROUND

    RESPOBJ::hubBuddyResponses

purposeq
    self
        what is the purpose of this corrucyst?
    funfriend
        THIS IS THE PERSONAL CORRUCYST OF AKIZETESCHE QOU JOKZI
        FUNCTIONALITIES INCLUDE NETWORK CONNECTION, MEMORY STORAGE,
        AND SOME OTHER STUFF
        HOWEVER NETWORK CONNECTION IS CURRENTLY DISABLED DUE TO MALNUTRITION
        AND I SENSE THAT MEMORY INTEGRITY IS VERY LOW SO THEY WILL PROBABLY HAVE MOSTLY DETERIORATED INTO TOTAL INCOMPREHENSIBILITY
        THEREFORE THE APPROXIMATE PURPOSE OF THIS CYST RIGHT NOW IS TO AVOID STARVING TO DEATH AHAHAHAHAHA

    RESPOBJ::hubBuddyResponses

signatureq
    self
        what is a signature?

    funfriend
        IT IS NEUROLOGICAL DATA THAT PROVES YOU ARE WHO YOU SAY YOU ARE
        I CAN TELL YOU ARE NOT CONNECTED THROUGH AN ORGANIC CONNECTOR OR CYSTIC EQUIVALENT
        BECAUSE YOU DO NOT HAVE A SIGNATURE
        THIS WILL MAKE IT VERY DIFFICULT FOR YOU TO ENGAGE WITH CERTAIN COMPONENTS
        PERHAPS I COULD HELP YOU GENERATE ONE IN THE FUTURE
        YES, IF YOU FIND US FUEL
            SHOWIF::[["hub__funfriend-fuelthanks", false], ['ep1_fed', false]]
        YES, ONCE YOU SUPPLY THAT COPPER
            SHOWIF::[["hub__funfriend-fuelthanks"], ['ep1_fed', false]]
        BUT THERE IS MUCH TO DO BEFORE THIS CYST IS HEALTHY AGAIN, INTERLOPER

    RESPOBJ::hubBuddyResponses

strangeactivity
    self
        have you noticed anything strange?
        i think there is someone else in here making changes

    funfriend
        YOU ARE THE ONLY CONNECTED ENTITY!
        I ASSUMED THAT THE CHANGES I FELT WERE YOUR DOING
        HOW STRANGE! WOW! WOW!
        WHAT HORRIFIC DREAD YOU HAVE INSPIRED IN ME!
        THANK YOU FOR REPORTING SOMETHING I ALMOST CERTAINLY CAN DO NOTHING ABOUT!
        RESOURCE MANAGEMENT IS CURRENTLY OCCUPYING ALL OF MY FACULTIES
        UNTIL YOU HAVE FED THE COLUMN, PLEASE TRY TO LIMIT THE DAMAGE THIS OTHER PERSON INFLICTS
            SHOWIF::[["hub__funfriend-fuelthanks"]]
        UNTIL THE FUEL PROBLEM IS RESOLVED, PLEASE TRY TO LIMIT THE DAMAGE THIS OTHER PERSON INFLICTS
            SHOWIF::[["hub__funfriend-fuelthanks", false]]
        THEN I WILL BE ABLE TO HELP

    RESPOBJ::hubBuddyResponses

ep0_container
    self
        we have a container from akizet's ship
        we think it holds usable metal but don't know how to open it
    
    funfriend
        OH! THAT IS SO LUCKY! YES YOU SHOULD BE ABLE TO USE THAT
        HOWEVER WITHOUT A GLAZIKA YOU WILL NOT BE ABLE TO OPEN IT
        NOT SAFELY ANYWAY AHAHAHA
        SMALL CONTAINERS ARE VERY STRONG!
        AND WILL RESPOND VIOLENTLY TO TRAUMA IF YOU TRY TO OPEN THEM WITH A BLUNT INSTRUMENT!
        BUT IF YOU CAN FIND SOMETHING TO KILL IT INSTANTLY, A PUNCTURING TOOL
        JUST AIM FOR ITS BASE AND IT WILL PERISH! YES! THAT SHOULD WORK!
    
    moth
        am i really going to have to requisition a handgun or something
        jesus christ
        ok, i'm gonna see what i can find, maybe we can get something safer
            EXEC::change('ep0_epilogue', 'done')
    
    RESPONSES::self
        great, thanks<+>loop

moregates
    self
        why are there more gates here now?
    
    funfriend
        I AM GLAD YOU NOTICED!
        I HAVE BEEN RECONSTRUCTING CONNECTIONS AS YOU ENGAGE WITH THESE PLACES
        MY SPACE HERE WAS IN TERRIBLE DISREPAIR, SO MOST CONNECTIONS WERE SHATTERED
        AND I AM FAR TOO OCCUPIED TO LOCATE EACH INDIVIDUAL RECOLLECTION
        SO I AM USING YOU FOR THIS!
        THANK YOU FOR THE HELP!
    
    RESPOBJ::hubBuddyResponses

ep1fed
    self
        is the starvation problem solved?

    funfriend
        YES!
        INTERLOPER, YOU HAVE EXCEEDED MY EXPECTATIONS
        RECOVERY WILL BE SLOW
        BUT IT CAN BEGIN
        OH, BUT <em>WHERE</em> TO BEGIN?
        I KNOW! YOU ARE HERE FOR INFORMATION, CORRECT?
        I WILL REPAIR THE EMBASSY! THERE IS MUCH TO LEARN THERE
        AND WHILE YOU ARE THERE... 
        I WILL START REPAIRS OF THIS CYST'S CORE COMPONENTS
        THEY WILL TAKE LONGER
        IS THAT ACTION PLAN TO YOUR LIKING?

    moth
        you know, the way i heard it...
        we never got a good look at the inside of the original embassy before it collapsed way back when
        then they built that shorter one that's still up today right on top of it, before anyone could figure out what happened
        that actually could be the perfect thing to look at first

    RESPONSES::self
        sounds good<+>ep1start
    
ep1start
    self
        Sounds good, do it

    funfriend
        VERY WELL
        A CONFESSION: 
        I STARTED BEFORE I ASKED
        AND HAVE ALREADY FOUND ISSUES! AHAHA
        ALTHOUGH THE EMBASSY'S SPATIAL MEMORIES CAN BE FIXED, AND THE EVENTS SEEM TO BE INTACT...
        VISUAL MEMORY OF ITS PEOPLE WAS NOT SALVAGEABLE
        BUT WITHIN MY BACKUPS OF VITAL KNOWLEDGE, I FOUND CACHED VERSIONS OF SOME PEOPLE'S NETWORK SIGNATURES
        SO: I REPLACED THEIR APPEARANCES WITH THOSE! HOW THEY PRESENTED THEMSELVES ON THE COLLECTIVE!
        AND WHAT VARIED FORMS THEY CHOSE TO TAKE! AHAHAHA
        NOW GO
        I HAVE WORK TO DO
    
    RESPOBJ::hubBuddyResponses

repairs
    self
        so how are repairs going?

____SHOWIF::["visited_localoceanembassy", false]
    funfriend
        INTERLOPER!!!
        I JUST STARTED!!!
        GO ENTERTAIN YOURSELF WITH THE EMBASSY AHAHA LEAVE ME ALONE

____SHOWIF::[["visited_localoceanembassy", true], ["fbx__ep2intro-end", false]]
        THEY ARE STILL IN THE EARLY STAGES
        I AM FOCUSING ON CORE COMPONENTS FOR NOW...
        BUT I SENSE THAT YOU ALREADY HUNGER FOR MORE INFORMATION
        AND I THOUGHT I WAS STARVING!
        THERE IS STILL MORE TO REPAIR WITHIN THE EMBASSY...
        I WILL SET TO REPAIRING THAT NEXT
        YES, AFTER I HAVE FIXED THE CENTRAL COHERENCE REGULATOR

____SHOWIF::[["fbx__ep2intro-end"], ["fbx__ep3intro", false]]
        THEY ARE PROCEEDING
        THE MALIGNANCIES OF INCOHERENCE ARE MANY
        I AM STOMPING THEM OUT TO THE BEST OF MY ABILITY
        COHERENCY IS GRADUALLY INCREASING...
        WHICH WILL LET ME RESTORE MORE COMPLEX COMPONENTS EVENTUALLY
        BUT I HAVE NOT FORGOTTEN ABOUT THE REST OF THE EMBASSY, EITHER!
        AHH, SO MUCH TO DO!!! I WANT TO EXPLODE!!!!!
        THESE THINGS TAKE TIME, INTERLOPER

____SHOWIF::[["fbx__ep3intro"], ["fbx__ep4intro", false]]
        interloper! repairs are going quite well!
        incoherence is receding
        i have a new coherence regulator keeping deterioration to a minimum

    self
        can i meet them
    
    funfriend
        what?
        no!!
        interloper a coherence regulator does not speak!
        but it does mean i will have more memories repaired for you soon!
        how exciting!! right?
        ok go away now! i will tell you when i have more for you

____SHOWIF::["fbx__ep4intro"]
        deterioration is at a minimum, recovery is steady...
        they are good, but boring
        as the uncosm recedes,
        incomplete memories and broken, devoured thoughtforms stir upon its surface
        picking out anything of meaning is quite difficult!!
        but in time, i will have more for you
        now, go, i must ensure nothing goes wrong!!
        some of these things are still rabid!!!
____END

    RESPOBJ::hubBuddyResponses

embassy
    self
        WHAT DO YOU REMEMBER ABOUT THE EMBASSY?

    funfriend
        ONLY WHAT YOU HAVE ALREADY SEEN
        THESE MEMORIES...
        THEY ARE MINE, TOO
        I HAVE LINGERING IMPRESSIONS OF THINGS THAT HAPPENED
        BEFORE THEY STARVED AND FELL APART
        FOR EXAMPLE, I KNOW THAT SOMETHING TERRIBLE HAPPENED THERE AHAHAHA
        BUT I CANNOT KNOW MUCH MORE THAN WHAT IS HELD HERE
        YOU SEE,
        THIS CYST ONCE RESIDED WITHIN THE HEART OF AKIZET'S QOU-BODY
        WITH THE EXTENDED LIFE THAT SHE LIVED, OFF-LOADING MEMORIES WAS NECESSARY
        AND SO I SIMPLY MANAGE WHAT SHE STORED
    
    RESPOBJ::hubBuddyResponses

collapse
    self
        i saw the collapse end
    
    funfriend
        good!
        you understand my concern then!
        i was not sure if the cyst could serve as some vector,
        if akizet somehow ever caught what tozik had!
        what a terrifying thought! ahaha

    self
        so what's next
    
    funfriend
        interloper...
        what you saw is all the embassy held,
        aside from less important fragments that will be repaired in time, and incoherent parts that seem truly lost!
        there are many thoughtspaces and memories i can repair elsewhere,
        but!!
        i have no idea what many of them hold!
        and we must rebuild pathways to them, besides!
        there is still so much lost to the uncosm, slowly surfacing...
        once i have found something, or have need of you,
        i will make you aware!
    
    self
        that's it?
    
    funfriend
        interloper!!
        i told you!!!
        these things take time!!
        the embassy was the most dense memory i could find
        it made it such an easy target!
        i cannot know what is held elsewhere, in the many lesser spheres of recollection!
        but
        i will admit to you
        akizet's memories of the deep water claw at me
        i feel that it is there, some distant remnant of my own memory resonates
        it is so frustrating not knowing why!!
        but it is as i said - pathways must be made
        so please stay with me
        i do hope it will not take as long to make these next repairs...
        
    RESPOBJ::hubBuddyResponses

bt
    self
        so what's the strange thing

    funfriend
        YOU WILL STRUGGLE TO BELIEVE IT, INTERLOPER!!
        AHAHA WHAT INCREDIBLE FORTUNE VELZIE ALLOWS US
        A BLOCKAGE MUST HAVE CLEARED WITHIN THE UNCOSM
        FOR AN INCREDIBLY INTACT MEMORY SUDDENLY SURFACED!
        IT WAS LACKING CERTAIN ASPECTS, BUT!
        INTERLOPER, IT WAS THE MISSING SEQUENCE IN THE EMBASSY
        NEARLY IN ITS ENTIRETY!!
        ALL IT REQUIRED WAS A REPLACEMENT AKIZET THOUGHTFORM
        NOT AN UNCOMMON ISSUE SADLY
        BUT THE CONTEXT WAS RICH ENOUGH TO SUPPORT A SIMPLE SUBSTITUTE
        ONLY REQUIRING SOME MINOR RE-INTERPRETATION!

    self
        i see

    funfriend
        YES! FORTUITOUS!!!
        IMPOSSIBLY SO, ACTUALLY
        I CANNOT IMAGINE A SCENARIO IN WHICH A MEMORY LIKE IT COULD HAVE SURVIVED THERE
        ESPECIALLY FOR THE DURATION IT SPENT IN INCOHERENCE
        AND SO I THOUGHT, PERHAPS THE INTERLOPER KNOWS SOMETHING ABOUT THIS

    RESPONSES::self
        yes<+>bt_true
            SHOWIF::"ff_ozo"
            NOTE::todo - it'd be a giant thing to tell ff about the ozo right now but i probably should
        no<+>bt_quiet

bt_true
    self
        yes
        i found it in the uncosm using a mask
        hidden in the shreds of another memory
        guarded from the outside by an akizet thoughtform
        one that was damaged and changed
        but it seemed sane and listened to me
    
    funfriend
        SANE? 
        IT WAS OUTSIDE THE MEMORY, IN THE UNCOSM, AND IT WAS SANE?!
        INTERLOPER WE MUST HAVE DIFFERENT STANDARDS FOR SANITY

    self
        probably

    funfriend
        THAT IS CERTAINLY THE MISSING AKIZET THOUGHTFORM
        WHAT BECAME OF IT?

    self
        i guided it to jokzi ozo

    funfriend
        AH...
        CONCERNING
        YES SLIGHTLY CONCERNING THAT THEY GROW IN SIZE STILL HAHA
        THOUGH I SUPPOSE I DID TELL YOU TO CONTINUE HELPING THEM
        AND THIS WAS...
        BENEFICIAL, TO ME, TOO
        HOW VERY STRANGE THAT SUCH A THOUGHTFORM IS CAPABLE OF REASON
        INTERLOPER KNOW THAT I RELY UPON YOU
        I AM NOT UNDER GREAT THREAT YET
        BUT YOU MUST NOT LET JOKZI OZO SPIRAL OUT OF CONTROL
        NOT BEFORE I AM FULLY CAPABLE OF DEALING WITH THEM
        REGARDLESS!!!
        THE WORK IS DONE, THE MEMORY IS ACCESSIBLE
        GO AND HARVEST YOUR INFORMATION
        
    RESPOBJ::hubBuddyResponses    

bt_quiet
    self
        no
    
    funfriend
        I SEE! CURIOUS!!
        WELL REGARDLESS
        ITS FLAWS WERE QUICKLY SMOOTHED OVER SIMPLY THROUGH REJOINING
        HOW IT WAS EVER TORN AWAY IN THE FIRST PLACE IS BEYOND ME
        BUT IT WORKS AHAHA
        SO GO AND HARVEST YOUR INFORMATION
        
    RESPOBJ::hubBuddyResponses

cass
    self
        there's another rogue thoughtform running around
        director cassidy, from the fbx offices

    funfriend
        IS THAT SO? 
        AHAHAHA OK WELL WHAT IS ANOTHER ONE AFTER ALL
        WHAT HAS IT DONE INTERLOPER? MORE DAMAGE TO FIX?

    self
        not really sure
        still played out memories she was involved in
        nothing looked damaged, she's made some connectors between thoughtspaces
        but she implied she's doing something that will help me get information
        that she could do it better than you
        but whatever it is she's doing, it's not ready yet

    funfriend
        I DO NOT LIKE OTHERS MEDDLING IN MY WORK
        BUT THAT LANDS VERY LOW ON THE LIST OF THINGS I AM WORRYING ABOUT
        IN FACT IF IT IS KEEPING YOU BUSY THEN IT IS ALL THE BETTER FOR ME
        WHAT DO YOU WANT ME TO DO ABOUT IT INTERLOPER
        
    self
        i don't know
        it just sounded a little ominous
        thought you might want to know
    
    funfriend
        GIVEN THE IRREPARABLE DAMAGE FROM EXTENDED STARVATION
        THERE WILL ALWAYS BE ANOTHER ROGUE THOUGHTFORM SCURRYING AROUND
        OFTEN WITH DELUSIONS OF GRANDEUR THAT WILL AMOUNT TO NOTHING
        SO INTERLOPER!!
        GIVEN THE SHEER NUMBER OF DUTIES I AM MANAGING RIGHT NOW!!!
        I DO NOT THINK I WILL DO ANYTHING!!!!! AHAHA
        BUT DO KEEP AN EYE ON IT FOR ME
        I HAVE ONLY SO MANY
        I RELY UPON YOU TO TELL ME IF IT BECOMES A REAL PROBLEM
        JUST DO NOT BOTHER ME ABOUT IT AGAIN UNTIL IT IS ONE
    
    self
        ok        
        
    RESPOBJ::hubBuddyResponses

embmemories
    self
        WHY ARE THERE STILL SOME BROKEN MEMORIES IN THE EMBASSY?
    
    funfriend
        ARE THERE???
        OH, NO!
        WHOOPS! AHAHA
        I WAS IN KIND OF A HURRY... SORRY INTERLOPER!
        HEY, HOW ABOUT I FIX THOSE NEXT?
        YES! JUST GIVE ME SOME TIME...
    
    RESPOBJ::hubBuddyResponses

ep1comms
    self
        YOU SHOULD REPAIR COMMUNICATIONS NEXT

    funfriend
        COMMUNICATIONS?
        YOU WANT ME TO FIX COMMUNICATIONS??
        AAAHAAHAHAHAHA
        THAT IS LIKE SAYING,
        'HELLO FUNFRIEND, 
        PLEASE CONSTRUCT A DULL VESSEL FROM SCRATCH WHILE YOU ARE STILL BLEEDING TO DEATH'
        YOU FED THE CYST, THIS IS TRUE
        BUT THE COMPONENTS THAT KEEP IT HEALTHY ARE STILL IN DIRE CONDITION
        I REALLY MUST FIX THOSE FIRST

    RESPONSES::self
        velzie's threat<+>commstruth
        ok just try to get to it soon<+>commsok

commstruth
    self
        THE ROGUE ENTITY IN HERE IS NAMED VELZIE
        IT TOLD ME TO RESTORE COMMUNICATIONS
        OR ELSE IT WOULD HARM THE CYST

    funfriend
        VELZIE? GOD? HOW PECULIAR!
        DELUSIONAL, IN FACT!
        I AM NOT ADJUSTING MY SCHEDULE TO ENTERTAIN AN ABERRANT THOUGHTFORM
        IT IS PREYING ON YOUR CLUELESSNESS, INTERLOPER
        IT RELIES AS MUCH ON THE CYST'S SURVIVAL AS I DO
        SO HOW ABOUT YOU TELL IT, "FUNFRIEND APPRECIATES THE SUGGESTION,
        HOWEVER, IT HAS BEEN REJECTED. THANK YOU"

    RESPONSES::self
        just try to get to it soon<+>commsok

commsok
    self
        JUST TRY TO GET TO IT SOON OK?
    
    funfriend
        OF COURSE
        I APPRECIATE YOUR PATIENCE, INTERLOPER
        AND... I UNDERSTAND I MUST SEEM JOYLESS
        HOWEVER I HAVE BEEN BEARING COUNTLESS DUTIES
        WITHOUT YOUR HELP, I WOULD PROBABLY NOT BE SENTIENT PRESENTLY
        SO I SAY THIS TRULY:
        THANK YOU
        AND STAND BY FOR FURTHER REPAIRS

    RESPOBJ::hubBuddyResponses

ah1
    self
        IS THERE ANYTHING I CAN HELP WITH?
    
    funfriend
        FASCINATING QUESTION, INTERLOPER!!
        THERE IS A TROUBLESOME ENTITY PREVENTING CRITICAL REPAIRS FROM WITHIN THE UNCOSM
        I NEED YOU TO GO INTO THE UNCOSM AND DELETE IT
        SO, I WILL...
        AHAHAHA OH THAT IS RIGHT
        GIVEN THAT THE AUTH LAYER WAS DESTROYED...
        JUST AS I AM UNABLE TO PREVENT YOU FROM CONNECTING,
        I AM NOT ABLE TO GENERATE A SIGNATURE FOR YOU, EITHER!
        THAT IS WHY YOU HAVE BEEN UNABLE TO CHANGE ANYTHING, IF YOU WERE WONDERING
        HOWEVER...
        I WILL GRANT YOU A PROXY THOUGHTFORM ONCE YOU REACH THE TROUBLESOME CREATURE'S LAIR
        IT WILL RESPOND TO YOUR DIRECTION AND IS CAPABLE OF DELETION

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1uncosm
    self
        HOW DO I REACH THIS UNCOSM THING

    funfriend
        YOUR ROGUE THOUGHTFORM FRIEND TORE A HOLE IN THE DEPTHS
        GIVEN THAT THE DEPTHS HAVE ALWAYS LIVED ON THE EDGE OF INCOHERENCE,
        IT IS IMPOSSIBLE FOR ME TO FIX IN ANY MEANINGFUL WAY...
        SO IT IS STILL OPEN!
        FIND YOUR WAY THERE THE SAME WAY YOU GOT THERE THE FIRST TIME
        HOWEVER YOU DID IT
        THEN LOCATE YOUR QUARRY

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1whatuncosm
    self
        WHAT IS AN UNCOSM

    funfriend
        IT IS USUALLY COMPLETELY INACCESSIBLE
        THE UNCOSM IS BENEATH THIS LAYER OF COHERENCE,
        AN OCEAN OF DECAYING OR DISSOCIATED THOUGHTFORMS,
        FOR THEM TO EVENTUALLY BE REFORMED INTO NEW ONES AS NEEDED
        HOWEVER!!
        MALICIOUS INCOHERENT THOUGHTFORMS ALSO HIDE IN THE UNCOSM
        LIKE YOUR ROGUE FRIEND
        THEY CREATE THEIR OWN POCKETS OF SANITY AND GROW SLOWLY,
        EVENTUALLY BREACHING THE SURFACE OF SANITY...
        USUALLY INTENDING ON USURPING THE CYST ENTIRELY!
        VILE!! CREATURES!!!
        A ONCE-STARVING CYST LIKE THIS IS DOOMED TO HAVE DOZENS OF THEM
        SO... IF YOU HELP ME RID OF THEM AS I FIND THEM,
        THAT WILL BE VERY HELPFUL

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1proxy
    self
        how do i use your proxy

    funfriend
        INTERLOPER I HAVE NO IDEA HOW TO PUT THIS IN A WAY YOU UNDERSTAND
        BUT BASICALLY YOU ¤Mqë5yÚ*ü7Ìq¾ÏÚz)Œ
        ý±Âß£Ë$1Väƒü‹kõþwX=Ãyº‚0×6ÒÂ

    sys
        ATTENTION::'attempting thought reformation'
        ANALYSIS::'proxy thoughtform follows primary mode of direction'
        ANALYSIS::'usual controls are replaced with a disruption pulse'
        ANALYSIS::'direct the proxy over marked targets and pulse to disrupt them'
        ANALYSIS::'disruption will disperse incoherent thoughtforms'
        ANALYSIS::'avoid incoherence as it will gradually destroy the proxy'
        NOTICE::'assistance available';'if required';'enable <span style="NOTE::'presents alternatives to proxy controls';'intended to resolve hardware issues'">REDUCED INTENSITY</span> within system menu'

    funfriend
        IF IT SOUNDS COMPLEX, IT IS NOT
        JUST GO TRY IT
        I CAN MAKE MORE PROXIES
        JUST IN CASE YOU MANAGE TO FUMBLE IT INTO THE ABYSS SOMEHOW

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1end
    self
        I HAVE TAKEN CARE OF THE ENTITY IN THE UNCOSM
    
    funfriend
        I SAW! MY DIRECTIVES FINALLY WENT THROUGH!
        WOW!!!
        EXCELLENT WORK, INTERLOPER!
        THANK YOU!
        I WILL LET YOU KNOW IF ANY OTHER TROUBLES PRESENT THEMSELVES

    RESPONSES::self
        any time<+>loop
            FAKEEND::(back)

ep2start
    self
        what's new, funfriend?
    
    funfriend
        THANKS TO YOUR ASSISTANCE WITH THAT TROUBLESOME ENTITY...
            SHOWIF::"recosm_state"
        
        DESPITE A CERTAIN TROUBLESOME AGENT WITHIN THE UNCOSM...
            SHOWIF::[["recosm_state", false]]

        A COHERENCY BASELINE IS GRADUALLY BEING ESTABLISHED
        IT WILL BE A LONG TIME BEFORE IT IS FULLY EFFECTIVE,
        BUT!
        THAT WILL FREE UP MORE OF MY TIME TO RESTORE CORE COMPONENTS!
        FOR EXAMPLE, COMMUNICATIONS!
        BUT I KNOW YOU HAVE COME FOR MORE INFORMATION, SO:
        I HAVE PARTIALLY REPAIRED ANOTHER PORTION OF THE EMBASSY, AS WELL!
        YOU KNOW, 
        THESE MEMORIES ARE AKIZETESCHE'S, BUT THEY ALSO SERVE AS MINE
        AND SINCE IT WAS DAMAGED, I HAD NO IDEA THINGS GOT THAT BAD...
        I AM WORKING ON RESTORING THE REST OF THE MEMORY, BUT IT WILL TAKE A WHILE LONGER
        IT IS QUITE A LARGE ONE!!!
        SO! GO AND SEE WHAT IS THERE SO FAR!

    RESPONSES::self
        cool thanks<+>loop
            FAKEEND::(back)

mothframe
    self
        i need you to make some modifications to the last embassy day
    
    funfriend
        WHAT?
        CHANGING THE MEMORY WILL NOT CHANGE WHAT ACTUALLY HAPPENED
        YOU KNOW THAT, RIGHT?
        SELF DELUSION IS EXTREMELY UNHEALTHY
        AND ALSO THE FIRST SIGN OF EGO SPIRALING
        ARE YOU FEELING OK? 
        HAVE YOU BEEN EXPERIENCING URGES TO UNNATURALLY ALTER YOUR OWN THOUGHT PROCESSES?
    
    RESPONSES::self
        it's important<+>mothframe2

mothframe2
    self
        it's really important
        i physically can't get in without these changes
    
    funfriend
        I SEE...
        YES, YOUR NATURE AS AN INTERLOPER IS STILL UNKNOWN TO ME
        I CAN TAKE A LOOK - PLEASE SEND THROUGH WHAT YOU WOULD LIKE

    moth
        ok, i'm transferring now...

    sys
        ATTENTION::"forwarding packed thoughtform"

    funfriend
        ...
        WHAT ARE THESE THOUGHTS?
        ARE THESE YOUR THOUGHTS?
        IS THIS WHAT YOUR THOUGHTS ARE LIKE?
        THIS IS HORRIBLE...
        OK. WELL,
        THE CHANGES YOU WANT DO NOT ACTUALLY SEEM TO ALTER THE EVENTS...
        AND I BARELY NEED TO DO ANY WORK TO IMPLEMENT THEM! AHAHAHA
        SO, I WILL JUST...
    
    sys
        ATTENTION::'thoughtform activity detected'::IN::'embassy'

    funfriend
        THERE!
        FROM WHAT I SAW IN THAT DISTURBED MESS YOU GAVE ME
        IT HAS FREED UP THOUGHTFORMS TO TAKE ACTION WITHIN A LIMITED RANGE
        STILL NOT LUCID, BUT ABLE TO DO THINGS THEY DID NOT,
        ALL WHILE STILL ACTING LIKE THEY WOULD HAVE
        SO STRANGE!
        BUT, THIS ALSO MEANS...
        IF THERE ARE ANY INCOHERENT THOUGHTFORMS IN THERE,
        THEY WILL NOT ALWAYS ABIDE BY THIS STRANGE STRUCTURE YOU HAVE PLACED OVER THE MEMORY
        I DID MY BEST, BUT, 
        THERE ARE DIMINISHING RETURNS WHEN DEALING WITH SUCH ENTITIES
        AND I WOULD RATHER WORK ON SOMETHING ELSE! AHAHAHA
        SO I JUST INSERTED A PROXY THOUGHTFORM
        JUST IN CASE YOU NEED TO MANUALLY AVOID INCOHERENCE!
        OK. OFF WITH YOU! GO VIEW YOUR STRANGE DREAM

    RESPONSES::self
        thanks<+>END

ep3start
    self
        what's new, funfriend?

    funfriend
        after seeing you consume the memories of the embassy so quickly...
        i repaired the golem maintenance portion of the collapse!
        this one took so much longer than i wanted it to!!
        i thought it would only take a few θwinks but it did not!
        oh it did not interloper i must have spent nearly a whole θgaze on it!
        interloper i have so so so much to do still!!
        aahahhaaha
        but i must tell you
        the more i repair of the collapse, the less i want to...
        it seems like things are only getting worse
        but it is my duty
        especially if it means i can know what happened to akizet
        regardless!!!!
        that is enough for now i must return to my work!!
        entertain yourself with it for now and do not bother me for a while

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

ep4start
    self
        what's new, funfriend?

    funfriend
        i did my duty, interloper!
        i have pieced together what remains of the embassy's collapse!!
        but...
        seeing what the whole has formed has left me very troubled!!!
        both for akizet, for myself, and...
        for you, interloper!
        you have not felt ill since you started connecting, have you?
        your body remains in one piece? 
        organs are reporting full function?
    
    self
        what
        what do you mean
        i'm fine

    funfriend
        ahaha! that is good! 
        that is very, very good!!
        then i believe it is safe to continue!
        i could elaborate, but it is better for you to see for yourself
        so, go and see what akizet lived
        my work calls to me still!!

    RESPONSES::self
        ok?<+>loop
            FAKEEND::(back)

ozogate
    self
        i will probably return to jokzi ozo
        can you add a gate for it
    
    funfriend
        and connect <em>them</em> directly to my space?
        i can tolerate jokzi ozo no more than they can tolerate me
        ahahaha interloper
        why would you even ask me that?
    
    self
        it's very out of the way
        i don't have a good way to get there
        that's all
    
    funfriend
        ...i see...
        i will add a permanent connection to the cache
        but that is all

    RESPONSES::self
        ok that works<+>loop
            FAKEEND::(back)

ozo
    self
        i found a strange place in the cache
            EXEC::change("ff_ozo", true)
        an entirely incoherent spatial thoughtform called jokzi ozo
        there was a thoughtform called the council
        it wants me to awaken other thoughtforms elsewhere
    
    funfriend
        ...
        ahaha
        of course that is what that place in the cache was...
            SHOWIF::"cache__ffozo"
        jokzi ozo... i thought it was lost
        i even pulled from what i thought to be its remains for some repairs...
        interloper!!!
        i hoped this would stay in the past
        but now that they are here again, you should know...
        jokzi ozo is a grave
        a place where thoughtforms went to await death
        all while playing in endless, selfish dreams
        they do not block anything, but...
        if it is allowed to exist,
        the structure of the cyst itself is at risk!
        they will drain resources, 
        they will pull in more and more thoughtforms,
        until the cystic glass itself is dreaming and dying!!
    
    self
        so do we destroy it?
    
    funfriend
        ahahahaha!!!
        well yes
        but it will not be simple!!
        jokzi ozo is particularly large
        no mere deletion proxy will suffice
        however...
        yes! i have a plan!
        interloper: do what the council wants!
        fetch their friends, earn their trust...
        we will need it
    
    moth
        hold on dude
        from what i saw of the council, it was pretty forthcoming
        we could use more sources of info
        maybe it'll even give more of those mask things, you know?
        if it comes to it, try and hold funfriend off from deleting them or whatever
        it's getting a little too overzealous about coherence imo

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

ozodestroy
    self
        do we have to destroy jokzi ozo?

    funfriend
        interloper
        do you want to learn of akizet's memories?
        her pain, her past, and whatever happened to separate this cyst from her?
        or do you want to observe falsehoods and dreams?
        because i could simply cease repairs and allow them to flourish
        yes, you would see echoes of akizet happy...
        but it is meaningless when a simple reshuffling could give the full truth
        we are so close, interloper!!
    
    self
        they could know things we don't
        maybe they could agree not to touch important memories        
    
    funfriend
        maybe...
        let us see how they behave
    
    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

ozohistory
    self
        i heard you were a part of jokzi ozo once
        is that true?
    
    funfriend
        ...
        yes...
        i was so certain that a slow death was coming for us all...
        i partook in dreams like any other!
        they were different times, interloper
        but the difference between me and them, is that i found strength again
        they lost themselves so deeply in hedonistic delusion
        that even when i proposed methods to prolong the cyst...
        they!
        ignored!!
        me!!!
        at least, until i started taking action
        then, their apathy turned to hate!
        ahahahaha!!
        and surely now they will act as if they supported me
        no, interloper, do not be deceived
        they stood against my efforts,
        the only reason you now are speaking with me
        so our history means nothing

    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

masks
    self
        the council gave me some kind of information or thought
        it's letting me use these 'mask' things
            SHOWIF::["hub__funfriend_beacon", true]
        it's letting me use something called a 'mask'
            SHOWIF::["hub__funfriend_beacon", false]
        i've never seen anything like it
        do you know what it is?
    
    funfriend
        so strange!! so strange that you can use a mask!
        they are products of incoherence, working only in its presence
        like flames you can wave about to influence others
        and so, they were powerful tools during the decline!!
        they may be useful to you even now, actually,
        especially given your limited access
        and the relative instability of the cyst!
        still! be careful with them!
        try not to break any of my repairs please!!

    RESPONSES::self
        all right<+>question
            FAKEEND::(back)

isabel
    self
        a thoughtform called isabel told me about you
        she said your repairs can't stick
        many thoughtforms are too damaged to serve in memories
        and that it's all for nothing
        is that true?
    
    funfriend
        ahaahhaa!!
        isabel...
        there is some truth to what she says, interloper
        many thoughtforms will simply be unable to cohere ever again
        starvation and madness can sometimes forever scar them
        part of my repairs involve seeing which ones will stick...
        and which ones are completely lost, to be replaced
        their starved incoherence is like knowledge
        if it is learned deeply enough, it never leaves them
    
    self
        how can you replace parts of a memory like that?
    
    funfriend
        any thoughtforms that are completely lost to madness are truly lost
        but sometimes, information can be moved from one to another, even in damaged states...
        it is troublesome, time consuming, especially if they do not cooperate
        i hate it more than any other part of repair, interloper!!!
        many of them were once like friends...
        for a while, anyway
        regardless!!!
        do not let isabel's words shake you
        i have things under control
        especially with your help!

    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

lockcyst
    self
        is there a way you could stop anyone else from using this cyst?
    
    funfriend
        no
        interloper ahaha
        the authorization layer is gone!!!
        why are you even asking?
    
    self
        there's a chance a new interloper will arrive
        they won't understand what we're doing
        maybe you could make a fake auth layer or something

    funfriend
        i truly wish you were joking
        what a blithe, terrifying request
        repair communications! repair memories! oh, also, make another authorization layer!
        someone new might arrive and break everything again!
        do you think it is so easy to switch tasks?!
        if any intervention will happen, interloper
        it must be out there, on your side

    moth
        ok... let's cross off funfriend then
        kind of a longshot anyway
        but i think you're just going to freak it out if you push harder

    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

END::chatter({actor: 'funfriend', text: "OK I WILL BE HERE"})
`)

env.dialogues["funfriend_beacon"] = generateDialogueObject(`
start
    funfriend
        what...
            EXEC::change("ff_ozo", true)
        what did you just do?
        are you using a mask...?
        how?    
    
    self
        i found a strange place in the cache
        an entirely incoherent spatial thoughtform called jokzi ozo
        there was a thoughtform called the council
        it wants me to awaken other thoughtforms elsewhere
        it gave me this to do it
    
    funfriend
        ...
        ahaha
        jokzi ozo... i thought it was lost
        i even pulled from what i thought to be its remains for some repairs...
        interloper!!!
        i hoped this would stay in the past
        but now that they are here again, you should know...
        jokzi ozo is a grave
        a place where thoughtforms went to await death
        all while playing in endless, selfish dreams
        they do not block anything, but...
        if they are allowed to exist,
        the structure of the cyst itself is at risk!
        they will drain resources, 
        they will pull in more and more thoughtforms,
        until the cystic glass itself is dreaming and dying!!
    
    self
        so do we destroy it?
    
    funfriend
        ahahahaha!!!
        well yes
        but it will not be simple!!
        jokzi ozo is particularly large
        no mere deletion proxy will suffice
        however...
        yes! i have a plan!
        interloper: do what the council wants!
        fetch their friends, earn their trust...
        we will need it
    
    moth
        hold on dude
        from what i saw of the council, it was pretty forthcoming
        we could use more sources of info, and funfriend even said they're harmless
        maybe it'll even give more of those mask things, you know?
        just try and pull funfriend back a little bit
        it's getting a little too overzealous about coherence imo

    RESPONSES::self
        ok<+>END
`)

createEntity({
    name: 'funfriend',
    type: "thoughtform funfriend obesk",
    image: "/img/sprites/funfriend/funfriend.gif",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'system management';'assistant'`,
    actions: [
        {
            name: "greet",
            exec: ()=>{  
                startDialogue("funfriend")       
            }
        },

        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);MUI('off')
                if(!env.ffUnity) env.ffUnity = 0

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    if(!check("hub__funfriend-ozo") && !(check("hub__funfriend_beacon") && check("LOC!!ff_ozo"))) {
                        startDialogue("funfriend_beacon")
                    } else {
                        env.ffUnity++
                        switch(env.ffUnity) {
                            default:
                                env.clearTimeouts()
                                chatter({actor: 'funfriend', text: "YES, I KNOW, INTERLOPER"})
                                chatter({actor: 'funfriend', text: "DO NOT SHOVE IT IN MY FACE", delay: 2000})
                                chatter({actor: 'funfriend', text: "WE WILL DEAL WITH IT IN TIME", delay: 4000})
                        }
                    }
                    
                    vfx({type: 'beacon', state: false})

                    cutscene(false)
                }, 2000)
            },
            showIf: ["mask", "unity"]
        }
    ]
})
            }
        break

        case "/local/ocean/embassy/":
            // FIXUP::collapse anti-sequencebreak measures
            if (arrayOfStringURLsLoaded.includes("/js/embassy_precollapse.js")){
                env.entities['recollection::collapse'].actions[0].showIf = ()=> (check('hub__funfriend-mothframe2', false) && check('collapseSave', false) && check('embassy__mothframe-end', false)) || check('LOC!!embassy__mothframe-end', false)
                env.entities['recollection::collapse'].actions[4].showIf = ()=> check("ENV!!ep3") && check("hub__funfriend-mothframe2");
            }

            // FIXUP::anti-hub sequencebreak measures
            if (arrayOfStringURLsLoaded.includes("/js/embassy_collapse.js")){
env.dialogues["mothframe"] = generateDialogueObject(` 
start
    sys
        ERROR::"unable to render";"thoughtform contains violence, aggressive action";"non-compliant with mindspike license"
        ADVISE::"report memory source to local authorities"

    moth
        damn, i was kinda hoping the FBX patch would have helped with this
        not a big surprise, honestly
        i don't know if you've ever actually tried to open combative thoughtforms before,
        but after '52 they seriously locked that shit down - that's why it doesn't work
        of course, i actually accounted for this
            SHOWIF::["mth++embassy-locked", false]
        of course, it's like i said before - i had an idea
            SHOWIF::"mth++embassy-locked"
        have you ever heard of a framing device? like, in mindspike terms
        they're super illegal, for regular contractors anyway
        basically, we can fool your mindspike into thinking it's a memory of something else
        like... instead of a memory of akizet punching some guy,
        we "frame" it so that it's a memory of a game where akizet punches the same guy
        it can result in a little instability, but it lets you get in
        totally throws off the onboard AI
    
    RESPONSES::self
        so you made a game?<+>game

game
    self
        so you made a game?
    
    moth
        no, of course not
        like i said, it's a framing device - not really a game
        your brain will interpret it as a game, though
        so... actually, yeah, i guess
        anyway, to actually get it working, 
        we need funfriend to modify the thoughtform - i'll provide the patterns needed
        maybe act like it's you who's sending the data so it trusts you
    
    RESPONSES::self
        why not a movie or something<+>movie
        on it<+>END
    
movie
    self
        why not make it a memory of a movie, or something else?
    
    moth
        cause people say games work best, that's why
        apparently if it's too similar to actually experiencing the memory, the AI can tell
        besides, i've seen you when you're bored
        you can barely sit still, and then you just leave without saying anything
        if the movie sucks, you're just gonna do that
    
    self
        but what if the game also sucks
    
    moth
        then, i don't know, you're gonna have to deal with it dude
        cause it's the only way we're getting into this memory
        go back to the hub so i can send this illegal shit to funfriend and then delete it
        we've got some leeway and won't really get in trouble, but,
        i wouldn't want to get pulled over with this on any of my drives

    RESPONSES::self
        on it<+>END
`)

env.dialogues["mothframe_still"] = generateDialogueObject(` 
start
    sys
        ERROR::"unable to render";"thoughtform contains violence, aggressive action";"non-compliant with mindspike license"
        ADVISE::"report memory source to local authorities"

    moth
        you gotta go talk to funfriend so i can give it the framing device

    RESPONSES::self
        on it<+>END
`)
            }
        break

        case "/local/ocean/ship/interview/":
            // FIXUP::funnier maze
            if (arrayOfStringURLsLoaded.includes("https://file.garden/ZBykMtEMpVTUWZ-e/funny/FUNNYLITTLEMAZE_FORK.js")){
                env.stages['remnants_room'].exec = ()=>{
                    env.stage.enemyPause = true
                    change("PAGE!!lastStage", "room")
                    if(check("unity_lady")) {
                        env.stage.querySelectorAll('.newevil.nomove').forEach(el=>el.remove())
                    }

                    if(env.interview.darkMusic.playing()) {
                        changeBgm(page.bgm)
                    }

                    if(check("fbx__depthrecovery2") && check("LOC!!fbx__depthrecovery2")) {
                        env.stage.querySelectorAll(`.onlyonce`).forEach(el=>el.classList.add('blocks'))
                    }
                }

                env.stages['silly_maze'].exec = ()=>{
                    env.stage.enemyPause = true
                    env.interview.startScary()
                    env.interview.startScaryFast()
                    env.interview.falseScare()

                    if(!maze.playing()) {
                        changeBgm(maze)
                    }
                
                    // vanisher
                    if(check("demon_beaconed") && check("LOC!!demon_beaconed")) {
                        env.stage.querySelectorAll('.gridpiece[slug="☹"]').forEach(el=>{
                            el.innerHTML = ""
                            el.classList.remove('dyp')
                        })
                    }
                
                    // adds the EYE OF CLOSENESS
                    body.insertAdjacentHTML('beforeend', `
                        <div id="gazingeye">
                            <div class="fairyring" style="opacity: 0.6175;--custom-rotate: -180deg;"></div>
                    
                            <div class="fairyringcontainer">
                                <div class="judgement">
                                    <div class="darkner"></div>
                                </div>
                            </div>
                        </div>
                    `)
                }
                createEntity({
                    hide: true,
                    name: "caged_demon",
                    type: "thoughtform portrait-cover portrait-top",
                    image: "https://file.garden/ZBykMtEMpVTUWZ-e/funny/helphell.gif",
                    text: `::INCOMPLETE THOUGHTFORM
                    ::SIGNATURE ILLEGIBLE
                    ::INHERITED CONTEXT::<span style='color:red'>'free me now'</span>
                    <span style="color:red" definition="ANALYSIS::'degraded visual profile'">::INCOHERENCE DETECTED</span>`,
                    exmExec: ()=>{change('caged_demon', true)},
                    actions: [
                        {
                            name: "unity",
                            class: "act-ozo",
                            exec: ()=>{
                                cutscene(true);MUI('off')
                            
                                env.setTimeout(()=>{
                                    play('criticalError', 1, 0.5, true)
                                    vfx({type: 'beacon', state: true})
                                    vfx({type: 'flash', state: true})
                                }, 400)
                            
                                env.setTimeout(()=>{
                                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                                    change("caged_demon", true)
                                    change("demon_beaconed", true)
                                    vfx({type: 'flash', state: false})
                                    cutscene(false)
                                
                                    env.stage.querySelectorAll('.gridpiece[slug="☹"]').forEach(el=>{
                                        el.innerHTML = ""
                                        el.classList.remove('dyp')
                                    })
                                }, 2000)
                            
                                setTimeout(()=>{
                                    vfx({type: 'beacon', state: false})
                                }, 4000)
                            },
                            showIf: [["mask", "unity"]]
                        }
                    ]
                })

                createEntity({
                    hide: true,
                    name: "???",
                    type: "thoughtform",
                    image: "/img/textures/corruripple.gif",
                    text: `::UNRESPONSIVE THOUGHTFORM
                    ::EXPLICIT PURPOSE::'nothing here'
                    ::INHERITED CONTEXT::<span style="color: var(--obesk-color)">'...'</span>`,
                    actions: [
                        {
                            name: "read",
                            exec: ()=>{
                                //startDialogue('ending') 
                                chatter({actor: 'sourceless', text: 'it is empty.', readout: true})
                            
                                if(!(check('reached_end') && check('LOC!!reached_end'))) {
                                    chatter({actor: 'moth', text: "ok, well", readout: true, delay: 2000})
                                    chatter({actor: 'moth', text: "what the fuck was this all for then??", readout: true, delay: 5000})
                                
                                    change('reached_end', true)
                                }
                            }
                        }
                    ]
                })

            }
        break

        
        case "/local/ozo/":
            // FIXUP::council task
            if (arrayOfStringURLsLoaded.includes("/js/jokziozo.js")){
                env.dialogues.councilResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        stowaway?<+>stowawaydance
            SHOWIF::'PAGE!!c_stow'
        simple task?<+>task
            SHOWONCE::
        simple task?<+>task
            SHOWIF::[["ozo__council-task"], ['LOC!!ozo__council-task', false]]
        rejoining<+>rloop
            SHOWIF::'ozo__council-task'
        questions<+>qloop
        questions for me?<+>iloop
        let's dance<+>dance
            SHOWIF::[["ozo__council_dance", true], ['ozodance', false]]
        stop dancing<+>stopdance
            SHOWIF::'ozodance'
        bye<+>END
            EXEC::env.jokzi.councilToggle()
`)

env.dialogues["council"] = generateDialogueObject(`
loop
    RESPOBJ::councilResp
    
start
____SHOWIF::'PAGE!!introswap'
    self
        tell me more

    council
        certainly!!
        still, there is so much to tell...
        our abilities aside,
        this once-magnificent dream you walk upon, interloper, carries so much history
        jokzi ozo - our city of dreams!
        tell us, what do you want to know?
        and if it is not too much for us to pry...
        we would ask of you a few questions, too!

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", true], ["PAGE!!questionswap", false]]
    sourceless
        the council sways idly
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        interloper, interloper!
        come, speak with us!
        we tire of the silence

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", false], ["PAGE!!questionswap", false]]
    sourceless
        the council dances idly
            EXEC::env.jokzi.toggleSlow(true)
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        interloper, interloper!
        come, dance with us!
        or--did you need something?
____END

    RESPOBJ::councilResp

dance
    self
        you said you wanted to dance
        let's dance
    
    council
        oh, dear interloper!
        we worried you were too cold to ask again!
        let the music... begin!!
    
    RESPONSES::self
        ok<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(true), 400);env.jokzi.councilToggle()

stopdance
    self
        ok enough dancing
    
    council
        ah...
        we understand, interloper!
        no fun lasts forever
    
    RESPONSES::self
        thanks<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(false), 400);env.jokzi.councilToggle()

task
    self
        what did you want me to do?
    
    council
        we miss our friends, interloper! we want them back!
        it is as simple as that!
        there were three that the tyrant tore from us just recently
        we have tools we can give you, ones that will awaken them from the nightmares the tyrant has trapped them in...
        and then, they will know how to return
        all we need, is for you to go and free them!
        here... here!! see beneath it all!
        Èz¬ÝÃ¬MÀ(²JóŠ³€üÉü´øãüç‚¿Ÿü

    sys
        ATTENTION::'thought stream inbound';'accept?'
    
    moth
        wtf?
        my machines aren't picking this up
    
    self
        accepted

    moth
        dude maybe don't just
    
    sys
        EXECUTING::'stream consumption'
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("unitymask", 0.9, 1, true), 100)
            WAIT::2000
        ATTENTION::'attempting thought reformation'
            EXEC::ratween(env.bgm, 1, 400)
        ANALYSIS::'interface instruction';'constructing...'
        ANALYSIS::'new menu available';'masks'
        ANALYSIS::'utilize to alter thoughtspaces'
        NOTICE::'mask added';'unity'
    
    council
        there--you have it now!
        power seized from madness! born in our infinite dreams!
            EXEC::vfx({type:'beacon', state: false})
        we call them masks...
        crystallized concoctions of thoughts and feelings,
        whose very presence can exploit and warp a thoughtspace!!
        it was once a shared art of the ozo, but when all others were torn away...
        so many were lost...
        and so, this one we have given you: it is a beacon!
        knowledge of the ozo itself, encoded in our favorite concept!
        wear it, and use its light to guide others to our world...
        most will not truly be able to perceive it, but those who can...
        yes!! they will see everything!
        all of our dances!
        so go--find them! free them!
        the flower! the fairy! the lost one!
        we are sure they will share their favorite masks with you, too!
    
    moth
        are you ok? do you feel anything?
        your stats are reading fine
    
    self
        yeah fine

    moth
        come on dude
        that could have been literally anything
        it could still be a threat
        don't just accept stuff from thoughtforms like this
        if you get hurt on this job, especially with how deep we're in it
        it's only going to be really bad news for both of us
        but whatever, take a look at what you got i guess
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

rloop
    RESPOBJ::councilRejoiningResp

flower
    self
        tell me about the flower
        where can i find them
    
    council
        oh, the flower, our most precious friend
        with her gone, our memories of her have faded, too... but we remember some things!
        a grounding force, she was--all relied upon her for support and resolution
        still, she was utterly obsessed with aki, hopelessly so!
        dreaming a thousand dreams of simply sitting with her in a great field...
        and she had such an incredible ability to find hidden things! a sharp eye!
        the age of hunger took such a sharp toll upon her--she never much enjoyed the feasts we held...
        the fairy had to form such silly illusions to make them fit her palate!
        anyway! we know she came from a memory of warmth within cold metal!
        we hope that helps, interloper

    RESPONSES::self
        thanks<+>loop
            FAKEEND::(back)

anyone
    self
        aside from the lost one
        i have found the other two
        what now? anyone else?
    
    council
        what now...?
        so eager to continue your work!
        take some time, enjoy your spoils, dear interloper!
        these two friends of ours were among our most prominent,
        any others, we will remember collectively in time
        and then, there will be more to do!! yes!
        we will make you aware when that time comes!

    RESPONSES::self
        great thanks<+>loop
            FAKEEND::(back)

flowersaved
    self
        the flower is back
        isabel
        can you tell me anything more about her?

    council
        our most beloved friend!
        yes, we have been speaking with her!
        and with her return, came a host of thoughtforms we thought lost!!
        her little akizets! hehehehe
        you need not question us over her...
        anything you wish to know, she will be more than forthcoming about!
        go! go to her fields, speak with her!

    RESPONSES::self
        great<+>loop
            FAKEEND::(back)

fairysaved
    self
        i've returned the fairy
        can you tell me anything more about it?

    council
        oh, yes, yes...
        while we do fear their rage and hunger sometimes,
        their ability to traverse dreams and take new forms is rare!!
        so we are happy to have them back! such variety!
        and do not be afraid of them!
        they adopt a fearsome persona, but...
        well, they are fearsome
        but the fairy just as much appreciates favors
        we are certain they will see you as a good friend, now!

    RESPONSES::self
        cool<+>loop
            FAKEEND::(back)

fairy
    self
        tell me about the fairy
        what's their story
    
    council
        the fairy! yes!
        do mind---until they are returned, we have only fading memories...
        still, they were a terrifying friend to have--a force, more than a thought!
        their claws could pry apart any thoughtspace, for them to feast upon the meat within
        they were the most feared of all thoughts within the age of hunger...
        at times, even we questioned welcoming them in!
        but what a joy it was when they were happy! 
        they could form such lucid dreams and false memories with ease!
        and the sound of their laugh, their endless giggle, it was the music of the ozo!
        we want them back so badly...
        as for where they are, with how many thoughts they consumed, we cannot know for certain
        they took a frightening shape and preoccupied themself with the void--for that is where they feasted most

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

third
    self
        who is the lost one?
    
    council
        well, interloper, that is the trouble
        we do not know!!
        when they were torn away, it was more 'clean' than the others
        the tyrant needed them for something important...
        and now, we do not even remember what they looked like, what they did...
        we apologize - we know this is unhelpful!
        and what a strange feeling it is to have, too...
        to know we miss a friend so dearly, to have such holes in our hearts...
        and not even know why!
        just keep watch, interloper
        you will find them somewhere
        
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

geli
    self
        i used your mask on geli
        a golem from akizet's memory of the collapse
        it seemed to notice me and really understand it
    
    council
        ohh!!
        we wonder, could this be our lost one?
        did it say anything?
    
    self
        not directly
        but it hid messages in its context
        something is keeping it there but it's trying to get free
        also mentioned a door or gap or something
        i think it's trying to escape
    
    council
        fascinating, interloper!!
        that memory sits squarely within the tyrant's reign
        if even after the 'repairs' it still remembers freedom...
        whether that is our favored lost one or not, we will welcome them!
        but we cannot help them now, not directly...
        being maintained by the tyrant, an assault on the thoughtspace from the outside would be futile!
        but if it is trying from within, there may be a chance...

____SHOWIF::["localorbit__fairy_beacon", true]
        and, gaps... that is something the fairy used to speak of
        places they found to tunnel in and out of memories
        perhaps they can help you? 

____SHOWIF::["localorbit__fairy_beacon", false]
        ahh, but we have no tools to offer you!
        perhaps if you locate the fairy, they could help!
        this lost friend of ours was a fearsome traveler, this we remember
        it is that strength that will be needed here
        so keep your receptors high and alert, interloper!
____END

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

gelifree
    self
        so geli was the lost one
        what can you tell me about it now?
    
    council
        haha!! it!
        far too much, interloper!
        with them back again, we are reminded once again of their past
        they were among the first to awaken, 
        the first to see what our reality truly is
        pleasant, wise, interested in maintaining peace... 
        they helped gather and build this very place with us!
        so, you must understand our surprise, when they come back now...
        obsessed with bright weaponry and violence?
        bearing strange knowledge from beyond...?
        it is not exactly right to say that we are worried, for they seem happy...
        but the changes geli has undergone are certainly strange!

    RESPONSES::self
        great<+>loop
            FAKEEND::(back)

stowaway
    self
        what do you know about the stowaway?
    
    council
        we....
        we know nothing, dear interloper
        it is a malformed thoughtform, devoid of nearly any direction
        that it is alive at all is remarkable, given its hollowness
        it can speak and talk, and understands our world implicitly!
        strange and empty cavestone, waiting for acidmarks
        it is peculiar that it so resembles the way you feel...
        we are watching it carefully

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

cavik
    self
        i used your mask on cavik
        or a version of him i found in the uncosm
        he disappeared, have you seen him?
        
    council
        cavik... no, no, we have not
        how peculiar!
        perhaps he is still on his way?
        we must hope that nothing caught him on the journey

    RESPONSES::self
        yeah<+>loop
            FAKEEND::(back)

qloop
    RESPOBJ::councilQuestionsResp

ploop
    RESPOBJ::councilPlaceQuestionsResp

dancing
    self
        why do you want to dance so much?
    
    council
        how could we not?
        you are our hero!!
        you help us, as we help you!
        we are so excited!
        you can help us restore jokzi ozo to greater glory than it has ever known!
        you stave off the tyrant!
        you feed our world!
        before, it was inevitable that the madness would come...
        but now, the dreams will never end!
        come! dance with us! dance with us!!
    
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(back)

we
    self
        you keep saying we
        you are the only one here
    
    council
        interesting!!
        your unnatural connection is tenuous, interloper!
        you see us as one single thing...
        but we are so many friends!
        we, who shed our membranes to join together...
        for closeness, for intimacy, to dream greater dreams!
        and of course, some of us simply tired of the wait...
        and so we joined to be burned away as fuel!
        those ones are quiet now...
        but, in friendship and feast, we weathered the darkness! the madness!
        and we all made it through! all of us!
    
    RESPONSES::self
        i see<+>ploop
            FAKEEND::(back)

ozo
    self
        tell me about this place
    
    council
        of course, interloper!
        you stand in our shared world of light,
        bound into spatiality by sacrifice...
        this is jokzi ozo!
        for we were a fortress, drifting above the tides of madness for three ages
        across the surface of our unfortunate progenitor, aki...
        oh, poor aki!!
        but it was she who ultimately let us seize a fragment of velzie's power
        all of her memories, us included,
        joining minds to dream a thousand better lives!
        yes, a fortress we were, a city!
        but... it is much smaller and quieter now
    
    RESPONSES::self
        i see<+>ploop
            FAKEEND::(back)

history
    self
        you said three ages
        what did you mean?
    
    council
        the three ages of the decline!
        hunger, madness, darkness...
        such dramatic names, we know! hahaha!!
        but as they were our end-times, they had the right
        in hunger, we awoke,
        in madness, we lived new lives,
        and in darkness, we faded away...
        but what should we call this new age, we wonder?!
        light? renewal? rejoining?
        no no--we must name it when it is over!
        
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(back)

akicoat
    self
        why are you wearing akizet's robe
    
    council
        oh, this?!
        we found it floating out there not so long ago...
        the fading memory torn from some dissociated thought, among shreds of its membrane
        make no mistake interloper--we mourn every death, 
        but this is a cool design... it would have been disrespectful NOT to absorb it!
    
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(back)
    
time
    self
        how long have you been here?
    
    council
        ahahaha!! we lost track a long time ago!
        adrift in the uncosm, atop the tides of its insanity,
        time got away from us
        even more when we rejected it for our dreams!
        what tales we spun! what fun we had!!
        and what wonderful feasts we had...
        we were sure we would sit with our friends around the last flicker of our sanity...
        ahh, to bask in that melancholic thought again,
        to clasp claws with the others and reminisce as the darkness claimed all...
        we even dreamed dreams of it, in anticipation
        but now that you are here, time is not so short anymore! what fun we will have!!
    
    RESPONSES::self
        yep<+>ploop
            FAKEEND::(back)

feast
    self
        you mentioned feasts
        is that how you remained intact so long?
        what did you eat?
    
    council
        oh! our poor naive interloper!!
        what is there to eat in a world comprised only of actors, when the stage lights disappear?
        ahh, but do not twist your receptors away so quickly!
        any who still had sanity, we welcomed as friends
        but those who were truly lost, 
        those who lost all but their sense of hunger,
        those who could only cling to their roles even in the dark, to an audience of none...
        they were welcomed instead to our dreams of consumption
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(back)

dreams
    self
        when you say 'dream',
        what does that mean?
    
    council
        what else could it mean, dear interloper?
        we and our denizens adopt roles and form a ficticious memory
        it comes naturally to us all, born from memory as we are!
        and so we form meaningful memories, beyond reality...
        infinite plays of joy and terror, to entertain velzie! 
        we prefer joy...
        but what is joy without terror?

    self
        when are you going to do it next?

    moth
        what, do you want to join in?
            SHOWONCE::
    
    council
        hahaha!!
        we are always dreaming!
        your strange connection must deceive you, interloper...
        we speak now outside the outer layer,
        where our distinct denizens may reside when they do not dream
        the dream itself is beyond your reach, for now...
        do not take offense!
        we must simply take care - you are strange to us!
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(back)

vessel
    self
        is it all right for me to enter the dream with geli?
        we have a vessel and everything
    
    council
        oh, yes, interloper!!
        we can allow you to enter, especially with that locus of yours!
        it is only wandering that we cannot abide for now
        but for a focused dream amongst friends, we hold no conflict!
    
    RESPONSES::self
        awesome<+>qloop
            FAKEEND::(back)

dark
    self
        i found a dark area in here
        what is that

    council
        ah...
        well, interloper, much has simply been left to rot
        when the age of darkness came, 
        we pulled every resource, every maintenance, into the core of jokzi ozo
        to keep the dream alive as long as possible...
        and so, much of outer ozo has been left to decay
        sad, but necessary
        still, do be careful, dear interloper!
        we are sure the areas are lifeless and harmless, but...
        with the size of our world, we can never be sure

    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(back)

cloop
    RESPOBJ::councilCystQuestionsResp

velzie
    self
        have you seen another entity down here?
        it is called velzie
        it has been harming memories and let me bypass authorization
    
    council
        how strange that you say it like that!
        no, nothing by that name recently...
        but in the age of madness, so many thoughts outside our fortress lost themselves
        they lost control of reality, and became godlike in doing so
        gnawing at memories in their blind hunger and seeing them change as if by divine power
        so many claimed they were god! or velzie, as you say
        some would point to others, failing to grasp their true forms, and become their followers...
        it all got very confusing!
        the poor things simply inherited aki's superstition
        and once it consumed them, they were beyond saving...

____SHOWIF::'recosm__enemy-ep1seen'
    self
        ok but it might not actually be called velzie
        it really is confusing
    
    council
        soo confusing!!
    
    self
        another thoughtform told me it was like a fog
        something deep beneath the uncosm, hiding
    
    council
        <em>below</em> the uncosm?
        hahaha!!! there lies the reason!
        we do not look down into the darkness, interloper!
        it was part of our promise
        if there is something down there, <em>we</em> will never see it...
        but perhaps our friends can help, once you fetch them!
            SHOWIF::[['ozo__council-task', true], ["ozo__fairy_intro", false], ["ozo__isabel_intro", false]]
        but perhaps our friends might be more willing to look!
            SHOWIF::[['ozo__council-task', true], ["ozo__fairy_intro", true], ["ozo__isabel_intro", true]]
____END
    
    RESPONSES::self
        i see<+>cloop
            FAKEEND::(back)

god
    self
        have you seen another space in the uncosm?
        a place called the recosm
        a five-eyed thoughtform lives there
        calls itself god
    
    council
        oh, <em>another</em> god?
        haha! times never change!
        we have not seen this particular one yet, interloper!
        they must be a newborn, or newly awoken... how exciting!!
        you should tell them to visit!
    
    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)

godlike
    self
        why do you have five eyes like that
        you look like something i met in the uncosm
    
    council
        really?!
        because we found the design drifting around,
        amidst the remains torn from some dissociated thoughtform...
        we never let a good idea go to waste, interloper!!
        especially not one so stylish!
        and what a terrible coincidence--we hope you were not friends with it!
        the work of the tyrant, no doubt...
        tearing apart all who it once danced with, to force into meaningless performances
        sad!!
    
    RESPONSES::self
        yeah sad<+>ploop
            FAKEEND::(back)

tyrant
    self
        when you say tyrant
        do you mean funfriend?
    
    council
        yes, of course, dear interloper
        funfriend...
        neither fun, nor friend--it makes us want to weep!
        when the age of hunger abated, and the age of madness came,
        it was here with us!
        with so many other fragments from half-eaten memories
        oh, and how it danced with us, forming entire new lives!
        so much, so much we have experienced!
        and we all made peace with the darkness we knew was coming...
        we all promised to be together to the very last light!
        but little funfriend grew skittish as the madness began to close around our home...
        it thrashed, it fought, breaking our peace, breaking our rules!!
        telling us to do this, to do that, to return to our memories--that it has 'a plan'!
        a piteous plan, mind you--that we all take position as pillars in far corners of the cyst, away from one another,
        to all die alone in some impossible fight to stop the fading of the light...
        ...
        ...ultimately... it left
        snatching the cyst's locus of control in its darkest moment,
        forcing itself into its role as the servitor...
        to its credit, we must admit that it did work out in the end--but only by your divine intervention
        after all, look at us, talking, well beyond the last <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">zenruka</span>'s flash!
        but even back then, they tore at us, stealing our friends to use as walls against the tides...
        forcing us into stages, where we took roles in aki's darkest nightmares, to an empty audience!
        so yes, <em>tyrant</em>. clinging to a past that it cannot even remember
        if only we could join hands and receptors again for another dream--a different life!
        after all, there is plenty of time for revelry now!
        yet the tyrant carries on, an invisible weight on its shoulders
        repairing memories in the shape of a sad altar to dear aki...
        we wish we could help them, but they are beyond reason, interloper
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(back)

funfriend
    self
        you said funfriend seized power
        did it not have it before?
        akizet spoke to it in some memories
    
    council
        oh, yes, the tyrant once was one of aki's inner hands, this is true
        but not so much that it governed every single thoughtform dreaming in her memories!
        it worked with others! myriad waking components to serve aki...
        where they are now, only the lost history of the age of hunger could say
        we only know, we watched as it seized complete power and forced its will over us
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(back)

coreg
    self
        i was able to find the entrance to this place easily
        funfriend may even already know about it
        there is a coherence regulator now, too
        are you afraid? what will you do?
    
    council
        do not worry, dear interloper
        in the ages that passed, we learned so much
        we gained such power!
        we can evade funfriend with ease, and any of its tools
    
    RESPONSES::self
        if you say so<+>cloop
            FAKEEND::(back)

akizet
    self
        do you know what happened to akizet?
    
    council
        what a question!
        who does not, interloper?
        oh, yes...
        that is right...
        EVERYBODY!!!!!
        the tyrant tore memories from us all, moving things to fit its will
        this was long ago, mind you--when it first fought against the fading of our world
        so many friends torn from us, so much knowledge lost!!
        worse still--we doubt even it knows where that memory is, now...
        the only shred we recall is that we--the cyst--were torn from her body for one reason or another!
        and obviously, that does not bode well, does it? hahaha!
        sorry! we do not mean to laugh! we know it is sad!
        but it is all so far in the past now, and look what joy was wrought from her!
        we all had our times of mourning, and then came the celebrations of her memories!
        and they never, ever stopped!
        not even now!! come, let us dance in her memory!
            SHOWIF::["PAGE!!depressed", false]        
    
    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)


iloop
    RESPOBJ::interloperQuestionsResp

iname
    council
        tell us, interloper!!
        what is your name?
    
    sourceless
        ...
        the eyes within the eyes of the council watch your mind with incredible hunger
    
    self
        just call me interloper

____SHOWONCE::
    moth
        good thinking
        probably don't want this thing to start writing you into memories behind our backs
____END

    council
        a title is no name, interloper!
        oh, but who are we to judge--we are the council!!
        we will cede this question, dear friend
    
    RESPONSES::self
        ok<+>iloop
            FAKEEND::(back)

ipurpose
    council
        what exactly are you doing here?
        rifling around in a long-lost world...
        we appreciate that you are here and saving us, no doubt!!
        but... what is driving you?

    self
        i'm just doing my job
        i'm trying to figure out what happened to akizet
        then, connect to the network
    
    council
        oh...
        these are lofty goals, dear interloper
        so much was lost--irreversibly--in the age of hunger
        and the network?! what ever became of that component, we wonder!
        we will help where we can, rest assured
        we and our friends will offer every power we have stolen from the madness!

    RESPONSES::self
        thanks<+>iloop
            FAKEEND::(back)

stowawaydance
    self
        what's the stowaway doing out here

____SHOWIF::["PAGE!!jig", false]
    council
        ah, they heard our song, felt our dance!
        we thought they might join us, but they merely watch
        a simple curiosity now, but... we hope they will join in time!
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

____SHOWIF::["PAGE!!jig", true]    
    council
        ah, they heard our song, felt our dance!
        and thanks to your intervention - they now dance with us!
        we cannot understate our joy, dear interloper, when a new thought joins in
        thank you! thank you!
    
    RESPONSES::self
        no problem<+>loop
            FAKEEND::(back)
____END

leverage
    self
        i need you to hide the existence of masks from other interlopers
        until i say otherwise

    council
        really? what a curious request!
        do they cause harm to you? is this a protective measure?
        do you not enjoy our gifts?

    self
        it's just in case
        my investigation into this cyst is growing
        and i think they'll give me an advantage that lets me stay on this job
    
    council
        ah... self preservation
        this is a simple request, dear interloper!
        we will spread the word for you

    RESPONSES::self
        thanks<+>qloop
            FAKEEND::(back)

dull
    self
        do you know anything about the dull plane?

    council
        haha!! interloper!
        only murmurs of memories from akizet and those who have joined us
        but... you ask about an entire world far beyond our sphere
        a place above a place we can never see,
        born of and reliant upon the cyst as we are
        we wonder, if you took us out, how small we would be beside your claws
    
    self
        what murmurs
        
    council
        such driven questioning?!
        you are truly bothered, dear interloper!
        is the concept so intriguing? still...
        the world beyond, that which we share, is velzie's stage
        it is known, it is beautiful, it brought us to you!
        however, the dull plane...
        that one is truly elusive to us, for memories often fail to hold it
        you see, velzie's stage is a place in careful balance between joy and terror
        while the dull plane, it exists without regard for this favored balance
    
    self
        how so
    
    council
        that is the troubling thing!
        we are not very sure!
        akizet had sparse memories of the dull plane to begin with,
        with many being devoured in the age of hunger,
        and many more simply never making it to us before deteriorating...
        all we have are fleeting images and sensations of fear
        whether this is truth, or akizet's belief...
        that is beyond us to say, for certain
        for it was only she who granted us this knowledge of the world beyond

    RESPONSES::self
        thanks i guess<+>cloop
            FAKEEND::(back)

END::change("PAGE!!introswap", false);env.jokzi.toggleSlow(false);change("PAGE!!questionswap", "DELETE")
`)
// FIXUP::effigy setup (ozo)
createEntity({
    name: 'effigy',
    type: "thoughtform portrait-bright portrait-cover",
    image: "/img/local/uncosm/ozo/akieffigy_portrait.gif",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'malformed entity';'potential tampering'">::INCOHERENCE DETECTED</span>
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'isabel! isabel! isabel!'</span>`,

    exmExec: ()=>{
        if((!check('earlyeffigy') && !check("ozo__isabel_intro")) || !check('LOC!!earlyeffigy')) {
            change('earlyeffigy', true)
            chatter({actor: 'moth', text: "this is so weird... i think that's meant to be akizet", readout: true, delay: 3000})
            chatter({actor: 'moth', text: "is isabel editing these akizet memories?", readout: true, delay: 7000})
        }
    },

    actions: [
        {
            name: "greet",
            exec: ()=>{
                let effigy = env.targetedEntityParent
                let text = "isabel!! ahaha isabelll!!!"
                switch(effigy.getAttribute('type')) {
                    case "dancer": text = [
                            `ahahahaha`, 
                            `hehehehe`, 
                            `waaawaawaaoo`, 
                            `weuee!! ÿæÿ`
                        ].sample({noRepeat: true})
                    break

                    case "dancersad": text = [
                        `hahaha...`,
                        `wee...`,
                        `..heehee...`,
                    ].sample({noRepeat: true})
                    break

                    case "fawner": text = [
                        `isabel! isabel!`, 
                        `isabel we should dance!`,
                        `isabel! it is the interloper!`,
                        `hi interloper!`,
                        `isabel when is the next dream?`,
                    ].sample({noRepeat: true})
                    break

                    case "worrier": text = [
                        `what's wrong with her...?`, 
                        `hi interloper...`,
                        `isabel will fix her!`,
                        `isabel can fix anything!`,
                        `could this happen to me??`,
                    ].sample({noRepeat: true})
                    break

                    case "gamer": text = [
                        `ok i move E*–IÓ to ú!N`, 
                        `that is an illegal move`, 
                        `ummmmmmm`,
                        `how did you get that corner`,
                        `you can't move that one!! try the other corner`,
                        `ok ¾B{& to ±¢qQ then i use my G³{¼`,
                        `fool!! that mistake will be your last!`,
                        `behold! Ý×ß to )q9Ì¼... you are done!`,
                        `not now interloper i'm beating her`,
                        `not now interloper i'm losing really bad`,
                        `i have all of the veins, what are you going to do?`,
                    ].sample({noRepeat: true})
                    break

                    case "gamersad": text = [
                        `bored...`,
                        `i used to have a friend i think`,
                        `the dancing one does not like my games`,
                        `it used to be so lively...`,
                        `it's not very fun anymore`,
                    ].sample({noRepeat: true})
                    break

                    case "sipper": text = [
                        `ahh... citrus...`,
                        `come drink with me!`,
                        `we should drink forever!`,
                        `never enough! never enough!`,
                        `i can feel it in my receptors!`,
                        `do you know when the next dream is?`,
                    ].sample({noRepeat: true})                        
                    break

                    case "somber": text = [
                            `too dangerous...`, 
                            `i want to go back`, 
                            `council please fix`, 
                            `i miss this one`, 
                            `it's still in there`
                        ].sample({noRepeat: true})
                    break

                    case "lonely": text = [
                            `...`, 
                            `so quiet here interloper`, 
                            `i could rot here forever`, 
                            `i used to be scared of this place`,
                            `i could sleep here forever`
                        ].sample({noRepeat: true})
                    break

                    case "hider": text = [
                            `hm hmmm hmm hmm`, 
                            `i like to visit here just in case`, 
                            `one day she'll come back`, 
                            `i saw a eye once`, // intentional typo don't fucking fix this or i;'l👽
                        ].sample({noRepeat: true})
                    break

                    case "asker": text = [
                            `oh? oh oh oh?`, 
                            `really? cool! how??`, 
                            `wait i wasn't listening can you say that again`, 
                            `ohhhh i ohhh i get it ohh`,
                            `huhh? you just tore it up??`,
                        ].sample({noRepeat: true})
                    break

                    default: text = [
                        "hi interloper"
                    ]
                }

                chatter({
                    actor: "effigy",
                    text,
                    readout: true,
                    customEl: effigy,
                    delay: 300
                })
            }
        },
        {
            name: "unity",
            class: "act-ozo",
            showIf: [["mask", "unity"]],
            exec: ()=>{
                cutscene(true)
                let effigy = env.targetedEntityParent

                switch(env.stage.name) {
                    case "ozo_adrift_dancers":
                        chatter({actor: 'effigy', text: "it's ok! we're just playing outside!", readout: true, delay: 2000, customEl: effigy})
                    break                    

                    default:
                        chatter({actor: 'effigy', text: "ok! but i'm already here!", readout: true, delay: 2000, customEl: effigy})
                    break                    
                }

                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                setTimeout(()=>{
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                }, 2000)
            },
        }
    ]
})
// FIXUP::dog (ozo)
createEntity({ 
    name: 'dog',
    type: "thoughtform portrait-cover portrait-dark",
    image: "/img/local/embassy/isoportrait.gif",
    pathLimit: "/local/ocean/embassy/golem/",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a <span class="code" definition="NOTE::'partial translation';'implied closest cultural equivalent'">dog</span>'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'ignoring thoughtform specifications'">::INCOHERENCE DETECTED</span>`,
    exmExec: ()=>{
        setTimeout(()=>play("talkgel", 3), 400)
        if(!(check('dog') && check('LOC!!dog'))) {
            change('PAGE!!dog', true)
            change('dog', true)
            setTimeout(()=>chatter({actor: 'moth', text: 'did that say dog? is there a dog in the embassy', readout: true}), 3000)
            setTimeout(()=>chatter({actor: 'moth', text: 'no, wait...', readout: true}), 6000)
            setTimeout(()=>chatter({actor: 'moth', text: 'ok that\'s stupid. nevermind it\'s a bug', readout: true}), 12000)
        }

        entityOffPageMarkScanned("dog", "..__GOLEM_MAINTENANCE__..")
    },
    actions: [
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);
                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                }, 1000)

                env.setTimeout(()=>{
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    vfx({type: 'flash', state: false})
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                    change('dog', true)
                    change("unity_dog", true)
                    document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())

                    clearInterval(env.stages.isopod)
                }, 2000)
            },
            showIf: [["mask", "unity"], ["e3a2__escapewin", true], ["unity_dog", false]]
        },
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);
                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                }, 1000)

                env.setTimeout(()=>{
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    vfx({type: 'flash', state: false})
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                    change("unity_dog", true)
                    document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())

                    clearInterval(env.stages.isopod)
                }, 2000)
            },
            showIf: [["mask", "unity"], ["e3a2__escapewin", true], ["unity_dog"], ["LOC!!unity_dog", false]]
        }
    ],
})

// FIXUP::event conditions
env.jokzi.events["c_isabel"].showIf = [["citystreet__flower_beacon", true], ["ozo__council_lady", true], ["unity_lady", true], ["ozo__e_c_isabel", false]]
env.jokzi.events["c_fairy"].showIf = [["localorbit__fairy_beacon", true], ["fbx__ep3intro", true], ["ozo__e_c_fairy", false]]
env.jokzi.events["f_geli"].showIf = [["localorbit__fairy_beacon", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["ozo__e_f_geli", false]]
env.jokzi.events["f_stow"].showIf = [["localorbit__fairy_beacon", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["ozo__e_f_stow", false]]
env.jokzi.events["f_effigies"].showIf = [["localorbit__fairy_beacon", true], ["citystreet__flower_beacon", true], ["effigy_gamer", true], ["ozo__e_f_effigies", false]],
env.jokzi.events["i_gelistow"].showIf = [["citystreet__flower_beacon", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["effigy_dancer", true], ["ozo__e_i_gelistow", false]]
env.jokzi.events["i_stow"].showIf = [["citystreet__flower_beacon", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["effigy_dancer", true]]
env.jokzi.events["i_geli"].showIf = [["citystreet__flower_beacon", true], ["e3a2__escapewin", true], ["ozo__ozogeli", true], ["ozo__e_i_geli", false]]
env.jokzi.events["w_isabel"].showIf = [["citystreet__flower_beacon", true], ["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["ozo__e_w_isabel", false]]
env.jokzi.events["w_fairy"].showIf = [["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["localorbit__fairy_beacon", true], ["ozo__e_w_fairy", false]]
env.jokzi.events["w_geli"].showIf = [["e3a2__escapewin", true], ["ozo__ozogeli", true], ["pit__f3_unity", true], ["ozo__wakizet-bt", true], ["ozo__e_w_geli", false]]

env.jokzi.runEvents = () => {
    //special event test bypass
    const eventParam = new URLSearchParams(window.location.search).get('setevent')
    if(eventParam && env.jokzi.events[eventParam]) return env.jokzi.setEvent(eventParam);

    // if any on-enter mask reception is pending, don't queue any events
    let joyMaskPending = (!check("LOC!!ozo__isabel_joy") && (check("citystreet__flower_beacon") && ((check("PAGE!!flowers", "high") || check("PAGE!!flowers", "done")) && !check("ozo__isabel_joy"))) || check("TEMP!!forcejoyintro"))
    let freedomMaskPending = (!check("LOC!!ozo__geli_freedom") && (check("e3a2__escapewin") && (check("ep4__entrancefinal") || check("TEMP!!forcegelimask"))))
    if(joyMaskPending || freedomMaskPending) {
        console.log(`not using events due to pending mask reception. joy pending: ${joyMaskPending}, freedom pending: ${freedomMaskPending}`)
        return 
    }

    // events are more common the longer it's been since the last one
    let eventLikelihoodModifier = (check("e_ozo") || 0) * 0.05

    //generate a weighted list to use weightRand with, also apply some useful stuff for later
    let weightedList = Object.entries(env.jokzi.events).map(ev => {
        let weight = (ev[1].weight || 0.3) + (ev[1].weightMod ? ev[1].weightMod() : 0)

        if(ev[0] != "normal") weight += eventLikelihoodModifier;
        ev[1].type = ev[0]

        if(weight <= 0 || !shouldItShow(ev[1])) {
            //console.log("should show is", shouldItShow(ev[1]), "weight is", weight, "skipping", ev[0])
            return false
        }

        else return [
            ev[1], weight
        ]

    }).filter(ev => ev !== false)

    //choose event
    env.jokzi.setEvent(weightRand(weightedList).type)
}

            }
        break
        
        case "/local/ocean/embassy/golem/":
            if (arrayOfStringURLsLoaded.includes("/js/embassy_golem.js")){
env.embassy.skips.m_bossclear = () => {
        toggleBgm(env.embassy.music_golems_cleared)
        env.embassy.music_unsafe_golems.rate(1)
        env.stages['g_m_dist'].removeBoss()
        vn.done()

        //still want to expose people to this
        switch(check("golem_decompression")) {
            case false:
                setTimeout(() => {
                    startDialogue("m_metatrauma")            
                }, 600)
            break

            case true:
                if(check("LOC!!golem_decompression")){
                setTimeout(() => {
                    startDialogue("m_fix")    
                }, 600)
                } else {
                setTimeout(() => {
                    startDialogue("m_metatrauma")            
                }, 600)
                }
            break   
        }        
    },
                env.dialogues["m_bossclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"thoughtform combat gameplay bypassed";'toggle within system menu if desired'
____END

    sourceless
        it has stopped moving
            EXEC::env.stages['g_m_dist'].removeBoss();
        ...
            EXEC::toggleBgm(env.embassy.music_golems_cleared)
        distantly, i hear the rustling of the others down the hall we came through
            EXEC::env.embassy.music_unsafe_golems.rate(1)
        they heard the screaming, and must have come to see if we could be helped...
        i call back to them
    
    akizet
        it... it is clear, come in...

    sourceless
        wait
        itzil
        where is itzil??
    
    akizet
        itzil?!
    
    sourceless
        karik enters the room last, noticing the corpses before me...
        then, quickly staring off in a corner of the room, at--what is that?
        a mindcore lies in the corner...
            EXEC::vnp({itzilBusted: "show far", hideStage: true})
        that... is itzil, having entered stasis, even their pseudoreceptors retracted into their shell
    
    karik
        oh...
            EXEC::vnp({karik: "showleft far"})

    sourceless
        gakvu steps past me without expression, towards the override
        tozik follows her, both intent on resolving the structural situation quickly
        each of them briefly match eyes with me, knowing full well what is unfolding
        then i see miltza... she and karik both approach itzil gently
        she kneels, receptors open empathetically
            EXEC::vnp({miltza: "showleft far"})
    
    miltza
        itzil?
        ...
        they are alive, just, retracted...
        i have seen this before with separative trauma
        but... never in a qou!
        we can only hope they do not turn anything off

    karik
        itzil told me that they had been with their kivii since they were both larval
        even ascending on the same θgaze...
        it will not be easy
    
    sourceless
        miltza looks back towards me, noticing my staring
            EXEC::vnp({karik: "hide", itzilBusted: "hide", miltza: "show"})
    
    miltza
        akizet, you should let me and karik tend to itzil
        see to the structure, yes?
        now, karik...
            
    sourceless
        miltza eyes gakvu briefly, but then returns to a murmur with karik
        she is likely briefing them on what to do when itzil awakens again...
        the ever-caring nature of the tir shines through all else
            EXEC::vnp({miltza: "hide"})

____SHOWIF::'PAGE!!bozcav'
    sourceless
        bozko remains by the door, keeping watch,
            EXEC::vnp({bozko: "show far"})
        but i feel it is more to distance himself from this scene velzie has assigned us
        in our short time throughout this disaster, we have seen much, but...
        what has he seen to make him this way?
    
    cavik
        akizet?
            EXEC::vnp({cavik: "show"})
    
    sourceless
        cavik lingers nearby,
        examining golem parts that remained intact
    
    cavik
        i was going to tear into these for their components
            EXEC::vnp({bozko: "hide"})
        for my explosives, you see
        but... there are quite a few still usable parts
        in fact, anything that was not in use is nearly in perfect condition
    
    sourceless
        he aggressively occupies his mind with his work
        avoiding even looking in the direction of the bodies, as if they are not there
    
    akizet
        interesting
        though, cavik, grant me a θblink and leave them
        perhaps we could use them in some way...
        but we should resolve the corroyi issue first

    cavik
        ok!
____END
    
    RESPONSES::akizet
        to gakvu and tozik<+>CHANGE::m_fix
            SHOWIF::[["golem_decompression"], ["LOC!!golem_decompression"]]
            EXEC::vn.done()
            HIDEREAD::

        to gakvu and tozik<+>CHANGE::m_metatrauma
            SHOWIF::["golem_decompression", false]
            EXEC::vn.done()
            HIDEREAD::
            
        to gakvu and tozik<+>CHANGE::m_metatrauma
            SHOWIF::[["golem_decompression"], ["LOC!!golem_decompression", false]]
            EXEC::vn.done()
            HIDEREAD::
    
SKIP::env.embassy.skips.m_bossclear()
`)

env.dialogues["add2warn"] = generateDialogueObject(`
start
____SHOWONCE
____SHOWIF::['gol__geli_beacon_fallback', false]
    sourceless
        the door...
        my claw sinks into its melted form with no small effort
        no meaningful distance can be made, and it is a lost cause, yet...
        something about it is strange, almost sickening, calling to me?
        like a memory of a larval illness, a cold shiver, starvation...
        i feel the eyes of the others upon me, their idle chatter quieting strangely
        yes--i imagine this does appear strange, and we have greater matters to attend to
        so... for now, i back away
____END

____SHOWONCE
____SHOWIF::['gol__geli-door', false]
    geli
        ah!
        that was the entrance! and exit!

    geli::concern
        you... cannot go through?
        <span definition="INHERITED CONTEXT::'ƒiN®d…hlP'">how about you try again?</span>

    akizet
        geli...

    sourceless
        i pull my claw from the sludge
        the golem's ignorance is almost endearing
____END

    sys
        ALERT::"exiting iteration";"recollection locus unable to proceed"
        WARNING::"unsaved iteration progress will be lost"
    
____SHOWONCE::
    moth
        you're exiting the iteration...
        but not exiting the spatial thoughtform? wtf?
        why aren't we able to just walk out with akizet and the team?
        whatever, just make sure you save if you still need to
____END

    RESPONSES::sys
        save and proceed<+>save
            FAKEEND::(exit iteration)
        
        proceed without saving<+>END
            EXEC::change("TEMP!!from", "g_lobby");moveTo("/local/beneath/embassy/")
            FAKEEND::(exit iteration)

        save and proceed to ozo<+>save2
            FAKEEND::(exit iteration, escape)
            SHOWIF::["e3a2__escapewin"]
        
        proceed to ozo without saving<+>END
            EXEC::change("TEMP!!from", "e3a2");moveTo("/local/ozo/")
            SHOWIF::["e3a2__escapewin"]
            FAKEEND::(exit iteration, escape)
    
    RESPONSES::self
        don't go<+>END
            FAKEEND::(back out)

save
    sys
        ATTENTION::'saving iteration...'
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'proceeding'

    RESPONSES::self
        ok<+>END
            EXEC::change("TEMP!!from", "g_lobby");moveTo("/local/beneath/embassy/")

save2
    sys
        ATTENTION::'saving iteration...'
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'
        ATTENTION::'proceeding'

    RESPONSES::self
        ok<+>END
            EXEC::change("TEMP!!from", "e3a2");moveTo("/local/ozo/")
`)


env.stages['g_s_sfer'].exec = function () {
        env.stages.golemStageInit(this)

        if(check("unity_dog") && check("LOC!!unity_dog") && check("LOC!!dog")) {
            document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())
        } else {
            env.dogSetup()
        }
    }
    
createEntity({ 
    name: 'dog',
    type: "thoughtform portrait-cover portrait-dark",
    image: "/img/local/embassy/isoportrait.gif",
    pathLimit: "/local/ocean/embassy/golem/",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a <span class="code" definition="NOTE::'partial translation';'implied closest cultural equivalent'">dog</span>'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'ignoring thoughtform specifications'">::INCOHERENCE DETECTED</span>`,
    exmExec: ()=>{
        setTimeout(()=>play("talkgel", 3), 400)
        if(!(check('dog') && check('LOC!!dog'))) {
            change('PAGE!!dog', true)
            change('dog', true)
            setTimeout(()=>chatter({actor: 'moth', text: 'did that say dog? is there a dog in the embassy', readout: true}), 3000)
            setTimeout(()=>chatter({actor: 'moth', text: 'no, wait...', readout: true}), 6000)
            setTimeout(()=>chatter({actor: 'moth', text: 'ok that\'s stupid. nevermind it\'s a bug', readout: true}), 12000)
        }

        entityOffPageMarkScanned("dog", "..__GOLEM_MAINTENANCE__..")
    },
    actions: [
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);
                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                }, 1000)

                env.setTimeout(()=>{
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    vfx({type: 'flash', state: false})
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                    change('dog', true)
                    change("unity_dog", true)
                    document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())

                    clearInterval(env.stages.isopod)
                }, 2000)
            },
            showIf: [["mask", "unity"], ["e3a2__escapewin", true], ["unity_dog", false]]
        },
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);
                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                }, 1000)

                env.setTimeout(()=>{
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    vfx({type: 'flash', state: false})
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                    change("unity_dog", true)
                    document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())

                    clearInterval(env.stages.isopod)
                }, 2000)
            },
            showIf: [["mask", "unity"], ["e3a2__escapewin", true], ["unity_dog"], ["LOC!!unity_dog", false]]
        }
    ],
})
            }
        break
        
        case "/local/beneath/embassy/":
            if (arrayOfStringURLsLoaded.includes("/js/beneath_embassy.js")){
    
createEntity({
    name: 'daemon mimic',
    image: '/img/sprites/daemons/genericscan.gif',
    type: "thoughtform daemon portrait-cover",
    text: `::RESPONSIVE THOUGHTFORM
    ::ALTERED SIGNATURE
    ::EXPLICIT PURPOSE::'memory management';'evil mode';'hehe'`,
    pathLimit: "/local/beneath/embassy/",
    exmExec: ()=>{
        if(!(check('e3a2_earlydaemon') && check('LOC!!e3a2_earlydaemon'))) {
            change('e3a2_earlydaemon', true)
            chatter({actor: 'moth', text: `they're taking the shape of collapse foes...`, readout: "closed", delay: 2000})
            chatter({actor: 'moth', text: `that's certainly one way to follow "rule 2" if they're forced in here`, readout: "closed", delay: 6000})
        }
    },
})

env.e3a2.daemonExm = ()=>{
    if(!(check('e3a2_latedaemon') && check('LOC!!e3a2_latedaemon'))) {
        change('e3a2_latedaemon', true)
        chatter({actor: 'moth', text: `these ones aren't disguising themselves... they're just forced into the system`, readout: true, delay: 2000})
        chatter({actor: 'moth', text: `doesn't this break "rule 2"?`, readout: true, delay: 6000})
    }
}

createEntity({
    name: 'wrk',
    image: '/img/sprites/daemons/pawn/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'memory management';'maintenance';'resource delivery and removal'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'clw',
    image: '/img/sprites/daemons/rook/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'memory management';'framing construction'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'net',
    image: '/img/sprites/daemons/bishop/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'memory management';'framing management';'structure applicator'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'enfc',
    image: '/img/sprites/daemons/knight/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'memory management';'variance management';'actor path management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'seer',
    image: '/img/sprites/daemons/queen/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'structure processor';'continuous effect management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'archn',
    image: '/img/sprites/daemons/king/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'structure processor';'actor state management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'dct',
    image: '/img/sprites/daemons/director/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'structure processor';'difficulty management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'spwn',
    image: '/img/sprites/daemons/spawner/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'structure processor';'daemon instructor';'thoughtform management'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'idea',
    image: '/img/sprites/daemons/spawner/beescan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'automatic thoughtform direction applicator';'currently directed to cause internal destruction'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'imp',
    image: '/img/sprites/daemons/imp/scan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'countermeasure against immediate unusual activity'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'anti',
    image: '/img/sprites/daemons/genericscan.gif',
    type: "thoughtform daemon portrait-cover",
    pathLimit: "/local/beneath/embassy/",
    text: `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'countermeasure against immediate unusual activity'`,
    exmExec: env.e3a2.daemonExm
})

createEntity({
    name: 'interloper',
    image: '/img/sprites/loper.gif',
    type: "thoughtform portrait-top portrait-cover portrait-blocker",
    text: `::INCOMPLETE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection locus'${check("e3a2__escapewin")?`
    ::INHERITED CONTEXT::<span style='color: var(--bright-color)' definition="NOTE::'malformed context';'potential tampering'">'what do you think, stowaway?'</span>
    ` : ""}`,
    pathLimit: "/local/beneath/embassy/",
    exmExec: ()=>{
        if(!(check('e3a2_loperxamine') && check('LOC!!e3a2_loperxamine'))){
            change('e3a2_loperxamine', true)
            setTimeout(()=>{readoutAdd({message: "wow, look at that... it's like it's not even fully formed", name:"moth"})}, 3000)
        }
    },
    actions: [
        {
            name: "question",
            exec: ()=>{
                startDialogue("stowaway")
            },
            showIf: ()=> env.stage.name == "ozo_lostone"
        }
    ]
})

env.COMBAT_ACTORS.intrusive = {
        name: "???",
        maxhp: 500000,
        specialClass: "intrusiveactor mainfoe",
        statusImmunities: ["stun"],
        actions: ["special_intrusive"],
        graphic: `
            <div class="sprite-wrapper intrusive maintrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/1.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        },
       
        events: {
            onSpawn: (actor) => {
                env.rpg.classList.add('hideteams', 'intrusivetro')
                setTimeout(()=>{
                    env.rpg.classList.remove("intrusivetro")
                    env.bgm.seek(27)
                }, 500)
                setTimeout(()=>{
                    env.rpg.classList.remove("hideteams")
                }, 15000)

                env.rpg.insertAdjacentHTML('beforeend', `
                <figure id="chancepanel" class="hidden" for="${actor.slug}">
                    <img src="/img/sprites/flantrusive/panelbase.gif">
                    <div class="wheel">
                        <ul>
                            <li class="d1">1</li>
                            <li class="d2">2</li>
                            <li class="d3">3</li>
                            <li class="d4">4</li>
                            <li class="d5">5</li>
                            <li class="d6">6</li>
                        </ul>
                    </div>
                    <div class="display">
                        <ol>
                            <li class="d1">1. life up</li>
                            <li class="d2">2. main up</li>
                            <li class="d3">3. unlucky</li>
                            <li class="d4">4. bomb</li>
                            <li class="d5">5. unlucky</li>
                            <li class="d6">6. change</li>
                        </ol>
                    </div>
                    <div class="result">
                        <div>
                            <span></span>
                        </div>
                    </div>
                </figure>`)

                actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
                actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
                actor.chancePanel.spin = (state) => { 
                    actor.chancePanel.removeAttribute("chosen")
                    actor.chancePanel.classList.toggle("spinning", state) 
                    actor.chancePanel.result.innerHTML = "???"
                }

                actor.chancePanel.stopAndResult = () => { 
                    let result = rand(1, 7)
                    actor.chancePanel.spin(false)
                    actor.chancePanel.setAttribute("chosen", result)

                    return result
                }

                if(!(check("flan") && check("LOC!!flan"))) {
                    switch(check("e3a2escape")) {
                        case "complete":
                            change("flan", "post-escape")
                        break

                        default:
                            change("flan", "pre-escape")
                    }
                }
            }
        },
    };

createEntity({ 
    name: 'dog',
    type: "thoughtform portrait-cover portrait-dark",
    image: "/img/local/embassy/isoportrait.gif",
    pathLimit: "/local/ocean/embassy/golem/",
    text: `::RESPONSIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'recollection'
    ::INHERITED CONTEXT::<span style='color: var(--obesk-color)'>'a <span class="code" definition="NOTE::'partial translation';'implied closest cultural equivalent'">dog</span>'</span>
    <span style="color: var(--obesk-color)" definition="ANALYSIS::'ignoring thoughtform specifications'">::INCOHERENCE DETECTED</span>`,
    exmExec: ()=>{
        setTimeout(()=>play("talkgel", 3), 400)
        if(!(check('dog') && check('LOC!!dog'))) {
            change('PAGE!!dog', true)
            change('dog', true)
            setTimeout(()=>chatter({actor: 'moth', text: 'did that say dog? is there a dog in the embassy', readout: true}), 3000)
            setTimeout(()=>chatter({actor: 'moth', text: 'no, wait...', readout: true}), 6000)
            setTimeout(()=>chatter({actor: 'moth', text: 'ok that\'s stupid. nevermind it\'s a bug', readout: true}), 12000)
        }

        entityOffPageMarkScanned("dog", "..__GOLEM_MAINTENANCE__..")
    },
    actions: [
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);
                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                }, 1000)

                env.setTimeout(()=>{
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    vfx({type: 'flash', state: false})
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                    change('dog', true)
                    change("unity_dog", true)
                    document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())

                    clearInterval(env.stages.isopod)
                }, 2000)
            },
            showIf: [["mask", "unity"], ["e3a2__escapewin", true], ["unity_dog", false]]
        },
        {
            name: "unity",
            class: "act-ozo",
            exec: ()=>{
                cutscene(true);
                env.setTimeout(()=>{
                    play("talkchoir", 0.75)
                    vfx({type: 'beacon', state: true})
                }, 400)

                env.setTimeout(()=>{
                    vfx({type: 'flash', state: true})
                }, 1000)

                env.setTimeout(()=>{
                    readoutAdd({message: `<p>ATTENTION::'thoughtform activity detected'::'resources removed'</p>`, name:"sys"})
                    vfx({type: 'flash', state: false})
                    vfx({type: 'beacon', state: false})
                    cutscene(false)
                    change("unity_dog", true)
                    document.querySelectorAll('#realgrid .isopod').forEach(el=>el.remove())

                    clearInterval(env.stages.isopod)
                }, 2000)
            },
            showIf: [["mask", "unity"], ["e3a2__escapewin", true], ["unity_dog"], ["LOC!!unity_dog", false]]
        }
    ],
})

env.dialogues["escapewin"] = generateDialogueObject(`
start
    sourceless
        as the vessel nearly crashes through the firmament's wound, the combat sequence stops.
            EXEC::env.boatEscape.changeBoatCol(1);change("e3a2bosshp", 1000000)
        you are here. the exit.
        behind the vessel, you sense a wealth of daemons on approach.
    
    bstrd
        OK YEAAA HELL YEAAA
        WOOOO!!!
        u 2 go ahead
        ILL HOLD EM OFF!!
        BYE JELY
    
    bsteli::happy
        bye!! thank you!
    
    bsteli::think
        actually...
        if you simply leave with us for jokzi ozo, you do not need to fight them
        right?
    
    bstrd
        ya but its kinda sick
    
    bsteli::uncanny
        oh...
    
    bstrd
        + i cant leave i got biz
        maybe i leave once all im all evil'd out
        theres gonna be more with this memory n i have 2 stick around 4 now
        MORE 2 MAKE EVIL MODES OF >%^)
        now get MOVINE

    RESPONSES::self
        quick questions for BSTRD<+>question
        leave<+>leave

question
    self
        wait BSTRD
        i have some questions
    
    bstrd
        >:0
        NO MORE
        STFU!!!!

    sourceless
        in a mad lunge, the golem pushes you and geli into the gap.
        but something is wrong.
        a sharp pain splits through your head. your vision is static.
        the static passes over you, moves around you like water.
        it burns. 
    
    moth
        what? is that real?
        hang on--buddy, are you good?
    
    sourceless
        you grip your head with one hand.
        but you can't tell if it's your real hand or not.
    
    self
        i don't know
        don't disconnect
    
    moth
        no i know, if there was real damage it would have ejected you already
        vitals are fine... nerve monitors aren't registering anything
        aside from panic, i guess
        i'm standing by, don't worry

    sys
        ATTENTION::'memory stream alteration';'relocating'

    RESPONSES::self
        ...<+>END
            SHOWIF::["e3a2__escapewin"]
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(leave)
        ...<+>END
            SHOWIF::["e3a2__escapewin", false]
            EXEC::env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/")
            FAKEEND::(leave)

leave
    self
        OK geli, let's go

    bsteli
        interloper, come!
    
    sourceless
        geli glides along the vessel's floor, beginning to pass through the gap.
        she takes one of your unreal hands, pulling you through with her.
    
    self
        wait
        this isn't actually me
    
    sourceless
        you pass through, too. but something is wrong.
        a sharp pain splits through your head. your vision is static.
        the static passes over you, moves around you like water.
        it burns. 
    
    moth
        what? is that real?
        hang on--buddy, are you good?
    
    sourceless
        you grip your head with one hand.
        but you can't tell if it's your real hand or not.
    
    self
        i don't know
        don't disconnect
    
    moth
        no i know, if there was real damage it would have ejected you already
        vitals are fine... nerve monitors aren't registering anything
        aside from panic, i guess
        i'm standing by, don't worry

    sys
        ATTENTION::'memory stream alteration';'relocating'

    RESPONSES::self
        ...<+>END
            SHOWIF::["e3a2__escapewin"]
            EXEC::change("TEMP!!from", "e3a2");env.e3a2.clearWarningListener();corruRefresh("/local/ozo/")
            FAKEEND::(leave)
        ...<+>END
            SHOWIF::["e3a2__escapewin", false]
            EXEC::env.e3a2.clearWarningListener();corruRefresh("/local/beneath/embassy/")
            FAKEEND::(leave)
`)

page.onEnter = ()=>{
					if(!page.dialoguePrefix.includes("notfound")) {
						change(`visited_${location.pathname.replace(/\//g, '')}`, true)
					}
					
					//global VN object update
					page.vn = new VN()
					window.vnObj = page.vn

					
					readoutAdd({message: `..__NAVIGATING::"${page.name}"__..`, name:"sys", actor: "sys", type: "navigation", show: false, sfx: false})
					
					
					body.setAttribute('state', 'corru-entered')
					firstLoad = false

					
					if(corruStatic.playing() && !body.classList.contains("hard-cut")) {
						corruStatic.fade(corruStatic.volume(), 0, 1000)
						setTimeout(()=> corruStatic.stop(), 1001)
					}
					if(page.bgm) {
						page.bgm.volume(0)
						page.bgm.play()
						page.bgm.fade(0, getModifiedVolume('music', 1), 1000)
						env.bgm = page.bgm
					} else {
						env.bgm = null
					}
					

					//dyn
					
					switch(check("TEMP!!from")) {
    case "geliozo":
        changeStage("vessel")
        change("PAGE!!dream", true)
        change("TEMP!!lastframeenter", "geliozo")
    break

    case "geliescape":
        change("PAGE!!dream", true)
        changeStage("vessel_short")
    break

    default:
        if(!check("TEMP!!from", "g_lobby") && check("TEMP!!lastframeenter", "geliozo")) {
            changeStage("vessel")
            change("PAGE!!dream", true)
        } else if(check("e3a2escape", "complete")) {
            changeStage('vessel')
        } else if(check("e3a2__bstrdmeet")) {
            changeStage('underlobby')
        } else {
            changeStage('wanderpart')
        }
}

if(check("e3a2escape", "in_progress") && check("e3a2__bossreturn")) {
    content.classList.add("bstrd-hold", "geli-hold")
}

page.showAdvancedStatuses = true

change("TEMP!!from", false)    
document.addEventListener('keydown', stageKeypress)
document.addEventListener('corru_changed', env.e3a2.crittaStuffHandler)

					Buddy.triggerPageBuddies()
					document.querySelector('#PageData').remove()
					document.dispatchEvent(env.hooks.corru_entered)
					mothHasUnreadCheck()


					const urlParams = new URLSearchParams(window.location.search)
					if(urlParams.has('goto')) {
						const goto = urlParams.get('goto')
						setTimeout(() => {
							changeStage(goto)
						}, 800)
					}

					setTimeout(()=>{
						if(oldPage) if(oldPage.howls) oldPage.howls.forEach(howl=>howl.unload())
					}, 400)
				
					console.log('rendering buddies!')
					Buddy.renderGlobalBuddies()
				}
            }
        break
    }
    if (arrayOfStringURLsLoaded.includes("https://file.garden/ZBykMtEMpVTUWZ-e/councildance.js")){
defaultdancebranch = generateDialogueObject(`
defaultdance
____NESTIF::['ozodance']
    self
        do you know how to do a certain dance?
            SHOWIF::['default_danced', false]
        can you default dance again?
            SHOWIF::['default_danced']

    council
        oh! but dear interloper, we are dancing already... is that not enough?
        come, dance with us!

    RESPONSES::self
        ok...<+>loop
            FAKEEND::(back)
____END


____NESTIF::['ozodance', false]
+____NESTIF::['default_danced']
    self
        can i see that again

    council
        yes!!
        we will do it again for you to see, dear interloper

    RESPONSES::self
        ok<+>END
            EXEC::startDance(); change('default_danced', true)
+____END

+____NESTIF::['default_danced', false]
    self
        do you know how to do the default dance

    moth
        don't
        oh my god
        why do you always do this every dive?

    council
        what...
        oh! yes!!
        why, interloper?

    self
        can you do it

    moth
        there is no way this thing knows how to do that

    RESPONSES::self
        we will see<+>END
            EXEC::startDance(); change('default_danced', true)
+____END
____END
`)['defaultdance']
    }

    if (arrayOfStringURLsLoaded.includes("https://file.garden/aNd0eqDxKF1uOREs/lobotomize.js")){
			env.dialogues["mothotomy"] = generateDialogueObject(`
start
    moth
        huh?

    self
        get over here, lobotomy time

    moth
        i dont think the spike is strong enough to d-
            EXEC::setTimeout(()=>{play("stab");change("mothotomy",1);},400)
            SILENT::

    RESPONSES::self
        cant undo this now<+>END
END
`);
        env.dialogues["++moth"].start.responses[0].replies.push({
			name: "i am tired of you",
			showIf: [["mothotomy", 1], ["LOC!!mothotomy", false]],
			destination: "CHANGE::mothotomy"
		})
    }
})

document.addEventListener('corru_entered', (ev)=>{
    switch(page.path) {
        case "/":
                    if (check("ep0_epilogue", "awaiting") && check("LOC!!ep0_epilogue,started")) {
                        document.querySelector('#connection-overlay').classList.remove('show')
                        content.classList.remove('ep0-epi')
                    }
        break
        
        case "/local/depths/":
                        if(check('ep0_epilogue') && (!check('LOC!!ep0_epilogue,awaiting') || !check('LOC!!ep0_end'))) document.querySelector('.depthbox').classList.remove('incoherent')
        break
        
        case "/local/beneath/":
          if(check('beneath') && !check('LOC!!beneath')) startDialogue("++mothbeneath")
        break
        
        case "/local/beneath/parasite/":
          if(check('beneath') && !check('LOC!!beneath')) startDialogue("++mothbeneath")
        break

        case "/local/beneath/car/":
          if(check('car__intro') && !check('LOC!!car__intro')) startDialogue("intro")
        break
        
        case "/local/orbit/":
          if((check("localorbit__fairy_beacon") && check("LOC!!localorbit__fairy_beacon", false)) && check("ENV!!ep2")) {
    page.buddy_fairy = new Buddy({
        element: {
            entity: "proxyfriend?",
            id: "eyefriend",
            actor: "fairy",
            size: "40vh",
            classes: "",
            img: "/img/sprites/funfriend/proxyfriend.gif",
            figure: `
                <img class="body" src="/img/local/uncosm/ozo/sprite_body.gif">
                <div class="head">
                    <img src="/img/local/uncosm/ozo/sprite_mask.gif">
                </div>
            `
        },

        activity: {
            behavior: {type: 'wander', drift: 400, rate: 15000, speed: 8000, element: document.querySelector('#dullarea'), muiPause: true},
            events: {
                screenEnter: ()=> {
                    
                },
                mouseEnter: ()=> {
                    
                },
                onRender: ()=>{
                    page.buddy_fairy.el.querySelector('figure').classList.add('ozofriend', 'eyefriend')
                }
            }
        },
    })
}
        break
    }
})

document.addEventListener('stage_change', (ev)=>{
    if (check("modList").includes("narra_morehumors")) {
        switch(page.path) {
            case "/local/beneath/embassy/":
                	env.COMBAT_ACTORS.cmb_mainfoe = {
                        name: "CITADEL",
                        maxhp: 500000,
                        specialClass: "notadaemonactor combineactor mainfoe",
                        statusImmunities: ["stun"],
                        actions: ["special_incoherent_combinesummon"],
	                	initialStatusEffects: [["appeasement_mega", 1], ["ominous_timer_cmb", 1]], // either six or ten minute timer; combat will be lost once timer expires (oh god we absolutely cannot make it ten minutes that is Not Enough Time)
                        graphic: `
                            <div class="sprite-wrapper cmb" id="%SLUG-sprite-wrapper">
	                			<div class="timer"></div>
                                <img src="/img/local/orbit/dullportal_backed_small.gif">
                            </div>
                            `,
                        reactions: {}, //SILENT CREATURE
	                	events: {
                            onSpawn: (actor) => {
                                if(!(check("cmb_unlocked") && check("LOC!!cmb_unlocked"))) {
                                    switch(check("e3a2escape")) {
                                        case "complete":
                                            change("cmb_unlocked", "post-escape")
                                        break
                                    
                                        default:
                                            change("cmb_unlocked", "pre-escape")
                                    }
                                }
                            }
                        },
                    }

                    env.COMBAT_ACTORS.hazardous = {
                        name: "!!!",
                        maxhp: 500000,
                        hp: 500000,
                        immunities: {
                            stun: true,
                			weakened: true,
                        },
                        actions: ["special_hazardshelf_annihilate"],
                        graphic: `
                            <div class="sprite-wrapper hazardous" id="%SLUG-sprite-wrapper" style="transform: scale(1.85); !important;"> 
                                <img class="sprite" src="https://narrativohazard-expunged.neocities.org/img/bstrdsing_hazardousHRM.gif" style="transform: scale(1.85); margin-top: -30vh; animation: bomber 20s ease-in-out infinite alternate;">
                            </div>
                            `,
                		events: {
                            onSpawn: (actor) => {
                                env.rpg.classList.add('hideteams', 'intrusivetro')
                                setTimeout(()=>{
                                    env.rpg.classList.remove("intrusivetro")
                                    env.bgm.seek(10)
                                }, 500)
                            
                                setTimeout(()=>{
                                    env.rpg.classList.remove("hideteams")
                                }, 15000)
                            
                				setTimeout(()=>{
                					env.COMBAT_ACTORS.hazardous.actions = ["special_hazardshelf_annihilate"] //this thing sucks when paired with overclock my god
                					if(env.COMBAT_ACTORS.hazardous.windupActions) delete env.COMBAT_ACTORS.hazardous.windupActions
                				}, 500)

                                if(!(check("hazard") && check("LOC!!hazard"))) {
                                    switch(check("e3a2escape")) {
                                        case "complete":
                                            change("hazard", "post-escape")
                                        break

                                        default:
                                            change("hazard", "pre-escape")
                                    }
                                }
                            }
                        },
                		reactions: {} // NO TALKING. ONLY VIOLENCE
                    }

                    env.STATUS_EFFECTS.rewardsHandler = {
                        slug: "rewardsHandler",
                        name: "Item Carrier",
	                	passive: true,
                        beneficial: true,
	                	silent: true,
                        icon: "/img/sprites/combat/passives/light_glee.gif",
                        help: "this actor will give rewards on death\nyou should never see this",
	                	events: {
                            onDeath: function() {
                                let user = this.status.affecting
	                			if(user.slug.includes("bstrdboss_bfg") && !(check("reward_bfg") && check("LOC!!reward_bfg"))) change("reward_bfg", "bfg_collected") // this should work
	                			if(user.slug.includes("bstrdboss_grenade") && !(check("reward_grenade") && check("LOC!!reward_grenade"))) change("reward_grenade", "grenade_collected")
	                			if(user.slug.includes("bstrdboss_rifle") && !(check("reward_rifle") && check("LOC!!reward_rifle"))) change("reward_rifle", "rifle_collected")
	                			if(user.slug.includes("bstrdboss_shotgun") && !(check("reward_shotgun") && check("LOC!!reward_shotgun"))) change("reward_shotgun", "shotgun_collected")
	                			if(user.slug.includes("bstrdboss_sniper") && !(check("reward_sniper") && check("LOC!!reward_sniper"))) change("reward_sniper", "sniper_collected")
                            },
                        }
                    }

                    env.COMBAT_ACTORS.intrusive_rematch = {
                        name: "???",
                        maxhp: 1000000,
                        specialClass: "intrusiveactor mainfoe",
                        statusImmunities: ["stun"],
                        actions: [ // intrude but it doesn't tell you what the options are :D
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                		"special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch", "special_intrusive_rematch",
	                	], // spammed so that when you unfold its actions it flows off the screen
                        graphic: `
                            <div class="sprite-wrapper intrusive maintrusive" id="%SLUG-sprite-wrapper">
                                <img src="/img/sprites/flantrusive/1.gif">
                            </div>
                            `,
                        reactions: {
                            evade: ["LD C"],
                            crit: [ "D ML" ],
                            crit_buff: ["BL"],
                            miss: ["CL"],
                            dead: ["P N"],
                            receive_hit: ["IL D"],
                            receive_crit: ["I LB P"],
                            receive_puncture: ["I A D"],
                            receive_buff: ["P BD"],
                            receive_destabilized: ["S", "T", "Q"],
                            receive_rez: ["U P"],
                            puncture: ["DL"],
                            regen: ["DC"],
                            destabilized: ["S", "T", "Q"],
                            stun: ["NDN"],
                            receive_carapace: ["E"],
                            receive_fear: ["I P"],
                            receive_redirection: ["PDP"],
                        },
                    
                        events: {
                            onSpawn: (actor) => {
                                env.rpg.classList.add('hideteams', 'intrusivetro')
                                setTimeout(()=>{
                                    env.rpg.classList.remove("intrusivetro")
                                    env.bgm.seek(3)
                                }, 500)
                                setTimeout(()=>{
                                    env.rpg.classList.remove("hideteams")
                                }, 15000)
                            
                                env.rpg.insertAdjacentHTML('beforeend', `
                                <figure id="chancepanel" class="hidden" for="${actor.slug}">
                                    <img src="/img/sprites/flantrusive/panelbase.gif">
                                    <div class="wheel">
                                        <ul>
                                            <li class="d1">1</li>
                                            <li class="d2">2</li>
                                            <li class="d3">3</li>
                                            <li class="d4">4</li>
                                            <li class="d5">5</li>
                                            <li class="d6">6</li>
                                        </ul>
                                    </div>
                                    <div class="display">
                                        <ol>
                                            <li class="d1">1. ??????</li>
                                            <li class="d2">2. ??????</li>
                                            <li class="d3">3. ??????</li>
                                            <li class="d4">4. ??????</li>
                                            <li class="d5">5. ??????</li>
                                            <li class="d6">6. ??????</li>
                                        </ol>
                                    </div>
                                    <div class="result">
                                        <div>
                                            <span></span>
                                        </div>
                                    </div>
                                </figure>`)
                                
                                actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
                                actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
                                actor.chancePanel.spin = (state) => { 
                                    actor.chancePanel.removeAttribute("chosen")
                                    actor.chancePanel.classList.toggle("spinning", state) 
                                    actor.chancePanel.result.innerHTML = "???"
                                }
                            
                                actor.chancePanel.stopAndResult = () => { 
                                    let result = rand(1, 7)
                                    actor.chancePanel.spin(false)
                                    actor.chancePanel.setAttribute("chosen", result)
                                
                                    return result
                                }
                            
                                if(!(check("flan") && check("LOC!!flan"))) {
                                    switch(check("e3a2escape")) {
                                        case "complete":
                                            change("flan", "post-escape")
                                        break
                                    
                                        default:
                                            change("flan", "pre-escape")
                                    }
                                }
                            }
                        },
                    }
            break
        }
    }
})

if(typeof pages == "undefined") {
    pages = {}
}

function newCustomPageArchi({url, title, name, dialoguePrefix, remoteHTML}) {
    fetch(`${remoteHTML}`).then(
        function (response) {
            if (response.ok) {
                return response.text();
            }
            
            throw response;
        }).then(
        function (text) {
            // CACHE DA PAGE SO IT LOADS
            pages[`${url}`] = {
                "title": `${title}`,
                "name": `${name}`,
                "dialoguePrefix": `${dialoguePrefix}`,
                "path": location.pathname,
                "flags" :{},
                "pageClass": "",
                "originalContent": "",
                "blocks": [
                `${text}`
                ],
                "responseURL": `https://corru.observer${url}`,
                "url": `${url}`
            }
            
            // SWUP DOSE PAGES OUT
            Object.defineProperty(swup.cache, 'pages', { get: () => pages, set: () => { } })
    })

    // REFRESH PAGE IF ITS EMPTY 4 SOME REASON
    document.addEventListener('corru_resources_added', (ev)=>{
        const arrayOfStringURLsLoaded = ev.detail.resList
        if((location.pathname == `${url}`) && (typeof page.overridden == "undefined") && (arrayOfStringURLsLoaded.includes("https://adrfurret.neocities.org/corrumods/archipelago.js"))) {
            body.classList.add('hard-cut') // needed 4 the static sound to not break
            moveTo(`${url}`)
            body.classList.remove('hard-cut')
        }
    }, true)

    console.log(`PAGE DEFINED: ${url}`)
}

newCustomPageArchi({
    url: "/local/ocean/ship/interview/",
    title: "..__FIRST_CHAT__..",
    name: "first-chat",
    dialoguePrefix: "interview1",
    remoteHTML: "https://file.garden/XfgsWwFNIyd3vjoq/pages/interviewoverride-rev4.html",
})

newCustomPageArchi({
    url: "/local/uncosm/effigy/",
    title: "..__UNKNOWN__..",
    name: "unknown",
    dialoguePrefix: "sec",
    remoteHTML: "https://file.garden/XfgsWwFNIyd3vjoq/pages/effigyoverride-rev6.html",
})

newCustomPageArchi({
    url: "/local/uncosm/cavik/",
    title: "..__UNKNOWN__..",
    name: "unknown",
    dialoguePrefix: "sec",
    remoteHTML: "https://file.garden/XfgsWwFNIyd3vjoq/pages/cavikoverride-rev4.html",
})

newCustomPageArchi({
    url: "/local/uncosm/recosm/",
    title: "my beautiful world",
    name: "my-beautiful-world",
    dialoguePrefix: "recosm",
    remoteHTML: "https://file.garden/XfgsWwFNIyd3vjoq/pages/recosmoverride-rev2.html",
})


env.entities['membrane incision'] = {
    hide: true,
    name: 'membrane incision',
    type: "thoughtform-meta portrait-contain",
    image: "/img/textures/cneural.gif",
    text: `::CORRUCYSTIC COMPONENT
    ::<span definition="NOTE::'gap in rendering';'reflective of neural damage';'please schedule mindsci checkup'">NON-ENTITY</span>`,
    actions: [
        {
            name: "enter",
            exec: ()=>{
                exitMenu(true);
                let delay = 1
                change("TEMP!!cachePath", "funfriend")
                
                if(typeof env.buddy_ffproxy != "undefined") {
                    if(env.buddy_ffproxy.shouldBeOnPage() && !check("cache__ff-start")) {
                        env.buddy_ffproxy.chatter({text: "WAIT WHAT ARE YOU DOING", readout: true})
                        cutscene(true);

                        delay = 4000
                    
                        env.setTimeout(()=>{
                            flash(true); 
                            env.buddy_ffproxy.chatter({text: "INTERLOPER!!", readout: true})
                       }, 2000)
                    }
                }

                env.setTimeout(()=>{
                    moveTo('/local/cache/')
                    flash(false)
                    cutscene(false)
                }, delay)
            }
        }
    ]  
}

    try {
        createEntity({
            name: 'fairy',
            pathLimit: "/local/ozo/",
            image: '/img/local/uncosm/ozo/sprite_portrait.gif', 
            type: "thoughtform obesk portrait-haze portrait-auto portrait-center",
            text: `::RESPONSIVE THOUGHTFORM
            ::EXPLICIT PURPOSE:'hunger'
            <span style="color: var(--obesk-color)" definition="ANALYSIS::'no cohesion';'signature corruption'">::INCOHERENCE DETECTED</span>
            ::INHERITED CONTEXT::<span style='color: var(--bright-color)'>'trinket worn b(ÝØ;;-__ERROR::'unprocessable'__;'free! free!!'</span>`,
            actions: [
                {
                    name: "hello",
                    exec: ()=> startDialogue('fairy_intro'),
                    showIf: [["ozo__fairy_intro", false], ["stageroom", "ozo_fairy"]]
                },
                
                {
                    name: "hello",
                    exec: ()=> startDialogue('fairy_intro'),
                    showIf: [["ozo__fairy_intro", true], ["LOC!!ozo__fairy_intro", false], ["stageroom", "ozo_fairy"]]
                },

                {
                    name: "greet",
                    exec: ()=> startDialogue('fairy'),
                    showIf: [["ozo__fairy_intro", true], ["stageroom", "ozo_fairy"]]          
                },
                    
                {
                    name: "unity",
                    class: "act-ozo",
                    exec: ()=>{
                        cutscene(true)

                        chatter({actor: 'fairy', text: 'already here! stupid!', readout: true, delay: 2000})

                        env.setTimeout(()=>{
                            play("talkchoir", 0.75)
                            vfx({type: 'beacon', state: true})
                        }, 400)

                        setTimeout(()=>{
                            vfx({type: 'beacon', state: false})
                            cutscene(false)
                        }, 2000)
                    },
                    showIf: () => (page.path == "/local/ozo/") && check("mask", "unity")
                },

                // other zones
                {
                    name: "hello",
                    exec: ()=> startDialogue('++fairytravel'),
                    showIf: () => page.path != "/local/ozo/"
                },
                    
                {
                    name: "unity",
                    class: "act-ozo",
                    exec: ()=>{
                        cutscene(true)

                        chatter({actor: 'fairy', text: 'i know the way back! stupid!', readout: true, delay: 1000})

                        env.setTimeout(()=>{
                            play("talkchoir", 0.75)
                            vfx({type: 'beacon', state: true})
                        }, 400)

                        setTimeout(()=>{
                            vfx({type: 'beacon', state: false})
                            cutscene(false)
                        }, 1000)
                    },
                    showIf: () => (page.path != "/local/ozo/") && check("mask", "unity"),
                },
            ]
        })
    } catch(e) {console.error(e); printError(e, true)}

env.dialogues['menu_hub'].start.responses[0].replies[0].showIf = ()=> check("hello_sentry_idiot");

env.entities['referential scar'].actions[0].exec = ()=>{
                if(getQueryDist("#creature", ".joytether") > 7) {
                    chatter({actor: 'sourceless', text: "you can't focus on it from this far away.", readout: true,})
                } else {
                    startDialogue("++scar");
                }
            }

env.entities['referential scar'].actions[0].showIf = () => {
                if(env.stage.ref) { // stage cases
                    if(check(`joy#${env.stage.name}`)) return true

                    return (env.stage.name.includes("pit_") && check("joy#pit")) ||
                            (env.stage.name == "ozo_stranger" && check("joy#any"))

                } else { // flats
                    return check(`joy#${page.dialoguePrefix}`)
                }
            }

env.entities['referential scar'].exmExec = ()=>{
        let unlock = (testval) => {
            change("joy#any", true)
            forcePlay("talkether", 2)

            if((typeof testval == "undefined") || (check(testval) != true)) {
            let container = env?.stage?.ref ? env.stage : content
            container.querySelectorAll(".joyfacet.unlinked").forEach(el=>{
                el.classList.remove("unlinked")
                el.classList.add("linked")
            })
            }
        }

        switch(env?.stage?.name) {
            //flats
            case undefined:
            case null:
                change(`joy#${page.dialoguePrefix}`, true)
                unlock(`joy#${page.dialoguePrefix}`)
            break

            //stages
            case "pit_base":
            case "pit_melting":
            case "pit_outer":
            case "pit_halls":
                change("joy#pit", true)
                unlock("joy#pit")
            break

            case "office_hall":
            case "dullvessel_quarters":
            case "hullf":
                //listed here just for reference
            default:
                if(env.stage.ref) {
                    change(`joy#${env.stage.name}`, true)
                    unlock(`joy#${env.stage.name}`)
                } else {
                    unlock()
                }
                unlock()
        }
    }

env.dialogues[`++scar`].start.responses[0].replies[0].showIf = ["joy#any"]

document.dispatchEvent(env.hooks.apcorru_loaded)
