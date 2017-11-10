// 09 Specify Exact Values with TypeScript’s Literal Types

let autoComplete: 'on' = 'on';
// autoComplete = 'off'; // Type '"off"' is not assignable to type '"on"'.

let autoComplete2: 'on' | 'off' = 'on';
autoComplete2 = 'off';
// autoComplete2 = 'ON'; // Type '"ON"' is not assignable to type '"on" | "off"'.

const text3: string = autoComplete2;

////////

type NumberBase = 2 | 8 | 10 | 16;

let base: NumberBase;
base = 2;
// base = 3; // Type '3' is not assignable to type 'NumberBase'.

type HTTPSuccessStatusCode = 
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226;

let autoFocus: true = true;
// autoFocus = false; // Type 'false' is not assignable to type 'true'.

// let autoFocus2: true | false = true;
let autoFocus2: boolean = true;
autoFocus2 = false;

///////////

enum Protocols {
  HTTP,
  HTTPS,
  FTP
}

type HyperTextProtocol = Protocols.HTTP | Protocols.HTTPS;

let protocol: HyperTextProtocol;
protocol = Protocols.HTTP;
protocol = Protocols.HTTPS;
// protocol = Protocols.FTP; //  Type 'Protocols.FTP' is not assignable to type 'HyperTextProtocol'.
