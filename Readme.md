# qr-cli

A simple command line tool to generate QR codes.

### Motivation

I liked the qr code style that Inkscape uses in its QR code extension, so I decided to make a simple command line tool to generate QR codes with the same style.

### Help
```
Usage: qr [options]

Options:
  -V, --version                         output the version number
  -d, --data <data>                     data to be encoded
  -o, --output <file>                   output file
  -c, --color <color>                   color of the QR code (default: "#000")
  -b, --background-color <color>        background color of the QR code (default: "#FFF")
  -r, --rounding <number>               rounding of the QR code (default: 100)
  -e, --error-correction-level <level>  error correction level (choices: "L", "M", "Q", "H", default: "L")
  -p, --padding <number>                padding of the QR code (default: 0)
  -s, --size <number>                   size of the QR code (default: 1000)
  -l, --log                             log to console instead of file
  -h, --help                            display help for command
```

### Build
```bash
git clone https://github.com/hunterwilhelm/qr-cli.git
cd qr-cli
npm i
npm run build
```

### Install

Add this to your `.zshrc`
```bash
###-qr-###
alias qr="node ~/path-to/qr-cli/bin/cli.js"
###-end-qr-###
```

## License

MIT
