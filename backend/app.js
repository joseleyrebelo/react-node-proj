const express = require("express");
const dummyData = require("./dummyData");

/*
 * Main program procedure
 */
const main = () => {
  const app = express();

  // Establishing headers with requester
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  // (testing porpuses only)
  dummyData.forEach((row, i) => (row["index"] = i));

  app.get("/:index?", async (req, res) => {
    let delayEmulation = req.query.emulate_delay ? 800 : 0;
    let sliceStart = req.params.index || 0;
    let sliceEndMax = dummyData.length;
    let ghostsBeingSliced = 0;
    let entriesResult = null;
    let sliceEnd = 0;

    // Ensures variable type is integer
    sliceStart = parseInt(sliceStart);

    // Circles back if reached the end
    sliceStart = sliceStart === sliceEndMax ? 0 : sliceStart;

    // Sorts the end of the cut
    // - overreaching correction handled below
    sliceEnd = sliceStart + 6;

    // Sorts out overreaching cut
    // - Prepares for two step concatenated cut
    if (sliceEnd >= sliceEndMax) {
      ghostsBeingSliced = sliceEnd - sliceEndMax;
      sliceEnd = sliceEndMax;
      console.log(" > sorting overreach");
    }

    entriesResult = dummyData.slice(sliceStart, sliceEnd);

    // Circles back if initially overreached
    // - Concatenates overreached cut to circle back cut
    if (ghostsBeingSliced > 0) {
      sliceEnd = ghostsBeingSliced;
      entriesResult = entriesResult.concat(dummyData.slice(0, sliceEnd));
      console.log(" > concat cut by " + ghostsBeingSliced);
    }

    // Emulating server delay for allowing to see UX animation
    setTimeout(() => {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          entries: entriesResult,
          sliceEnd,
        })
      );
    }, delayEmulation);
  });

  app.listen(5000, () => console.log("App is running on port 5000!"));
};

main();
