import { app, basePathWithStageName } from './app';

const port = 8000;

app.listen(port);
console.log(`listening on http://localhost:${port}${basePathWithStageName}`);
