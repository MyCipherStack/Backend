import axios from 'axios';

const JUDGE0_API_URL = 'http://localhost:2358/submissions'; // Judge0 API URL

interface IJudge0Response {
  stdout: string;
  stderr: string;
  compile_output: string;
  status: {
    id: number;
    description: string;
  };
}

export default class Judge0Service {
  // Function to send code to Judge0 for execution
  static async submitCode(
    language: string, // Programming language
    sourceCode: string, // Source code to execute
    stdin: string, // Input to the code (if any)
    expectedOutput: string, // Expected output to verify the solution
  ) {
    try {
      const response = await axios.post(
        JUDGE0_API_URL,
        {
          source_code: sourceCode,
          language_id: this.getLanguageId(language), // Map language to Judge0 ID
          stdin,
          expected_output: expectedOutput,
          cpu_time_limit: 1000, // 1 second CPU time limit (adjust as needed)
          memory_limit: 128000, // Memory limit in KB (128MB)
          number_of_test_cases: 1, // Can be adjusted based on requirements
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token } = response.data; // Get the submission token

      // Once the submission is made, we can use the token to fetch the result
      const result = await this.getResult(token);

      return result; // Return the result (output or error)
    } catch (error) {
      console.error('Error submitting code to Judge0:', error);
      throw new Error('Failed to submit code to Judge0');
    }
  }

  // Function to get the result from Judge0 after submission
  static async getResult(token: string) {
    try {
      const response = await axios.get(`${JUDGE0_API_URL}/${token}`);
      const data: IJudge0Response = response.data;

      // Check the result and return the relevant information
      if (data.status.id === 3) { // "3" indicates successful execution
        return {
          success: true,
          output: data.stdout,
          error: data.stderr,
          compile_output: data.compile_output,
        };
      } else {
        return {
          success: false,
          error: data.stderr || 'Unknown error during execution.',
        };
      }
    } catch (error) {
      console.error('Error fetching result from Judge0:', error);
      throw new Error('Failed to fetch result from Judge0');
    }
  }

  // Map language to Judge0's language ID
  private static getLanguageId(language: string): number {
    const languageMap: { [key: string]: number } = {
      javascript: 63, // JavaScript
      python: 71, // Python 3
      java: 62, // Java
      typescript: 93, // TypeScript (may require correct Judge0 ID)
    };

    return languageMap[language.toLowerCase()] || 71; // Default to Python if unknown language
  }
}















const generateWrapper = (code, meta, language) => {
  switch (language) {
    case 'javascript':
      return `
${code}
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', (line) => {
  console.log(${meta.name}(line));
  rl.close();
});`;
    case 'python':
      return `
${code}
import sys
input_data = sys.stdin.read().strip()
print(${meta.name}(input_data))`;
    case 'java':
      return `
import java.util.*;
public class Main {
    public static boolean ${meta.name}(String s) {
        // your code here
        return true;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        System.out.println(${meta.name}(input));
    }
}`;
    default:
      return code;
  }
};
