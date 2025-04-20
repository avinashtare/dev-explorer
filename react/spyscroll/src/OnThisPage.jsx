import React from "react";
import Scrollspy from "react-scrollspy";

function OnThisPage() {
  const sections = [
    {
      id: "creative-intro",
      title: "Creative Problem Solving",
    },
    {
      id: "understanding-the-problem",
      title: "Understand the Real Problem",
    },
    {
      id: "divergent-thinking",
      title: "Explore with Divergent Thinking",
    },
    {
      id: "convergent-thinking",
      title: "Focus with Convergent Thinking",
    },
    {
      id: "testing-and-prototyping",
      title: "Test, Prototype & Learn",
    },
    {
      id: "reflection-and-growth",
      title: "Reflect, Evolve, Repeat",
    },
    {
      id: "creative-tips",
      title: "Creative Habits That Help",
    },
  ];

  const Section_ID = sections.map((e) => e.id);

  return (
    <div className="page page-2">
      <h2>On This Page</h2>
      <Scrollspy
        items={Section_ID}
        currentClassName="active" // active
        className="scrollspy" // classname of scrollspy element
        rootEl="#scroll-container" // scroll container id
      >
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a href={id}>{title}</a>
          </li>
        ))}
      </Scrollspy>
    </div>
  );
}

export default OnThisPage;
