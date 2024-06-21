import * as babel from '@babel/core';

export async function transformJavaScriptContent(content) {
  try {
    const { code } = await babel.transformAsync(content, {
      presets: ['@babel/preset-env'], // Transpile to compatible JavaScript
      plugins: [
        // Add plugins as needed, e.g., for syntax transformations
      ],
    });
    return code;
  } catch (error) {
    console.error('Error during transpilation:', error);
    throw error; // Re-throw the error for handling
  }
}
