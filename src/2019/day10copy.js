const input = `.#..#
.....
#####
....#
...##`.split(`\n`).map(x=>[...x]);

function distance(a, b) {
  return Math.hypot(a.x-b.x, a.y-b.y);
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (b > a) {
    let tmp = a;
    a = b;
    b = tmp;
  }
  for(;;) {
    if (b == 0) return a;
    a %= b;
    if (a == 0) return b;
    b %= a;
  }
}

function getAngle(position, asteroid) {
  return (
    Math.atan2(asteroid.y-position.y, asteroid.x-position.x)
    + 2*Math.PI
    + Math.PI/2
  ) %( 2*Math.PI );
}

function getVisible(position, asteroids) {
  const groups = {};
  asteroids.map(asteroid => {
    const dx = position.x - asteroid.x;
    const dy = position.y - asteroid.y;
    if(dx == 0 && dy == 0) return;
    const ratio = gcd(dx, dy);
    // console.log(asteroid, dx, dy, ratio, dx/ratio, dy/ratio);

    if(!groups[dy/ratio]) {
      groups[dy/ratio] = {}
    }
    if(!groups[dy/ratio][dx/ratio]) {
      groups[dy/ratio][dx/ratio] = [];
    }
    groups[dy/ratio][dx/ratio].push({
      ...asteroid,
      d: distance(position, asteroid)
    });
  });

  const visibleList = [];
  Object.values(groups).map(group => {
    Object.values(group).map(list => {
      list.sort((a,b) => a.d - b.d);

      visibleList.push(
        list[0]
      );
    });
  });

  visibleList.sort((a,b) =>
    getAngle(position, a) - getAngle(position, b)
  );

  return visibleList;
}

const asteroids = [];
let position;

input.map((row, y) => {
  row.map((char, x) => {
    if(char == '#') {
      asteroids.push({x,y});
    }
  })
})
function solve1() {
  const result = asteroids.map((asteroid) => {
    return {
      ...asteroid,
      visible: getVisible(asteroid, asteroids).length
    }
  }).sort((a,b)=>b.visible-a.visible);

  position = result[0];

  const index = asteroids
    .findIndex(a => a.x==position.x && a.y == position.y);
  asteroids.splice(index, 1);

  console.log(result[0]);
}



solve1();
// solve2();