# twspaces

Fetch Twitter Spaces metadata without your tokens

## Install

```bash
npm i twspaces
```

## API

### findSpaceById(spaceId: string): Promise\<[AudioSpace][audiospace]\>

```js
import { findSpaceById } from "twspaces";

const space = await findSpaceById("<spaceId>");

console.log(space.metadata);
```

### findSpaceByUrl(url: string): Promise\<[AudioSpace][audiospace]\>

```js
import { findSpaceByUrl } from "twspaces";

const spaceBySpaceUrl = await findSpaceByUrl(
  "https://twitter.com/i/spaces/<spaceId>"
);

const spaceByTweetUrl = await findSpaceByUrl(
  "https://twitter.com/<screenName>/status/<tweetId>"
);
```

## License

[MIT License](LICENSE)

[audiospace]: src/types.ts#L87-L90
