export default function(plop) {

  plop.setGenerator("state", {
    description: "NGXS state",
    prompts: [{
      type: "input",
      name: "name",
      message: "state name please"

    }],
    actions: [
      {
        type: "add",
        path: `${process.cwd()}/states/{{kebabCase name}}/{{kebabCase name}}.state.ts`,
        templateFile: "plop-templates/ngxs.state.hbs",
        pattern: "dashCase/kebabCase"
      },
      {
        type: "add",
        path: `${process.cwd()}/states/{{kebabCase name}}/{{kebabCase name}}.actions.ts`,
        templateFile: "plop-templates/ngxs.actions.hbs",
        pattern: "dashCase/kebabCase"
      },
      {
        type: "add",
        path: `${process.cwd()}/states/{{kebabCase name}}/{{kebabCase name}}.model.ts`,
        templateFile: "plop-templates/ngxs.model.hbs",
        pattern: "dashCase/kebabCase"
      }
    ]
  });
  
};
