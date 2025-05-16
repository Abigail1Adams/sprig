
/* 
@title: TempGameName
@description: A simple template to help you get started with making a maze game.
@author: Abigail Adams
@tags: []
@addedOn: 2025-04-17
*/


setBackground ("f");

var momFound = false;
const momSFX = tune`
361.4457831325301,
361.4457831325301: G5^361.4457831325301,
361.4457831325301: A5^361.4457831325301,
361.4457831325301: B5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: E5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: G5^361.4457831325301,
361.4457831325301: A5^361.4457831325301,
361.4457831325301: B5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: E5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: G5^361.4457831325301,
361.4457831325301: A5^361.4457831325301,
361.4457831325301: B5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: E5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: G5^361.4457831325301,
361.4457831325301: A5^361.4457831325301,
361.4457831325301: B5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: E5^361.4457831325301,
361.4457831325301: D5^361.4457831325301,
361.4457831325301: G5^361.4457831325301,
361.4457831325301: A5^361.4457831325301,
361.4457831325301: B5^361.4457831325301`;
const goalSound = tune`
283.0188679245283: F5^283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: A5^283.0188679245283,
8207.547169811322`;
const melody = tune`
240: C4~240,
240: D4^240,
240: D4^240,
240: E4^240,
240: F4~240,
240: G4^240,
240: D4^240,
240: E4^240,
240: F4~240,
240: G4^240,
240: D4~240,
240: E4^240,
240: D4~240,
240: F4^240,
240: G4~240,
240: G4~240,
240: D4^240,
240: E4^240,
240: F4~240,
240: G4^240,
240: D4^240,
240: E4^240,
240: F4~240,
240: G4^240,
240: D4~240,
240: E4^240,
240: D4~240,
240: F4^240,
240: G4~240,
240: G4~240,
240: C4~240,
240: D4^240`;
const mom = "m";
const sadMom = "o";
const player = "p";
const wall = "w";
const goal =  "g";
const endGoal = "e";
const scarecrow = "s";
const crow = "h";
const axe = "a";
const board = "b";
const floor = "f";
const sewer = "r";
const uncoveredSew = "u";
const playback = playTune (melody, Infinity)
let crowSpeed = 1;
let crowDirection = 1;


