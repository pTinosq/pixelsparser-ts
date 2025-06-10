# pixelsparser (TypeScript)


![GitHub issues](https://img.shields.io/github/issues/ptinosq/pixelsparser-ts)
![GitHub last commit](https://img.shields.io/github/last-commit/ptinosq/pixelsparser-ts)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/pTinosq/pixelsparser-ts/test.yml)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/pTinosq/pixelsparser-ts/release.yml)
![GitHub go.mod Go version](https://img.shields.io/github/go-mod/go-version/pTinosq/pixelsparser-ts)
![Codecov](https://img.shields.io/codecov/c/github/pTinosq/pixelsparser-ts)

A lightweight Go library for importing and handling Pixels JSON data. Offers a simple, type-safe API to parse and manipulate data efficiently, with no external dependencies.

## Installation

Install via npm:

```bash
npm install pixelsparser-ts
```

Or using yarn:
```bash
yarn add pixelsparser-ts
```

## Usage

```ts
import { load } from "pixelsparser-ts";

(async () => {
  const pixels = await load("path/to/data.json");

  // Access the mood of the first pixel
  console.log(pixels[0].mood);

  // Access the notes of the second pixel
  console.log(pixels[1].notes);
})();
```

## Documentation

This package is documented via TypeScript types. See full API on [npm](https://www.npmjs.com/package/pixelsparser-ts) or explore src/types.ts for definitions.


## Credits

This library was created to parse data from the Pixels app by Teo Vogel, available on the [Google Play Store](https://play.google.com/store/apps/details?id=ar.teovogel.yip) and on the [App Store](https://apps.apple.com/sg/app/pixels-mental-health-and-mood/id1481910141)
