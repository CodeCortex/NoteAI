export const getDummyResponse = async (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`AI says: "${prompt}" reversed -> ${prompt.split('').reverse().join('')}`), 800);
    });
  };
  