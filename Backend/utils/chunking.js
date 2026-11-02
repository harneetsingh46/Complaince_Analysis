export const chunkFramework = async (framework) => {
  const chunks = [];

  if (!framework.controls || framework.controls.length === 0) {
    // we will make our own text
    const text = `Framework : ${framework.name} (${framework.shortCode}) 
    Description : ${framework.description} || No Description Provided
    Authority : ${framework.authority} || N/A`;

    chunks.push({
      text,
      metadata: {
        frameworkID: framework._id.toString(),
        frameworkuuid: framework.uuid,
        frameworkName: framework.name,
        shortCode: framework.shortCode,
        isGeneralDescription: true,
      },
    });

    return chunks;
  }

  framework.controls.forEach((control) => {
    // we will push real controlls
    const text = `Framework : ${framework.name} (${framework.shortCode}) 
    controlID : ${control.controlID} - ${control.title}
    requiremntText: ${control.requiremntText} || N/A
    description: ${control.description} || N/A
    riskLevel: ${control.riskLevel}
    mandatory: ${control.mandatory ? "YES" : "NO"}
    tags: ${control.tags && control.tags.lenght > 0 ? control.tags.join(" , ") : "None"}`;

    chunks.push({
      text,
      metadata: {
        frameworkcontrolID: control.controlID,
        frameworkID: framework._id.toString(),
        frameworkuuid: framework.uuid,
        frameworkName: framework.name,
        shortCode: framework.shortCode,
      },
    });
  });

  return chunks;
};
