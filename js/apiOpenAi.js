// Store your API key
const apiKey = "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";

// Function to make the API request
async function getSkillsAnswer(question) {
  const response = await fetch(
    "https://api.openai.com/v1/engines/davinci/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Q: ${question}\nA:`,
        max_tokens: 100,
        temperature: 0.5,
        n: 1,
        stop: "\n",
      }),
    }
  );

  const data = await response.json();
  const answer = data.choices[0].text.trim().replace(/^A: /, "");
  return answer;
}

// Function to handle form submission
document
  .getElementById("question-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const question = document.getElementById("question-input").value;
    const answer = await getSkillsAnswer(question);

    document.getElementById("answer-output").textContent = answer;
  });
