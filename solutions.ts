import * as fs from "fs";
// console.log("Solution 1A:", getSolution1A());
// console.log("solution 1B:", getSolution1B());
// console.log("solution 2A:", getSolution2A(12, 2));
// console.log("solution 2B:", getSolution2B(19690720));
//console.log("solution 3A:", getSolution3A());
// console.log("solution 4A:", getSolution4A());
// console.log("solution 4B", getSolution4B());
//console.log("solution 5A:", getSolution5A());
//console.log("solution 5B", getSolution5B());
console.log("solution 6A:", getSolution6A());
console.log("solution 6B", getSolution6B());

function read(fileName: string): string {
  return fs.readFileSync(fileName, "utf8");
}
function vectorize(data: string) {
  //let lines = data.split("\n");
  //return lines.replace(/\D/g, "");
  return data.split("\n").map(x =>
    x
      .replace(/^-?[0-9]\d*(\.\d+)?$/g, "")
      .replace(/\D/g, " ")
      .split(" ")
      .filter(y => y !== "")
      .map(z => Number(z))
  );
}
function getSolution1A() {
  const solution = read("input1.txt")
    .split("\n")
    .map(x => Math.floor(Number(x) / 3) - 2)
    .reduce((a, b) => a + b, 0);

  return solution;
}
function recursion1B(data: number): number {
  if (data < 0) return 0;
  return data + recursion1B(Math.floor(data / 3) - 2);
}
function getSolution1B() {
  const solution = read("input1.txt")
    .split("\n")
    .map(x => recursion1B(Math.floor(Number(x) / 3) - 2))
    .reduce((a, b) => a + b, 0);
  return solution;
}
function getSolution2A(noun: number, verb: number) {
  const data = read("input2.txt")
    .split(",")
    .map(x => Number(x));
  data[1] = noun;
  data[2] = verb;
  let iteration = 0;
  let oppCode = data[iteration];
  while (oppCode !== 99) {
    const opp1Pos = data[iteration * 4 + 1];
    const opp2Pos = data[iteration * 4 + 2];
    const writePos = data[iteration * 4 + 3];
    if (oppCode === 1) data[writePos] = data[opp1Pos] + data[opp2Pos];
    else if (oppCode === 2) data[writePos] = data[opp1Pos] * data[opp2Pos];
    iteration += 1;
    oppCode = data[iteration * 4];
  }
  return data[0];
}
function getSolution2B(target: number) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const solution = getSolution2A(noun, verb);
      if (solution === target) return 100 * noun + verb;
    }
  }
}
function LinePoint(xVal: number, yVal: number) {
  this.x = xVal;
  this.y = yVal;
}
function LineSegment(p1, p2) {
  this.point1 = p1;
  this.point2 = p2;
}
function getLineIntersection(s1, s2) {
  const s1_x = s1.point2.x - s1.point1.x;
  const s1_y = s1.point2.y - s1.point1.y;
  const s2_x = s2.point2.x - s2.point1.x;
  const s2_y = s2.point2.y - s2.point1.y;
  const s =
    (-s1_y * (s1.point1.x - s2.point1.x) + s1_x * (s1.point1.y - s2.point1.y)) /
    (-s2_x * s1_y + s1_x * s2_y);

  const t =
    (s2_x * (s1.point1.y - s2.point1.y) - s2_y * (s1.point1.x - s2.point1.x)) /
    (-s2_x * s1_y + s1_x * s2_y);
  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    // Collision detected
    return new LinePoint(s1.point1.x + t * s1_x, s1.point1.y + t * s1_y);
  }
}
//WIP
// function getSolution3A() {
//   const moves = {
//     R: function(x: number, y: number, mag: number) {
//       return new LinePoint(x, y - mag);
//     },
//     L: function(x: number, y: number, mag: number) {
//       this.x -= mag;
//       return new LinePoint(x - mag * 2, y - mag);
//     },
//     U: function(x: number, y: number, mag: number) {
//       return new LinePoint(x - mag, y);
//     },
//     D: function(x: number, y: number, mag: number) {
//       this.y -= mag;
//       return new LinePoint(x - mag, y - mag * 2);
//     }
//   };
//   const data = read("input3.txt").split("\n");
//   const lineMagnitudes1 = vectorize(data[0])[0];
//   const lineDirections1 = data[0].replace(/[0-9]/g, "").split(",");
//   const lineSegments1 = [];
//   let x = 0;
//   let y = 0;
//   for (let i = 0; i < lineMagnitudes1.length - 1; i++) {
//     const mag = lineMagnitudes1[i];
//     const direction = lineDirections1[i];
//     lineSegments1.push(
//       new LineSegment(
//         new LinePoint(x, y),
//         moves[direction](x + mag, y + mag, mag)
//       )
//     );
//     x = lineSegments1[i].point2.x;
//     y = lineSegments1[i].point2.y;
//   }
//   const lineMagnitudes2 = vectorize(data[1])[0];
//   const lineDirections2 = data[1].replace(/[0-9]/g, "").split(",");
//   const lineSegments2 = [];
//   x = 0;
//   y = 0;
//   for (let i = 0; i < lineMagnitudes1.length - 1; i++) {
//     const mag = lineMagnitudes2[i];
//     const direction = lineDirections2[i];
//     lineSegments2.push(
//       new LineSegment(
//         new LinePoint(x, y),
//         moves[direction](x + mag, y + mag, mag)
//       )
//     );
//     x = lineSegments2[i].point2.x;
//     y = lineSegments2[i].point2.y;
//   }
//   for (let i = 0; i < lineSegments1.length; i++) {
//     for (let j = 0; j < lineSegments2.length; j++) {
//       const s1 = lineSegments1[i];
//       const s2 = lineSegments2[j];
//       const intersection = getLineIntersection(s1, s2);
//       if (intersection) {
//         // console.log(s1);
//         // console.log(s2);
//         console.log(intersection);
//       }
//     }
//   }

