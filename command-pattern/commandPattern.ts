interface SkillCommand {
  execute(): void;
}

class Poison implements SkillCommand {
  execute(): void {
    console.log("Poison your enemy");
  }
}

class Bless implements SkillCommand {
  execute(): void {
    console.log("Bless yourself");
  }
}

class Attack implements SkillCommand {
  execute(): void {
    console.log("Attack your enemy");
  }
}

class UserAction {
  private combo: SkillCommand[] = [];

  setSkill(skill: SkillCommand): void {
    this.combo.push(skill);
  }

  useCombo(): void {
    for (const skillCommand of this.combo) {
      skillCommand.execute();
    }
  }
}

// Simulate main method
function main(): void {
  const userAction = new UserAction();
  userAction.setSkill(new Poison());
  userAction.setSkill(new Bless());
  userAction.setSkill(new Attack());
  userAction.useCombo();
}

// Run the program
main();
