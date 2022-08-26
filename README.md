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

### findSpaceByTweetId(tweetId: string): Promise\<[AudioSpace][audiospace]\>

```js
import { findSpaceByTweetId } from "twspaces";

const space = await findSpaceByTweetId("<tweetId>");

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

### getLiveStreamMetadata(mediaKey: string): Promise\<[LiveStreamMetadata][livestreammetadata]\>

```js
import { findSpaceById, getLiveStreamMetadata } from "twspaces";

const space = await findSpaceById("<spaceId>");

const liveStreamMetadata = await getLiveStreamMetadata(
  space.metadata.media_key
);

console.log(liveStreamMetadata);
```

## License

[MIT License](LICENSE)

[audiospace]: src/types/response.ts#L8-L11
[livestreammetadata]: src/types/response.ts#L45-L57