//   //console.log("nx", lineSegments2);
//   //   console.log("vectors", lineDirections1.length);
//   //   var wireGrid = [...Array(gridSize)].map(e => Array(gridSize).fill(0));
//   //   console.log("grid");
//   //   let x = origin;
//   //   let y = origin;
//   //   //wireGrid[x][y] = 0;
//   //   for (let i = 0; i < lineMagnitudes1.length; i++) {
//   //     let direction = lineDirections1[i];
//   //     for (let j = 0; j < lineMagnitudes1[i]; j++) {
//   //       if (direction === "L" || direction === "R") x = moves[direction](x);
//   //       if (direction === "U" || direction === "D") y = moves[direction](y);
//   //       //console.log("xy", x, y);
//   //       wireGrid[x][y] += 1;
//   //       //console.log("grid", wireGrid[x][y]);
//   //     }
//   //   }
//   //   console.log("line 1");
//   //   x = origin;
//   //   y = origin;
//   //   for (let i = 0; i < lineMagnitudes2.length; i++) {
//   //     console.log("dir");
//   //     let direction = lineDirections2[i];
//   //     for (let j = 0; j < lineMagnitudes2[i]; j++) {
//   //       if (direction === "L" || direction === "R") x = moves[direction](x);
//   //       if (direction === "U" || direction === "D") y = moves[direction](y);
//   //       //console.log("hu", wireGrid[x][y]);
//   //       wireGrid[x][y] += 1;
//   //       //console.log("uh", wireGrid[x][y]);
//   //       if (wireGrid[x][y] > 1) {
//   //         console.log(x, y);
//   //         return Math.abs(x - origin) + Math.abs(y - origin);
//   //       }
//   //     }
//   //   }
// }
function getSolution3B() {}
function getSolution4A() {
  const bottom = 128392;
  const top = 643281;
  let count = 0;
  for (let i = bottom; i <= top; i++) {
    const hasDuplicates = /([0-9])\1/i.test(String(i));
    const hasAscendingDigits = /(^0*1*2*3*4*5*6*7*8*9*$)/.test(String(i));
    if (hasAscendingDigits && hasDuplicates) {
      count++;
    }
  }
  return count;
}
function getSolution4B() {
  const bottom = 128392;
  const top = 643281;
  let count = 0;
  for (let i = bottom; i <= top; i++) {
    const hasDuplicates = /([0-9])\1/i.test(String(i));
    const hasAscendingDigits = /(^0*1*2*3*4*5*6*7*8*9*$)/.test(String(i));
    if (hasAscendingDigits && hasDuplicates) {
      const counts = String(i)
        .split("")
        .map(digit => String(i).split(digit).length - 1);
      if (counts.includes(2)) {
        count++;
      }
    }
  }
  return count;
}
function getSolution6A() {
  const data = read("input5.txt").split("\n");
  let orbits = {};
  data.forEach(orbit => (orbits[orbit.split(")")[1]] = orbit.split(")")[0]));
  let count = 0;
  for (let orbit in orbits) {
    let key = orbit;
    while (key !== "COM") {
      key = orbits[key];
      count++;
    }
  }
  return count;
}
function getSolution6B() {
  const data = read("input5.txt").split("\n");
  let orbits = {};
  data.forEach(orbit => (orbits[orbit.split(")")[1]] = orbit.split(")")[0]));
  let target = orbits["SAN"];
  let arr1 = [];
  let arr2 = [];
  for (let orbit in orbits) {
    let key = orbit;
    if (key === "YOU") {
      while (key !== "COM") {
        key = orbits[key];
        arr1.push(key);
      }
    }
    if (key === target) {
      while (key !== "COM") {
        key = orbits[key];
        arr2.push(key);
      }
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      return i + arr1.indexOf(arr2[i]) + 1;
    }
  }
}
function getSolution8A() {
  const width = 25;
  const height = 6;
  const data = read("input6.txt").split("");
  const layers = [];
  for (let i = 0; i < data.length / (width * height); i++) {
    layers.push(data.slice(width * height * i, width * height * (i + 1)));
  }
  const numberOfZeroes = [];
  layers.forEach(layer => {
    numberOfZeroes.push(layer.join().split("0").length - 1);
  });
  const layerId = numberOfZeroes.indexOf(Math.min(...numberOfZeroes));
  const targetLayer = layers[layerId];
  const numberOfOnes = targetLayer.join().split("1").length - 1;
  const numberOfTwos = targetLayer.join().split("2").length - 1;
  return numberOfOnes * numberOfTwos;
}
//function getSolution6B() {}
function getSolution7A() {}
function getSolution7B() {}
//function getSolution8A() {}
function getSolution8B() {}
function getSolution9A() {}
function getSolution9B() {}
function getSolution10A() {}
function getSolution10B() {}
function getSolution11A() {}
function getSolution11B() {}
function getSolution12A() {}
function getSolution12B() {}
function getSolution13A() {}
function getSolution13B() {}
function getSolution14A() {}
function getSolution14B() {}
function getSolution15A() {}
function getSolution15B() {}
function getSolution16A() {}
function getSolution16B() {}
function getSolution17A() {}
function getSolution17B() {}
function getSolution18A() {}
function getSolution18B() {}
function getSolution19A() {}
function getSolution19B() {}
function getSolution20A() {}
function getSolution20B() {}
function getSolution21A() {}
function getSolution21B() {}
function getSolution22A() {}
function getSolution22B() {}
function getSolution23A() {}
function getSolution23B() {}
function getSolution24A() {}
function getSolution24B() {}
function getSolution25A() {}
function getSolution25B() {}