setLegend(
  [ player, bitmap`
................
................
.....000000.....
...0000000000...
...00CCCCCC00...
...0CC0CC0CC0...
...0C00CC00C0...
...0CCCCCCCC0...
...0CCC00CCC0...
...0000000000...
...0909999090...
...0909999090...
...0009999000...
...0C000000C0...
...0001111000...
.....000000.....` ],
  [wall, bitmap `
.......66.......
......6666......
......6666......
.....666666.....
..DDD666666DDD..
...DDD6666DDD...
...DDD6666DDD...
....DD6666DD....
....DD6666DD....
....DDD66DDD....
....DDDDDDDD....
....DDDDDDDD....
......DDDD......
.......DD.......
................
................`],
  [goal, bitmap `
................
................
................
0000000000000000
2020202020202020
0202020202020202
2020202020202020
0202020202020202
2020202020202020
0202020202020202
0000000000000000
................
................
................
................
................`],
  [sadMom,bitmap`
................
.....000000.....
...0000000000...
...000CCCC000...
...00C0CC0C00...
...0000CC0000...
...00CCCCCC00...
.0000CC00CC00...
.0C00C0CC0C00...
.000000000000...
.0HHH0HHHH0H0...
.00000HHHH0H0...
...000HHHH000...
....0000000C0...
.....0LLLL000...
.....000000.....`],
  [mom, bitmap `
................
.....000000.....
...0000000000...
...000CCCC000...
...00C0CC0C00...
...0000CC0000...
...00CCCCCC00...
.0000C0000C00...
.0C00CCCCCC00...
.000000000000...
.0HHH0HHHH0H0...
.00000HHHH0H0...
...000HHHH000...
....0000000C0...
.....0LLLL000...
.....000000.....` ],
  [scarecrow, bitmap `
................
.......00.......
.....00CC00.....
....00CCCC00....
....0CCCCCC0....
..000000000000..
...0F00FF00F0...
...0FF0FF0FF0...
....0FFFFFF0....
0000000000000000
0F0CC0CCCC0CC0F0
000000CCCC000000
.....0CCCC0.....
.....0CCCC0.....
......0000......
......0FF0......`],
  [crow, bitmap`
000000..........
0000000.........
.000000.........
.0000000........
..000000........
...00000...000..
....0000...0306.
....0000000000..
0..000000000006.
0000000000000...
000000000000....
0000000000000...
.....000000000..
.........000000.
..........00000.
...........00000`],
  [axe, bitmap`
................
................
....11..........
....111.........
....111111......
....1111111.....
....1111111.....
....111CCC1.....
....11.CCC......
.......CCC......
.......CCC......
.......CCC......
.......CCC......
.......CCC......
.......CCC......
.......CCC......`],
  [board, bitmap `
CC00........0CCC
CCC00......00CCC
CCCC00.....0CCCC
00CCC00...00CCC0
.0CCCC00.00CCC00
.00CCCC000CCC00.
..00CCCC00CCC0..
....0CCCC00CC0..
...000CCCC000...
..00CC0CCCC00...
.00CCC00CCCC00..
.0CCCCC00CCCC00.
00CCCC0000CCCC00
CCCC000..00CCCCC
CCC00.....00CCCC
CCC0.......00CCC`],
  [floor, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [sewer, bitmap`
................
................
................
....LLLLLLLL....
...LL111111LL...
..LLLL1111LLLL..
..L11LL11LL11L..
..L1111LL1111L..
..L111LLLL111L..
..L11LL11LL11L..
..LLL111111LLL..
...LL111111LL...
....LLLLLLLL....
................
................
................`],
  [uncoveredSew, bitmap`
................
................
................
....LLLLLLLL....
...LL000000LL...
..LLL000000LLL..
..L0000000000L..
..L0000000000L..
..L0000000000L..
..L0000000000L..
..LLL000000LLL..
...LL000000LL...
....LLLLLLLL....
................
................
................`],
)

setSolids([])

let level = 0
const levels = [
  map`
....................
....................
....................
....................
wwwwwwwwwwwwwwwwwwww
w.......pww.........
w........wwo........
w..wwwwwwwwwwwwwwwww
w..w................
....................
....................
....................
....................
....................`,
  map`
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................`,
  map`
....................
....................
....................
....................
.s...............s..
ss...............ss.
....................
....................
....................
........bbbb.a......
....................
....................
....................
....................`,
  map`
....................
....................
....................
.......rrrrr........
.....rrrrrrrrr......
....................
....................
...hhh.......hhh....
....................
....................
.ggg...........ggg..
.ggg...........ggg..
....................
....................`,
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`,
  map`
p.wwwwwwwwwwwwwwwwwwwwwwwww
w........www..w....ws.....w
w.wwwwwwwwgw.ww.ww.www....w
w.w.......sw.....ww..w....w
w......w...wwwwgs....wg...w
w.w....w.www..wwwww..wwww.w
w.ww.www.sgw.....w....s...w
w..w...wwwww..s..wwwwww.www
w..www................w.wsw
w....w..www..wwww.....w...w
w....wwwwwww....wwww..w.www
w.......sgwwww..w.....s.wsw
w.ww.wwwwww.....s.....w.w.w
wsgw.w..........w.........w
wwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
w........w....w..w..........w
www.wwwwww.......wwww.www...w
p.w.w.wwwwww..w.......w.wwwww
w.w.w......ww.w.ww..www.....w
w.....w.wwww.........ww..a..w
w.w...w............wwww.wwwww
w.w...wwwwwww..ww..w.........
w.w.........w..ww..w.........
w.w.wwww.wwww..ww.wwww...wwww
w.w.w.......w..ww........wwww
www.wwwbbbb.w..ww............
w.....wg..b........www.......
w.....w...b........www...wwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwww
w.......sr............w...w
w.wwwwwswwwwww.wwwwww...w.w
w..w..wrw....w.wsrw.w.www.w
ww.w..www.ww.w...sw....w..w
p..........w.wswwwwww..w..w
ww.wwwwwww.w.www....wwww..w
w..w.....w.wsrwwwww....w..w
w....ww..w.wwww..bw.w..w.ww
w..w.sw.ww.......ww.w.....w
w..wsrw....ww........wwww.w
w..wwwwbw..w..wwww...ws...w
w.....saw..w...srwwwwwrwwww
wwwwwwwwwwwwwwwwwwugwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwww
w.........w.....w........w
w.www.wwwww..w..w...wwwwww
w...w.w...wwww....w.w....w
www.w.w...w..w..w...w.wwww
p.w.w.w.w.......ws....wwug
w.w.w...wsw.ww.wwrww..wwww
w.www.w.w.w.a..wwwww..w..w
w.....w.w.www..w.........w
w.wwwww.....w..w.ww.wwwwsw
w.w...wwww..w..w.......wrw
w.www.w..b.......w..w..www
w.....wr..w.....ww..w..srw
wwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwww
w.....w....................w
w.w.w.w.w...wwwwwww...w....w
www.w...wswsw.....ww.ww.ws.w
p...www.w.wwwwwww.w.a.w.ww.w
www.w...wu.gw.....ww.ww....w
w.w.wwwwwwwwwwww.ww.....w.ww
w.............sw.....wsww.sw
w.w....wwwww.www.....www...w
w.w...b...rw...............w
w.w....wwwww..ww.www.w..wwww
w.www.........ws.w...wwwws.w
w..sw........ww..ws........w
wwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
ww......w..w...w..w.sw
w..ww..ww..wusgw..w..w
w.ww.......wwwww.ww.ww
w..w..wwwwwwh........p
ww.w..w....www.w.ww.ww
w..w.ww..w.....w..w..w
wr.w....ww.....ws.w..w
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
p.w....w...b......sw
w.wwww.www.w.www.www
w.ws.....w.w.ws..wsw
w.wwwww..wgw.wwhww.w
w.....w..www.......w
ww.w............wwww
w..wwww..wwww....a.w
w........swb.......w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwp.wwwwwwwwwwwwwwww
w..w.........sw....sw...ws......w
w..w....www..ww...www...wwwww...w
w..wwwwws.........w.........w...w
w..wsw..ww..wwwwwww.wwwww...www.w
w..wrw.......wg..sw.....w....w..w
wh.w.www..wwww....wwwwwww....w..w
w.ww.w.....w......w......wwwww..w
w....w...w.ws.....b......wwwww..w
w.wwwwww.wwwwwwwwwwwww...w......w
w......w..w..wgs....sw...w..wwwww
w............ws.....ww.www..w...w
w.wwwwww.....wwwww......w...wsw.w
w.w......www............w...www.w
w.w....w.w...wwwwwww..www.......w
w.wwwwwwwwww......sw........bbbbw
w.wg..sw...wwwwww..w.......b.a..w
w.w....b...ws......w.......b...uw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wb.b.w.wb..s........w.............w
wwww.w.wsb..........bh............w
w.sw.w.wwwwwwwwwww..w.w.ww.www.w..w
w.ww.w..........sw..w.wwwwwwwwww..w
w....ww.............wsw........w..w
w..ww...w...wwww....www...wwww.w..w
w.w.sw..w......w.....w....wssw....w
w.w.gw..w...s..wwww..w....wwww....w
w.w..w..w......w.....w..........www
w.wbbw..w...w..ws....wwww.........p
w.w..w..www.w..www...w.sw......wwww
w.w..w..wsw.w....w...w.ww...w..w..w
w.w..w..www.w....w...w......w..w..w
w............www.w...w......w.....w
w.............sw.w..www.....wwww..w
w.......bsb..www.w..w.a........s..w
w.wwwww..b...ws..w..w.w........w..w
w.sw.sw......wwwww..w.wwwwwwwwww..w
w..w.........w......w.............w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
p.wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.ww..sww.....h..w.........s...w
w.ww.ww...swww.sww...........w.w
w.sw..w.wwwww....wg..www...s...w
w..ww.w.w..a.b...wwwwwwwwbbwwwww
ww....s.buwwsw.www.........wwwww
wwwww...wwwww...b...swww...wwsww
wsw...www......wwwwwwwwws..wwwww
ww..wwwww.swww.w...w.w........ww
ww.wwwwsw......w.s.w.......w..sw
w......bwww....w.w.w....w.ww..ww
w.wwb...wrw..w...w.w.w.bbw.w..ww
w.wwws..w.s..w.w.w.w.ab..w.....w
w.w..wb.w.wwww.s.w.w.w.bbwwww..w
w.ws.wwww.w..w.w.w.w.......ww..w
w.ww.wwsw.w..w.w.www.wwwww.ws..w
w............s...w...swwws.....w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwww..
wwwwww....
p........m
wwwwww....
wwwwwwww..`,
]

setMap(levels[level])

//sets
setSolids([player,wall,axe,board])
setPushables({
  [ player ]: [axe],
  [ axe ]: [board],
})

//player controls
onInput("w", () => {    //makes player move UP
  getFirst(player).y -= 1
 
})

onInput("a", () => {   //makes player move LEFT
  getFirst(player).x -= 1
  
})

onInput("s", () => {   //makes player move DOWN
  getFirst(player).y += 1
 
})

onInput("d", () => {   //makes player move RIGHT
  getFirst(player).x += 1
  
})

onInput("j", () => {  //resets the player if stuck
  const currentLevel = levels[level]; 
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
})

onInput("l", () => {   //moves title screens forward
 if(level === 1 || level === 2 || level === 3 || level === 4){
   level = level + 1;
   if (level < levels.length){
     clearText("");
     setMap(levels[level]);
     
   }
 }
})

afterInput(() => {

  //goal function
  const goalFound = tilesWith (player, goal);
  if (goalFound.length >= 1){
    level = level + 1;
    playTune(goalSound)
    if (level < levels.length){
      setMap (levels[level]);
    }
}

  //crows kill
  const crowCovered = tilesWith(player,crow);
  if(crowCovered.length>0){
    setMap(levels[level])
  }

  
  //scarecrow function
  const scarecrowCovered = tilesWith(player,scarecrow);
  if(scarecrowCovered.length>0){
      setMap(levels[level])
    }

  //sewer functions
  const sewerCovered = tilesWith(player, sewer);
  if (sewerCovered.length >= 1){
    const usc = getFirst(uncoveredSew);
    const pl = getFirst(player);
    pl.x = usc.x
    pl.y = usc.y

  }

  //win screen
  const foundMom = tilesWith (player,mom);
  if (foundMom.length >= 1){
    addText("You found mom!", 50,50)
    playback.end()
    playTune(momSFX,1)
    level = level + 1
  }

  //level 2 text
  if(level === 2){
      //top text
      addText("Looks like there", { 
        x: 2,
        y: 1,
        color: color`6`
      })
      addText("will be obsticles", { 
        x: 2,
        y: 2,
        color: color`6`
      })
      addText("don't go near", { 
        x: 3,
        y: 5,
        color: color`C`
      })
      addText("the scarecrows", { 
        x: 3,
        y: 6,
        color: color`C`
      })
      addText("the axe can", { 
        x: 4,
        y: 8,
        color: color`L`
      })
      addText("break the boards", { 
        x: 3,
        y: 9,
        color: color`L`
      })
      addText("press L to continue", { 
        x: 1,
        y: 13,
        color: color`6`
      }) 
  }

  //level 3 text
  if(level === 3){
    addText("press L to continue", { 
      x: 1,
      y: 13,
      color: color`6`
      })
    addText("You can use sewers", { 
        x: 1,
        y: 2,
        color: color`1`
      }) 
    addText("to teleport", { 
        x: 4,
        y: 3,
        color: color`1`
      }) 
    addText("look out for", { 
        x: 4,
        y: 7,
        color: color`0`
      }) 
    addText("crows", { 
        x: 7,
        y: 8,
        color: color`0`
      }) 
    addText("get to the goals", { 
        x: 2,
        y: 10,
        color: color`2`
      }) 
    addText("to progress", { 
        x: 4,
        y: 11,
        color: color`2`
      })
  }

  //level 4 text
  if(level === 4){
    addText("W to move up", { 
        x: 4,
        y: 2,
        color: color`6`
      }) 
     addText("a to move left", { 
        x: 4,
        y: 4,
        color: color`6`
      }) 
    addText("s to move down", { 
        x: 4,
        y: 6,
        color: color`6`
      }) 
    addText("d to move right", { 
        x: 4,
        y: 8,
        color: color`6`
      }) 
     addText("j to restart level", { 
        x: 2,
        y: 10,
        color: color`6`
      }) 
    addText("press L to continue", { 
        x: 1,
        y: 13,
        color: color`6`
      }) 
  }
  
})

//level 1 text
if (level = 1){
  addText("OH NO!", { 
    x: 8,
    y: 1,
    color: color`6`
  })
  addText("You lost your mom", { 
    x: 2,
    y: 2,
    color: color`6`
  })
  addText("in a corn maze!!!", { 
    x: 2,
    y: 3,
    color: color`6`
  })
  addText("we have to find her", { 
    x: 1,
    y: 11,
    color: color`6`
  })
  addText("press L to continue", { 
    x: 1,
    y: 13,
    color: color`6`
  }) 
}

//level 10 crow moves
setInterval(() => {
    if (level == 10) { // run different code depending on the level
      var crowTile = getFirst(crow);
      var playerTile = getFirst(player);

      if (crowTile.x === playerTile.x && crowTile.y === playerTile.y) {
            setMap(levels[level]); // Reset the current level
        } else {
            if (crowTile.x === 12 && crowTile.y === 4) {
                crowTile.x = 13;
            } else if (crowTile.x === 13 && crowTile.y === 4) {
                crowTile.x = 14;
            } else if (crowTile.x === 14 && crowTile.y === 4) {
                crowTile.x = 15;
            } else if (crowTile.x === 20 && crowTile.y === 4) {
                crowTile.x = 12; // Reset the crow to the beginning
            } else {
                // Move the crow along the path
                crowTile.x += 1;
            }
        }

    } 
}, 200)

//level 11 crow moves
setInterval(() => {
  if (level == 11) { // run different code depending on the level

        var crowTile = getFirst(crow);
        var playerTile = getFirst(player);

      if (crowTile.x === playerTile.x && crowTile.y === playerTile.y) {
            setMap(levels[level]); // Reset the current level
        } else {
            if (crowTile.x === 15 && crowTile.y === 4) {
                crowTile.y = 5;
            } else if (crowTile.x === 15 && crowTile.y === 5) {
                crowTile.y = 6;
            } else if (crowTile.x === 15 && crowTile.y === 6) {
                crowTile.y = 7;
            } else if (crowTile.x === 15 && crowTile.y === 7) {
                crowTile.y = 8; 
            } else if (crowTile.x === 15 && crowTile.y === 8) {
                crowTile.y = 4;
            }else {
                // Move the crow along the path
                crowTile.x += 1;
            }
        }

    } 
}, 250)

//level 12 crow moves
setInterval(() => {
  if (level == 12) { // run different code depending on the level

        var crowTile = getFirst(crow);
        var playerTile = getFirst(player);

      if (crowTile.x === playerTile.x && crowTile.y === playerTile.y) {
            setMap(levels[level]); // Reset the current level
        } else {
            if (crowTile.x === 1 && crowTile.y === 5) {
                crowTile.y = 6;
            } else if (crowTile.x === 1 && crowTile.y === 6) {
                crowTile.y = 7;
            } else if (crowTile.x === 1 && crowTile.y === 7) {
                crowTile.y = 8;
            } else if (crowTile.x === 1 && crowTile.y === 8) {
                crowTile.y = 9; 
            } else if (crowTile.x === 1 && crowTile.y === 9) {
                crowTile.y = 5;
            }else {
                // Move the crow along the path
                crowTile.y += 1;
            }
        }

    } 
}, 200)

//level 13 crow moves
setInterval(() => {
  if (level == 13) { // run different code depending on the level

        var crowTile = getFirst(crow);
        var playerTile = getFirst(player);

      if (crowTile.x === playerTile.x && crowTile.y === playerTile.y) {
            setMap(levels[level]); // Reset the current level
        } else {
            if (crowTile.x === 21 && crowTile.y === 2) {
                crowTile.x = 22;
            } else if (crowTile.x === 22 && crowTile.y === 2) {
                crowTile.x = 23;
            } else if (crowTile.x === 23 && crowTile.y === 2) {
                crowTile.x = 24;
            } else if (crowTile.x === 24 && crowTile.y === 2) {
                crowTile.x = 25; 
            } else if (crowTile.x === 25 && crowTile.y === 2) {
                crowTile.x = 26;
            } else if (crowTile.x === 26 && crowTile.y === 2) {
                crowTile.x = 27;
            } else if (crowTile.x === 27 && crowTile.y === 2) {
                crowTile.x = 28;
            } else if (crowTile.x === 28 && crowTile.y === 2) {
                crowTile.x = 29;
            } else if (crowTile.x === 29 && crowTile.y === 2) {
                crowTile.x = 30;
            } else if (crowTile.x === 30 && crowTile.y === 2) {
                crowTile.x = 31;
            } else if (crowTile.x === 31 && crowTile.y === 2) {
                crowTile.x = 32;
            } else if (crowTile.x === 32 && crowTile.y === 2) {
                crowTile.x = 33;
            } else if (crowTile.x === 33 && crowTile.y === 2) {
                crowTile.x = 21;
            }else {
                // Move the crow along the path
                crowTile.x += 1;
            }
        }

    } 
}, 200)

//level 14 crow moves
setInterval(() => {
  if (level == 14) { // run different code depending on the level
    var crowTile = getFirst(crow);
    var playerTile = getFirst(player);

    if (crowTile.x === playerTile.x && crowTile.y === playerTile.y) {
      setMap(levels[level]); // Reset the current level
      } else {
          if (crowTile.x === 14 && crowTile.y === 1) {
              crowTile.y = 2;
          } else if (crowTile.x === 14 && crowTile.y === 2) {
              crowTile.y = 3;
          } else if (crowTile.x === 14 && crowTile.y === 3) {
              crowTile.y = 4;
          } else if (crowTile.x === 14 && crowTile.y === 4) {
              crowTile.y = 5; 
          } else if (crowTile.x === 14 && crowTile.y === 5) {
              crowTile.y = 6;
          } else if (crowTile.x === 14 && crowTile.y === 6) {
              crowTile.y = 7;
          } else if (crowTile.x === 14 && crowTile.y === 7) {
              crowTile.y = 8;
          } else if (crowTile.x === 14 && crowTile.y === 8) {
              crowTile.y = 9;
          } else if (crowTile.x === 14 && crowTile.y === 9) {
              crowTile.y = 1;
          }else {
              crowTile.y += 1;
          }
        }
    } 
}, 110)

