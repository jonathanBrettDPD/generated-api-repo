#!/usr/bin/env node

const fs = require("fs");
const ncp = require("ncp");
const path = require("path");

require("yargs")
  .command(
    "create <project>",
    "creates a new api project",
    yargs => {
      yargs.positional("project", {
        describe: "name of the project",
      });
    },
    argv => {
      const verbose = argv.verbose;
      const project = argv.project;

      if (fs.existsSync(project)) {
        return console.error(`Directory ${project} already exists.`);
      }

      try {
        if (verbose) {
          console.info(`Creating directory ${project}.`);
        }

        fs.mkdirSync(project);
      } catch (e) {
        return console.error("Couldn't create directory");
      }

      if (verbose) {
        console.info(`Copying the template.`);
      }

      ncp(path.join(__dirname, "template"), project, function(err) {
        if (err) {
          return console.error(err);
        }

        // update package.json

        if (verbose) {
          console.info(`Updating package.json`);
        }

        const packageJson = path.join(project, "package.json");

        try {
          const data = JSON.parse(fs.readFileSync(packageJson));
          data.name = project;

          fs.writeFileSync(packageJson, JSON.stringify(data, null, 2));
        } catch (e) {
          return console.error(e);
        }

        // create readme
        if (verbose) {
          console.info(`Updating README.md`);
        }

        const readme = path.join(project, "README.md");

        try {
          fs.writeFileSync(readme, `# ${project}`);
        } catch (e) {
          return console.error(e);
        }

        console.log(`Project ${project} created.`);
      });
    }
  )
  .demand(1)
  .option("verbose", {
    alias: "v",
    default: false,
  }).argv;
