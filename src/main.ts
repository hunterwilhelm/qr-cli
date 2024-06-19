import * as cheerio from 'cheerio';
import commander from 'commander';
import fs from 'fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QR } from 'react-qr-rounded';
import { name, version } from '../package.json';
function main() {
  const program = new commander.Command();

  program.name(name);
  program.version(version);

  program
    .option('-d, --data <data>', 'data to be encoded')
    .option('-o, --output <file>', 'output file')
    .option('-c, --color <color>', 'color of the QR code', '#000')
    .option('-b, --background-color <color>', 'background color of the QR code', '#FFF')
    .addOption(
      new commander.Option('-r, --rounding <number>', 'rounding of the QR code')
        .default(100)
        .argParser((v) => parseInt(v, 10)),
    )
    .addOption(
      new commander.Option('-e, --error-correction-level <level>', 'error correction level')
        .choices(['L', 'M', 'Q', 'H'])
        .default('L'),
    )
    .addOption(
      new commander.Option('-p, --padding <number>', 'padding of the QR code')
        .default(0)
        .argParser((v) => parseInt(v, 10)),
    )
    .addOption(
      new commander.Option('-s, --size <number>', 'size of the QR code')
        .default(1000)
        .argParser((v) => parseInt(v, 10)),
    )
    .option('-l, --log', 'log to console instead of file');

  program.parse();
  if (process.argv.length === 2) {
    console.log(program.helpInformation());
    return;
  }

  const options = program.opts();
  const value = options.data ? options.data : 'https://www.example.com/';
  const color = options.color;
  const backgroundColor = options.backgroundColor;
  const rounding = options.rounding;
  const errorCorrectionLevel = options.errorCorrectionLevel;
  const toPrint = options.log !== undefined ? true : false;
  const output = options.output ? options.output : `qrcode_${new Date().getTime()}_${errorCorrectionLevel}.svg`;
  const padding = options.padding;
  const size = options.size;
  const qrSvgText = renderToStaticMarkup(
    React.createElement(QR, {
      color,
      backgroundColor,
      rounding,
      errorCorrectionLevel,
      children: value,
    }),
  );
  const qrSvg = cheerio.load(qrSvgText, {
    xmlMode: true,
  });
  qrSvg('svg').attr('width', size).attr('height', size);
  qrSvg('svg').attr('viewBox', `${-padding} ${-padding} ${1000 + 2 * padding} ${1000 + 2 * padding}`);
  qrSvg('rect')
    .attr('x', `${-padding}`)
    .attr('y', `${-padding}`)
    .attr('width', `${1000 + 2 * padding}`)
    .attr('height', `${1000 + 2 * padding}`);
  const newQrSvgText = qrSvg.xml();
  if (toPrint) {
    console.log(newQrSvgText);
  } else {
    fs.writeFileSync(output, newQrSvgText);
  }
}
main();
