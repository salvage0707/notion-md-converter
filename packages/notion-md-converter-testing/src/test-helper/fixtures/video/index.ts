import empty from "./empty.json" assert { type: "json" };
import external from "./external.json" assert { type: "json" };
import upload from "./upload.json" assert { type: "json" };

const videoFixture = {
  upload,
  empty,
  external,
};

export { videoFixture };
