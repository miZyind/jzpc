export = {
  llama: {
    model: String(process.env.AI_LLAMA_MODEL),
  },
  cohere: {
    token: String(process.env.AI_COHERE_TOKEN),
    model: String(process.env.AI_COHERE_MODEL),
  },
};
