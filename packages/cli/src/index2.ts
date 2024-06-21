import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import { createPromptModule} from 'inquirer'
import { getPackageInfo } from '@/utils/get-package-info';

const program = new Command();

const prompt = createPromptModule();

async function main() {
  const packageInfo = await getPackageInfo();

  program.name('zyxui').description('Setup TailwindCSS with ZYXUI').version(
    packageInfo.version,
    '-v, --version',
    'Output the current version'
  )

  program.option('-f, --file-type <type>>', 'Specify the file type (js or ts)', /^(js|ts)$/i)
  .parse(process.argv);

  const options = program.opts();
  let fileType = options.fileType;

  if (!fileType) {
    const answers = await prompt([
      {
        type: 'list',
        name: 'selectFileType',
        message: 'Select the file type',
        choices: ['js', 'ts']
      }
    ]);
    fileType = answers.selectFileType;
  }

  // path to the tailwind.config file based on selected file type
  const tailwindConfigPath = path.resolve(process.cwd(),`tailwind.config.${fileType}`);

  // Check if tailwind.config file exists
  if (!fs.existsSync(tailwindConfigPath)) {
    console.error(`tailwind.config.${fileType} not found`);
    process.exit(1);
  }

  // Read the tailwind.config file content
  const tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf-8');

  // Read the tailwind.config file
  let tailwindConfig;
  if (fileType === 'js') {
    tailwindConfig = require(tailwindConfigContent);
  } else {
    tailwindConfig = JSON.parse(tailwindConfigContent);
  }

  console.log('tailwindConfig');
  console.log(tailwindConfig);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});