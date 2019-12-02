import * as fs from "fs";
console.log("Solution 1A:", getSolution1A());
console.log("solution 1B:", getSolution1B());
console.log("solution 2A:", getSolution2A(12, 2));
console.log("solution 2B:", getSolution2B(19690720));

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
  //console.log(solution);
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
  //console.log(solution);
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
function getSolution3A() {}
function getSolution3B() {}
function getSolution4A() {}
function getSolution4B() {}
function getSolution5A() {}
function getSolution5B() {}
function getSolution6A() {}
function getSolution6B() {}
function getSolution7A() {}
function getSolution7B() {}
function getSolution8A() {}
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
