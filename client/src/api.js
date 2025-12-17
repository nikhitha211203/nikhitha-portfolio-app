export const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    return res.json();
};

export const fetchSkills = async () => {
    const res = await fetch("/api/skills");
    return res.json();
};

export const fetchAbout = async () => {
    const res = await fetch("/api/about");
    return res.json();
};

export const sendMessage = async (data) => {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};
