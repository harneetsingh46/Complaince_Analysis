export const chunkFramework = async (framework) => {
  const chunks = [];

  if (!framework.controls || framework.controls.length === 0) {
    const text = `
Framework: ${framework.name} (${framework.shortCode})

Description: ${framework.description || "N/A"}
Authority: ${framework.authority || "N/A"}
Country: ${framework.country || "N/A"}
Industry: ${framework.industry || "N/A"}
Version: ${framework.version || "1.0"}
`;

    chunks.push({
      text,
      metadata: {
        frameworkID: framework._id.toString(),
        frameworkUUID: framework.uuid,
        frameworkName: framework.name,
        shortCode: framework.shortCode,
        isGeneralDescription: true,
      },
    });

    return chunks;
  }

  framework.controls.forEach((control) => {
    const text = `
Framework: ${framework.name} (${framework.shortCode})

Control ID: ${control.controlId || "N/A"}
Title: ${control.title || "N/A"}

Requirement:
${control.requirementText || "N/A"}

Description:
${control.description || "N/A"}

Risk Level: ${control.riskLevel || "medium"}
Mandatory: ${control.mandatory ? "YES" : "NO"}

Tags: ${control.tags?.length ? control.tags.join(", ") : "None"}
`;

    chunks.push({
      text,
      metadata: {
        frameworkControlID: control.controlId,
        frameworkID: framework._id.toString(),
        frameworkUUID: framework.uuid,
        frameworkName: framework.name,
        shortCode: framework.shortCode,
        controlTitle: control.title,
        riskLevel: control.riskLevel,
        mandatory: control.mandatory,
        tags: control.tags || [],
      },
    });
  });

  return chunks;
};
