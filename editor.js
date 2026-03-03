const typeSelect = document.getElementById("typeSelect");
const qcmZone = document.getElementById("qcmZone");
const vfZone = document.getElementById("vfZone");
const multiZone = document.getElementById("multiZone");

typeSelect.addEventListener("change", () => {
  qcmZone.style.display = typeSelect.value === "qcm" ? "block" : "none";
  vfZone.style.display = typeSelect.value === "vrai_faux" ? "block" : "none";
  multiZone.style.display = typeSelect.value === "multi" ? "block" : "none";
});

document.getElementById("generateBtn").addEventListener("click", () => {
  const obj = {
    question: questionInput.value.trim(),
    type: typeSelect.value
  };

  if (explicationInput.value.trim()) obj.explication = explicationInput.value.trim();

  if (obj.type === "qcm") {
    obj.choix = choicesInput.value.split("\n").map(x => x.trim()).filter(x => x);
    obj.reponse = parseInt(reponseInput.value);
  }

  if (obj.type === "vrai_faux") {
    obj.vrai_faux = vfSelect.value === "true";
  }

  if (obj.type === "multi") {
    obj.choix = multiChoicesInput.value.split("\n").map(x => x.trim()).filter(x => x);
    obj.reponses_multiples = multiReponsesInput.value.split(",").map(x => parseInt(x.trim()));
  }

  output.textContent = JSON.stringify(obj, null, 2);
});
