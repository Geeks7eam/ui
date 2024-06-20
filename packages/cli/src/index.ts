const { register } = require('ts-node');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const path = require('path');
const resolve = path.resolve
const fs = require('fs-extra');
const { exec } = require('child_process')

register({
  transpileOnly: true,
});

process.stdout.write('Command execution started...\n');

yargs(hideBin(process.argv))
  .command(
    'init',
    'Setup your project with @zyxui component library',
    (_yargs) => {
      return _yargs.option('f', {
        alias: 'f',
        type: 'string',
        describe: 'Specify the Tailwind CSS config file type (js or ts)',
        choices: ['js', 'ts'],
        default: 'ts',
        demandOption: false,
      });
    },
    async (argv) => {
      console.log('Processing command...');
      const { f } = argv;
      const tailwindConfig =
        f === 'js' ? 'tailwind.config.js' : 'tailwind.config.ts';
      const tailwindConfigPath = path.resolve(process.cwd(), tailwindConfig);
      try {
        console.log(`Looking for ${tailwindConfigPath}...`);
        if (!(await fs.pathExists(tailwindConfigPath))) {
          console.error(
            `Error: ${tailwindConfig} not found in the root directory.`,
          );
          // await fs.copyFile(
          //     require.resolve(`@zyxui/cli/templates/${tailwindConfig}`),
          //     tailwindConfigPath
          // );
          return;
        }

        // Backup the original tailwind config file
        const backupPath = path.resolve(
          process.cwd(),
          `tailwind.config.backup.${f}`,
        );
        await fs.copyFile(tailwindConfigPath, backupPath);

        // Read the existing tailwind config file
        let config: any;
        if (f === 'js') {
          config = await resolve(tailwindConfigPath);
          //   config = require(tailwindConfigPath);
        } else {
            config = await readTsConfig(tailwindConfigPath);
          // config = await importConfig(tailwindConfigPath);
        }

        // // Read th existing tailwind config file
        // const config = require(tailwindConfigPath);
        // // const config = await fs.readFile(tailwindConfigPath, 'utf-8');
        console.log('Config file read successfully.');

        // Modify the config as needed
        const modifiedConfig = modifyTailwindConfig(config);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    },
  )
  .help()
  .parse();

function modifyTailwindConfig(config: any): any {
  let configObject: any;

  console.log('config', config);

  // Ensure the plugins key exist and is an array
  if (!Array.isArray(config.plugins)) {
    config.plugins = [];
  }

  // add new plugins here ...

  // Parse the configuration string to an object
  //   try {
  //     configObject = eval(`(${new String(config)})`);
  //   } catch (error) {
  //     console.error('Error parsing the Tailwind config:', error);
  //     return config;
  //   }

  console.log('configObject', configObject);

  return config;
}

function readTsConfig(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('Reading Typescript config...');
    console.log('filePath', filePath);

    exec(
      `npx ts-node -e "import('${filePath}').then(config => console.log(JSON.parse(config)))"`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error reading Typescript config: ${error}`);
          return;
        } else {
          resolve(JSON.parse(stdout));
        }
      },
    );
  });
}

async function importConfig(filePath: string): Promise<any> {
  const { register } = await import('ts-node');
  register({
    transpileOnly: true,
  });
  const config = await import(filePath);
  return config;

  //   return new Promise((resolve, reject) => {
  //     try {
  //       const config = require(filePath);
  //       resolve(config);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
}
