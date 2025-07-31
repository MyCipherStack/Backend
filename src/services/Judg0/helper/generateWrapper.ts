


// Here add RESULT for that 



export const generateWrapper = (code: string, meta: { name: string }, language: string) => {
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
          const result = ${meta.name}(line);
        console.log("__RESULT__:" + result); // 👈 Tag the result
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
