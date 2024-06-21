import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import { createPromptModule } from 'inquirer';
import { getPackageInfo } from '@/utils/get-package-info';
import { transformJavaScriptContent } from '@/utils/transpiler'; // Import your transpiler function

const program = new Command();

const prompt = createPromptModule();

async function main() {
  const packageInfo = await getPackageInfo();

  program.name('zyxui').description('Setup TailwindCSS with ZYXUI').version(
    packageInfo.version,
    '-v, --version',
    'Output the current version'
  );

  program
    .option('-f, --file-type <type>', 'Specify the file type (js or ts)', /^(js|ts)$/i)
    .parse(process.argv);

  const options = program.opts();
  let fileType = options.fileType;

  if (!fileType) {
    const answers = await prompt([
      {
        type: 'list',
        name: 'selectFileType',
        message: 'Select the file type',
        choices: ['js', 'ts'],
      },
    ]);
    fileType = answers.selectFileType;
  }

  // Function to read and handle file content based on type
  const readFileAndHandleContent = async (filePath) => {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const modifiedContent = await transformJavaScriptContent(content); // Use transpiler
    console.log('modifiedContent');
    console.log(modifiedContent);
    
    if (fileType === 'js') {
      return modifiedContent;
    } else {
      // Handle TypeScript case (if needed, assuming plain object export)
      return JSON.parse(content);
    }
  };

  // Path to the tailwind.config file
  const tailwindConfigPath = path.resolve(process.cwd(), `tailwind.config.${fileType}`);

  // Check if tailwind.config file exists
  if (!fs.existsSync(tailwindConfigPath)) {
    console.error(`tailwind.config.${fileType} not found`);
    process.exit(1);
  }

  // Read and handle the file content
  try {
    const tailwindConfig = await readFileAndHandleContent(tailwindConfigPath);
    console.log('tailwindConfig');
    console.log(tailwindConfig);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
