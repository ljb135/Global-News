![image](https://github.com/ljb135/global-news/assets/48495973/205d763d-a38e-449f-9a74-3c0c05856069)
# A Way to Read News 📰 From Around the World🌎👀
This Next.js-powered website empowers users to select countries on an interactive three-dimensional globe, providing access to news originating from the chosen country. Upon selecting a country, the user is presented with ten headlines from news sources of that country, displayed chronologically. Further exploration is facilitated through links to the associated articles, allowing users to delve into the details of each headline.

The project aims to provide users with a distinctive UI experience that encourages exploration of news sources beyond their home country, in hopes that it offers them more awareness of the current issues facing the world.

## Technologies Used
Languages:
* TypeScript
* HTML
* CSS

Frameworks:
* React
* Tailwind CSS
* Three.js

The globe is embedded into the website using [react-globe.gl](https://github.com/vasturiano/react-globe.gl) and is rendered by OpenGL. UI Modules from Headless UI are modified to display the news results. All the news articles are currently sourced from the [World News API](https://worldnewsapi.com/).

## Run Locally With Next.js
First, install the required packages:

```
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
