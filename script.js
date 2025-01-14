document.getElementById("sleepForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  // Prepare data for Hugging Face API
  const payload = {
    outbound: {
      fromAirport: formData.get("fromAirport"),
      departureDate: formData.get("departureDate"),
      toAirport: formData.get("toAirport"),
      arrivalTime: formData.get("arrivalTime"),
      hotelArrival: formData.get("hotelArrival"),
    },
    inbound: {
      returnFromAirport: formData.get("returnFromAirport"),
      returnDate: formData.get("returnDate"),
      returnDepartureTime: formData.get("returnDepartureTime"),
      wakeUpTime: formData.get("wakeUpTime"),
      showTime: formData.get("showTime"),
    },
  };

  try {
    // Hugging Face API integration
    const response = await fetch("https://api-inference.huggingface.co/models/your-model-id", {
      method: "POST",
      headers: {
        Authorization: `Bearer your-huggingface-token`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    document.getElementById("output").innerHTML = `
      <h2>Recommended Sleep Schedule</h2>
      <pre>${JSON.stringify(result, null, 2)}</pre>
    `;
  } catch (error) {
    document.getElementById("output").innerHTML = `
      <h2>Error</h2>
      <p>${error.message}</p>
    `;
  }
});
