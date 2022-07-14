# twspaces

Fetch Twitter Spaces metadata without your tokens

## Install

```bash
npm i twspaces
```

## Usage

```js
import { findSpaceById } from "twspaces";

const space = await findSpaceById("1mrGmaQQLrwGy");

console.log(space.metadata);
```

## License

[MIT License](LICENSE)
